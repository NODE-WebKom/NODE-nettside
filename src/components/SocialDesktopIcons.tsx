"use client";

import Image from "next/image";
import { useWallpaper } from "@/components/Wallpaper/WallpaperContext";
import { getWallpaperTextColor } from "@/lib/wallpaperTextColor";

// Sosiale medier - lå tidligere i "vis skjulte ikoner"-brettet i navbaren,
// men ligger na som vanlige skrivebordsikoner nederst til høyre, rett over navbaren.
type SocialIcon = {
  id: string;
  src: string;
  label: string;
  href: string;
};

const socialIcons: SocialIcon[] = [
  {
    id: "mail",
    src: "/icons/mail.png",
    label: "Mail",
    href: "mailto:node@uib.no?subject=Kontakt%20fra%20nettsiden&body=Hei%20NODE!%0A%0A",
  },
  {
    id: "insta",
    src: "/icons/insta.png",
    label: "Instagram",
    href: "https://www.instagram.com/node.uib/",
  },
  {
    id: "linkedin",
    src: "/icons/linkedin.png",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/node-aiki/",
  },
];

function SocialIconButton({ icon }: { icon: SocialIcon }) {
  const { wallpaper } = useWallpaper();
  const textColor = getWallpaperTextColor(wallpaper);

  function handleClick() {
    if (icon.href.startsWith("mailto:")) {
      window.location.href = icon.href;
    } else {
      window.open(icon.href, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <button
      onClick={handleClick}
      className="group relative w-20 h-24 hover:bg-gray-600/30"
    >
      <Image
        src={icon.src}
        alt=""
        width={64}
        height={64}
        unoptimized
        className="image-pixelated mx-auto -mb-1"
      />

      <span
        className={`
        text-sm
        leading-none
        text-center
        group-hover:text-white
        ${textColor === "white" ? "text-white" : "text-black"}
      `}
      >
        <span className="underline">{icon.label[0]}</span>
        {icon.label.slice(1)}
      </span>
    </button>
  );
}

// Plasseres nederst til høyre pa selve skrivebordet (DesktopCanvas), slik at
// ikonene skalerer sammen med resten av skrivebordet og havner rett over navbaren.
export default function SocialDesktopIcons() {
  return (
    <div className="absolute bottom-2 right-2 flex flex-row items-end gap-1 z-0">
      {socialIcons.map((icon) => (
        <SocialIconButton key={icon.id} icon={icon} />
      ))}
    </div>
  );
}
