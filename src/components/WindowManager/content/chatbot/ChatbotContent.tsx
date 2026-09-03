"use client";
import Image from "next/image";
import { useIsMobile } from "@/lib/useIsMobile";

export default function ChatbotContent() {
    const isMobile = useIsMobile() === true;

    return (
    // blå boks
    <div className={`relative bg-white w-full p-[8px]
      border-2 
      border-t-win-dark-shadow border-l-win-dark-shadow 
      border-b-white border-r-white
      ${isMobile ? "h-auto flex flex-col gap-3" : "h-[350px] block"}`}
    >
        <p> Dette er bare en mal på hvordan dette skal se ut sånn ca </p>
        <div className={`bg-white w-full h-[70px] p-[8px]
        border-2 text-win-bg-gray
        border-t-win-dark-shadow border-l-win-dark-shadow 
        border-b-white border-r-white
        ${isMobile ? "" : "absolute top-90 -left-0 w-90"}`}
        >
            <p> type your message here ...</p>
        </div>

        <div className={`flex flex-col items-center justify-center bg-win-bg-gray w-20 h-[70px] p-[8px]
        border-2 
        border-t-white border-l-white
        border-b-win-dark-shadow border-r-win-dark-shadow
        ${isMobile ? "self-end" : "absolute top-90 left-93"}`}
        >
            <Image
                src="/window-elements/paperplane.png"
                alt="paperplane"
                width={40}
                height={40}
                unoptimized
                className="flex image-pixelated scale-[1.25] shrink-0 -mb-1"
            /> 
            <p>send</p>
        </div>
    
    </div>
    
    )
}
