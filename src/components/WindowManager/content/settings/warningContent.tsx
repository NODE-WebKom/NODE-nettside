
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";


export default function wallpaperContent() {
  return(

      <div className="flex flex-row items-center justify-center 
                    text-black mt-1 gap-2">
        <Image
            src="/window-elements/warning.png"
            alt="warning"
            width={32}
            height={32} 
            className="-ml-2"
        />       
        <p> Deleting C:windows/system32 now</p>

      </div>
    )
}
