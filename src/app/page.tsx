"use client"
import Image from "next/image";
import { useEffect, ReactNode } from "react";
import { useWindowManager } from "@/components/WindowManager/WindowManagerContext";
import { useDesktopScale } from "@/components/DesktopScale";

//contents
import NodeTitleContent from "@/components/WindowManager/content/tittel/NodeTitleContent";
import NodeSubtitleContent from "@/components/WindowManager/content/tittel/NodeSubtitleContent";
import BedkomContent from "@/components/WindowManager/content/komiteer/BedkomContent";
import ProkomContent from "@/components/WindowManager/content/komiteer/ProkomContent";
import SoskomContent from "@/components/WindowManager/content/komiteer/SoskomContent";
import OkokomContent from "@/components/WindowManager/content/komiteer/OkokomContent";
import PRContent from "@/components/WindowManager/content/komiteer/PRContent";
import KontaktOssContent from "@/components/WindowManager/content/apps/KontaktOssContent";

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

// Faste komite-ikonene i venstre kolonne (uendret rekkefølge)
const komiteIcons: DesktopIcon[] = [
  { id: "bedkom", src: "/icons/folder.png", label: "Bedkom", title: "Bedriftskomiteen",
    width: 730, height: 460, content: <BedkomContent />, offset: "-mb-2" },

  { id: "prokom", src: "/icons/PC.png", label: "ProKom", title: "Prosjektgruppen",
    width: 730, height: 460, content: <ProkomContent /> },

  { id: "soskom", src: "/icons/paint.png", label: "SosKom", title: "Sosialkomiteen",
    width: 730, height: 460, content: <SoskomContent /> },

  { id: "okokom", src: "/icons/money.png", label: "ØkoKom", title: "Økonomikomiteen",
    width: 730, height: 460, content: <OkokomContent /> },

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
      <span className="
        text-sm
        leading-none
        text-center
        leading-none
      ">
        <span className="underline">
          {label[0]}
        </span>
        {label.slice(1)}
    
      </span>
    </button>
  );
}

export default function Home() {
  const { openWindow } = useWindowManager(); ///for å åpne vinduer

  // isShortScreen ser bare på høyden på skjermen (uavhengig av bredde), så
  // et smalt/halvt vindu utløser IKKE dette - bare en faktisk lav skjerm der
  // Kontakt oss ellers ville havnet under navbaren nederst i venstre kolonne.
  const { isShortScreen } = useDesktopScale();

  const leftColumnIcons = isShortScreen
    ? komiteIcons
    : [...komiteIcons, kontaktOssIcon];

  const rightColumnIcons = isShortScreen
    ? [kontaktOssIcon, ...baseRightColumnIcons]
    : baseRightColumnIcons;

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
  }, [openWindow]);

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