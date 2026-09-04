"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { CalendarEvent } from "@/lib/googleCalendar";

const CalendarContext = createContext<CalendarEvent[] | null>(null);

export function CalendarProvider({
  events,
  children,
}: {
  events: CalendarEvent[];
  children: ReactNode;
}) {
  return (
    <CalendarContext.Provider value={events}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarEvents() {
  const events = useContext(CalendarContext);

  if (!events) {
    throw new Error("useCalendarEvents må bli brukt innen en CalenderProvider");
  }

  return filterEvents(events);
}

// - filtrerer bort arrangementer som starter på "Eksamen"
// - viser kun en forekomst av gjentakende arrangementer basert på tittel
function filterEvents(events: CalendarEvent[]): CalendarEvent[] {
  const seenTitles = new Set<string>();
  const filtered: CalendarEvent[] = [];

  for (const event of events) {
    const title = event.title.trim();

    if (title.toLowerCase().startsWith("eksamen")) continue;

    const key = title.toLowerCase();
    if (seenTitles.has(key)) continue;
    seenTitles.add(key);

    filtered.push(event);
  }

  return filtered;
}
