import type { Metadata } from "next";
import EulogyViewer from "./EulogyViewer";

export const metadata: Metadata = {
  title: "The Eulogy · Mary Wanjiku Chege (Mama Njambi)",
};

export default function EulogyPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-2">The Eulogy</h1>
        <p className="text-gray-600 font-sans italic">Mary Wanjiku Chege — Mama Njambi</p>
      </div>
      <EulogyViewer />
      <div className="mt-6 text-center">
        <a href="/eulogy.pdf" download className="inline-block px-6 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors">
          Download Eulogy PDF
        </a>
      </div>
    </div>
  );
}
