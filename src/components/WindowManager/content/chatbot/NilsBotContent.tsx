"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import Image from "next/image";

export type NilsStatus = "normal" | "thinking" | "writing";
export type BotId = "nils" | "nilsPetter";

// legg til flere boter her ved behov - husk å legge bildene i public/bot/<mappe>
export const BOTS: Record<BotId, { name: string; images: Record<NilsStatus, string> }> = {
    nils: {
        name: "Nevrale Nils",
        images: {
            normal: "/bot/nils/Nils_normal.png",
            thinking: "/bot/nils/Nils_thinking.png",
            writing: "/bot/nils/Nils_idea.png",
        },
    },
    nilsPetter: {
        name: "Nils Petter",
        images: {
            normal: "/bot/nilsPetter/nilsP_normal.png",
            thinking: "/bot/nilsPetter/nilsP_thinking.png",
            writing: "/bot/nilsPetter/nilsP_idea.png",
        },
    },
};

const NilsStatusContext = createContext<{
    status: NilsStatus;
    setStatus: (status: NilsStatus) => void;
    botId: BotId;
    setBotId: (botId: BotId) => void;
} | null>(null);

export function NilsStatusProvider({ children }: { children: ReactNode }) {
    const [status, setStatus] = useState<NilsStatus>("normal");
    const [botId, setBotId] = useState<BotId>("nils");
    return (
        <NilsStatusContext.Provider value={{ status, setStatus, botId, setBotId }}>
            {children}
        </NilsStatusContext.Provider>
    );
}

export function useNilsStatus() {
    const context = useContext(NilsStatusContext);
    if (!context) {
        throw new Error("useNilsStatus må brukes innen en NilsStatusProvider");
    }
    return context;
}

export default function NilsBotContent() {
    const { status, botId } = useNilsStatus();
    const bot = BOTS[botId];

    return (
    // blå boks
    <div className =" relative bg-item-yellow w-full h-[225px]
      border-t-2 border-l-2
      border-t-win-dark-shadow border-l-win-dark-shadow
      "
    >
        <div className="relative w-full h-full">

            <Image
            src={bot.images[status]}
            alt={bot.name}
            fill
            unoptimized
            className="object-cover image-pixelated"
            />

        </div>


    </div>

    )
}
