"use client"; 
import { useState } from "react";
import Image from "next/image";
import { useWindowManager } from "../WindowManagerContext";

import WallpaperContent from "./settings/wallpaperContent";
import MusicPlayerContent from "./settings/musicPlayerContent";
import GeneralContent from "./settings/generalContent";


const settingButtons = [
  { id: "general", title: "System Properties",
    width: 550, height: 600, content: <GeneralContent />,
    src: "/icons/gears.png" },

  { id: "music player", title: "Music Player", 
    width: 470, height: 320, content: <MusicPlayerContent />,
    src: "/icons/cd.png" },

  { id: "wallpaper", title: "Wallpaper", 
    width: 730, height: 540, content: <WallpaperContent />,
    src: "/icons/wallpaper.png" },
]
 
export default function OmNodeContent() {
  const [activeTab, setActiveTab] = useState<"om oss" | "placeholder1" | "hovedstyret" | "instillinger">("om oss");
  const { openWindow } = useWindowManager();

  return (
    // blå boks
    <div className =" relative bg-item-blue w-[575px] h-[380px] p-[8px]
      border-t-2 border-l-2 border-b-2 border-r-2  rounded-sm
      border-t-item-blue-light border-l-item-blue-light 
      border-b-item-blue-dark border-r-item-blue-dark"
    >

      {/* HALVSIRKEL PÅ TOPPEN ------------*/}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-25 h-6 bg-win-bg-gray"
        style={{  borderRadius: "0 0 50% 50% / 0 0 100% 100%",
                  borderLeft: "8px solid var(--color-item-blue)",
                  borderRight: "8px solid var(--color-item-blue)",
                  borderBottom: "10px solid var(--color-item-blue)",
                  borderTop: "none",
         }}
      >
        {/* Ekstra grå stripe */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-[84px] bg-win-bg-gray z-10"
          style={{ top: "-2px", height: "2px" }} />
      
      </div>

      {/* HALVSIRKEL PÅ BUNNEN ------------*/}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">

        {/* Ekstra hvit stripe */}
        <div className="w-[104px] h-[4px] bg-[#f2f2f2] mx-auto" />

        <div
          className="w-30 h-6 bg-[#f2f2f2]"
          style={{
            borderRadius: "0 0 50% 50% / 0 0 100% 100%",
            borderLeft: "8px solid var(--color-item-blue)",
            borderRight: "8px solid var(--color-item-blue)",
            borderBottom: "10px solid var(--color-item-blue)",
            borderTop: "none",
          }}
        />
      </div>

      {/* STREK MELLOM SIRKLENE */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[2px] top-10 bottom-4 
                  border-r-1 border-r-win-bg-gray border-l-1 border-l-white"
      />

      {/* bokmerke-knappene */}
      <div className="absolute -right-26 top-5 flex flex-col z-10">

        {/* om oss knapp*/}
        <button
          onClick={() => setActiveTab("om oss")}
          className={`w-26 h-12 bg-[#5cb1c8] border-l-8 border-l-[#4e8696] border-b-2 border-b-[#4e8696] border-r-2 border-r-[#76cbe0]
                    transition-transform duration-150 hover:border-l-12 hover:w-28
                    ${activeTab === "om oss" ? "border-l-12 w-28": "w-26"}`}>
          
          <span className="text-white text-sm text-shadow-lg -rotate-90 whitespace-nowrap">Om oss</span>


        </button>
        
        {/* placeholder1 knapp */}
        <button
          onClick={() => setActiveTab("placeholder1")}
          className={`w-26 h-12 bg-[#970e6f] border-l-8 border-l-[#6b154f] border-b-2 border-b-[#6b154f] border-r-2 border-r-[#b71d89]
                    transition-transform duration-150 hover:border-l-12 hover:w-28
                    ${activeTab === "placeholder1" ? "border-l-12 w-28" : "w-26"}`}>

            <span className="text-white text-sm text-shadow-lg -rotate-90 whitespace-nowrap">placeholder1</span>
          
                    
        </button>
        
        {/* hovedstyret knapp*/}
        <button
          onClick={() => setActiveTab("hovedstyret")}
           className={`w-26 h-12 bg-[#f5b847] border-l-8 border-l-[#c49133] border-b-2 border-b-[#c49133] border-r-2 border-r-[#fcce7e]
                    transition-transform duration-150 hover:border-l-12 hover:w-28
                    ${activeTab === "hovedstyret" ? "border-l-12 w-28" : "w-26"}`}>
          
          <span className="text-white text-sm text-shadow-lg -rotate-90 whitespace-nowrap">Hovedstyret</span>


        </button>
        
        {/* innstillinger knapp  */}
        <button
          onClick={() => setActiveTab("instillinger")}
           className={`w-26 h-12 bg-[#226628] border-l-8 border-l-[#1B441F] border-b-2 border-b-[#1B441F] border-r-2 border-r-[#35843b]
                    transition-transform duration-150 hover:border-l-12 hover:w-28
                    ${activeTab === "instillinger" ? "border-l-12 w-28" : "w-26"}`}>
            
            <span className="text-white text-sm text-shadow-lg -rotate-90 whitespace-nowrap">Instillinger</span>

        </button>
      </div>

      {/* hvit boks */}
      <div className =" bg-[#f2f2f2] w-full h-full p-2 z-20
        border-t-2 border-l-2 border-b-2 border-r-2 
        border-t-white border-l-white 
        border-b-win-bg-gray border-r-win-bg-gray"
      >
        {/* om oss tekst---------------------------------- */}
        {activeTab === "om oss" && 
          <div className="flex flex-col m-4 gap-4 w-[240px]">
            <h1 className="text-5xl">Om oss</h1>
            <span className="text-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. 
                Quisque faucibus ex sapien vitae pellentesque sem placerat. 
                In id cursus mi pretium tellus duis convallis. Tempus leo eu 
                aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus
                 nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia 
                 integer nunc posuere.
            </span>
          </div>
        }

        {/* Placeholder tekst---------------------------------- */}
        {activeTab === "placeholder1" && 
          <div className="flex flex-col m-4 gap-4 w-[240px]">

            <h1 className="text-5xl">placeholder</h1>
            <span className="text-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. 
                Quisque faucibus ex sapien vitae pellentesque sem placerat. 
                In id cursus mi pretium tellus duis convallis. Tempus leo eu 
                aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus
                nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia 
                integer nunc posuere.
            </span>
          </div>
        }

        {/* hovedstyre tekst---------------------------------- */}
        {activeTab === "hovedstyret" && 
          <div className="grid grid-cols-[1fr_200px] gap-x-[65px] h-full">

            {/* venstre side*/}
            <div className="flex flex-col m-4 gap-4 overflow-hidden">
              <h1 className="text-5xl">Hovedstyret</h1>
              <span className="text-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. 
                Quisque faucibus ex sapien vitae pellentesque sem placerat. 
                In id cursus mi pretium tellus duis convallis. Tempus leo eu 
                aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus
                nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia 
                integer nunc posuere.
              </span>
            </div>

            {/* høyre side (placeholder, bytter påd ette utifra hva fokk vil)*/}
            <div className="relative w-[150px] h-[200px] top-18">
              <Image
                src="/pictures/magnus.jpg"
                alt="person"
                fill
                unoptimized
                className="object-cover"
              />
              <p className="relative top-52 left-5">❮ Tittel til person ❯</p>
            </div>

          </div>
        }

        {/* instillinger tekst---------------------------------- */}
        {activeTab === "instillinger" && 
        
          <div className="flex flex-col m-4 gap-4">
            <h1 className="text-5xl">Innstillinger</h1>

            {settingButtons.map((setting) => (

              <button
                key={setting.id}
                onClick={() =>
                  openWindow({
                    id: setting.id,
                    title: setting.title,
                    icon: setting.src,
                    width:setting.width,
                    height:setting.height,
                    content: setting.content,
                  })
                }
                className="flex items-center px-2 gap-4
                          bg-[#f2f2f2] w-[200px] h-[45px]
                          hover:bg-win-blue hover:text-white"
              >
                <Image
                  src={setting.src}
                  alt="icon"
                  width={32}
                  height={32}
                  unoptimized
                  className="image-pixelated scale-[1.25] origin-center shrink-0"
                />  

                <span className="text-lg">
                  <span className="underline">
                    {setting.title[0]}
                  </span>
                  {setting.title.slice(1)}
                </span>

              </button>
            ))}

          </div>
        }
      </div>
    </div>
  )
}