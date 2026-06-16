"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import TributeCard from "./TributeCard";
import Reveal from "./Reveal";

interface Tribute { id: string; name: string; message: string; photo_url: string | null; is_anonymous: boolean; created_at: string; }
interface Pagination { page: number; limit: number; total: number; totalPages: number; }

export default function TributesList() {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const fetchTributes = useCallback(async (p: number) => {
    try {
      setLoading(true); setError(null);
      const res = await fetch(`/api/tributes?page=${p}&limit=10`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      const sorted = (data.tributes || []).sort((a: Tribute, b: Tribute) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setTributes(sorted);
      setPagination(data.pagination || null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load tributes");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchTributes(page); }, [fetchTributes, page]);

  useEffect(() => {
    const w = window as unknown as Record<string, (() => void) | unknown>;
    w.refreshTributes = () => { setPage(1); fetchTributes(1); };
    return () => { delete (window as unknown as Record<string, unknown>).refreshTributes; };
  }, [fetchTributes]);

  const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <section id="tributes-list" className="py-24 bg-[#f9edf1]">
      <div className="max-w-4xl mx-auto px-6">

        <Reveal className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[#b98ba0] font-sans mb-3">Words of Love</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#3f1f2c]">Tributes</h2>
          <div className="w-10 h-px bg-[#dca7bf] mx-auto mt-4" />
        </Reveal>

        {loading && !tributes.length ? (
          <div className="flex flex-col items-center py-16 gap-3">
            <Loader2 className="w-7 h-7 text-[#b98ba0] animate-spin" />
            <p className="text-[#9c6f82] font-sans text-sm">Loading tributes&hellip;</p>
          </div>
        ) : error && tributes.length === 0 ? (
          <div className="bg-white border border-[#f1dde6] rounded-sm p-10 text-center space-y-4">
            <p className="text-[#9c6f82] font-sans text-sm">Unable to load tributes at this time.</p>
            <button onClick={() => fetchTributes(page)}
              className="px-6 py-2.5 bg-[#3f1f2c] text-white rounded-sm text-sm font-medium hover:bg-[#56293b] transition-colors">
              Try Again
            </button>
          </div>
        ) : tributes.length === 0 ? (
          <div className="text-center text-[#9c6f82] font-sans py-16">
            <p className="mb-2">No tributes yet.</p>
            <p className="text-sm">Be the first to share a memory below.</p>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {tributes.map((t, i) => (
                <Reveal key={t.id} as="div" delay={Math.min(i * 50, 300)}>
                  <TributeCard name={t.name} date={fmt(t.created_at)} message={t.message} photoUrl={t.photo_url || undefined} isAnonymous={t.is_anonymous} />
                </Reveal>
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <button onClick={() => setPage((p) => p - 1)} disabled={page === 1 || loading}
                    className="p-2 border border-[#e8cdd9] rounded-sm text-[#85586c] hover:bg-[#fbf2f6] disabled:opacity-40 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === pagination.totalPages || (p >= page - 1 && p <= page + 1))
                    .map((p, idx, arr) => (
                      <div key={p} className="flex items-center gap-1">
                        {arr[idx - 1] && p - arr[idx - 1] > 1 && <span className="px-2 text-[#b98ba0] text-sm">&hellip;</span>}
                        <button onClick={() => setPage(p)} disabled={loading}
                          className={`w-9 h-9 rounded-sm text-sm font-medium transition-colors ${page === p ? "bg-[#3f1f2c] text-white" : "border border-[#e8cdd9] text-[#85586c] hover:bg-[#fbf2f6]"}`}>
                          {p}
                        </button>
                      </div>
                    ))}
                  <button onClick={() => setPage((p) => p + 1)} disabled={page === pagination.totalPages || loading}
                    className="p-2 border border-[#e8cdd9] rounded-sm text-[#85586c] hover:bg-[#fbf2f6] disabled:opacity-40 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-[#b98ba0] font-sans">
                  Showing {(page - 1) * pagination.limit + 1}–{Math.min(page * pagination.limit, pagination.total)} of {pagination.total} tributes
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
