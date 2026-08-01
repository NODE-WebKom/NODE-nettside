import Image from "next/image";
import Hero from "@/components/Hero";
import { ReactNode } from "react";

// tittel til hovedsiden
function PopupTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-win-bg-gray p-[3px]
      border-t-[3px] border-l-[3px] border-b-[3px] border-r-[3px]
      border-t-white border-l-white
      border-b-win-dark-shadow border-r-win-dark-shadow
      shadow-[inset_-1px_-1px_0_win-bg-dark-gray]
      ${className}`}
    >
      <div className="bg-win-blue px-2 py-1 mb-2 h-5" />

      <div className="px-4 py-3 flex items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}


function AppIcon({src, label, offset = "-mb-1", }: {src: string; label: ReactNode; offset?: string;}) {
  return (
    <button
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
        text-xs
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
  return (
    <div className="relative w-full flex flex-col items-start gap-2">
      {/* Popup-vinduer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex justify-center">
        <PopupTitle className="w-56">
          <span className="text-black text-4xl font-extrabold tracking-tight">
            NODE
          </span>
        </PopupTitle>

        <PopupTitle className="w-80 absolute top-10 left-40 translate-x-2 whitespace-nowrap">
          <span className="text-black text-sm font-bold">
            Linjeforeningen for kunstig intelligens
          </span>
        </PopupTitle>
      </div>

      {/* Ikonene */}
      <AppIcon src="/icons/folder.png" label="Bedkom" offset="-mb-2" />
      <AppIcon src="/icons/PC.png" label="ProKom" />
      <AppIcon src="/icons/paint.png" label="SosKom" />
      <AppIcon src="/icons/money.png" label="ØkoKom" />
      <AppIcon src="/icons/camera.png" label="PR-gruppen" />
      <AppIcon src="/icons/phone.png" label="Kontakt oss" />
    </div>
  );
}