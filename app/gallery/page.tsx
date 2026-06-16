import type { Metadata } from "next";
import GalleryFull from "./GalleryFull";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Gallery — In Loving Memory of Sandra Cheptoo Mugun",
  description:
    "A gallery of cherished photographs celebrating the life of Sandra Cheptoo Mugun, affectionately known as Sandy.",
};

export default function GalleryPage() {
  return (
    <>
      <GalleryFull />
      <Footer />
    </>
  );
}
