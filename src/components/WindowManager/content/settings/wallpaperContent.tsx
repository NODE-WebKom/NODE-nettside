"use client";

import { useState } from "react";
import Image from "next/image";
import { useWallpaper, Wallpaper } from "../../../Wallpaper/WallpaperContext";

//kan bytte farger senere
const wallpaperColors: { id: string; value: string }[] = [
  { id: "nilsBlue", value: "#60c5d9" },
  { id: "lightblue", value: "#8799b3" },
  { id: "teal", value: "#008080" },
  { id: "purple", value: "#6b6996" },
  { id: "pink", value: "#fcb5cd" },
  { id: "green", value: "#92bf66" },
  { id: "red", value: "#c44141" },
];

//må bytte ut med bedre kvalitet
const wallpaperImages: { id: string; value: string }[] = [
  { id: "img1", value: "/wallpapers/original.jpg" },
  { id: "img3", value: "/wallpapers/rain.jpg" },
  { id: "img4", value: "/wallpapers/retro.avif" },
  { id: "img5", value: "/wallpapers/sunset.jpg" },
  { id: "img6", value: "/wallpapers/mountains.jpeg" },
];

export default function WallpaperContent() {
  const { wallpaper, setWallpaper } = useWallpaper();

  //  forhåndsvisningen
  const [draft, setDraft] = useState<Wallpaper>(wallpaper);

  const isDirty = draft.type !== wallpaper.type || draft.value !== wallpaper.value;

  const previewStyle: React.CSSProperties =
    draft.type === "color"
      ? { backgroundColor: draft.value }
      : {
          backgroundImage: `url(${draft.value})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };

  function isSelected(type: Wallpaper["type"], value: string) {
    return draft.type === type && draft.value === value;
  }

  function handleSave() {
    setWallpaper(draft);
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* PREVIEW */}
      <div
        className="relative w-[184px] h-34 -top-2 left-[242px]"
        style={previewStyle}
      />

      <Image
        src="/window-elements/pcFrame.png"
        alt="CD"
        width={260}
        height={260}
        className="absolute top-9 left-60"
      />

     
        {/* FARGER */}
        <div>
          <p className="relative bg-win-bg-gray w-12 top-3 left-2 
                        text-base mt-4 pl-1 pr-1">Farger</p>

          <div className="border-1 border-t-win-bg-dark-gray border-l-win-bg-dark-gray border-r-white border-b-white">  
            <div className="flex gap-2 border-1 p-4
                            border-t-white border-l-white border-r-win-bg-dark-gray border-b-win-bg-dark-gray">

              {wallpaperColors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setDraft({ type: "color", value: c.value })}
                  className={`w-8 h-8 border-2 ${
                    isSelected("color", c.value) ? "border-black" : "border-win-dark-shadow"
                  }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

        </div>
      

        {/* BILDER */}
        <div>
          <p className="relative bg-win-bg-gray w-12 top-3 left-2 
                        text-base pl-1 pr-1">Bilder</p>
          
          <div className="border-1 border-t-win-bg-dark-gray border-l-win-bg-dark-gray border-r-white border-b-white">  
            <div className="grid grid-cols-5 gap-2 border-1 p-4
                            border-t-white border-l-white border-r-win-bg-dark-gray border-b-win-bg-dark-gray">
               
            {wallpaperImages.map((img) => (
              <button
                key={img.id}
                onClick={() => setDraft({ type: "image", value: img.value })}
                className={`h-16 border-2 bg-cover bg-center ${
                  isSelected("image", img.value) ? "border-black" : "border-win-dark-shadow"
                }`}
                style={{ backgroundImage: `url(${img.value})` }}
              />
            ))}
            </div>
          </div>
          

      </div>

      {/* LAGRE */}
      <button
        onClick={handleSave}
        disabled={!isDirty}
        className="self-end px-4 py-1 bg-win-bg-gray 
                border-2 border-t-white border-l-white 
                border-b-win-dark-shadow border-r-win-dark-shadow disabled:opacity-50
                
                hover:border-b-white hover:border-r-white
                hover:border-t-win-dark-shadow hover:border-l-win-dark-shadow"
      >
        Lagre
      </button>
    </div>
  );
}