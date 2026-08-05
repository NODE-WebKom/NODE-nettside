
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import WarningContent from "./warningContent"
import { useWindowManager } from "@/components/WindowManager/WindowManagerContext";


export default function wallpaperContent() {
  const { openWindow } = useWindowManager();

  return(
      <div className="bg-win-bg-gray w-full h-[400px] p-2
        border-2
        border-b-win-bg-dark-gray border-r-win-bg-dark-gray
        border-t-white border-l-white"
      >
        <button
                key={"warning"}
                onClick={() =>
                  openWindow({
                    id: "warning",
                    title: "Warning",
                    icon: "",
                    width: 320,
                    height: 130,
                    content: <WarningContent />,
                  })
                }
                className="flex items-center gap-3 rounded px-3 py-2 text-left hover:bg-black/5 border border-black/10"
              >
                <span className="text-sm">Delete everything</span>
        </button>

      </div>
    )
}
