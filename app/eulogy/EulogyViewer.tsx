"use client";

export default function EulogyViewer() {
  return (
    <div className="w-full border border-[#e3c2d0] rounded-lg overflow-hidden">
      <embed src="/eulogy.pdf" type="application/pdf" title="Funeral Programme — Sandra Cheptoo Mugun" className="w-full h-[100vh]" />
    </div>
  );
}
