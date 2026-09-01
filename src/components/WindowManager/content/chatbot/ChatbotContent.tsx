"use client";
import { useState } from "react";
import Image from "next/image";

export default function ChatbotContent() {
    return (
    // blå boks
    <div className =" relative bg-white w-full h-[350px] p-[8px]
      border-2 
      border-t-win-dark-shadow border-l-win-dark-shadow 
      border-b-white border-r-white"
    >
        <p> Dette er bare en mal på hvordan dette skal se ut sånn ca </p>
        <div className =" absolute top-90 -left-0 bg-white w-90 h-[70px] p-[8px]
        border-2 text-win-bg-gray
        border-t-win-dark-shadow border-l-win-dark-shadow 
        border-b-white border-r-white"
        >
            <p> type your message here ...</p>
        </div>

        <div className =" absolute flex flex-col items-center justify-center bg-win-bg-gray top-90 left-93 bg-white w-20 h-[70px] p-[8px]
        border-2 
        border-t-white border-l-white
        border-b-win-dark-shadow border-r-win-dark-shadow"
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