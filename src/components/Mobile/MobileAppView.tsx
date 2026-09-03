"use client"
//felles fullskjerm for appene, med tittel og lukkeknapp

import { ReactNode } from "react";

type MobileAppViewProps = {
    title: string;
    onClose: () => void;
    children: ReactNode;
    background?: string; // valgfri egen bakgrunnsfarge (f.eks. gul for arrangementer)
};

export default function MobileAppView({title, onClose, children, background} : MobileAppViewProps){
    return(
        <div
            className="fixed inset-0 z-[20000] flex flex-col bg-win-bg-gray"
            style={background ? { background } : undefined}
        >
            <header className="flex h-16 shrink-0 items-center bg-win-blue px-3 text-white">
                <h1 className="text-lg">
                    {title}
                </h1>
            </header>
            
            {/* pb-20 gir plass sa innholdet ikke havner bak Lukk-knappen nederst */}
            <main className="flex flex-1 min-h-0 flex-col overflow-y-auto p-4 pb-20">
                {children}
            </main>

            <button
                onClick={onClose}
                className="absolute bottom-4 right-4 z-10 flex h-9 w-25 items-center justify-center bg-win-bg-gray text-black
                            border-2 border-t-white border-l-white
                            border-b-win-dark-shadow border-r-win-dark-shadow"
            >
                Lukk
            </button>
        </div>
    );
}
