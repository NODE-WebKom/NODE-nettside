"use client";
import { useState } from "react";
import Image from "next/image";

const tabs = [
  {key: "om", label: "Om", image: "/pictures/um.jpg", text: "blah blah blah....",},
  {key: "placeholder", label: "placeholder", image: "/pictures/um.jpg", text: "blah blah blah....2",},
  {key: "Bli medlem", label: "Bli medlem", image: "/pictures/um.jpg", text: "blah blah blah....3",},
] as const;

type PageKey = (typeof tabs)[number]["key"];

export default function SoskomContent() {
  const [page, setPage] = useState<PageKey>("om");
  const activeTab = tabs.find((t) => t.key === page)!;

  return (
    <div className="w-full max-w-4xl">

      {/* tabs selecter*/}
      <div className="flex">
        {tabs.map((t) => {
          const isActive = t.key == page;

          return (
            <button 
              key = {t.key}
              onClick={() => setPage(t.key)}
              className={`relative bg-win-bg-gray px-4 py-1 text-sm text-white rounded-t-sm
                          border-t-2 border-l-2 border-r-2 
                          border-t-white border-l-white border-r-win-dark-shadow
                          
                ${isActive 
                  ?"border-b-0 -mb-[2px] -mt-[2px] -mr-[2px] z-10"
                  :" hover:bg-win-bg-dark-gray"
                }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* innholds boks */}
      <div className="bg-win/bg/gray p-6 h-[345px] grid grid-cols-[1fr_200px]
                      border-t-2 border-l-2 border-b-2 border-r-2 
                      border-t-white border-l-white border-b-win-dark-shadow border-r-win-dark-shadow"
      >
        
        {/* tekst */}
        <div className="text-sm text-black leading-relaxed">
          {activeTab.text}
        </div>

        {/* bilde */}
        <div className="relative w-full overflow-hidden">
          <Image
            src={activeTab.image}
            alt={activeTab.label}
            fill
            className="object-cover"
          />
        </div>

      </div>
    </div>
  );
}