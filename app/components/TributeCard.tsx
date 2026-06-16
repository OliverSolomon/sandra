"use client";

import { useState } from "react";
import { User } from "lucide-react";

interface Props {
  name: string;
  date: string;
  message: string;
  photoUrl?: string;
  isAnonymous?: boolean;
}

const PREVIEW = 280;

export default function TributeCard({ name, date, message, isAnonymous }: Props) {
  const displayName = isAnonymous ? "A Friend" : name;
  const [expanded, setExpanded] = useState(false);
  const needs = message.length > PREVIEW;
  const preview = (() => {
    const t = message.substring(0, PREVIEW);
    const sp = Math.max(t.lastIndexOf(" "), t.lastIndexOf("\n"));
    return sp > PREVIEW * 0.7 ? message.substring(0, sp) : t;
  })();

  return (
    <article className="bg-white border border-[#f1dde6] rounded-sm p-6 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#f6e6ec] flex items-center justify-center">
          <User className="w-4 h-4 text-[#b98ba0]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <h3 className="font-medium text-[#3f1f2c] font-sans text-sm tracking-wide">{displayName}</h3>
            <time className="text-xs text-[#b98ba0] font-sans flex-shrink-0">{date}</time>
          </div>
          <div className="text-gray-700 font-sans leading-relaxed text-sm">
            <p className="whitespace-pre-line">{expanded || !needs ? message : preview}</p>
            {needs && (
              <button onClick={() => setExpanded(!expanded)}
                className="mt-2 text-[#9c6f82] hover:text-[#8c3f63] text-xs font-medium underline-offset-2 underline focus:outline-none transition-colors">
                {expanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
