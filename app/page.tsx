"use client";

import { useEffect } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import ServiceDetails from "./components/ServiceDetails";
import Gallery from "./components/Gallery";
import TributesList from "./components/TributesList";
import TributeForm from "./components/TributeForm";
import Contribute from "./components/Contribute";
import Footer from "./components/Footer";
import FloatingTributeButton from "./components/FloatingTributeButton";

export default function Home() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    <>
      <main>
        <Hero />
        <About />
        <ServiceDetails />
        <Gallery />
        <TributesList />
        <TributeForm
          onTributeSubmitted={() => {
            const w = window as unknown as Record<string, (() => void) | unknown>;
            if (typeof w.refreshTributes === "function") w.refreshTributes();
          }}
        />
        <Contribute />
      </main>
      <Footer />
      <FloatingTributeButton />
    </>
  );
}
