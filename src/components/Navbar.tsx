"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import { useWindowManager } from "@/components/WindowManager/WindowManagerContext";
import { usePostItManager } from "./WindowManager/PostItManagerContext";
import {
  getNavbarHeight,
  NAVBAR_HEIGHT,
  useDesktopScale,
} from "@/components/DesktopScale";
import { GOOGLE_CALENDAR_LINK } from "@/lib/constants";

// contents
import ArrangementerContent from "@/components/WindowManager/content/apps/ArrangementerContent";
import ChatbotContent from "@/components/WindowManager/content/chatbot/ChatbotContent";
import NilsBotContent from "@/components/WindowManager/content/chatbot/NilsBotContent";
import MerchContent from "@/components/WindowManager/content/apps/MerchContent";
import AnnonserContent from "@/components/WindowManager/content/apps/AnnonserContent";
import OmNodeContent from "@/components/WindowManager/content/apps/OmNodeContent";
import AikiContent from "@/components/WindowManager/content/for_studenter/AikiContent";
import FagressurserContent from "@/components/WindowManager/content/for_studenter/FagressurserContent";
import MasterinfoContent from "@/components/WindowManager/content/for_studenter/MasterinfoContent";
import UtvekslingContent from "@/components/WindowManager/content/for_studenter/UtvekslingContent";
import BedkomContent from "@/components/WindowManager/content/komiteer/BedkomContent";
import ProkomContent from "@/components/WindowManager/content/komiteer/ProkomContent";
import SoskomContent from "@/components/WindowManager/content/komiteer/SoskomContent";
import OkokomContent from "@/components/WindowManager/content/komiteer/OkokomContent";
import PRContent from "@/components/WindowManager/content/komiteer/PRContent";
import GeneralContent from "@/components/WindowManager/content/settings/generalContent";
import MusicPlayerContent from "@/components/WindowManager/content/settings/musicPlayerContent";
import WallpaperContent from "@/components/WindowManager/content/settings/wallpaperContent";

// ---------- TYPES ----------
type WindowButton = {
  id: string;
  title: string;
  icon: string;
  width?: number;
  height?: number;
  content: React.ReactNode;
  scale?: string;
};

// For studenter-submeny ----------
const studenterButtons: WindowButton[] = [
  {
    id: "aiki",
    title: "Hva er AIKI?",
    icon: "/icons/paper.png",
    width: 730,
    height: 460,
    content: <AikiContent />,
  },

  {
    id: "fagressurser",
    title: "Fagressurser",
    icon: "/icons/calculator.png",
    width: 730,
    height: 460,
    content: <FagressurserContent />,
  },

  {
    id: "masterinfo",
    title: "Masterinfo",
    icon: "/icons/cap.png",
    width: 730,
    height: 460,
    content: <MasterinfoContent />,
    scale: "scale-[1.30]",
  },

  {
    id: "utveksling",
    title: "Utveksling",
    icon: "/icons/earth.png",
    width: 730,
    height: 460,
    content: <UtvekslingContent />,
    scale: "scale-[1.10]",
  },

  {
    id: "merch",
    title: "Merch",
    icon: "/icons/t_shirt.png",
    width: 730,
    height: 460,
    content: <MerchContent />,
  },
];

//Komiteer-submeny ----------
const komiteerButtons: WindowButton[] = [
  {
    id: "bedkom",
    title: "Bedriftskomiteen",
    icon: "/icons/folder.png",
    width: 730,
    height: 460,
    content: <BedkomContent />,
  },

  {
    id: "prokom",
    title: "Prosjektgruppen",
    icon: "/icons/PC.png",
    width: 730,
    height: 460,
    content: <ProkomContent />,
  },

  {
    id: "soskom",
    title: "Sosialkomiteen",
    icon: "/icons/paint.png",
    width: 730,
    height: 460,
    content: <SoskomContent />,
  },

  {
    id: "okokom",
    title: "Økonomi",
    icon: "/icons/money.png",
    width: 730,
    height: 460,
    content: <OkokomContent />,
  },

  {
    id: "pr-gruppen",
    title: "PR-gruppen",
    icon: "/icons/camera.png",
    width: 730,
    height: 460,
    content: <PRContent />,
  },
];

