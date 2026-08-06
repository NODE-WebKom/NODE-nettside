
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import WarningContent from "./warningContent"
import { useWindowManager } from "@/components/WindowManager/WindowManagerContext";
import { usePostItManager } from "@/components/WindowManager/PostItManagerContext";


export default function wallpaperContent() {
  const { openWindow, closeWindow, closeAllWindows } = useWindowManager();
  const { closeAllPostIts } = usePostItManager();

  return(
    <>
      <div 
        className="relative bg-win-bg-gray px-4 py-1 text-sm rounded-t-sm
                  w-[80px]
                  border-t-2 border-l-2 border-r-2 
                  border-t-white border-l-white border-r-win-dark-shadow
                  border-b-0 -mb-[2px]" 
      >
              General
      </div>

      <div className="flex flex-row items-start
        bg-win-bg-gray w-full h-[465px] p-2 border-2
        border-b-win-bg-dark-gray border-r-win-bg-dark-gray
        border-t-white border-l-white"
      >
        <Image
          src="/window-elements/placeholder.png"
          alt="warning"
          width={200}
          height={200} 
          className="mt-10 ml-2"
        /> 

        <span className="whitespace-pre">
         {`         
          System:
                Microsoft Windows 95
                4.00.950

          Registered to:
                Nils
                24261-420-9471421-067

          Computer:
                Intel Pentium Processor 100 MHz
                4.0MB RAM`}
        </span>
      </div>

      <div className="flex felx-row justify-end gap-2 mt-2">

        <button
          key={"warning"}
          onClick={() => {
            closeAllWindows();
            closeAllPostIts();

            openWindow({
              id: "warning",
              title: "Warning",
              icon: "",
              width: 320,
              height: 130,
              x: window.innerWidth / 2 - 160,
              y: window.innerHeight / 2 - 100,
              content: <WarningContent />,
            });
          }}
          className="flex justify-center items-center
                    bg-win-bg-gray w-[120px] h-[30px]
                    border-2
                    border-t-white border-l-white
                    border-b-win-dark-shadow border-r-win-dark-shadow
                    
                    hover:border-b-white hover:border-r-white 
                    hover:border-t-win-dark-shadow hover:border-l-win-dark-shadow"
        >
          <span className="text-sm">Delete everything</span>
        </button>

        <button
          key={"Cancel"}
          onClick={() => closeWindow("general")}
          className="flex justify-center items-center
                    bg-win-bg-gray w-[120px] h-[30px]
                    border-2
                    border-t-white border-l-white
                    border-b-win-dark-shadow border-r-win-dark-shadow
                    
                    hover:border-b-white hover:border-r-white
                    hover:border-t-win-dark-shadow hover:border-l-win-dark-shadow"
        >
          <span className="text-sm">Cancel</span>
        </button>

      </div>

      


    </>
    )
}
