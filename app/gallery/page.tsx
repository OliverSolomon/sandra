import type { Metadata } from "next";
import GalleryFull from "./GalleryFull";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Gallery — In Loving Memory of Mary Wanjiku Chege",
  description:
    "A gallery of cherished photographs honouring the life of Mary Wanjiku Chege, affectionately known as Mama Njambi.",
};

export default function GalleryPage() {
  return (
    <>
      <GalleryFull />
      <Footer />
    </>
  );
}
