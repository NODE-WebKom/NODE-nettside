"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FooterNavbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#c0c0c0] border-t-2 border-gray-700 z-50">
      <div className="relative h-16 flex items-center px-1">

        
        {/* START BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="w-16 h-14 
          flex items-center justify-center 
          bg-[#c0c0c0] 
          border-t-[3px] border-l-[3px] border-b-[3px] border-r-[3px]
          border-t-white border-l-white border-b-gray-700 border-r-gray-700 
          shadow-inner
          active:border-t-gray-700 active:border-l-gray-700 
          active:border-b-white active:border-r-white">

          <Image
            src = "/nevralenils.png"
            alt = "NODE logo"
            width = {50}
            height = {50} 
          />
        </button>

        {/* START MENU */}
        {open && (
          <div
            ref={menuRef}
            className="absolute bottom-16 left-1 flex bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-700 border-r-gray-700 shadow-xl"
          >
            {/* LEFT VERTICAL BLUE BAR */}
            <div className="bg-[#808080] w-12 flex relative"> {/*lag en fil som inneholder fargene så alle bruker samme farge*/}
            <span className="absolute left-1/2 bottom-16 transform -translate-x-1/2 rotate-[-90deg] whitespace-nowrap">
              <span className="text-[#c0c0c0] text-4xl font-bold">
                NODE
              </span>

              <span className="text-white text-3xl font-mono ml-1">
                UIB
              </span>
            </span>

            </div>

            {/* MENU ITEMS */}
            <div className="flex flex-col text-black min-w-[220px] py-2">

              <Link
                href="/"
                className="px-4 py-2 hover:bg-blue-600 hover:text-white"
              >
                For studenter
              </Link>
              
              <Link
                href="/arrangementer"
                className="px-4 py-2 hover:bg-blue-600 hover:text-white"
              >
                Arrangementer
              </Link>

              <Link
                href="/chatbot"
                className="px-4 py-2 hover:bg-blue-600 hover:text-white"
              >
                ChatBot
              </Link>

              <Link
                href="/"
                className="px-4 py-2 hover:bg-blue-600 hover:text-white"
              >
                Komiteer
              </Link>

              <Link
                href="/"
                className="px-4 py-2 hover:bg-blue-600 hover:text-white"
              >
                Merch
              </Link>
              
              <div className="border-t border-gray-600 my-1" />
              <Link
                href="/om"
                className="px-4 py-2 hover:bg-blue-600 hover:text-white"
              >
                Om NODE
              </Link>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}