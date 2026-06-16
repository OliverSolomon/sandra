"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { getUrl, isVideo, type GalleryImage } from "@/lib/photos";

interface Props {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;
const ANIM_MS = 320;
const SWIPE_DIST = 0.16; // fraction of width to trigger nav
const SWIPE_VEL = 0.45; // px/ms to trigger nav by flick
const DISMISS_DIST = 0.16; // fraction of height
const DISMISS_VEL = 0.55;

type Pt = { x: number; y: number };

/**
 * Premium full-screen media viewer.
 * Touch: follow-finger swipe to browse, swipe down to dismiss, pinch / double-tap
 * to zoom, drag to pan when zoomed. Desktop: arrows, wheel-pinch zoom, drag, buttons.
 */
export default function Lightbox({ images, index, onClose, onIndexChange }: Props) {
  const n = images.length;
  const open = index !== null;

  const [vp, setVp] = useState({ w: 0, h: 0 });
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [chrome, setChrome] = useState(true); // show controls

  // gesture refs (avoid stale closures inside pointer handlers)
  const ptrs = useRef<Map<number, Pt>>(new Map());
  const mode = useRef<"idle" | "swipe" | "pan" | "pinch">("idle");
  const axis = useRef<null | "x" | "y">(null);
  const start = useRef<Pt & { t: number }>({ x: 0, y: 0, t: 0 });
  const last = useRef<Pt & { t: number }>({ x: 0, y: 0, t: 0 });
  const vel = useRef<Pt>({ x: 0, y: 0 });
  const pinch = useRef({ dist: 0, scale: 1, mid: { x: 0, y: 0 }, tx: 0, ty: 0 });
  const panStart = useRef({ tx: 0, ty: 0 });
  const display = useRef({ w: 0, h: 0 });
  const lastTap = useRef({ t: 0, x: 0, y: 0 });
  const pendingNav = useRef<null | "next" | "prev">(null);
  const scaleRef = useRef(1);
  scaleRef.current = scale;

  const cur = open ? images[index!] : null;
  const curVideo = cur ? isVideo(cur) : false;

  // viewport + reduced-motion
  useEffect(() => {
    const measure = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    measure();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMq = () => setReduced(mq.matches);
    window.addEventListener("resize", measure);
    mq.addEventListener?.("change", onMq);
    return () => {
      window.removeEventListener("resize", measure);
      mq.removeEventListener?.("change", onMq);
    };
  }, []);

  const resetView = useCallback(() => {
    setScale(1); setTx(0); setTy(0); setDragX(0); setDragY(0);
    mode.current = "idle"; axis.current = null;
  }, []);

  // reset transform whenever the image changes or viewer opens
  useEffect(() => { resetView(); }, [index, resetView]);

  // lock body scroll while open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const clampPan = useCallback((nx: number, ny: number, s: number) => {
    const dw = display.current.w || vp.w;
    const dh = display.current.h || vp.h;
    const maxX = Math.max(0, (dw * s - vp.w) / 2);
    const maxY = Math.max(0, (dh * s - vp.h) / 2);
    return { x: Math.max(-maxX, Math.min(maxX, nx)), y: Math.max(-maxY, Math.min(maxY, ny)) };
  }, [vp]);

  // ---- navigation ----
  const commitNav = useCallback((dir: "next" | "prev") => {
    if (n < 2) { setAnimating(false); setDragX(0); return; }
    const ni = dir === "next" ? (index! + 1) % n : (index! - 1 + n) % n;
    setAnimating(false);
    setDragX(0);
    onIndexChange(ni);
  }, [index, n, onIndexChange]);

  const go = useCallback((dir: "next" | "prev") => {
    if (n < 2 || pendingNav.current) return;
    if (reduced) { commitNav(dir); return; } // no transition → commit now
    pendingNav.current = dir;
    setAnimating(true);
    setDragX(dir === "next" ? -vp.w : vp.w);
  }, [n, vp.w, reduced, commitNav]);

  const snapBack = useCallback(() => {
    setAnimating(true);
    setDragX(0); setDragY(0);
    window.setTimeout(() => setAnimating(false), reduced ? 0 : ANIM_MS);
  }, [reduced]);

  const onTrackTransitionEnd = useCallback(() => {
    if (pendingNav.current) {
      const d = pendingNav.current; pendingNav.current = null;
      commitNav(d);
    }
  }, [commitNav]);

  const close = useCallback(() => {
    setDismissing(true);
    window.setTimeout(onClose, reduced ? 0 : 240);
  }, [onClose, reduced]);

  // ---- zoom helpers ----
  const zoomTo = useCallback((target: number, cx: number, cy: number, animate = true) => {
    const s = scaleRef.current;
    const ns = Math.max(1, Math.min(MAX_SCALE, target));
    const ox = cx - vp.w / 2;
    const oy = cy - vp.h / 2;
    let nx = ns === 1 ? 0 : ox - (ox - tx) * (ns / s);
    let ny = ns === 1 ? 0 : oy - (oy - ty) * (ns / s);
    const c = clampPan(nx, ny, ns);
    nx = c.x; ny = c.y;
    if (animate) { setAnimating(true); window.setTimeout(() => setAnimating(false), reduced ? 0 : 200); }
    setScale(ns); setTx(nx); setTy(ny);
  }, [tx, ty, vp, clampPan, reduced]);

  const stepZoom = useCallback((factor: number) => {
    zoomTo(scaleRef.current * factor, vp.w / 2, vp.h / 2, true);
  }, [zoomTo, vp]);

  // ---- keyboard ----
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go("next");
      else if (e.key === "ArrowLeft") go("prev");
      else if (e.key === "+" || e.key === "=") stepZoom(1.5);
      else if (e.key === "-" || e.key === "_") stepZoom(1 / 1.5);
      else if (e.key === "0") resetView();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, go, stepZoom, resetView]);

  // ---- pointer gestures ----
  const onPointerDown = (e: React.PointerEvent) => {
    if (dismissing) return;
    const t = e.target as HTMLElement;
    // let native video controls work untouched
    if (curVideo && t.tagName === "VIDEO") return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const now = performance.now();

    if (ptrs.current.size === 2 && !curVideo) {
      const [a, b] = [...ptrs.current.values()];
      pinch.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y),
        scale: scaleRef.current,
        mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
        tx, ty,
      };
      mode.current = "pinch";
      axis.current = null;
    } else if (ptrs.current.size === 1) {
      start.current = { x: e.clientX, y: e.clientY, t: now };
      last.current = { x: e.clientX, y: e.clientY, t: now };
      vel.current = { x: 0, y: 0 };
      panStart.current = { tx, ty };
      mode.current = scaleRef.current > 1 ? "pan" : "idle";
      axis.current = null;
      setAnimating(false);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!ptrs.current.has(e.pointerId)) return;
    ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const now = performance.now();

    if (mode.current === "pinch" && ptrs.current.size >= 2) {
      const [a, b] = [...ptrs.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const ns = Math.max(1, Math.min(MAX_SCALE, (dist / pinch.current.dist) * pinch.current.scale));
      const m = pinch.current.mid;
      const ox = m.x - vp.w / 2;
      const oy = m.y - vp.h / 2;
      const nx = ox - (ox - pinch.current.tx) * (ns / pinch.current.scale);
      const ny = oy - (oy - pinch.current.ty) * (ns / pinch.current.scale);
      const c = clampPan(nx, ny, ns);
      setScale(ns); setTx(c.x); setTy(c.y);
      return;
    }

    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    // instantaneous velocity (EMA for smoothness)
    const dt = Math.max(1, now - last.current.t);
    vel.current = {
      x: 0.7 * vel.current.x + 0.3 * ((e.clientX - last.current.x) / dt),
      y: 0.7 * vel.current.y + 0.3 * ((e.clientY - last.current.y) / dt),
    };
    last.current = { x: e.clientX, y: e.clientY, t: now };

    if (mode.current === "pan" || scaleRef.current > 1) {
      const c = clampPan(panStart.current.tx + dx, panStart.current.ty + dy, scaleRef.current);
      mode.current = "pan";
      setTx(c.x); setTy(c.y);
      return;
    }

    // scale == 1 → decide swipe axis
    if (!axis.current) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        axis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        mode.current = "swipe";
        if (chrome) setChrome(false);
      } else return;
    }
    if (axis.current === "x") {
      setDragX(dx);
    } else {
      // only downward drag dismisses; clamp upward with resistance
      setDragY(dy > 0 ? dy : dy * 0.3);
    }
  };

  const endGesture = (e: React.PointerEvent) => {
    if (!ptrs.current.has(e.pointerId)) return;
    ptrs.current.delete(e.pointerId);

    if (mode.current === "pinch") {
      if (ptrs.current.size < 2) {
        if (scaleRef.current <= 1.02) { resetView(); setAnimating(true); window.setTimeout(() => setAnimating(false), 200); }
        // if one finger remains, continue as pan from current position
        if (ptrs.current.size === 1) {
          const [p] = [...ptrs.current.values()];
          start.current = { x: p.x, y: p.y, t: performance.now() };
          last.current = { ...start.current };
          panStart.current = { tx, ty };
          mode.current = "pan";
        } else {
          mode.current = "idle";
        }
      }
      return;
    }

    if (ptrs.current.size > 0) return; // wait for all fingers up

    const now = performance.now();
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    const dtTotal = now - start.current.t;
    const isTap = Math.abs(dx) < 6 && Math.abs(dy) < 6 && dtTotal < 250;

    if (isTap) {
      // double-tap to zoom
      const since = now - lastTap.current.t;
      const near = Math.hypot(e.clientX - lastTap.current.x, e.clientY - lastTap.current.y) < 40;
      if (since < 300 && near && !curVideo) {
        zoomTo(scaleRef.current > 1 ? 1 : DOUBLE_TAP_SCALE, e.clientX, e.clientY, true);
        lastTap.current = { t: 0, x: 0, y: 0 };
      } else {
        lastTap.current = { t: now, x: e.clientX, y: e.clientY };
        setChrome((c) => !c); // single tap toggles chrome
      }
      mode.current = "idle"; axis.current = null;
      return;
    }

    if (scaleRef.current > 1) { mode.current = "idle"; return; }

    if (axis.current === "x") {
      const passDist = Math.abs(dragX) > vp.w * SWIPE_DIST;
      const flick = Math.abs(vel.current.x) > SWIPE_VEL;
      if ((dragX < 0 && (passDist || (flick && vel.current.x < 0)))) go("next");
      else if (dragX > 0 && (passDist || (flick && vel.current.x > 0))) go("prev");
      else snapBack();
    } else if (axis.current === "y") {
      const passDist = dragY > vp.h * DISMISS_DIST;
      const flick = vel.current.y > DISMISS_VEL;
      if (passDist || flick) close();
      else snapBack();
    }
    mode.current = "idle"; axis.current = null;
  };

  const onWheel = (e: React.WheelEvent) => {
    if (curVideo) return;
    if (e.ctrlKey) {
      // trackpad pinch
      e.preventDefault();
      zoomTo(scaleRef.current * (1 - e.deltaY * 0.01), e.clientX, e.clientY, false);
    }
  };

  if (!open || !cur) return null;

  // slides: prev / current / next (wrap)
  const prevI = (index! - 1 + n) % n;
  const nextI = (index! + 1) % n;
  const slides =
    n < 2
      ? [{ key: "c", img: cur, role: "c" as const }]
      : [
          { key: "p", img: images[prevI], role: "p" as const },
          { key: "c", img: cur, role: "c" as const },
          { key: "n", img: images[nextI], role: "n" as const },
        ];

  const base = n < 2 ? 0 : -vp.w;
  const trackX = base + dragX;
  const dismissProgress = Math.min(1, Math.abs(dragY) / (vp.h * 0.5));
  const backdropAlpha = dismissing ? 0 : 1 - dismissProgress * 0.85;
  const ease = "cubic-bezier(0.23,1,0.32,1)";

  return (
    <div
      className="fixed inset-0 z-[60] touch-none select-none overflow-hidden"
      role="dialog"
      aria-modal="true"
      style={{
        background: `rgba(8,4,7,${backdropAlpha})`,
        transition: dismissing ? `background ${reduced ? 0 : 240}ms ease` : undefined,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endGesture}
      onPointerCancel={endGesture}
      onWheel={onWheel}
    >
      {/* sliding track */}
      <div
        className="flex h-full w-full"
        onTransitionEnd={onTrackTransitionEnd}
        style={{
          transform: `translate3d(${trackX}px, ${dragY}px, 0)`,
          transition:
            animating && !reduced
              ? `transform ${ANIM_MS}ms ${ease}`
              : dismissing
                ? `transform ${reduced ? 0 : 240}ms ${ease}, opacity ${reduced ? 0 : 240}ms ease`
                : "none",
          opacity: dismissing ? 0 : 1,
        }}
      >
        {slides.map(({ key, img, role }) => {
          const isCenter = role === "c";
          const zoomed = isCenter && scale > 1;
          return (
            <div
              key={key}
              className="relative flex h-full shrink-0 items-center justify-center"
              style={{ width: vp.w || "100vw" }}
            >
              {isVideo(img) ? (
                <video
                  src={getUrl(img)}
                  controls
                  autoPlay={isCenter}
                  playsInline
                  className="max-h-[88vh] max-w-[94vw] rounded-sm bg-black"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getUrl(img)}
                  alt={img.alt}
                  draggable={false}
                  onLoad={(e) => {
                    if (!isCenter) return;
                    const el = e.currentTarget;
                    const r = Math.min(vp.w / el.naturalWidth, vp.h / el.naturalHeight);
                    display.current = { w: el.naturalWidth * r, h: el.naturalHeight * r };
                  }}
                  className="max-h-[92vh] max-w-[96vw] object-contain"
                  style={
                    isCenter
                      ? {
                          transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`,
                          transition: animating && !reduced ? `transform 200ms ${ease}` : "none",
                          cursor: zoomed ? "grab" : "zoom-in",
                          willChange: "transform",
                        }
                      : undefined
                  }
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ---- chrome (controls) ---- */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: chrome && !dismissing ? 1 : 0, transition: "opacity 220ms ease" }}
      >
        {/* top gradient + counter + close */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/55 to-transparent px-4 py-4 sm:px-6">
          <span className="pointer-events-auto rounded-full bg-white/10 px-3 py-1 font-sans text-xs tracking-wide text-white/85 backdrop-blur-sm">
            {index! + 1} <span className="text-white/45">/ {n}</span>
          </span>
          <button
            onClick={close}
            aria-label="Close"
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/90 backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* prev / next (desktop & coarse pointers both fine) */}
        {n > 1 && (
          <>
            <button
              onClick={() => go("prev")}
              aria-label="Previous"
              className="pointer-events-auto absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/90 backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95 sm:flex"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => go("next")}
              aria-label="Next"
              className="pointer-events-auto absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/90 backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95 sm:flex"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* bottom: caption + zoom controls */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-black/55 to-transparent px-4 pb-5 pt-10 sm:px-6">
          {cur.alt && (
            <p className="max-w-[92%] text-center font-sans text-[12px] leading-snug tracking-wide text-white/85">
              {cur.alt}
            </p>
          )}
          {!curVideo && (
            <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-white/10 p-1 backdrop-blur-sm">
              <button onClick={() => stepZoom(1 / 1.5)} aria-label="Zoom out" disabled={scale <= 1}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-all hover:bg-white/15 active:scale-95 disabled:opacity-35">
                <ZoomOut className="h-4 w-4" />
              </button>
              <button onClick={resetView} aria-label="Reset zoom"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-all hover:bg-white/15 active:scale-95">
                <Maximize2 className="h-4 w-4" />
              </button>
              <button onClick={() => stepZoom(1.5)} aria-label="Zoom in" disabled={scale >= MAX_SCALE}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-all hover:bg-white/15 active:scale-95 disabled:opacity-35">
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
