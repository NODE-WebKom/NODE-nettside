"use client";
import { useState } from "react";
import Image from "next/image";
import { usePostItManager } from "../PostItManagerContext";

//for nå må vi oppdatere det her
const events = [
  { id: "hostfest", date: "18.08.", title: "Bursdag", description: "Jeg har bursdag wohoo", color: "#61c5ff" },
  { id: "tittel1", date: "24.10.", title: "Tittel", description: "Blah blah blah blah...", color: "#aef07b" },
]

export default function ArrangementerContent() {
  const { openPostIt }= usePostItManager();

  return (
    <div className="flex flex-col gap-2">
      {events.map((event) => (
        <button
          key={event.id}
          onClick={() =>
            openPostIt({
              id: event.id,
              title: event.title,
              background: event.color,
              content: (
                <>
                  <p className="font-semibold">{event.date}</p>
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