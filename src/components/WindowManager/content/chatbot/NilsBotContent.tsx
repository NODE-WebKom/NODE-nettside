"use client";
import { useState } from "react";
import Image from "next/image";

export default function ChatbotContent() {
    return (
    // blå boks
    <div className =" relative bg-item-yellow w-full h-[225px] 
      border-t-2 border-l-2 
      border-t-win-dark-shadow border-l-win-dark-shadow
      "
    >
        <div className="relative w-full h-full">
        
            <Image
            src="/nils/nils_normal.png"
            alt="nils"
            fill
            unoptimized
            className="object-cover image-pixelated"
            /> 
        
        </div>
        
    
    </div>
    
    )
}