"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { useWindowManager } from "@/components/WindowManager/WindowManagerContext";
import { usePostItManager } from "./WindowManager/PostItManagerContext";

import ArrangementerContent from "@/components/WindowManager/content/ArrangementerContent";
import MerchContent from "@/components/WindowManager/content/MerchContent";
import OmNodeContent from "@/components/WindowManager/content/OmNodeContent";
import AikiContent from "@/components/WindowManager/content/for_studenter/AikiContent";
import FagressurserContent from "@/components/WindowManager/content/for_studenter/FagressurserContent";
import MasterinfoContent from "@/components/WindowManager/content/for_studenter/MasterinfoContent";
import UtvekslingContent from "@/components/WindowManager/content/for_studenter/UtvekslingContent";
import BedkomContent from "@/components/WindowManager/content/komiteer/BedkomContent";
import ProkomContent from "@/components/WindowManager/content/komiteer/ProkomContent";
import SoskomContent from "@/components/WindowManager/content/komiteer/SoskomContent";
import OkokomContent from "@/components/WindowManager/content/komiteer/OkokomContent";
import PRContent from "@/components/WindowManager/content/komiteer/PRContent";

function MenuIcons({
  icon,
  hoverIcon,
  active = false,
  children,
  right,
  scale = "scale-[1.25]",
}: {
  icon: string;
  hoverIcon?:string;
  active?: boolean;
  children: React.ReactNode;
  right?: React.ReactNode;
  scale?: string;
}) {
  return (
    <div className="flex items-center gap-3">

      {hoverIcon ? (
        <div className={`image-pixelated ${scale} origin-center shrink-0 relative w-8 h-8`}>
          <Image
            src={icon}
            alt=""
            width={32}
            height={32}
            unoptimized
            className={`absolute inset-0 
              ${ active ? "opacity-0" : "group-hover:opacity-0" }`}
          />

          <Image
            src={hoverIcon}
            alt=""
            width={32}
            height={32}
            unoptimized
            className={`absolute inset-0
              ${ active ? "opacity-100" : "opacity-0 group-hover:opacity-100" }`}
          />
        </div>

      ):(
        <Image
          src={icon}
          alt=""
          width={32}
          height={32}
          unoptimized
          className={`image-pixelated ${scale} origin-center shrink-0`}
        /> 
        )}
      
      <span className="flex-1">{children}</span>
      {right}
    </div>
  );
}

