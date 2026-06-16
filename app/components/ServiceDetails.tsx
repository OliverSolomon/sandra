"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Navigation, Link2 } from "lucide-react";

const events = {
  church: {
    label: "Church Service",
    title: "Church Service",
    date: "Monday, 16th June 2026",
    times: [
      { label: "Arrival at Lee Funeral Home", time: "8:00 AM" },
      { label: "Departure from Lee Funeral Home", time: "9:00 AM" },
      { label: "Arrival at Nairobi Chapel", time: "9:30 AM" },
      { label: "Church Service begins", time: "10:00 AM" },
    ],
    venue: "Nairobi Chapel — Ngong Road",
    address: "Ngong Road, Nairobi",
    directions: "The cortège departs Lee Funeral Home, Argwings Kodhek Road, at 9:00 AM and arrives at Nairobi Chapel on Ngong Road for the 10:00 AM service.",
    note: "The service opens with prayer and song, followed by the eulogy, tributes from family, friends, colleagues and the church, and a vote of thanks before the cortège leaves for Lang’ata.",
    mapsQuery: "Nairobi Chapel Ngong Road, Nairobi",
  },
  cemetery: {
    label: "Burial Service",
    title: "Burial Service",
    date: "Monday, 16th June 2026",
    times: [
      { label: "Cortège departs the Chapel", time: "After service" },
      { label: "Burial Service", time: "Thereafter" },
      { label: "Catering & refreshments", time: "Following" },
    ],
    venue: "Lang’ata Cemetery",
    address: "Off Lang’ata Road, Nairobi City",
    directions: "Situated next to Otiende Estate, a short distance past Wilson Airport traffic lights coming from Nairobi CBD.",
    note: "Following the church service, the cortège leaves for Lang’ata Cemetery for the burial service. Catering and refreshments will be provided by the families thereafter.",
    mapsQuery: "Lang'ata Cemetery, Nairobi",
  },
} as const;

type EventKey = keyof typeof events;

const programme = [
  { time: "8:00 AM", item: "Arrival at Lee Funeral Home" },
  { time: "9:00 AM", item: "Departure from Lee Funeral Home" },
  { time: "9:30 AM", item: "Arrival at Nairobi Chapel — Ngong Road" },
  { time: "10:00 AM", item: "Church Service · Opening Prayer · Song" },
  { time: "", item: "Eulogy" },
  { time: "", item: "Tributes · Family · Friends · Church" },
  { time: "", item: "Song · Church Service · Vote of Thanks" },
  { time: "", item: "Cortège leaves for Lang’ata Cemetery" },
  { time: "", item: "Burial Service · Catering & Refreshments" },
];

export default function ServiceDetails() {
  const [activeTab, setActiveTab] = useState<EventKey>("church");
  const event = events[activeTab];
  const mapsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.mapsQuery)}`;

  const copyLink = () => {
    navigator.clipboard.writeText(mapsLink);
  };

  return (
    <section id="service" className="py-24 bg-[#f9edf1]">
      <div className="max-w-5xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[#b0567c] font-sans mb-3">Arrangements</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#3f1f2c]">Service Details</h2>
          <div className="w-10 h-px bg-[#dca7bf] mx-auto mt-4" />
          <p className="mt-4 text-[#9c6f82] font-sans text-sm">
            Celebrating the life of Sandra Cheptoo Mugun &nbsp;·&nbsp; 16th June 2026
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Programme column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-sm border border-[#f1dde6] shadow-sm p-6">
              <h3 className="font-serif text-[#3f1f2c] text-lg mb-5">Order of Service</h3>
              <ol className="space-y-3">
                {programme.map(({ time, item }, i) => (
                  <li key={i} className="flex gap-3 text-sm font-sans">
                    <span className="text-[#b98ba0] w-16 flex-shrink-0 text-right tabular-nums text-xs pt-0.5">{time}</span>
                    <span className="text-[#4a3640] leading-snug">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Location tabs column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-sm border border-[#f1dde6] shadow-sm overflow-hidden">

              {/* Tabs */}
              <div className="flex border-b border-[#f1dde6]">
                {(Object.keys(events) as EventKey[]).map((key) => (
                  <button key={key} onClick={() => setActiveTab(key)}
                    className={`flex-1 py-4 px-5 text-sm font-medium font-sans transition-colors focus:outline-none tracking-wide ${
                      activeTab === key
                        ? "bg-[#3f1f2c] text-white"
                        : "text-[#9c6f82] hover:bg-[#fbf2f6]"
                    }`}>
                    {events[key].label}
                  </button>
                ))}
              </div>

              <div className="p-7 space-y-6">
                <h3 className="text-xl font-serif text-[#3f1f2c]">{event.title}</h3>

                {/* Date & times */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-[#b98ba0] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#b98ba0] font-sans mb-0.5">Date</p>
                      <p className="text-[#3f1f2c] font-medium font-sans text-sm">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#b98ba0] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#b98ba0] font-sans mb-1">Times</p>
                      <div className="space-y-0.5">
                        {event.times.map(({ label, time }) => (
                          <p key={label} className="text-[#4a3640] font-sans text-sm">
                            <span className="text-[#b98ba0]">{label}:</span>{" "}
                            <span className="font-medium text-[#3f1f2c]">{time}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#b98ba0] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#b98ba0] font-sans mb-0.5">Venue</p>
                      <p className="font-medium text-[#3f1f2c] font-sans text-sm">{event.venue}</p>
                      <p className="text-[#9c6f82] font-sans text-sm">{event.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Navigation className="w-4 h-4 text-[#b98ba0] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#b98ba0] font-sans mb-0.5">Directions</p>
                      <p className="text-[#6b4b56] font-sans text-sm">{event.directions}</p>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div className="bg-[#fbf2f6] border border-[#f1dde6] rounded-sm p-4 text-sm text-[#5a3a45] font-sans leading-relaxed italic">
                  {event.note}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3f1f2c] text-white rounded-sm text-sm font-medium tracking-wide hover:bg-[#56293b] transition-colors">
                    <Navigation className="w-3.5 h-3.5" />
                    Get Directions
                  </a>
                  <button onClick={copyLink}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#dca7bf] text-[#6b3a4c] rounded-sm text-sm font-medium tracking-wide hover:bg-[#fbf2f6] transition-colors">
                    <Link2 className="w-3.5 h-3.5" />
                    Copy Location Link
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
