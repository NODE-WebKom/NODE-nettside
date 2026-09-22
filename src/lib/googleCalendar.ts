import "server-only";

export interface CalendarEvent {
  id: string;
  date: string;
  time?: string;
  title: string;
  adress: string;
  description: string;
}

// NB: må alltid formateres med denne tidssonen eksplisitt. Uten den bruker
// toLocaleTimeString/getDate/getMonth serverens LOKALE tidssone - det er fint
// når man kjører lokalt i Norge, men på Vercel kjører serveren i UTC, så da
// blir klokkeslettet (og av og til datoen, for hendelser rett etter midnatt)
// feil - alt blir dyttet 1-2 timer bak (avhengig av sommer-/vintertid).
const TIME_ZONE = "Europe/Oslo";

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY!;
  const now = new Date().toISOString();

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    calendarId,
  )}/events?key=${apiKey}&timeMin=${now}&singleEvents=true&orderBy=startTime`;
  const res = await fetch(url, { next: { revalidate: 60 } }); // cacher i 1 min

  if (!res.ok) {
    console.error("Feil ved henting av kalender data", await res.text());
    return [];
  }

  const data = await res.json();

  return data.items.map((event: any) => {
    const isAllDay = !!event.start.date;
    const start = new Date(event.start.dateTime ?? event.start.date);

    const { day, month } = getOsloDateParts(start);

    return {
      id: event.id,
      title: event.summary ?? "",
      description: event.description ?? "",
      date: `${day}.${month}.`,
      adress: event.location ?? "",
      time: isAllDay
        ? undefined
        : start.toLocaleTimeString("no-NO", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: TIME_ZONE,
          }),
    };
  });
}

// henter dag/måned i Europe/Oslo-tid, uavhengig av hvilken tidssone
// serveren som kjører koden faktisk står i
function getOsloDateParts(date: Date): { day: string; month: string } {
  const parts = new Intl.DateTimeFormat("no-NO", {
    timeZone: TIME_ZONE,
    day: "2-digit",
    month: "2-digit",
  }).formatToParts(date);

  const day = parts.find((p) => p.type === "day")?.value ?? "";
  const month = parts.find((p) => p.type === "month")?.value ?? "";

  return { day, month };
}
