"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Navigation, Link2 } from "lucide-react";

const events = {
  funeral_home: {
    label: "Viewing of the Body",
    title: "Viewing of the Body",
    date: "Monday, 9th June 2026",
    times: [
      { label: "Arrival", time: "7:00 AM" },
      { label: "Prayers & viewing", time: "8:00 AM" },
      { label: "Departure for Lang’ata", time: "9:00 AM" },
    ],
    venue: "Montezuma Monalisa Funeral Home",
    address: "Raila Odinga Way (formerly Mbagathi Way), Nairobi",
    directions: "Situated opposite the Forces Memorial Hospital and right next to Umash Funeral Home.",
    note: "The cortège departs Montezuma Funeral Home at 9:00 AM for Lang’ata Cemetery, where the church service and burial will take place.",
    lat: -1.3119237,
    lng: 36.807305,
  },
  cemetery: {
    label: "Burial Service",
    title: "Burial Service",
    date: "Monday, 9th June 2026",
    times: [
      { label: "Arrival at Lang’ata", time: "9:45 AM" },
      { label: "Prayers", time: "10:00 AM" },
      { label: "Church Service", time: "11:00 AM" },
    ],
    venue: "Lang’ata Cemetery",
    address: "Off Lang’ata Road, Nairobi City",
    directions: "Situated next to Otiende Estate, a short distance past Wilson Airport traffic lights coming from Nairobi CBD.",
    note: "Upon arrival, the funeral service commences immediately, followed by tributes, the church service, interment, laying of wreaths, and final prayers. Lunch will be served thereafter.",
    lat: -1.33269,
    lng: 36.78097,
  },
} as const;

type EventKey = keyof typeof events;

const programme = [
  { time: "7:00 AM", item: "Arrival at Montezuma Funeral Home" },
  { time: "8:00 AM", item: "Prayers and viewing of the body" },
  { time: "9:00 AM", item: "Departure from Funeral Home" },
  { time: "9:45 AM", item: "Arrival at Lang’ata Cemetery" },
  { time: "10:00 AM", item: "Prayers" },
  { time: "11:00 AM", item: "Church Service" },
  { time: "Thereafter", item: "Tributes · Eulogy · Vote of Thanks" },
  { time: "", item: "Graveside · Wreaths · Final Prayers" },
  { time: "", item: "Lunch · Guests depart at pleasure" },
];

export default function ServiceDetails() {
  const [activeTab, setActiveTab] = useState<EventKey>("funeral_home");
  const event = events[activeTab];
  const mapsLink = `https://www.google.com/maps/dir/?api=1&destination=${event.lat},${event.lng}`;

  const copyLink = () => {
    navigator.clipboard.writeText(mapsLink);
  };

  return (
    <section id="service" className="py-24 bg-[#f9f7f4]">
      <div className="max-w-5xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-sans mb-3">Arrangements</p>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900">Service Details</h2>
          <div className="w-10 h-px bg-stone-300 mx-auto mt-4" />
          <p className="mt-4 text-stone-500 font-sans text-sm">
            Presiding Vicar: Rev. Luke Gachoka &nbsp;·&nbsp; MC: Peter Macharia Mang&rsquo;ang&rsquo;a
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Programme column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-sm border border-stone-100 shadow-sm p-6">
              <h3 className="font-serif text-gray-900 text-lg mb-5">Order of Service</h3>
              <ol className="space-y-3">
                {programme.map(({ time, item }, i) => (
                  <li key={i} className="flex gap-3 text-sm font-sans">
                    <span className="text-stone-400 w-16 flex-shrink-0 text-right tabular-nums text-xs pt-0.5">{time}</span>
                    <span className="text-gray-700 leading-snug">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Location tabs column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-sm border border-stone-100 shadow-sm overflow-hidden">

              {/* Tabs */}
              <div className="flex border-b border-stone-100">
                {(Object.keys(events) as EventKey[]).map((key) => (
                  <button key={key} onClick={() => setActiveTab(key)}
                    className={`flex-1 py-4 px-5 text-sm font-medium font-sans transition-colors focus:outline-none tracking-wide ${
                      activeTab === key
                        ? "bg-gray-900 text-white"
                        : "text-stone-500 hover:bg-stone-50"
                    }`}>
                    {events[key].label}
                  </button>
                ))}
              </div>

              <div className="p-7 space-y-6">
                <h3 className="text-xl font-serif text-gray-900">{event.title}</h3>

                {/* Date & times */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-stone-400 font-sans mb-0.5">Date</p>
                      <p className="text-gray-900 font-medium font-sans text-sm">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-stone-400 font-sans mb-1">Times</p>
                      <div className="space-y-0.5">
                        {event.times.map(({ label, time }) => (
                          <p key={label} className="text-gray-700 font-sans text-sm">
                            <span className="text-stone-400">{label}:</span>{" "}
                            <span className="font-medium text-gray-900">{time}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-stone-400 font-sans mb-0.5">Venue</p>
                      <p className="font-medium text-gray-900 font-sans text-sm">{event.venue}</p>
                      <p className="text-stone-500 font-sans text-sm">{event.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Navigation className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-stone-400 font-sans mb-0.5">Directions</p>
                      <p className="text-stone-600 font-sans text-sm">{event.directions}</p>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div className="bg-stone-50 border border-stone-100 rounded-sm p-4 text-sm text-gray-600 font-sans leading-relaxed italic">
                  {event.note}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-sm text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors">
                    <Navigation className="w-3.5 h-3.5" />
                    Get Directions
                  </a>
                  <button onClick={copyLink}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-stone-300 text-gray-700 rounded-sm text-sm font-medium tracking-wide hover:bg-stone-50 transition-colors">
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
