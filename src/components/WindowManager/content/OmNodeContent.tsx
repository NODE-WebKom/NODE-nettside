"use client";
import { useState } from "react";
import Image from "next/image";

export default function OmNodeContent() {
  const [activeTab, setActiveTab] = useState<"om oss" | "placeholder1" | "placeholder2" | "hovedstyret">("om oss");

  return (
    // blå boks
    <div className ="bg-item-blue w-[575px] h-[365px] p-[8px]
      border-t-2 border-l-2 border-b-2 border-r-2 
      border-t-item-blue-light border-l-item-blue-light 
      border-b-item-blue-dark border-r-item-blue-dark"
    >

      {/* HALVSIRKEL PÅ TOPPEN */}
      <div
        className="absolute top-[51px] left-[295px] -translate-x-1/2 w-25 h-6 bg-win-bg-gray"
        style={{  borderRadius: "0 0 50% 50% / 0 0 100% 100%",
                  borderLeft: "8px solid var(--color-item-blue)",
                  borderRight: "8px solid var(--color-item-blue)",
                  borderBottom: "10px solid var(--color-item-blue)",
                  borderTop: "none",
         }}
      />

      {/* HALVSIRKEL PÅ BUNNEN */}
      <div className="absolute bottom-[14px] left-[295px] -translate-x-1/2">

        {/* Ekstra hvit stripe som dekker skyggen til papiret */}
        <div className="w-[104px] h-[2px] bg-white mx-auto" />

        <div
          className="w-30 h-6 bg-white"
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
        className="absolute left-[295px] -translate-x-1/2 w-[2px] top-[80px] bottom-[40px]"
        style={{ backgroundColor: "var(--color-win-bg-gray)" }}
      />

      {/* bokmerke-knappene */}
      <div className="absolute left-[584px] top-16 flex flex-col z-10">
        <button
          onClick={() => setActiveTab("om oss")}
          className={`w-26 h-12 bg-[#5cb1c8] border-l-8 border-l-[#4e8696] border-b-2 border-b-[#4e8696] border-r-2 border-r-[#76cbe0]
                    transition-transform duration-150 hover:border-l-12 hover:w-28
                    ${activeTab === "om oss" ? "border-l-12 w-28": "w-26"}`}>
          
          <span className="text-white text-sm text-shadow-lg -rotate-90 whitespace-nowrap">Om oss</span>


        </button>
        
        <button
          onClick={() => setActiveTab("placeholder1")}
          className={`w-26 h-12 bg-[#970e6f] border-l-8 border-l-[#6b154f] border-b-2 border-b-[#6b154f] border-r-2 border-r-[#b71d89]
                    transition-transform duration-150 hover:border-l-12 hover:w-28
                    ${activeTab === "placeholder1" ? "border-l-12 w-28" : "w-26"}`}>

            <span className="text-white text-sm text-shadow-lg -rotate-90 whitespace-nowrap">placeholder1</span>
          
                    
        </button>
        
        <button
          onClick={() => setActiveTab("placeholder2")}
           className={`w-26 h-12 bg-[#f5b847] border-l-8 border-l-[#c49133] border-b-2 border-b-[#c49133] border-r-2 border-r-[#fcce7e]
                    transition-transform duration-150 hover:border-l-12 hover:w-28
                    ${activeTab === "placeholder2" ? "border-l-12 w-28" : "w-26"}`}>
          
          <span className="text-white text-sm text-shadow-lg -rotate-90 whitespace-nowrap">placeholder2</span>


        </button>
        
        <button
          onClick={() => setActiveTab("hovedstyret")}
           className={`w-26 h-12 bg-[#226628] border-l-8 border-l-[#1B441F] border-b-2 border-b-[#1B441F] border-r-2 border-r-[#35843b]
                    transition-transform duration-150 hover:border-l-12 hover:w-28
                    ${activeTab === "hovedstyret" ? "border-l-12 w-28" : "w-26"}`}>
            
            <span className="text-white text-sm text-shadow-lg -rotate-90 whitespace-nowrap">Hovedstyret</span>

        </button>
      </div>

      {/* hvit boks */}
      <div className =" bg-white w-full h-full p-2 z-20
        border-t-2 border-l-2 border-b-2 border-r-2 
        border-t-white border-l-white 
        border-b-win-bg-gray border-r-win-bg-gray"
      >
        {activeTab === "om oss" && <p className="text-xs"> info om oss :P </p>}
        {activeTab === "placeholder1" && <p className="text-xs"> info om idk enda :P </p>}
        {activeTab === "placeholder2" && <p className="text-xs"> info om idk enda 2 :P </p>}
        {activeTab === "hovedstyret" && <p className="text-xs"> info om hovedstyret:P </p>}

        {/* innhold */}
      </div>
    </div>
  )
}