// Hovedmeny (vanlige knapper) ----------
const mainButtons: WindowButton[] = [
  {
    id: "annonser",
    title: "Annonser",
    icon: "/icons/news.png",
    width: 860,
    height: 550,
    content: <AnnonserContent />,
    scale: "scale-[1.40]",
  },
  {
    id: "om-node",
    title: "Om Node",
    icon: "/icons/book.png",
    width: 730,
    height: 460,
    content: <OmNodeContent />,
  },
];

// Instillinger-knappene fra "Om Node"-vinduet, gjenbrukt i "vis skjulte ikoner"-brettet
const settingsTrayButtons: WindowButton[] = [
  {
    id: "general",
    title: "System Properties",
    icon: "/icons/gears.png",
    width: 550,
    height: 600,
    content: <GeneralContent />,
  },
  {
    id: "music player",
    title: "Music Player",
    icon: "/icons/cd.png",
    width: 470,
    height: 320,
    content: <MusicPlayerContent />,
  },
  {
    id: "wallpaper",
    title: "Wallpaper",
    icon: "/icons/wallpaper.png",
    width: 730,
    height: 540,
    content: <WallpaperContent />,
  },
];

// Korte visningsnavn under ikonene i "vis skjulte ikoner"-brettet
const trayShortLabels: Record<string, string> = {
  general: "Innstillinger",
  "music player": "Musikk",
  wallpaper: "Bakgrunn",
};

// Plassholder - bytt ut med et ekte roterende "dagens sitat" senere
const DAILY_QUOTE = "Kunnskap delt er kunnskap doblet.";

// Morsomme reaksjoner når man trykker på Nils - vises en liten stund i boblen
const NILS_POKE_MESSAGES = ["aaaah ikke kil meg", "auuu", "det holder nå", "jeg sier ifra til Magnus!"];
const NILS_POKE_DURATION_MS = 2000;

// felles for Navbar-menyen og auto-åpningen av Arrangementer på forsiden

