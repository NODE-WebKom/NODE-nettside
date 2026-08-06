export interface CalendarEvent {
    id: string;
    date: string;
    time?: string;
    title: string;
    description: string;
}

export async function getCalendarEvents() : Promise<CalendarEvent[]> {
    const calendarId = process.env.GOOGLE_CALENDAR_ID!;
    const apiKey = process.env.GOOGLE_CALENDAR_API_KEY!;
    const now = new Date().toISOString();

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
                calendarId)}/events?key=${apiKey}&timeMin=${now}&singleEvents=true&orderBy=startTime`;
    const res = await fetch(url, { next: {revalidate:3600 } }); //cacher i 1 time

    if (!res.ok) {
        console.error("Feil ved henting av kalender data", await res.text());
        return [];
    }

    const data = await res.json();

    return data.items.slice(0, 5).map((event: any) => { //max 5 events om gangen
        const isAllDay = !!event.start.date;
        const start = new Date(event.start.dateTime ?? event.start.date);

        const day = start.getDate().toString().padStart(2, "0");
        const month = (start.getMonth() + 1).toString().padStart(2, "0");

        return {
            id: event.id,
            title: event.summary ?? "",
            description: event.description ?? "",
            date: `${day}.${month}.`,
        };
    });
}