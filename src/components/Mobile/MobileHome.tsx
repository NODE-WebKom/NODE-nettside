"use client";
// Alle appene fordelt på sider du swiper gjennom
// css scroll-snap <3

import Image from "next/image";
import { useEffect, useRef } from "react";

const PAGE_COUNT = 4; // må oppdateres om du legger til/fjerner en <section>-side

type MobileHomeProps = {
  onOpenApp: (id: string) => void;
  activePage: number;
  onPageChange: (page: number) => void;
};

type AppIconProps = {
    id: string;
    label: string;
    icon: string;
    onOpenApp?: (id: string) => void;
    href?: string; // ekstern lenke - apner i ny fane i stedet for a apne som en app
};

function AppIcon({
    id,
    label,
    icon, 
    onOpenApp,
    href,
}:  AppIconProps) {
    const inner = (
        <>
            <Image
                src={icon}
                alt=""
                width={64}
                height={64}
                unoptimized
                className="image-pixelated"
            />

            <span className="text-sm text-white drop-shadow-[1px_1px_0_#000]">
                {label}
            </span>
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-center"
            >
                {inner}
            </a>
        );
    }

    return (
        <button
            onClick={() => onOpenApp?.(id)}
            className="flex flex-col items-center gap-2 text-center"
        >
            {inner}
        </button>
    );
}

export default function MobileHome({onOpenApp, activePage, onPageChange}: MobileHomeProps){
    const scrollRef = useRef<HTMLElement | null>(null);

    // Hopp rett til siden brukeren sist var på
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTo({ left: activePage * el.clientWidth, behavior: "auto" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleScroll() {
        const el = scrollRef.current;
        if (!el || el.clientWidth === 0) return;
        const page = Math.round(el.scrollLeft / el.clientWidth);
        onPageChange(page);
    }

    return (
        <main
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-dvh overflow-x-auto snap-x snap-mandatory pt-[150px]"
        >
            <div className="flex h-full">
                <section className="grid min-w-full snap-start grid-cols-3 content-start gap-x-5 gap-y-8 p-6 pt-6">
                    <AppIcon
                        id="arrangementer"
                        label="Arrangementer"
                        icon="/icons/postIt.png"
                        onOpenApp={onOpenApp}
                    />

                    <AppIcon
                        id="chatbot"
                        label="Chatbot"
                        icon="/icons/chatBubble.png"
                        onOpenApp={onOpenApp}
                    />

                    <AppIcon
                        id="annonser"
                        label="Annonser"
                        icon="/icons/news.png"
                        onOpenApp={onOpenApp}
                    />

                    <AppIcon
                        id="mail"
                        label="Mail"
                        icon="/icons/mail.png"
                        href="mailto:node@uib.no?subject=Kontakt%20fra%20nettsiden&body=Hei%20NODE!%0A%0A"
                    />

                    <AppIcon
                        id="instagram"
                        label="Instagram"
                        icon="/icons/insta.png"
                        href="https://www.instagram.com/node.uib/"
                    />

                    <AppIcon
                        id="linkedin"
                        label="LinkedIn"
                        icon="/icons/linkedin.png"
                        href="https://www.linkedin.com/company/node-aiki/"
                    />

                    <AppIcon
                        id="om-node"
                        label="Om NODE"
                        icon="/icons/book.png"
                        onOpenApp={onOpenApp}
                    />
                </section>

                {/* Andre app-side */}
                <section className="grid min-w-full snap-start grid-cols-3 content-start gap-x-5 gap-y-8 p-6 pt-6">
                    <AppIcon
                        id="bedkom"
                        label="Bedkom"
                        icon="/icons/folder.png"
                        onOpenApp={onOpenApp}
                    />

                    <AppIcon
                        id="prokom"
                        label="ProKom"
                        icon="/icons/PC.png"
                        onOpenApp={onOpenApp}
                    />

                    <AppIcon
                        id="soskom"
                        label="SosKom"
                        icon="/icons/paint.png"
                        onOpenApp={onOpenApp}
                    />

                    <AppIcon
                        id="okokom"
                        label="ØkoKom"
                        icon="/icons/money.png"
                        onOpenApp={onOpenApp}
                    />

                    <AppIcon
                        id="pr"
                        label="PR-gruppen"
                        icon="/icons/camera.png"
                        onOpenApp={onOpenApp}
                    />
                </section>

                {/* Tredje app-side */}
                <section className="grid min-w-full snap-start grid-cols-3 content-start gap-x-5 gap-y-8 p-6 pt-6">
                    <AppIcon
                        id="aiki"
                        label="Hva er AIKI?"
                        icon="/icons/paper.png"
                        onOpenApp={onOpenApp}
                    />

                    <AppIcon
                        id="fagressurser"
                        label="Fagressurser"
                        icon="/icons/calculator.png"
                        onOpenApp={onOpenApp}
                    />

                    <AppIcon
                        id="masterinfo"
                        label="Masterinfo"
                        icon="/icons/cap.png"
                        onOpenApp={onOpenApp}
                    />

                    <AppIcon
                        id="utveksling"
                        label="Utveksling"
                        icon="/icons/earth.png"
                        onOpenApp={onOpenApp}
                    />

                    <AppIcon
                        id="merch"
                        label="Merch"
                        icon="/icons/t_shirt.png"
                        href="https://node.myspreadshop.no/all"
                    />
                </section>

                {/* fjerde app-side (spill) */}
                <section className="grid min-w-full snap-start grid-cols-3 content-start gap-x-5 gap-y-8 p-6 pt-6">
                    <AppIcon
                        id="sql_mm"
                        label="SQL MM"
                        icon="/icons/detective.png"
                        href="https://sqlmm.node.uib.no/"
                    />

                    <AppIcon
                        id="hivelink"
                        label="HiveLink"
                        icon="/icons/bee.png"
                        href="https://www.hivelink.buzz/"
                    />
                </section>

            </div>

            {/* prikker som viser hvilken side du er på */}
            <div className="pointer-events-none fixed inset-x-0 bottom-10 z-[20005] flex justify-center gap-3">
                {Array.from({ length: PAGE_COUNT }).map((_, page) => (
                    <span
                        key={page}
                        className={`h-[10px] w-[10px] rounded-full border border-black/40 transition-colors ${
                            page === activePage ? "bg-white" : "bg-white/30"
                        }`}
                    />
                ))}
            </div>
        </main>
    )
}
