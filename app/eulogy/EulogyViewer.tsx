"use client";

export default function EulogyViewer() {
  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <embed src="/eulogy.pdf" type="application/pdf" title="Eulogy — Mary Wanjiku Chege" className="w-full h-[100vh]" />
    </div>
  );
}
