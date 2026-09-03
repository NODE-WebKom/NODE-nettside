"use client";

import { useState } from "react";
import Image from "next/image";
import { useIsMobile } from "@/lib/useIsMobile";

export type CommiteeTab = {
    id: string;
    label: string;
    text: string;
    images: string[];
    link?: { url: string; label: string};
};

type CommitteeContentProps = {
    tabs: CommiteeTab[];
};

export default function CommitteeContent({ tabs, } : CommitteeContentProps) {
    const [ activeTabId, setActiveTabId ] = useState(tabs[0]?.id);
    const activeTab = tabs.find((tab) => tab.id === activeTabId);
    const isMobile = useIsMobile() === true;

    if (!activeTab){
        return <p>Komiteen har ikke noe innhold enda D:</p>
    }

    return (
        <div className={`w-full max-w-4xl ${isMobile ? "flex h-full flex-col" : ""}`}>
            <div className={`flex ${isMobile ? "shrink-0" : ""}`}>
                {tabs.map((tab) => {
                    const isActive = tab.id === activeTabId;

                    return (
                        <button 
                            key = {tab.id}
                            onClick={() => setActiveTabId(tab.id)}
                            className= {`relative bg-win-bg-gray px-4 py-1 text-sm rounded-t-sm
                                        border-t-2 border-l-2 border-r-2 
                                        border-t-white border-l-white border-r-win-dark-shadow
                                        
                                        ${isActive 
                                        ?"border-b-0 -mb-[2px] -mt-[2px] -mr-[2px] z-10"
                                        :" hover:bg-win-bg-dark-gray"
                                        }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* innholds boks */}
            <div className={`grid gap-4 bg-win-bg-gray p-4
                            border-2 border-t-white border-l-white
                            border-b-win-dark-shadow border-r-win-dark-shadow
                            ${isMobile
                                ? "min-h-0 flex-1 grid-cols-1 grid-rows-[1fr_auto]"
                                : "h-[345px] grid-cols-[1fr_200px] gap-0 p-6"
                            }`}
            >
            
                {/* tekst */}
                <div className={`text-sm leading-relaxed text-black ${isMobile ? "min-h-0 overflow-y-auto" : "pr-4"}`}>
                    {activeTab.text}
                     {activeTab.link && (
                        <>
                            {" "}
                            <a 
                                href={activeTab.link.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                {activeTab.link.label}
                            </a>
                         </>
                        )}
                    </div>
        
                {/* bilde */}
                <div className={`relative w-full overflow-hidden ${isMobile ? "aspect-[4/3] shrink-0" : "h-full aspect-auto"}`}>
                    <Image
                        src={activeTab.images[0]}
                        alt={activeTab.label}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            
        </div>
    )
}
