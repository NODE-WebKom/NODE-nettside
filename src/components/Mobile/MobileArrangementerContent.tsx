"use client";
import { useState } from "react";
import { useCalendarEvents } from "@/components/CalendarEventsContext";
import type { CalendarEvent } from "@/lib/googleCalendar";

// samme fargepalett som post-it-lappene på pc bruker
const colors = [
  "#90d6ff",
  "#fdbf78",
  "#fca3cd",
  "#b7f5a8",
  "#c496de",
  "#57ebbf",
];

// Mobil-versjon av Arrangementer: i stedet for å åpne løse post-it-vinduer
// (som ligger og flyter bak selve app-visningen på mobil), deles skjermen i to
// faste deler - en øvre del med den skrollbare listen over alle events, og en
// nedre del som viser den valgte eventen som en liten kalender-lapp (eller er
// tom/gul når ingenting er valgt, uten at man må skrolle for å se den).
// Kun én event kan være åpen om gangen.
export default function MobileArrangementerContent() {
  const events = useCalendarEvents();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedEvent: CalendarEvent | undefined = events.find(
    (event) => event.id === selectedId,
  );

  function handleSelect(event: CalendarEvent) {
    setSelectedId((prev) => (prev === event.id ? null : event.id));
  }

  return (
    <div className="flex h-full flex-col gap-4">
      {/* øvre del: skrollbar liste over alle events */}
      <div className="flex flex-1 min-h-0 flex-col gap-1 overflow-y-auto win-scrollbar-note">
        <span className="text-3xl pb-2">Arrangementer:</span>

        {events.map((event) => {
          const isSelected = event.id === selectedId;

          return (
            <button
              key={event.id}
              onClick={() => handleSelect(event)}
              className="flex items-center gap-3 rounded px-2 py-2 text-left"
            >
              {/* sirkel */}
              <span
                className="w-4 h-4 rounded-full border-2 border-black/40
                            flex items-center justify-center"
              >
                <p className="-mt-3 ml-2 font-bold text-4xl text-[#6abc0d]">
                  {isSelected && "✓"}
                </p>
              </span>

              {/* tekst */}
              <span
                className={`text-base hover:text-black/50 ${
                  isSelected ? "text-black font-bold" : "text-black"
                }`}
              >
                {event.date} - {event.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* nedre del: fast plass, tom/gul når ingenting er valgt, viser den
          valgte eventen som en liten kalender-lapp når en er valgt */}
      <div className="flex flex-1 min-h-0 flex-col">
        {selectedEvent && (
          <div
            className="flex h-full flex-col gap-2 overflow-y-auto p-4 win-scrollbar-note
                        border-2 border-b-black/40 border-r-black/40
                        border-t-white/50 border-l-white/50"
            style={{
              background:
                colors[
                  events.findIndex((event) => event.id === selectedEvent.id) %
                    colors.length
                ],
            }}
          >
            <p className="text-2xl">{selectedEvent.title}</p>
            <p className="italic">Dato: {selectedEvent.date}</p>
            <p className="italic">kl: {selectedEvent.time}</p>
            {selectedEvent.adress && (
              <p className="italic">adresse: {selectedEvent.adress}</p>
            )}
            <p className="mt-2">{selectedEvent.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
