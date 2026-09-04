import type { Wallpaper } from "@/components/Wallpaper/WallpaperContext";

// snitt-lysstyrke (YIQ-aktig, 0-255) for hvert bakgrunnsbilde, målt direkte fra
// bildefilene i public/wallpapers. Brukes til å velge svart eller hvit tekst på
// ikonene som ligger rett oppå bakgrunnen (utenfor navbaren), så teksten alltid
// er lesbar uansett hvilken bakgrunn som er valgt.
const IMAGE_BRIGHTNESS: Record<string, number> = {
  "/wallpapers/mountains.jpeg": 138.7,
  "/wallpapers/original.jpg": 141.5,
  "/wallpapers/rain.jpg": 117.8,
  "/wallpapers/retro.avif": 62.3,
  "/wallpapers/sunset.jpg": 157.5,
};

const BRIGHTNESS_THRESHOLD = 140;

function hexToBrightness(hex: string): number {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

// gir "black" eller "white" ut fra hvor lys/mørk den valgte bakgrunnen er
export function getWallpaperTextColor(wallpaper: Wallpaper): "black" | "white" {
  const brightness =
    wallpaper.type === "color"
      ? hexToBrightness(wallpaper.value)
      : (IMAGE_BRIGHTNESS[wallpaper.value] ?? 128); // ukjent bilde -> midt på treet

  return brightness < BRIGHTNESS_THRESHOLD ? "white" : "black";
}
