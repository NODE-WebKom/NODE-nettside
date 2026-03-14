"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

function MenuIcons({
  icon,
  children,
  right,
  scale = "scale-[1.25]",
}: {
  icon: string;
  children: React.ReactNode;
  right?: React.ReactNode;
  scale?:string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={icon}
        alt=""
        width={32}
        height={32}
        unoptimized
        className={`image-pixelated ${scale} origin-center shrink-0`}
      />

      <span className="flex-1">{children}</span>

      {right}
    </div>
  );
}

export default function FooterNavbar() {
  const [open, setOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState< null | "studenter" | "komiteer">(null);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) 
        && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setOpen(false);
        setActiveSubmenu(null);
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
    <div className="fixed bottom-0 left-0 w-full bg-[#c0c0c0] border-t-2 border-white z-50">
      <div className="relative h-16 flex items-center px-1">
        {/* START BUTTON */}
        <button
          ref = {buttonRef}
          onClick={() => {
            setOpen(!open);
            setActiveSubmenu(null);
          }}
          className={`w-16 h-14 flex items-center justify-center bg-[#c0c0c0]
          border-t-[3px] border-l-[3px] border-b-[3px] border-r-[3px]
          ${open 
            ? `
              border-t-[#404040] border-l-[#404040]
              border-b-white border-r-white
              shadow-[inset_1px_1px_0_#808080]
            `
            : `
              border-t-white border-l-white
              border-b-[#404040] border-r-[#404040]
              shadow-[inset_-1px_-1px_0_#808080]
            `
          }`}
        >
          <Image
            src="/nevralenils.png"
            alt="NODE logo"
            width={50}
            height={50}
          />
        </button>

        {/* START MENU */}
        {open && (
          <div
            ref={menuRef}
            className="absolute bottom-16 left-1 flex bg-[#c0c0c0]
            border-t-[3px] border-l-[3px] border-b-[3px] border-r-[3px]
            border-t-white border-l-white
            border-b-[#404040] border-r-[#404040]
            shadow-[inset_-1px_-1px_0_#a0a0a0]"
          >
            {/* LEFT VERTICAL BAR */}
            <div className="bg-[#808080] w-12 flex relative">
              <span className="absolute left-1/2 bottom-16 transform -translate-x-1/2 rotate-[-90deg] whitespace-nowrap">
                <span className="text-[#c0c0c0] text-4xl font-bold">NODE</span>
                <span className="text-white text-3xl font-mono ml-1">UIB</span>
              </span>
            </div>

            {/* MAIN MENU */}
            <div className="relative flex flex-col text-black min-w-[220px] py-2">

              {/* FOR STUDENTER */}
              <button
                onClick={() =>
                  setActiveSubmenu(
                    activeSubmenu === "studenter" ? null : "studenter"
                  )
                }
                className= {`text-left px-4 py-2 w-full flex justify-between 
                ${activeSubmenu === "studenter" ? "bg-[#0000a8] text-white" : "hover:bg-[#0000a8] hover:text-white"}`}
              >
                <MenuIcons icon="/icons/student.png" right={<span>▶</span>}>
                  For studenter
                </MenuIcons>
              </button>

              <Link
                href="/arrangementer"
                className="px-4 py-2 hover:bg-[#0000a8] hover:text-white"
              >
                 <MenuIcons icon="/icons/postIt.png">
                  Arrangementer
                </MenuIcons>
              </Link>

              <Link
                href="/chatbot"
                className="px-4 py-2 hover:bg-[#0000a8] hover:text-white"
              >
                <MenuIcons icon="/icons/chatBubble.png">
                  ChatBot
                </MenuIcons>
              </Link>

              {/* KOMITEER */}
              <button
                onClick={() =>
                  setActiveSubmenu(
                    activeSubmenu === "komiteer" ? null : "komiteer"
                  )
                }
                className={`text-left px-4 py-2 w-full flex justify-between 
                ${activeSubmenu === "komiteer" ? "bg-[#0000a8] text-white" : "hover:bg-[#0000a8] hover:text-white"}`}
              >
                <MenuIcons icon="/icons/comitee.png" right={<span>▶</span>}>
                  Komiteer
                </MenuIcons>
              </button>

              <Link
                href="/"
                className="px-4 py-2 hover:bg-[#0000a8] hover:text-white"
              >
                <MenuIcons icon="/icons/t_shirt.png">
                  Merch
                </MenuIcons>
              </Link>

              <div className="pr-0.5 my-1">
                <div className="border-t border-[#808080]" />
                <div className="border-t border-white" />
              </div>

              <Link
                href="/om"
                className="px-4 py-2 hover:bg-[#0000a8] hover:text-white"
              >
                <MenuIcons icon="/icons/book.png">
                  Om Node
                </MenuIcons>              
              </Link>

              {/* FIXED POSITION SUBMENU */}
              {activeSubmenu && (
                <div
                  className="absolute -top-[3px] left-full bg-[#c0c0c0]
                  border-t-[3px] border-l-[3px] border-b-[3px] border-r-[3px]
                  border-t-white border-l-white
                  border-b-[#404040] border-r-[#404040]
                  shadow-[inset_-1px_-1px_0_#808080]
                  min-w-[220px] z-50"
                >
                  {activeSubmenu === "studenter" && (
                    <>
                      <Link
                        href="/"
                        className="block px-4 py-2 hover:bg-[#0000a8] hover:text-white"
                      >
                        <MenuIcons icon="/icons/paper.png">
                          Hva er AIKI?
                        </MenuIcons>
                      </Link>
                      
                      <Link
                        href="/"
                        className="block px-4 py-2 hover:bg-[#0000a8] hover:text-white"
                      >
                        <MenuIcons icon="/icons/calculator.png">
                          Fagressurser
                        </MenuIcons>
                      </Link>

                      <Link
                        href="/"
                        className="block px-4 py-2 hover:bg-[#0000a8] hover:text-white"
                      >
                        <MenuIcons icon="/icons/cap.png" scale = "scale-[1.30]">
                          Masterinfo
                        </MenuIcons>
                      </Link>

                      <Link
                        href="/"
                        className="block px-4 py-2 hover:bg-[#0000a8] hover:text-white"
                      >
                        <MenuIcons icon="/icons/earth.png" scale = "scale-[1.10]">
                          Utveksling
                        </MenuIcons>
                      </Link>
                    </>
                  )}

                  {activeSubmenu === "komiteer" && (
                    <>
                      <Link
                        href="/"
                        className="block px-4 py-2 hover:bg-[#0000a8] hover:text-white"
                      >
                        <MenuIcons icon="/icons/folder.png">
                          Bedriftskomiteen
                        </MenuIcons>
                      </Link>

                      <Link
                        href="/"
                        className="block px-4 py-2 hover:bg-[#0000a8] hover:text-white"
                      >
                        <MenuIcons icon="/icons/PC.png">
                          Prosjektgruppen
                        </MenuIcons>
                      </Link>

                      <Link
                        href="/"
                        className="block px-4 py-2 hover:bg-[#0000a8] hover:text-white"
                      >
                        <MenuIcons icon="/icons/paint.png">
                          Sosialkomiteen
                        </MenuIcons>
                      </Link>

                      <Link
                        href="/"
                        className="block px-4 py-2 hover:bg-[#0000a8] hover:text-white"
                      >
                        <MenuIcons icon="/icons/money.png">
                          Økonomikomiteen
                        </MenuIcons>
                      </Link>

                      <Link
                        href="/"
                        className="block px-4 py-2 hover:bg-[#0000a8] hover:text-white"
                      >
                        <MenuIcons icon="/icons/camera.png">
                          PR-gruppen
                        </MenuIcons>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
