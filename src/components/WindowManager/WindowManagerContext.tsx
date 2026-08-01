"use client"

import {createContext, useContext, useState, useCallback, ReactNode, useRef} from "react";

export type WindowData = {
    id: string;
    title: string;
    icon?: string;
    content: ReactNode;
    x: number;
    y:number;
    width?: number;
    height?: number;
    zIndex: number;
};

type OpenWindowOptions = {
    id: string;
    title: string;
    icon?: string;
    content: ReactNode;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
};

type WindowManagerContextType = {
    windows: WindowData[];
    openWindow: (opts: OpenWindowOptions) => void;
    closeWindow: (id:string) => void;
    focusWindow:(id: string) => void;
    updatePostition: (id:string, x:number, y:number) => void;
};
 
const WindowManagerContext = createContext <WindowManagerContextType | null>(null);

export function WindowManagerProvider({ children}: {children: ReactNode }) {
    const [windows, setWindows] = useState<WindowData[]> ([]);
    const topZRef = useRef(100);

    //
    const openWindow = useCallback(
        (opts: OpenWindowOptions) => {
            topZRef.current += 1;
            const newZ = topZRef.current;
            
            setWindows((prev) => {
                const exisits = prev.find((w) => w.id === opts.id);
                
                if (exisits) {
                    return prev.map((w) => (w.id === opts.id ? {...w, zIndex: newZ} : w))
                }
                return [
                    ...prev,
                    {
                        id: opts.id,
                        title: opts.title,
                        icon: opts.icon,
                        content: opts.content,
                        x: opts.x ?? 120 + prev.length * 24,
                        y: opts.y ?? 120 + prev.length * 24,
                        width: opts.width,
                        height: opts.height,
                        zIndex: newZ,
                    },
                ];
            });     
        },[]);

    //
    const closeWindow = useCallback((id: string) => {
        setWindows((prev) => prev.filter((w) => w.id !== id));
    }, []);

    const focusWindow = useCallback((id: string) => {
        topZRef.current += 1;
        const newZ = topZRef.current;

        setWindows((prev) => 
            prev.map((w) => (w.id === id ? {...w, zIndex: newZ } : w))
        );
    }, []);

    //..
    const NAVBAR_HEIGHT = 64;

    const updatePostition = useCallback((id: string, x:number, y: number) => {
        setWindows((prev) => prev.map((w) => {
            if (w.id !== id) return w;

            const maxY = window.innerHeight - NAVBAR_HEIGHT - 40; // 40px = minimum synlig tittelbar
            const maxX = window.innerWidth - 40; // la minst 40px av vinduet være synlig til høyre

            const clampedX = Math.min(Math.max(x, -((w.width ?? 200) - 40)), maxX);
            const clampedY = Math.min(Math.max(y, 0), maxY);

            return { ...w, x: clampedX, y: clampedY };
        }));
    }, []);

    return (
        <WindowManagerContext.Provider value = {{windows, openWindow, closeWindow, focusWindow, updatePostition}}>
            {children}
        </WindowManagerContext.Provider>  
    );
}

export function useWindowManager() {
    const ctx = useContext(WindowManagerContext);

    if(!ctx) {
        throw new Error("useWindowManager må brukes inni en WIndowManegerProvider")
    }

    return ctx;
}