"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type UserMeta = { user_metadata?: { full_name?: string; name?: string; avatar_url?: string; picture?: string }; email?: string } | null;

interface Props { onTributeSubmitted?: () => void; }

export default function TributeForm({ onTributeSubmitted }: Props) {
  const supabase = createClient();
  const [form, setForm] = useState({ name: "", message: "", isAnonymous: false });
  const [user, setUser] = useState<UserMeta>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user: u } } = await supabase.auth.getUser();
      if (u) {
        setUser({ user_metadata: u.user_metadata, email: u.email });
        setUserPhoto(u.user_metadata?.avatar_url || u.user_metadata?.picture || null);
        setForm((prev) => ({ ...prev, name: prev.name || u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split("@")[0] || "" }));
      }
    };
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user ?? null;
      setUser(u ? { user_metadata: u.user_metadata, email: u.email } : null);
      if (u) {
        setUserPhoto(u.user_metadata?.avatar_url || u.user_metadata?.picture || null);
        setForm((prev) => ({ ...prev, name: prev.name || u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split("@")[0] || "" }));
      } else { setUserPhoto(null); }
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleSignIn = async () => {
    setAuthLoading(true); setError(null);
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/api/auth/callback?next=/#tributes`, queryParams: { access_type: "offline", prompt: "consent" } },
    });
    if (err) { setError(err.message); setAuthLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(null);
    if (!form.isAnonymous && !form.name.trim()) { setError('Please enter your name or select "Publish anonymously"'); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/tributes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.isAnonymous ? null : form.name.trim(), message: form.message, isAnonymous: form.isAnonymous, photoUrl: userPhoto }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit tribute");
      setSuccess(true);
      setForm({ name: user ? (user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "") : "", message: "", isAnonymous: false });
      onTributeSubmitted?.();
      setTimeout(() => setSuccess(false), 6000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to submit tribute");
    } finally { setSubmitting(false); }
  };

  return (
    <section id="tributes" className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-6">

        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-sans mb-3">Share Your Memory</p>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">Leave a Tribute</h2>
          <div className="w-10 h-px bg-stone-300 mx-auto mb-4" />
          <p className="text-stone-500 font-sans text-sm max-w-md mx-auto leading-relaxed">
            Share your memories, thoughts, or condolences. Your tribute will be published immediately and will be a source of comfort to the family.
          </p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-green-900 font-sans text-sm">Your tribute has been submitted</p>
              <p className="text-xs text-green-700 font-sans mt-0.5">Thank you for sharing your memory of Mary.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 font-sans text-sm">{error}</p>
          </div>
        )}

        <div className="border border-stone-100 rounded-sm shadow-sm overflow-hidden">
          {/* Auth banner */}
          {user ? (
            <div className="bg-stone-50 px-7 py-4 border-b border-stone-100 flex items-center gap-4">
              {userPhoto && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-stone-200 flex-shrink-0">
                  <Image src={userPhoto} alt="Profile" fill className="object-cover" />
                </div>
              )}
              <div className="flex-1">
                <p className="font-medium text-gray-900 font-sans text-sm">{user.user_metadata?.full_name || user.user_metadata?.name || user.email}</p>
                <p className="text-xs text-stone-400 font-sans">{user.email}</p>
              </div>
              <button type="button" onClick={() => supabase.auth.signOut()}
                className="text-xs text-stone-500 hover:text-gray-900 font-sans transition-colors">
                Sign out
              </button>
            </div>
          ) : (
            <div className="bg-stone-50 px-7 py-4 border-b border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-800 font-sans">Sign in for a verified tribute</p>
                <p className="text-xs text-stone-500 font-sans">Optional — use your Google name and photo.</p>
              </div>
              <button type="button" onClick={handleSignIn} disabled={authLoading}
                className="inline-flex items-center gap-2 px-4 py-2 border border-stone-300 bg-white text-gray-700 rounded-sm text-xs font-medium hover:bg-stone-50 transition-colors disabled:opacity-50">
                {authLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )}
                {authLoading ? "Signing in&hellip;" : "Sign in with Google"}
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-7 space-y-6">
            {!form.isAnonymous && (
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 font-sans">
                  Your Name <span className="text-stone-400 font-normal normal-case tracking-normal">(required)</span>
                </label>
                <input type="text" id="name" name="name" required={!form.isAnonymous} value={form.name} onChange={handleChange} disabled={!!user}
                  className="w-full px-4 py-3 border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 disabled:bg-stone-50 font-sans text-gray-900 text-sm transition-colors"
                  placeholder="Enter your full name" />
              </div>
            )}

            <div>
              <label htmlFor="message" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 font-sans">
                Your Tribute <span className="text-stone-400 font-normal normal-case tracking-normal">(required)</span>
              </label>
              <textarea id="message" name="message" required rows={7} value={form.message} onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-none font-sans text-gray-900 text-sm leading-relaxed transition-colors"
                placeholder="Share your memories, thoughts, or condolences&hellip;" />
              <p className="mt-1.5 text-xs text-stone-400 font-sans text-right">{form.message.length} / 5000</p>
            </div>

            <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-sm border border-stone-100">
              <input type="checkbox" id="isAnonymous" name="isAnonymous" checked={form.isAnonymous} onChange={handleChange}
                className="mt-0.5 w-4 h-4 text-gray-700 border-stone-300 rounded" />
              <label htmlFor="isAnonymous" className="flex-1 text-sm text-gray-700 font-sans cursor-pointer">
                <span className="font-medium">Publish anonymously</span>
                <span className="block mt-0.5 text-stone-400 text-xs">Your name will not be displayed publicly.</span>
              </label>
            </div>

            <button type="submit" disabled={submitting || !form.message.trim() || (!form.isAnonymous && !form.name.trim())}
              className="w-full py-3.5 px-6 bg-gray-900 text-white rounded-sm font-medium text-sm tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
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
    </section>
  );
}