function MenuIcons({
  icon,
  hoverIcon,
  active = false,
  children,
  right,
  scale = "scale-[1.25]",
}: {
  icon: string;
  hoverIcon?: string;
  active?: boolean;
  children: string;
  right?: React.ReactNode;
  scale?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {hoverIcon ? (
        <div
          className={`image-pixelated ${scale} origin-center shrink-0 relative w-8 h-8`}
        >
          <Image
            src={icon}
            alt=""
            width={32}
            height={32}
            unoptimized
            className={`absolute inset-0 ${active ? "opacity-0" : "group-hover:opacity-0"}`}
          />
          <Image
            src={hoverIcon}
            alt=""
            width={32}
            height={32}
            unoptimized
            className={`absolute inset-0 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
          />
        </div>
      ) : (
        <Image
          src={icon}
          alt=""
          width={32}
          height={32}
          unoptimized
          className={`image-pixelated ${scale} origin-center shrink-0`}
        />
      )}

      <span className="flex-1">
        <span className="underline">{children[0]}</span>
        {children.slice(1)}
      </span>

      {right}
    </div>
  );
}

export default function FooterNavbar() {
  const { openWindow, windows, focusWindow } = useWindowManager();
  const { openPostIt } = usePostItManager();

  const [open, setOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<
    null | "studenter" | "komiteer"
  >(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // "vis skjulte ikoner"-brett (sosiale medier + instillinger)
  const [trayOpen, setTrayOpen] = useState(false);
  const trayRef = useRef<HTMLDivElement>(null);

  const { scale } = useDesktopScale();
  const navbarHeight = getNavbarHeight(scale);

  // Nils reagerer med en morsom tekst i snakkeboblen når man trykker på ham
  const [nilsPokeMessage, setNilsPokeMessage] = useState<string | null>(null);
  const nilsPokeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleNilsPoke() {
    if (nilsPokeTimeoutRef.current) clearTimeout(nilsPokeTimeoutRef.current);
    const message =
      NILS_POKE_MESSAGES[Math.floor(Math.random() * NILS_POKE_MESSAGES.length)];
    setNilsPokeMessage(message);
    nilsPokeTimeoutRef.current = setTimeout(
      () => setNilsPokeMessage(null),
      NILS_POKE_DURATION_MS,
    );
  }

  useEffect(() => {
    return () => {
      if (nilsPokeTimeoutRef.current) clearTimeout(nilsPokeTimeoutRef.current);
    };
  }, []);

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

  useEffect(() => {
    function handleClickOutsideTray(event: MouseEvent) {
      if (trayRef.current && !trayRef.current.contains(event.target as Node)) {
        setTrayOpen(false);
      }
    }
    if (trayOpen) {
      document.addEventListener("mousedown", handleClickOutsideTray);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideTray);
    };
  }, [trayOpen]);

  function handleOpen(btn: WindowButton) {
    openWindow({
      id: btn.id,
      title: btn.title,
      icon: btn.icon,
      width: btn.width,
      height: btn.height,
      content: btn.content,
    });
    setOpen(false);
    setActiveSubmenu(null);
  }

  function handleTraySettingsOpen(btn: WindowButton) {
    openWindow({
      id: btn.id,
      title: btn.title,
      icon: btn.icon,
      width: btn.width,
      height: btn.height,
      content: btn.content,
    });
    setTrayOpen(false);
  }

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[9999] bg-win-bg-gray border-t-2 border-white"
      style={{ height: navbarHeight }}
    >
      <div className="relative flex h-full items-center px-1">
        {/* START BUTTON */}
        <button
          ref={buttonRef}
          onClick={() => {
            setOpen(!open); 
            setActiveSubmenu(null);
          }}
          aria-label="Meny"
          aria-haspopup="true"
          aria-expanded={open}

          className={`flex items-center justify-center bg-win-bg-gray
            border-[3px] p-1
            ${
              open
                ? `border-t-win-dark-shadow border-l-win-dark-shadow border-b-white border-r-white shadow-[inset_1px_1px_0_var(--color-win-bg-dark-gray)]`
                : `border-t-white border-l-white border-b-win-dark-shadow border-r-win-dark-shadow shadow-[inset_-1px_-1px_0_var(--color-win-bg-dark-gray)]`
            }`}

          style={{
            width: 64 * scale,
            height: 56 * scale,
          }}
        >
          <Image
            src="/pictures/nevralenils.png"
            alt="Start"
            width={48}
            height={48}
            unoptimized
            className="image-pixelated object-contain"
            style={{ width: 48 * scale, height: 48 * scale }}
          />
        </button>

        {/* TASKBAR */}
        <div className="flex items-center gap-1 flex-1 overflow-x-auto px-1">
          {windows
            .filter((w) => w.id !== "node-title" && w.id !== "node-subtitle")
            .map((w) => (
              <button
                key={w.id}
                onClick={() => focusWindow(w.id)}
                className="px-2 flex items-center gap-1.5 bg-win-bg-gray
                border-t-2 border-l-2 border-b-2 border-r-2
                border-b-win-dark-shadow border-r-win-dark-shadow
                border-t-white border-l-white
                shrink-0"
                style={{ height: 40 * scale, minWidth: 40 * scale }}
              >
                {w.icon && (
                  <Image
                    src={w.icon}
                    alt=""
                    width={Math.round(32 * scale)}
                    height={Math.round(32 * scale)}
                    unoptimized
                    className="image-pixelated shrink-0"
                  />
                )}
                <span className="text-xs" style={{ fontSize: 12 * scale }}>{w.title}</span>
              </button>
            ))}
        </div>

        {/* HOYRE SIDE: "vis skjulte ikoner"-knapp + brett + dagens sitat */}
        <div className="flex items-center gap-2 pr-2">
          <div className="relative flex items-center" ref={trayRef} style={{ marginLeft: 14 * scale }}>
            {/* SKJULTE IKONER - brett med sosiale medier og instillinger, som mini-apper (ikon + liten tekst) i et 3-kolonners rutenett */}
            {trayOpen && (
              <div
                className="absolute bottom-full right-0 mb-1 grid bg-win-bg-gray
                border-t-[3px] border-l-[3px] border-b-[3px] border-r-[3px]
                border-t-white border-l-white
                border-b-win-dark-shadow border-r-win-dark-shadow
                shadow-[inset_-1px_-1px_0_var(--color-win-bg-dark-gray)]
                p-2 z-50"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "bottom right",
                  gridTemplateColumns: `repeat(3, ${60 * scale}px)`,
                  gap: 4 * scale,
                }}
              >
                {settingsTrayButtons.map((btn) => {
                  const shortLabel = trayShortLabels[btn.id] ?? btn.title;
                  return (
                    <button
                      key={btn.id}
                      onClick={() => handleTraySettingsOpen(btn)}
                      title={btn.title}
                      aria-label={btn.title}
                      className="flex flex-col items-center justify-center gap-0.5 px-0.5 text-center hover:bg-win-blue hover:text-white"
                      style={{ width: 60 * scale, height: 64 * scale }}
                    >
                      <Image
                        src={btn.icon}
                        alt=""
                        unoptimized
                        width={26}
                        height={26}
                        className="image-pixelated scale-[1.15] origin-center shrink-0"
                      />
                      <span className="leading-none" style={{ fontSize: 10 * scale }}>
                        <span className="underline">{shortLabel[0]}</span>
                        {shortLabel.slice(1)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* "VIS SKJULTE IKONER"-KNAPP */}
            <button
              onClick={() => setTrayOpen((v) => !v)}
              aria-label={trayOpen ? "Skjul ikoner" : "Vis skjulte ikoner"}
              aria-haspopup="true"
              aria-expanded={trayOpen}
              className={`flex items-center justify-center bg-win-bg-gray border-2 shrink-0
                ${
                  trayOpen
                    ? "border-t-win-dark-shadow border-l-win-dark-shadow border-b-white border-r-white shadow-[inset_1px_1px_0_var(--color-win-bg-dark-gray)]"
                    : "border-t-white border-l-white border-b-win-dark-shadow border-r-win-dark-shadow"
                }`}
              style={{ width: 32 * scale, height: 32 * scale }}
            >
              <span
                className="inline-block leading-none select-none transition-transform duration-200"
                style={{
                  fontSize: 14 * scale,
                  transform: trayOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                &#9650;
              </span>
            </button>
          </div>

          {/* DAGENS SITAT - snakkeboble som popper opp litt over navbaren */}
          <div className="relative shrink-0" style={{ width: 280 * scale, height: 46 * scale }}>
            {/* Nils,Trykk på han for en liten reaksjon i boblen. */}
            <button
              onClick={handleNilsPoke}
              aria-label="Nils"
              className="custom-cursor-pointer absolute z-0 shrink-0"
              style={{
                width: 70 * scale,
                height: 70 * scale,
                bottom: -10,
                right: 25 * scale,
              }}
            >
              <Image
                src="/pictures/nevralenils.png"
                alt="Nils"
                fill
                unoptimized
                className="object-contain"
              />
            </button>

            <div
              className="absolute bottom-8 right-0 z-20 flex items-center shrink-0
              bg-white border-2 border-black rounded-2xl"
              style={{
                width: 280 * scale,
                height: 46 * scale,
                marginBottom: 18 * scale,
                paddingLeft: 14 * scale,
                paddingRight: 12 * scale,
              }}
            >
              <span
                className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap animate-marquee text-black"
                style={{ fontSize: 15 * scale }}
              >
                {/* DAILY_QUOTE er en plassholder - bytt ut med et ekte (eventuelt roterende) sitat senere.
                    Ved klikk på Nils vises en morsom reaksjon her i stedet, en liten stund. */}
                {nilsPokeMessage ?? `“${DAILY_QUOTE}”`}
              </span>

              {/* halen - nederst til høyre, to lag gir en tynn svart kant rundt spissen */}
              <span
                className="absolute w-0 h-0"
                style={{
                  bottom: -12 * scale,
                  right: 14 * scale,
                  borderLeft: `${8 * scale}px solid transparent`,
                  borderRight: `${8 * scale}px solid transparent`,
                  borderTop: `${12 * scale}px solid black`,
                }}
              />
              <span
                className="absolute w-0 h-0"
                style={{
                  bottom: -8 * scale,
                  right: 16 * scale,
                  borderLeft: `${6 * scale}px solid transparent`,
                  borderRight: `${6 * scale}px solid transparent`,
                  borderTop: `${8 * scale}px solid var(--color-white)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* START MENU */}
        {open && (
          <div
            ref={menuRef}
            className="absolute left-1 flex bg-win-bg-gray
            border-t-[3px] border-l-[3px] border-b-[3px] border-r-[3px]
            border-t-white border-l-white
            border-b-win-dark-shadow border-r-win-dark-shadow
            shadow-[inset_-1px_-1px_0_#a0a0a0]"

            style={{
              bottom: navbarHeight,
              transform: `scale(${scale})`,
              transformOrigin: "bottom left",
            }}
          >
            {/* LEFT VERTICAL BAR */}
            <div className="bg-win-bg-dark-gray w-12 flex relative">
              <span className="absolute left-1/2 bottom-16 transform -translate-x-1/2 rotate-[-90deg] whitespace-nowrap">
                <span className="text-win-bg-gray text-4xl font-bold">
                  NODE
                </span>
                <span className="text-white text-3xl font-mono ml-1">UIB</span>
              </span>
            </div>

            {/* MAIN MENU */}
            <div className="relative flex flex-col text-lg text-black min-w-[220px] py-2">
              {/* FOR STUDENTER */}
              <button
                onClick={() =>
                  setActiveSubmenu(
                    activeSubmenu === "studenter" ? null : "studenter",
                  )
                }
                className={`group text-left px-4 py-2 w-full flex justify-between 
                ${activeSubmenu === "studenter" ? "bg-win-blue text-white" : "hover:bg-win-blue hover:text-white"}`}
              >
                <MenuIcons
                  icon="/icons/student.png"
                  hoverIcon="/icons/hoverStudent.png"
                  active={activeSubmenu === "studenter"}
                  right={<span>▶</span>}
                >
                  For studenter
                </MenuIcons>
              </button>

              <button
                onClick={() =>
                  openPostIt({
                    id: "arrangementer",
                    title: "Arrangementer",
                    content: <ArrangementerContent />,
                    calendarUrl: GOOGLE_CALENDAR_LINK,
                  })
                }
                className="text-left px-4 py-2 w-full hover:bg-win-blue hover:text-white"
              >
                <MenuIcons icon="/icons/postIt.png">Arrangementer</MenuIcons>
              </button>

              {/* CHATBOT----- */}
              <button
                onClick={() => {
                  const chatbotPos = openWindow({
                    id: "chatbot",
                    title: "Chatbot",
                    icon: "/icons/chatBubble.png",
                    width: 500,
                    height: 510,
                    content: <ChatbotContent />,
                    group: "chatbot-group",
                  });

                  openWindow({
                    id: "nilsbot",
                    title: "Nevrale Nils",
                    width: 300,
                    height: 300,
                    content: <NilsBotContent />,
                    x: chatbotPos.x - 250,
                    y: chatbotPos.y + 230,
                    group: "chatbot-group",
                  });

                  setOpen(false);
                  setActiveSubmenu(null);
                }}
                className="text-left px-4 py-2 w-full hover:bg-win-blue hover:text-white"
              >
                <MenuIcons icon="/icons/chatBubble.png">ChatBot</MenuIcons>
              </button>

              {/* KOMITEER */}
              <button
                onClick={() =>
                  setActiveSubmenu(
                    activeSubmenu === "komiteer" ? null : "komiteer",
                  )
                }
                className={`group text-left px-4 py-2 w-full flex justify-between 
                ${activeSubmenu === "komiteer" ? "bg-win-blue text-white" : "hover:bg-win-blue hover:text-white"}`}
              >
                <MenuIcons
                  icon="/icons/comitee.png"
                  hoverIcon="/icons/hoverComite.png"
                  active={activeSubmenu === "komiteer"}
                  right={<span>▶</span>}
                >
                  Komiteer
                </MenuIcons>
              </button>

              {/* MAIN BUTTONS (flate, uten submeny) */}
              {mainButtons.map((btn, index) => (
                <div key={btn.id}>
                  <button
                    onClick={() => handleOpen(btn)}
                    className="text-left px-4 py-2 w-full hover:bg-win-blue hover:text-white"
                  >
                    <MenuIcons icon={btn.icon} scale={btn.scale}>
                      {btn.title}
                    </MenuIcons>
                  </button>

                  {/* decor line between apps */}
                  {index === 0 && (
                    <div className="pr-0.5 my-1">
                      <div className="border-t border-win-bg-dark-gray" />
                      <div className="border-t border-white" />
                    </div>
                  )}
                </div>
              ))}

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
                  {(activeSubmenu === "studenter"
                    ? studenterButtons
                    : komiteerButtons
                  ).map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => handleOpen(btn)}
                      className="block text-left w-full px-4 py-2 hover:bg-win-blue hover:text-white"
                    >
                      <MenuIcons icon={btn.icon} scale={btn.scale}>
                        {btn.title}
                      </MenuIcons>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
