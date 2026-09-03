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

  return events;
}
