"use client";
import Image from "next/image";
import { useEffect, ReactNode } from "react";
import { useWindowManager } from "@/components/WindowManager/WindowManagerContext";
import { usePostItManager } from "@/components/WindowManager/PostItManagerContext";

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

const desktopIcons: DesktopIcon[] = [
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

  {
    id: "pr-gruppen",
    src: "/icons/camera.png",
    label: "PR-gruppen",
    title: "PR-gruppen",
    width: 730,
    height: 460,
    content: <PRContent />,
  },

  {
    id: "kontaktOss",
    src: "/icons/phone.png",
    label: "Kontakt oss",
    title: "Kontakt oss",
    width: 730,
    height: 460,
    content: <KontaktOssContent />,
  },
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
  return (
    <button
      onClick={onClick}
      className="
        relative w-20 h-24
        hover:bg-gray-600/30 hover:text-white
      "
    >
      {/* Icon */}
      <Image
        src={src}
        alt="icon"
        width={64}
        height={64}
        unoptimized
        className={`image-pixelated mx-auto ${offset}`}
      />

      {/* Label (overlap) */}
      <span
        className="
        text-sm
        leading-none
        text-center
        leading-none
      "
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

  //åpner popup-titlene automatisk
  useEffect(() => {
    const centerX = window.innerWidth / 2;

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

    const timeout = setTimeout(() => {
      openPostIt({
        id: "arrangementer",
        title: "Arrangementer",
        x: 100,
        y: 15,
        content: <ArrangementerContent />,
      });
    }, 200);
    return () => clearTimeout(timeout);
  }, [openWindow, openPostIt]);

  return (
    <div className="relative w-full flex flex-col items-start gap-2">
      {/* Ikonene */}
      {desktopIcons.map((icon) => (
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
      ))}
    </div>
  );
}
