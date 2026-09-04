"use client";
import { useState } from "react";
import { usePostItManager } from "../../PostItManagerContext"; // juster sti etter din struktur
import { useCalendarEvents } from "@/components/CalendarEventsContext";
import type { CalendarEvent } from "@/lib/googleCalendar";

const colors = [
  "#90d6ff",
  "#fdbf78",
  "#fca3cd",
  "#b7f5a8",
  "#c496de",
  "#57ebbf",
];
export default function ArrangementerContent() {
  const { openPostIt, closePostIt, postIts } = usePostItManager();
  const events = useCalendarEvents();
  const [openedEvents, setOpenEvents] = useState<string[]>([]);

  function handleOpen(event: CalendarEvent) {
    const isOpened = openedEvents.includes(event.id);

    if (isOpened) {
      //fjern huk
      setOpenEvents((prev) => prev.filter((id) => id !== event.id));

      //lukk post it
      closePostIt(event.id);

      return;
    }

    //huk av på event
    setOpenEvents((prev) => [...prev, event.id]);

    // det som står på de åpnede postitsa
    openPostIt({
      id: event.id,
      title: event.title,
      background: colors[Math.floor(Math.random() * colors.length)],
      content: (
        <>
          <div className="flex flex-row items-center justify-start gap-3">
            <p className="text-3xl">{event.title}</p>
          </div>

          <p className="italic"> Dato: {event.date} </p>
          <p className="italic"> kl:&nbsp;&nbsp;{event.time} </p>
          {event.adress && (
            <p className="italic"> adresse:&nbsp;&nbsp;{event.adress} </p>
          )}
          <p className="mt-4 w-[215px]">{event.description}</p>
        </>
      ),
    });
  }

  return (
    <div className="max-h-120 overflow-y-auto flex flex-col gap-3 win-scrollbar-note">
      {/* <span className="text-2xl pb-2">
          <span className="underline">
            {"Arrangementer"[0]}
          </span>
        {"Arrangementer".slice(1)}
      </span> */}

      <span className="text-3xl ">Arrangementer:</span>

      {events.map((event) => {
        const opened = postIts.some((p) => p.id === event.id);

        return (
          <button
            key={event.id}
            onClick={() => handleOpen(event)}
            className="flex items-center gap-3 rounded px-2 py-2 text-left"
          >
            {/* sirkel */}
            <span
              className={`w-4 h-4 rounded-full border-2 border-black/40
                          flex items-center justify-center
                          ${opened ? "text-black" : ""}`}
            >
              <p className="-mt-3 ml-2 font-bold text-4xl text-[#6abc0d]">
                {opened && "✓"}
              </p>
            </span>

            {/* tekst */}
            <span className="text-base text-black hover:text-black/50">
              {event.date} - {event.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
