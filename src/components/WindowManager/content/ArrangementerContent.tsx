"use client";
import { useState, useEffect } from "react";
import { usePostItManager } from "../PostItManagerContext"; // juster sti etter din struktur
import type { CalendarEvent } from "@/lib/googleCalendar";

const colors = [
  "#61c5ff",
  "#fdbf78",
  "#ff9ecb",
  "#b7f5a8",
];

export default function ArrangementerContent() {
  const { openPostIt } = usePostItManager();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/calendar")
      .then((res) => res.json())
      .then((data) => {
        console.log("Kalenderdata:", data);
        setEvents(data);
      })
      .catch((err) => console.error("Kunne ikke hente kalender:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm">Laster arrangementer...</p>;


  return (
    <div className="flex flex-col gap-2">
      {events.map((event) => (
        <button
          key={event.id}
          onClick={() =>
            openPostIt({
              id: event.id,
              title: event.title,
              background: colors[Math.floor(Math.random() * colors.length)],
              content: (
                <>
                  <p className="font-semibold">
                    {event.date}{event.time ? ` kl. ${event.time}` : ""}
                  </p>
                  <p>{event.description}</p>
                </>
              ),
            })
          }
          className="flex items-center gap-3 rounded px-3 py-2 text-left hover:bg-black/5 border border-black/10"
        >
          <span className="text-xs font-bold">{event.date}</span>
          <span className="text-sm">{event.title}</span>
        </button>
      ))}
    </div>
  );
}