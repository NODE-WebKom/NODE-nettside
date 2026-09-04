"use client";
import Image from "next/image";
import { useEffect, ReactNode } from "react";
import { useWindowManager } from "@/components/WindowManager/WindowManagerContext";
import { usePostItManager } from "@/components/WindowManager/PostItManagerContext";
import { useDesktopScale } from "@/components/DesktopScale";
import { useWallpaper } from "@/components/Wallpaper/WallpaperContext";
import { getWallpaperTextColor } from "@/lib/wallpaperTextColor";

//contents
import NodeTitleContent from "@/components/WindowManager/content/tittel/NodeTitleContent";
import NodeSubtitleContent from "@/components/WindowManager/content/tittel/NodeSubtitleContent";
import BedkomContent from "@/components/WindowManager/content/komiteer/BedkomContent";
import ProkomContent from "@/components/WindowManager/content/komiteer/ProkomContent";
import SoskomContent from "@/components/WindowManager/content/komiteer/SoskomContent";
import OkokomContent from "@/components/WindowManager/content/komiteer/OkokomContent";
import PRContent from "@/components/WindowManager/content/komiteer/PRContent";
import KontaktOssContent from "@/components/WindowManager/content/apps/KontaktOssContent";
import ArrangementerContent from "@/components/WindowManager/content/apps/ArrangementerContent";

// er vinduene utenfor ------
type Rect = { x: number; y: number; width: number; height: number};

