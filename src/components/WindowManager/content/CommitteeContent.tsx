"use client";

import { useState } from "react";
import Image from "next/image";

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

    if (!activeTab){
        return <p>Komiteen har ikke noe innhold enda D:</p>
    }

    return (
        <div className="w-full max-w-4xl">
            <div className="flex">
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
            <div className="grid h-[345px] grid-cols-[1fr_200px] bg-win-bg-gray p-6
                            border-2 border-t-white border-l-white
                            border-b-win-dark-shadow border-r-win-dark-shadow"
            >
            
                {/* tekst */}
                <div className="pr-4 text-sm text-black leading-relaxed whitespace-pre-line">
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
                <div className="relative h-full w-full overflow-hidden">
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