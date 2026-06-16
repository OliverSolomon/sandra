import type { Metadata } from "next";
import EulogyViewer from "./EulogyViewer";

export const metadata: Metadata = {
  title: "Funeral Programme · Sandra Cheptoo Mugun",
};

export default function EulogyPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-serif text-[#3f1f2c] mb-2">Funeral Programme</h1>
        <p className="text-[#9c6f82] font-sans italic">Sandra Cheptoo Mugun — Celebrating a Life</p>
      </div>
      <EulogyViewer />
      <div className="mt-6 text-center">
        <a href="/eulogy.pdf" download className="inline-block px-6 py-3 bg-[#3f1f2c] text-white rounded-md font-medium hover:bg-[#56293b] transition-colors">
          Download Programme PDF
        </a>
      </div>
    </div>
  );
}
