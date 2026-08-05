"use client";
import { useState } from "react";
import Image from "next/image";
import { useWindowManager } from "../WindowManagerContext";

import WallpaperContent from "./settings/wallpaperContent";
import MediaPlayerContent from "./settings/mediaPlayerContent";
import GeneralContent from "./settings/generalContent";


const settingButtons = [
  { id: "general", title: "General", icon: "",
    width: 440, height: 480, content: <GeneralContent />},

  { id: "media player", title: "Media Player", icon: "", 
    width: 470, height: 320, content: <MediaPlayerContent />},

  { id: "wallpaper", title: "Wallpaper", icon: "", 
    width: 730, height: 460, content: <WallpaperContent />},
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

        {/* om oss tekst ------------------------*/}
        <button
          onClick={() => setActiveTab("om oss")}
          className={`w-26 h-12 bg-[#5cb1c8] border-l-8 border-l-[#4e8696] border-b-2 border-b-[#4e8696] border-r-2 border-r-[#76cbe0]
                    transition-transform duration-150 hover:border-l-12 hover:w-28
                    ${activeTab === "om oss" ? "border-l-12 w-28": "w-26"}`}>
          
          <span className="text-white text-sm text-shadow-lg -rotate-90 whitespace-nowrap">Om oss</span>


        </button>
        
        {/* placeholder1 tekst -------------------*/}
        <button
          onClick={() => setActiveTab("placeholder1")}
          className={`w-26 h-12 bg-[#970e6f] border-l-8 border-l-[#6b154f] border-b-2 border-b-[#6b154f] border-r-2 border-r-[#b71d89]
                    transition-transform duration-150 hover:border-l-12 hover:w-28
                    ${activeTab === "placeholder1" ? "border-l-12 w-28" : "w-26"}`}>

            <span className="text-white text-sm text-shadow-lg -rotate-90 whitespace-nowrap">placeholder1</span>
          
                    
        </button>
        
        {/* hovedstyret tekst -----------------------*/}
        <button
          onClick={() => setActiveTab("hovedstyret")}
           className={`w-26 h-12 bg-[#f5b847] border-l-8 border-l-[#c49133] border-b-2 border-b-[#c49133] border-r-2 border-r-[#fcce7e]
                    transition-transform duration-150 hover:border-l-12 hover:w-28
                    ${activeTab === "hovedstyret" ? "border-l-12 w-28" : "w-26"}`}>
          
          <span className="text-white text-sm text-shadow-lg -rotate-90 whitespace-nowrap">Hovedstyret</span>


        </button>
        
        {/* innstillinger tekst --------------------------- */}
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
        {activeTab === "om oss" && <p className="text-xs"> info om oss :P </p>}
        {activeTab === "placeholder1" && <p className="text-xs"> info om idk enda :P </p>}
        {activeTab === "hovedstyret" && <p className="text-xs"> info om idk enda 2 :P </p>}


        {activeTab === "instillinger" && 
        
          <div className="flex flex-col gap-2">
            {settingButtons.map((setting) => (

              <button
                key={setting.id}
                onClick={() =>
                  openWindow({
                    id: setting.id,
                    title: setting.title,
                    icon: setting.icon,
                    width:setting.width,
                    height:setting.height,
                    content: setting.content,
                  })
                }
                className="flex items-center gap-3 rounded px-3 py-2 text-left hover:bg-black/5 border border-black/10"
              >
                <span className="text-sm">{setting.title}</span>
              </button>
            ))}

          </div>
        }
      </div>
    </div>
  )
}