export default function FooterNavbar() {
  const { openWindow, windows, focusWindow } = useWindowManager();
  const { openPostIt } = usePostItManager();

  const [open, setOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<null | "studenter" | "komiteer">(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  //åpner arrangementer automatisk
  // useEffect(() => {
  //   const centerX = window.innerWidth / 2;
  //   const centerY = window.innerHeight / 2;
  
  //   openPostIt({
  //     id: "arrangementer",
  //     title: "Arrangementer",
  //     x: centerX -520,
  //     y: centerY - 320,
  //     content: <ArrangementerContent />,
  //   });
  // }, [openPostIt]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
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

  // hjelpefunksjon: åpner et vindu OG lukker start-menyen
  function handleOpen(opts: Parameters<typeof openWindow>[0]) {
    openWindow(opts);
    setOpen(false);
    setActiveSubmenu(null);
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-win-bg-gray border-t-2 border-white z-[9999]">
      <div className="relative h-16 flex items-center px-1">
        {/* START BUTTON */}
        <button
          ref={buttonRef}
          onClick={() => {
            setOpen(!open);
            setActiveSubmenu(null);
          }}
          className={`w-16 h-14 flex items-center justify-center bg-win-bg-gray
          border-t-[3px] border-l-[3px] border-b-[3px] border-r-[3px]
          ${open
            ? `border-t-win-dark-shadow border-l-win-dark-shadow border-b-white border-r-white shadow-[inset_1px_1px_0_var(--color-win-bg-dark-gray)]`
            : `border-t-white border-l-white border-b-win-dark-shadow border-r-win-dark-shadow shadow-[inset_-1px_-1px_0_var(--color-win-bg-dark-gray)]`
          }`}
        >
          <Image src="/pictures/nevralenils.png" alt="NODE logo" width={50} height={50} />
        </button>

        {/* TASKBAR */}
        <div className="flex items-center gap-1 flex-1 overflow-x-auto px-1">
          {windows
          .filter((w) => w.id !== "node-title" && w.id !== "node-subtitle")
          .map((w) => (
            <button
              key={w.id}
              onClick={() => focusWindow(w.id)}
              className="h-10 min-w-10 px-2 flex items-center gap-1.5 bg-win-bg-gray
                border-t-2 border-l-2 border-b-2 border-r-2
                border-b-win-dark-shadow border-r-win-dark-shadow
                border-t-white border-l-white
                shrink-0"
            >
              {w.icon && (
                <Image
                  src={w.icon}
                  alt=""
                  width={32}
                  height={32}
                  unoptimized
                  className="image-pixelated shrink-"
                />)}

              <span className="text-xs"> {w.title} </span>
            </button>
          ))}
        </div>

        {/* START MENU */}
        {open && (
          <div
            ref={menuRef}
            className="absolute bottom-16 left-1 flex bg-win-bg-gray
            border-t-[3px] border-l-[3px] border-b-[3px] border-r-[3px]
            border-t-white border-l-white
            border-b-win-dark-shadow border-r-win-dark-shadow
            shadow-[inset_-1px_-1px_0_#a0a0a0]"
          >
            {/* LEFT VERTICAL BAR */}
            <div className="bg-win-bg-dark-gray w-12 flex relative">
              <span className="absolute left-1/2 bottom-16 transform -translate-x-1/2 rotate-[-90deg] whitespace-nowrap">
                <span className="text-win-bg-gray text-4xl font-bold">NODE</span>
                <span className="text-white text-3xl font-mono ml-1">UIB</span>
              </span>
            </div>

            {/* MAIN MENU */}
            <div className="relative flex flex-col text-lg text-black min-w-[220px] py-2">
              {/* FOR STUDENTER */}
              <button
                onClick={() =>
                  setActiveSubmenu(activeSubmenu === "studenter" ? null : "studenter")
                }
                className={`group text-left px-4 py-2 w-full flex justify-between 
                ${activeSubmenu === "studenter" 
                  ? "bg-win-blue text-white" 
                  : "hover:bg-win-blue hover:text-white"
                }`}
              >
                <MenuIcons 
                  icon="/icons/student.png" 
                  hoverIcon = "/icons/hoverStudent.png" 
                  active={activeSubmenu === "studenter"}
                  right={<span>▶</span>}>
                  For studenter
                </MenuIcons>
              </button>

              <button
                onClick={() =>
                  openPostIt({
                    id: "arrangementer",
                    title: "Arrangementer",
                    content: <ArrangementerContent />,
                  })
                }
                className="text-left px-4 py-2 w-full hover:bg-win-blue hover:text-white"
              >
                <MenuIcons icon="/icons/postIt.png">Arrangementer</MenuIcons>
              </button>

              <Link href="/" className="px-4 py-2 hover:bg-win-blue hover:text-white">
                <MenuIcons icon="/icons/chatBubble.png">ChatBot</MenuIcons>
              </Link>

              {/* KOMITEER */}
              <button
                onClick={() =>
                  setActiveSubmenu(activeSubmenu === "komiteer" ? null : "komiteer")
                }
                className={`group text-left px-4 py-2 w-full flex justify-between 
                ${activeSubmenu === "komiteer" ? "bg-win-blue text-white" : "hover:bg-win-blue hover:text-white"}`}
              >
                <MenuIcons 
                  icon="/icons/comitee.png" 
                  hoverIcon="/icons/hoverComite.png" 
                  active={activeSubmenu === "komiteer"}
                  right={<span>▶</span>}>

                  Komiteer
                </MenuIcons>
              </button>

              <button
                onClick={() =>
                  handleOpen({
                    id: "merch",
                    title: "Merch",
                    icon: "/icons/t_shirt.png",
                    width: 730,
                    height: 460,
                    content: <MerchContent />,
                  })
                }
                className="text-left px-4 py-2 w-full hover:bg-win-blue hover:text-white"
              >
                <MenuIcons icon="/icons/t_shirt.png">Merch</MenuIcons>
              </button>

              <div className="pr-0.5 my-1">
                <div className="border-t border-win-bg-dark-gray" />
                <div className="border-t border-white" />
              </div>

              <button
                onClick={() =>
                  handleOpen({
                    id: "om-node",
                    title: "Om Node",
                    icon: "/icons/book.png",
                    width: 730,
                    height: 460,
                    content: <OmNodeContent />,
                  })
                }
                className="text-left px-4 py-2 w-full hover:bg-win-blue hover:text-white"
              >
                <MenuIcons icon="/icons/book.png">Om Node</MenuIcons>
              </button>

              {/* FIXED POSITION SUBMENU */}
              {activeSubmenu && (
                <div
                  className="absolute -top-[3px] left-full bg-win-bg-gray
                  border-t-[3px] border-l-[3px] border-b-[3px] border-r-[3px]
                  border-t-white border-l-white
                  border-b-win-dark-shadow border-r-win-dark-shadow
                  shadow-[inset_-1px_-1px_0_var(--color-win-bg-dark-gray)]
                  min-w-[220px] z-50"
                >
                  {activeSubmenu === "studenter" && (
                    <>
                      <button
                        onClick={() =>
                          handleOpen({
                            id: "aiki",
                            title: "Hva er AIKI?",
                            icon: "/icons/paper.png",
                            width: 730,
                            height: 460,
                            content: <AikiContent />,
                          })
                        }
                        className="block text-left w-full px-4 py-2 hover:bg-win-blue hover:text-white"
                      >
                        <MenuIcons icon="/icons/paper.png">Hva er AIKI?</MenuIcons>
                      </button>

                      <button
                        onClick={() =>
                          handleOpen({
                            id: "fagressurser",
                            title: "Fagressurser",
                            icon: "/icons/calculator.png",
                            width: 730,
                            height: 460,
                            content: <FagressurserContent />,
                          })
                        }
                        className="block text-left w-full px-4 py-2 hover:bg-win-blue hover:text-white"
                      >
                        <MenuIcons icon="/icons/calculator.png">Fagressurser</MenuIcons>
                      </button>

                      <button
                        onClick={() =>
                          handleOpen({
                            id: "masterinfo",
                            title: "Masterinfo",
                            icon: "/icons/cap.png",
                            width: 730,
                            height: 460,
                            content: <MasterinfoContent />,
                          })
                        }
                        className="block text-left w-full px-4 py-2 hover:bg-win-blue hover:text-white"
                      >
                        <MenuIcons icon="/icons/cap.png" scale="scale-[1.30]">
                          Masterinfo
                        </MenuIcons>
                      </button>

                      <button
                        onClick={() =>
                          handleOpen({
                            id: "utveksling",
                            title: "Utveksling",
                            icon: "/icons/earth.png",
                            width: 730,
                            height: 460,
                            content: <UtvekslingContent />,
                          })
                        }
                        className="block text-left w-full px-4 py-2 hover:bg-win-blue hover:text-white"
                      >
                        <MenuIcons icon="/icons/earth.png" scale="scale-[1.10]">
                          Utveksling
                        </MenuIcons>
                      </button>
                    </>
                  )}

                  {activeSubmenu === "komiteer" && (
                    <>
                      <button
                        onClick={() =>
                          handleOpen({
                            id: "bedkom",
                            title: "Bedriftskomiteen",
                            icon: "/icons/folder.png",
                            width: 730,
                            height: 460,
                            content: <BedkomContent />,
                          })
                        }
                        className="block text-left w-full px-4 py-2 hover:bg-win-blue hover:text-white"
                      >
                        <MenuIcons icon="/icons/folder.png">Bedriftskomiteen</MenuIcons>
                      </button>

                      <button
                        onClick={() =>
                          handleOpen({
                            id: "prokom",
                            title: "Prosjektgruppen",
                            icon: "/icons/PC.png",
                            width: 730,
                            height: 460,
                            content: <ProkomContent />,
                          })
                        }
                        className="block text-left w-full px-4 py-2 hover:bg-win-blue hover:text-white"
                      >
                        <MenuIcons icon="/icons/PC.png">Prosjektgruppen</MenuIcons>
                      </button>

                      <button
                        onClick={() =>
                          handleOpen({
                            id: "soskom",
                            title: "Sosialkomiteen",
                            icon: "/icons/paint.png",
                            width: 730,
                            height: 460,
                            content: <SoskomContent />,
                          })
                        }
                        className="block text-left w-full px-4 py-2 hover:bg-win-blue hover:text-white"
                      >
                        <MenuIcons icon="/icons/paint.png">Sosialkomiteen</MenuIcons>
                      </button>

                      <button
                        onClick={() =>
                          handleOpen({
                            id: "okokom",
                            title: "Økonomikomiteen",
                            icon: "/icons/money.png",
                            width: 730,
                            height: 460,
                            content: <OkokomContent />,
                          })
                        }
                        className="block text-left w-full px-4 py-2 hover:bg-win-blue hover:text-white"
                      >
                        <MenuIcons icon="/icons/money.png">Økonomikomiteen</MenuIcons>
                      </button>

                      <button
                        onClick={() =>
                          handleOpen({
                            id: "pr-gruppen",
                            title: "PR-gruppen",
                            icon: "/icons/camera.png",
                            width: 730,
                            height: 460,
                            content: <PRContent />,
                          })
                        }
                        className="block text-left w-full px-4 py-2 hover:bg-win-blue hover:text-white"
                      >
                        <MenuIcons icon="/icons/camera.png">PR-gruppen</MenuIcons>
                      </button>
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