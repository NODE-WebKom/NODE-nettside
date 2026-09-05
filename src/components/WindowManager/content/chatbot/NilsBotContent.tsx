"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import Image from "next/image";

export type NilsStatus = "normal" | "thinking" | "writing";

const NilsStatusContext = createContext<{
    status: NilsStatus;
    setStatus: (status: NilsStatus) => void;
} | null>(null);

export function NilsStatusProvider({ children }: { children: ReactNode }) {
    const [status, setStatus] = useState<NilsStatus>("normal");
    return (
        <NilsStatusContext.Provider value={{ status, setStatus }}>
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

const NILS_IMAGES: Record<NilsStatus, string> = {
    normal: "/nils/Nils_normal.png",
    thinking: "/nils/Nils_thinking.png",
    writing: "/nils/Nils_idea.png",
};

export default function NilsBotContent() {
    const { status } = useNilsStatus();

    return (
    // blå boks
    <div className =" relative bg-item-yellow w-full h-[225px] 
      border-t-2 border-l-2 
      border-t-win-dark-shadow border-l-win-dark-shadow
      "
    >
        <div className="relative w-full h-full">

            <Image
            src={NILS_IMAGES[status]}
            alt="nils"
            fill
            unoptimized
            className="object-cover image-pixelated"
            /> 

        </div>


    </div>

    )
}