function rectOverlap(a: Rect, b: Rect) {  
  return(
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function isOutsideCanvas(r: Rect, desktopWidth: number, desktopHeight: number ) {
  return r.x < 0 || r.y < 0 || r.x + r.width > desktopWidth || r.y + r.height > desktopHeight;
}

//skrivebordsikoner ----------
type DesktopIcon = {
  id: string;
  src: string;
  label: string;
  title: string;
  width?: number;
  height?: number;
  content: ReactNode;
  offset?: string;
};

const komiteIcons: DesktopIcon[] = [
  {
    id: "bedkom",
    src: "/icons/folder.png",
    label: "Bedkom",
    title: "Bedriftskomiteen",
    width: 730,
    height: 460,
    content: <BedkomContent />,
    offset: "-mb-2",
  },

  {
    id: "prokom",
    src: "/icons/PC.png",
    label: "ProKom",
    title: "Prosjektgruppen",
    width: 730,
    height: 460,
    content: <ProkomContent />,
  },

  {
    id: "soskom",
    src: "/icons/paint.png",
    label: "SosKom",
    title: "Sosialkomiteen",
    width: 730,
    height: 460,
    content: <SoskomContent />,
  },

  {
    id: "okokom",
    src: "/icons/money.png",
    label: "Økonomi",
    title: "Økonomi",
    width: 730,
    height: 460,
    content: <OkokomContent />,
  },

  { id: "pr-gruppen", src: "/icons/camera.png", label: "PR-gruppen", title: "PR-gruppen",
    width: 730, height: 460, content: <PRContent /> },
];

// Kontakt oss - vanligvis nederst i venstre kolonne, men flyttes til høyre
// kolonne på lave skjermer (se isShortScreen i Home()) slik at den ikke
// havner utenfor synlig område.
const kontaktOssIcon: DesktopIcon = {
  id: "kontaktOss", src: "/icons/phone.png", label: "Kontakt oss", title: "Kontakt oss",
  width: 730, height: 460, content: <KontaktOssContent />,
};

// Høyre kolonne ved siden av komiteene (uten Kontakt oss - den legges til dynamisk)
const baseRightColumnIcons: DesktopIcon[] = [
  { id: "placeholder1", src: "/icons/detective.png", label: "SQL MM", title: "SQL Murder Mystery",
    width: 730, height: 460, content: <p className="text-black">Placeholder - innhold kommer senere.</p> },

  { id: "placeholder2", src: "/icons/bee.png", label: "Hivelink", title: "Hivelink",
    width: 730, height: 460, content: <p className="text-black">Placeholder - innhold kommer senere.</p> },
];

//ikoner på hovedsiden
function AppIcon({
  src,
  label,
  offset = "-mb-1",
  onClick,
}: {
  src: string;
  label: string;
  offset?: string;
  onClick?: () => void;
}) {
  const { wallpaper } = useWallpaper();
  const textColor = getWallpaperTextColor(wallpaper);

  return (
    <button
      onClick={onClick}
      className="
        group relative w-20 h-24
        hover:bg-gray-600/30
      "
    >
      {/* Icon */}
      <Image
        src={src}
        alt=""
        width={64}
        height={64}
        unoptimized
        className={`image-pixelated mx-auto ${offset}`}
      />

      {/* Label (overlap) - svart/hvit ut fra om bakgrunnen er lys/mork, hvit ved hover */}
      <span
        className={`
        text-sm
        leading-none
        text-center
        leading-none
        group-hover:text-white
        ${textColor === "white" ? "text-white" : "text-black"}
      `}
      >
        <span className="underline">{label[0]}</span>
        {label.slice(1)}
      </span>
    </button>
  );
}

export default function Home() {
  const { openWindow } = useWindowManager(); ///for å åpne vinduer
  const { openPostIt } = usePostItManager();

  //isSHortScreen passer på at lave skjermer også kan se kontakt oss, bredde lengden utløser ikke dette
  const { isShortScreen, desktopWidth, desktopHeight } = useDesktopScale();

  const leftColumnIcons = isShortScreen
    ? komiteIcons
    : [...komiteIcons, kontaktOssIcon];

  const rightColumnIcons = isShortScreen
    ? [kontaktOssIcon, ...baseRightColumnIcons]
    : baseRightColumnIcons;

  //åpner popup-titlene automatisk
  useEffect(() => {
    // bruker desktopWidth, 
    // (IKKE window.innerWidth ellers blir tittelen feilplassert)
    const centerX = desktopWidth / 2;

    openWindow({
      id: "node-title",
      title: "",
      x: centerX - 150,
      y: 20,
      width: 224,
      content: <NodeTitleContent />,
    });

    openWindow({
      id: "node-subtitle",
      title: "",
      x: centerX - 150 + 140,
      y: 70,
      width: 320,
      content: <NodeSubtitleContent />,
    });

    //arrangementer og kontakt oss åpnes automatisk - men bare hvis de faktisk
    //får plass uten å overlappe tittelen eller havne utenfor skjermen
    let arrangementerTimeout: ReturnType<typeof setTimeout> | undefined;
    let kontaktOssTimeout: ReturnType<typeof setTimeout> | undefined;

    const titleRect: Rect = { x: centerX - 150, y: 20, width: 224 + 320, height: 100 }; // grovt anslag som dekker begge titlene
    const arrangementerRect: Rect = { x: 220, y: 20, width: 300, height: 300 };
    const kontaktOssRect: Rect = { x: 710, y: 200, width: 730, height: 460 }; // fast y, matcher kallet under

    const arrangementerOverlapsTitle = rectOverlap(arrangementerRect, titleRect);
    const kontaktOssOutside = isOutsideCanvas(kontaktOssRect, desktopWidth, desktopHeight);

    if (!arrangementerOverlapsTitle) {
      arrangementerTimeout = setTimeout(() => {
        openPostIt({
          id: "arrangementer",
          title: "Arrangementer",
          x: arrangementerRect.x,
          y: arrangementerRect.y,
          content: <ArrangementerContent />,
        });
      }, 200);
    }

    if (!kontaktOssOutside) {
      kontaktOssTimeout = setTimeout(() => {
        openWindow({
          id: kontaktOssIcon.id,
          title: kontaktOssIcon.title,
          icon: kontaktOssIcon.src,
          width: kontaktOssIcon.width,
          height: kontaktOssIcon.height,
          content: kontaktOssIcon.content,
          x: kontaktOssRect.x,
          y: kontaktOssRect.y,
        });
      }, 300);
    }

    return () => {
      clearTimeout(arrangementerTimeout);
      clearTimeout(kontaktOssTimeout);
    };
  }, [openWindow, openPostIt, desktopWidth, desktopHeight]);

  function renderIcon(icon: DesktopIcon) {
    return (
      <AppIcon
        key={icon.id}
        src={icon.src}
        label={icon.label}
        offset={icon.offset}
        onClick={() =>
          openWindow({
            id: icon.id,
            title: icon.title,
            icon: icon.src,
            width: icon.width,
            height: icon.height,
            content: icon.content,
          })
        }
      />
    );
  }

  return (
    <div className="relative w-full flex flex-row items-start gap-2">
      {/* Venstre kolonne */}
      <div className="flex flex-col items-start gap-2">
        {leftColumnIcons.map(renderIcon)}
      </div>

      {/* Ny kolonne ved siden av Bedkom */}
      <div className="flex flex-col items-start gap-2">
        {rightColumnIcons.map(renderIcon)}
      </div>
    </div>
  );
}
