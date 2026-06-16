"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { PenLine, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type UserMeta = { user_metadata?: { full_name?: string; name?: string; avatar_url?: string; picture?: string }; email?: string } | null;

export default function FloatingTributeButton() {
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", message: "", isAnonymous: false });
  const [user, setUser] = useState<UserMeta>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: u } }) => {
      if (u) {
        setUser({ user_metadata: u.user_metadata, email: u.email });
        setForm((prev) => ({ ...prev, name: prev.name || u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split("@")[0] || "" }));
      }
    });
  }, [supabase]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape" && !submitting) setIsOpen(false); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, submitting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(null);
    if (!form.isAnonymous && !form.name.trim()) { setError('Please enter your name or select "Publish anonymously"'); return; }
    if (!form.message.trim()) { setError("Please enter a tribute message"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/tributes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.isAnonymous ? null : form.name.trim(), message: form.message.trim(), isAnonymous: form.isAnonymous, photoUrl: user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null }),
      });
      const raw = await res.text();
      let data: { error?: string } = {};
      try { data = raw ? JSON.parse(raw) : {}; } catch { /* non-JSON response (e.g. HTML error page) */ }
      if (!res.ok) throw new Error(data.error || `Submission failed (HTTP ${res.status}). Please try again later.`);
      setSuccess(true);
      setForm({ name: user ? (user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "") : "", message: "", isAnonymous: false });
      const w = window as unknown as Record<string, (() => void) | unknown>;
      if (typeof w.refreshTributes === "function") w.refreshTributes();
      setTimeout(() => { setSuccess(false); setIsOpen(false); }, 2500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to submit tribute");
    } finally { setSubmitting(false); }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#3f1f2c] text-white rounded-full shadow-lg hover:bg-[#56293b] transition-all hover:scale-105 flex items-center gap-2.5 px-5 py-3">
        <PenLine className="w-4 h-4" />
        <span className="font-medium text-sm tracking-wide">Add Tribute</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" onClick={() => !submitting && setIsOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">

            <div className="flex items-center justify-between px-7 py-5 border-b border-[#f1dde6]">
              <h2 className="text-xl font-serif text-[#3f1f2c]">Leave a Tribute</h2>
              <button onClick={() => !submitting && setIsOpen(false)} disabled={submitting}
                className="text-[#b98ba0] hover:text-[#6b4b56] disabled:opacity-50 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-7 py-6">
              {success && (
                <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900 font-sans text-sm">Tribute submitted</p>
                    <p className="text-xs text-green-700 font-sans mt-0.5">Thank you for sharing your memory.</p>
                  </div>
                </div>
              )}
              {error && (
                <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800 font-sans text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {!form.isAnonymous && (
                  <div>
                    <label htmlFor="m-name" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 font-sans">
                      Your Name <span className="text-[#b98ba0] font-normal normal-case tracking-normal">(required)</span>
                    </label>
                    <input type="text" id="m-name" name="name" required={!form.isAnonymous} value={form.name} onChange={handleChange} disabled={!!user || submitting}
                      className="w-full px-4 py-3 border border-[#e8cdd9] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#cf9bb2] focus:border-[#cf9bb2] disabled:bg-[#fbf2f6] font-sans text-[#3f1f2c] text-sm transition-colors"
                      placeholder="Enter your name" />
                  </div>
                )}

                <div>
                  <label htmlFor="m-msg" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 font-sans">
                    Your Tribute <span className="text-[#b98ba0] font-normal normal-case tracking-normal">(required)</span>
                  </label>
                  <textarea id="m-msg" name="message" required rows={7} value={form.message} onChange={handleChange} disabled={submitting}
                    className="w-full px-4 py-3 border border-[#e8cdd9] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#cf9bb2] focus:border-[#cf9bb2] resize-none font-sans text-[#3f1f2c] text-sm leading-relaxed transition-colors"
                    placeholder="Share your memories, thoughts, or condolences&hellip;" />
                  <p className="mt-1 text-xs text-[#b98ba0] font-sans text-right">{form.message.length} / 5000</p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#fbf2f6] rounded-sm border border-[#f1dde6]">
                  <input type="checkbox" id="m-anon" name="isAnonymous" checked={form.isAnonymous} onChange={handleChange}
                    className="mt-0.5 w-4 h-4 text-gray-700 border-[#dca7bf] rounded" />
                  <label htmlFor="m-anon" className="flex-1 text-sm text-gray-700 font-sans cursor-pointer">
                    <span className="font-medium">Publish anonymously</span>
                    <span className="block mt-0.5 text-[#b98ba0] text-xs">Your name will not be shown.</span>
                  </label>
                </div>

                <button type="submit" disabled={submitting || !form.message.trim() || (!form.isAnonymous && !form.name.trim())}
                  className="w-full py-3.5 px-6 bg-[#3f1f2c] text-white rounded-sm font-medium text-sm tracking-wide hover:bg-[#56293b] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting&hellip;
                    </>
                  ) : "Submit Tribute"}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
