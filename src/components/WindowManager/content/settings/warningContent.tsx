
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";


export default function wallpaperContent() {
  return(

      <div className="flex flex-row items-center justify-center 
                    text-black -mt-2">
        <Image
            src="/window-elements/warning.png"
            alt="warning"
            width={64}
            height={64} 
            className="-ml-4"
        />       
        <p> Deleting C:windows/system32 now</p>

      </div>
    )
}
