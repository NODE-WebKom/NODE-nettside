import Image from "next/image";
import Hero from "@/components/Hero";
import { ReactNode } from "react";

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
    <div className="flex flex-col gap-2">
      <AppIcon src="/icons/folder.png" label="Bedkom" offset="-mb-2" />
      <AppIcon src="/icons/PC.png" label="ProKom" />
      <AppIcon src="/icons/paint.png" label="SosKom" />
      <AppIcon src="/icons/money.png" label="ØkoKom" />
      <AppIcon src="/icons/camera.png" label="PR-gruppen" />
      <AppIcon src="/icons/phone.png" label="Kontakt oss" />

    </div>
  );
}