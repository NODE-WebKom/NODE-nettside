"use client"
import Image from "next/image";
import { useEffect, ReactNode } from "react";
import { useWindowManager } from "@/components/WindowManager/WindowManagerContext";

//contents
import NodeTitleContent from "@/components/WindowManager/content/tittel/NodeTitleContent";
import NodeSubtitleContent from "@/components/WindowManager/content/tittel/NodeSubtitleContent";
import BedkomContent from "@/components/WindowManager/content/komiteer/BedkomContent";
import ProkomContent from "@/components/WindowManager/content/komiteer/ProkomContent";
import SoskomContent from "@/components/WindowManager/content/komiteer/SoskomContent";
import OkokomContent from "@/components/WindowManager/content/komiteer/OkokomContent";
import PRContent from "@/components/WindowManager/content/komiteer/PRContent";
import KontaktOssContent from "@/components/WindowManager/content/KontaktOssContent";

//ikoner på hovedsiden
function AppIcon({
  src, 
  label, 
  offset = "-mb-1", 
  onClick

}: {
  src: string; 
  label: ReactNode; 
  offset?: string;
  onClick?: () => void;
}) {

  return (
    <button
      onClick = {onClick}
      className="
        relative w-20 h-24
        hover:bg-gray-600/30 hover:text-white
      "
    >
      {/* Icon */}
        <Image
          src={src}
          alt='icon'
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
        {label}
      </span>
    </button>
  );
}

export default function Home() {
  const { openWindow } = useWindowManager(); ///for å åpne vinduer

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
      y:70,
      width: 320,
      content: <NodeSubtitleContent />,
    }); 
  }, [openWindow]);

  return (
    <div className="relative w-full flex flex-col items-start gap-2">

      {/* Ikonene */}
      <AppIcon 
        src="/icons/folder.png" 
        label="Bedkom" 
        offset="-mb-2" 
        onClick = {() =>
          openWindow({
            id:"bedkom",
            title:"Bedriftskomiteen",
            icon: "/icons/folder.png",
            width: 730,
            height: 460,
            content: <BedkomContent />,
          })
        }
        />
      
      <AppIcon 
        src="/icons/PC.png" 
        label="ProKom" 
        onClick = {() =>
          openWindow({
            id:"prokom",
            title:"Prosjektgruppen",
            icon: "/icons/PC.png",
            width: 730,
            height: 460,
            content: <ProkomContent />,
          })
        }
        />

      <AppIcon 
        src="/icons/paint.png" 
        label="SosKom" 
        onClick = {() =>
          openWindow({
            id:"soskom",
            title:"Sosialkomiteen",
            icon: "/icons/paint.png",
            width: 730,
            height: 460,
            content: <SoskomContent />,
          })
        }
        />

      <AppIcon 
        src="/icons/money.png" 
        label="ØkoKom" 
        onClick = {() =>
          openWindow({
            id:"okokom",
            title:"Økonomikomiteen",
            icon: "/icons/money.png",
            width: 730,
            height: 460,
            content: <OkokomContent />,
          })
        }
        />

      <AppIcon 
        src="/icons/camera.png" 
        label="PR-gruppen"
        onClick = {() =>
          openWindow({
            id:"pr-gruppen",
            title:"PR-gruppen",
            icon: "/icons/camera.png",
            width: 730,
            height: 460,
            content: <PRContent />,
          })
        } 
        />

      <AppIcon 
        src="/icons/phone.png" 
        label="Kontakt oss" 
        onClick = {() =>
          openWindow({
            id:"kontaktOss",
            title:"Kontakt oss",
            icon: "/icons/phone.png",
            width: 730,
            height: 460,
            content: <KontaktOssContent />,
          })
        }
        />
    </div>
  );
}