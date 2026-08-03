"use client";
import { useState } from "react";
import Image from "next/image";

//dette er desverre hardcoda for å 
// se bra ut, om du ønsker at den er 
// responsive så er det bare å prøve å fikse det, jeg orker ikke

export default function MasterinfoContent() {
  const [selected, setSelected] = useState<number | null>(null);

  const items = [
    { name: "fil 1", content: "hei på deg" },
    { name: "fil 2", content: "hei på deg 2" },
    { name: "fil 3", content: "hei på deg 3" },
  ];

  const windowTitle = "Master info"; 

  return (
    <div className="grid grid-cols-[250fr_680fr] grid-rows-[auto_1fr] gap-x-2 gap-y-[2px]">

      {/* Label venstre */}
      <div className="bg-win-bg-gray h-full flex items-center px-1
                    border-t-2 border-l-2 border-b-2 border-r-2
                    border-t-win-bg-dark-gray border-l-win-bg-dark-gray
                    border-b-white border-r-white">
        <p>Alle filer</p>
      </div>

      {/* Label høyre */}
      <div className="bg-win-bg-gray h-full flex items-center px-1
                    border-t-2 border-l-2 border-b-2 border-r-2
                    border-t-win-bg-dark-gray border-l-win-bg-dark-gray
                    border-b-white border-r-white">
        <p> Innhold i  {selected !== null ? items[selected].name : ""}</p>
      </div>

      {/* Innhold venstre*/}
      <div className="bg-white aspect-[182/360] p-2
            border-t-2 border-l-2 border-b-2 border-r-2 
            border-t-win-dark-shadow border-l-win-dark-shadow
            border-b-white border-r-white"
      >
        <div className="text-sm select-none">

          {/* Rot: Datamaskin ----------------------------------*/}
          <div className="relative flex items-center -left-[3px] h-6">
            <div className="relative flex items-center h-6 gap-2">
              <Image
                src="/window-elements/computerPlaceholder.png"
                alt="Datamaskin"
                width={16}
                height={16}
              />
              <span className="text-lg">Datamaskin</span>
            </div>
          </div>

          {/* Nivå 1:-------------*/}
          <div className="relative pl-1">

            {/* linje */}
            <div className="absolute left-[5px] -top-[5px] h-6 border-l border-dotted border-black" />
            <div className="relative flex items-center">
              
              {/* linje */}
              <div className="absolute left-[6px] top-1/2 w-2 border-t border-dotted border-black" />
              {/* firekant */}
              <span className="relative w-3 h-3 -left-[4px] border border-black bg-white shrink-0
                              flex items-center justify-center text[8px] leading-none">
                -
              </span>            
              
              <Image
                src="/window-elements/folderPlaceholder.png"
                alt="Datamaskin"
                width={20}
                height={20}
              />
              <span className="ml-1 text-lg">{windowTitle}</span>
            </div>

            {/* Nivå 2: ------------- */}
            <div className="relative pl-1">

              {/* linje */}
              <div className="absolute left-[22px] -top-[4px] bottom-2 border-l border-dotted border-black" />

              {items.map((item, i) => (
                <div key={i} className="relative flex items-center h-6">

                  {/* linje */}
                  <div className="absolute left-[26px] top-1/2 w-2 border-t border-dotted border-black" />
                  {/* firekant */}
                  <span className="relative z-10 w-3 h-3 left-[13px] border border-black bg-white shrink-0
                                  flex items-center justify-center text[8px] leading-none">
                    -
                  </span>

                  <button
                    onClick={() => setSelected(i)}
                    className={`ml-6 text-left text-base px-1 py-0.5 w-full h-6
                              ${selected === i ? "bg-win-blue text-white" : "hover:bg-win-blue hover:text-white"}`}
                  >
                    {item.name}
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Innhold høyre*/}
      <div className="bg-white h-full p-2
          border-t-2 border-l-2 border-b-2 border-r-2 
          border-t-win-dark-shadow border-l-win-dark-shadow
          border-b-white border-r-white"
      >
        <p>{selected !== null ? items[selected].content : ""}</p>
      </div>

    </div>
  );
}