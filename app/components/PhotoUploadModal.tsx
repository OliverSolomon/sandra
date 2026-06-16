"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface Props { isOpen: boolean; onClose: () => void; onUploadSuccess: () => void; }
interface FileWithPreview { file: File; preview: string; id: string; uploading?: boolean; error?: string; }

export default function PhotoUploadModal({ isOpen, onClose, onUploadSuccess }: Props) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const validate = (f: File): string | null => {
    if (!["image/jpeg","image/png","image/webp","image/jpg"].includes(f.type)) return "Only JPEG, PNG, or WebP allowed.";
    if (f.size > 10*1024*1024) return `"${f.name}" exceeds 10 MB.`;
    return null;
  };

  const addFiles = async (selected: File[]) => {
    setError(null);
    const errors: string[] = [];
    const valid: FileWithPreview[] = [];
    for (const f of selected) {
      const err = validate(f);
      if (err) { errors.push(err); continue; }
      const preview = await new Promise<string>((res, rej) => {
        const r = new FileReader();
        r.onloadend = () => res(r.result as string);
        r.onerror = rej;
        r.readAsDataURL(f);
      });
      valid.push({ file: f, preview, id: `${Date.now()}-${Math.random()}` });
    }
    if (errors.length) setError(errors.join("\n"));
    if (valid.length) setFiles((prev) => [...prev, ...valid]);
  };

  const handleUpload = async () => {
    if (!files.length) return;
    setUploading(true); setError(null);
    const results = await Promise.all(files.map(async (fw) => {
      setFiles((prev) => prev.map((f) => f.id === fw.id ? { ...f, uploading: true } : f));
      try {
        const fd = new FormData();
        fd.append("file", fw.file);
        const res = await fetch("/api/gallery/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        setFiles((prev) => prev.map((f) => f.id === fw.id ? { ...f, uploading: false } : f));
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Upload failed";
        setFiles((prev) => prev.map((f) => f.id === fw.id ? { ...f, uploading: false, error: msg } : f));
        return { success: false };
      }
    }));
    const succeeded = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;
    if (failed) setError(`${failed} photo(s) failed. ${succeeded} uploaded.`);
    if (succeeded) { setFiles([]); onUploadSuccess(); if (!failed) handleClose(); }
    setUploading(false);
  };

  const handleClose = () => {
    if (uploading) return;
    setFiles([]); setError(null); onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={handleClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-2xl font-serif text-gray-900">Add Photo to Gallery</h3>
          <button onClick={handleClose} disabled={uploading} className="text-gray-400 hover:text-gray-600 disabled:opacity-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 space-y-6">
          {error && <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"><p className="text-red-800 text-sm font-sans">{error}</p></div>}

          {files.length === 0 ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={async (e) => { e.preventDefault(); setIsDragging(false); await addFiles(Array.from(e.dataTransfer.files)); }}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full px-6 py-16 border-2 border-dashed rounded-xl cursor-pointer transition-all ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"}`}
            >
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/jpg" multiple className="hidden"
                onChange={async (e) => { await addFiles(Array.from(e.target.files || [])); if (fileInputRef.current) fileInputRef.current.value = ""; }} />
              <div className="flex flex-col items-center gap-4 text-center">
                <div className={`p-4 rounded-full ${isDragging ? "bg-blue-100" : "bg-gray-100"}`}>
                  <svg className={`w-12 h-12 ${isDragging ? "text-blue-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold font-sans text-lg mb-1">{isDragging ? "Drop photos here" : "Click to upload or drag and drop"}</p>
                  <p className="text-sm text-gray-500 font-sans">JPEG, PNG, or WebP · max 10 MB each</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto p-2">
                {files.map((fw) => (
                  <div key={fw.id} className="relative group">
                    <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm bg-gray-100">
                      <Image src={fw.preview} alt={fw.file.name} fill className="object-cover" />
                      {fw.uploading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" /></div>}
                      {fw.error && <div className="absolute inset-0 bg-red-500/90 flex items-center justify-center p-2"><p className="text-white text-xs text-center">{fw.error}</p></div>}
                      {!fw.uploading && (
                        <button onClick={() => setFiles((prev) => prev.filter((f) => f.id !== fw.id))}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-600 truncate">{fw.file.name}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm font-medium">
                + Add More Photos
              </button>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button onClick={handleClose} disabled={uploading} className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50">Cancel</button>
            <button onClick={handleUpload} disabled={!files.length || uploading} className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50">
              {uploading ? <span className="flex items-center justify-center gap-2"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />Uploading…</span>
                : `Upload ${files.length} Photo${files.length !== 1 ? "s" : ""}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
