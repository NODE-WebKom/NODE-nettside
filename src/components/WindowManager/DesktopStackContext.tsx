"use client"

import { createContext, useContext, useRef, ReactNode } from "react";

type DesktopStackContextType = {
    getNextZ: () => number;
};

const DesktopStackContext = createContext<DesktopStackContextType | null>(null);

export function DesktopStackProvider({ children }: { children: ReactNode }) {
    const topZRef = useRef(100);

    const getNextZ = () => {
        topZRef.current += 1;
        return topZRef.current;
    };

    return (
        <DesktopStackContext.Provider value ={{ getNextZ }}>
            {children}
        </DesktopStackContext.Provider>
    );
}

export function useDesktopStack() {
    const ctx = useContext(DesktopStackContext);
    if (!ctx) {
        throw new Error("useDesktopStack må brukes inni en DesktopStackProvider");
    }
    return ctx;
}