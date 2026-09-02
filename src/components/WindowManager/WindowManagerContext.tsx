"use client"

import {createContext, useContext, useState, useCallback, ReactNode, useRef, useDebugValue, useEffect} from "react";
import { useDesktopStack } from "./DesktopStackContext";
import { useDesktopScale } from "@/components/DesktopScale";

export type WindowPosition = {x: number; y: number};

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
    group?: string;
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
    group?:string;
};

type WindowManagerContextType = {
    windows: WindowData[];
    openWindow: (opts: OpenWindowOptions) => WindowPosition;
    closeWindow: (id:string) => void;
    closeAllWindows: () => void;
    focusWindow:(id: string) => void;
    updatePostition: (id:string, x:number, y:number) => void;
};
    
const WindowManagerContext = createContext <WindowManagerContextType | null>(null);

export function WindowManagerProvider({ children}: {children: ReactNode }) {
    const [windows, setWindows] = useState<WindowData[]> ([]);
    const windowsRef = useRef<WindowData[]>([]);

    const { getNextZ} = useDesktopStack();
    const NAVBAR_HEIGHT = 64;

    // henter størrelsen på skjermen
    const { desktopWidth, desktopHeight } = useDesktopScale();

    //holder ref synkronisert med state
    useEffect(() => {
        windowsRef.current = windows;
    }, [windows]);

    //åpner vindu
    const openWindow = useCallback(
        (opts: OpenWindowOptions): WindowPosition => {
            const newZ = getNextZ();

            //eksisterer vinduet allerede
            const existing = windowsRef.current.find((w) => w.id === opts.id);
            if (existing) {
                const updated = windowsRef.current.map((w) =>
                    w.id === opts.id ? { ...w, zIndex: newZ }: w 
            );
                windowsRef.current = updated; //synkron oppdatering
                setWindows(updated);
                return {x: existing.x, y:existing.y};
            }
                
            // åpner vindu i midten + offset hver gang du åpner ny
            const width = opts.width ?? 400;
            const height = opts.height ?? 300;

            const centerX = (desktopWidth - width) /2;
            const centerY = (desktopHeight - height)/2;

            const offset = windowsRef.current.length *24;

            //vi vil huske posisjonen vinduet åpnes i
            const finalX = opts.x ?? centerX + offset;
            const finalY = opts.y ?? centerY + offset;

            const newWindow: WindowData = {
                id: opts.id,
                title: opts.title,
                icon: opts.icon,
                content: opts.content,
                x: finalX,
                y: finalY,
                width: opts.width,
                height: opts.height,
                zIndex: newZ,
                group: opts.group,
            };

            const updated = [...windowsRef.current, newWindow];
            windowsRef.current = updated; // synkron oppdatering, med en gang
            setWindows(updated);

            return { x: finalX, y: finalY };  

        }, [getNextZ]);

    //lukker vindu
    const closeWindow = useCallback((id: string) => {
        setWindows((prev) => {
            const target = prev.find((w) => w.id === id);

            //gruppe slettes sammen
            if (target?.group) {
                return prev.filter((w) => w.group !== target.group);
            }

            //ellers bare selve vinduet
            return prev.filter((w) => w.id !== id); 
        });
    }, []);


    const focusWindow = useCallback((id: string) => {
        const newZ = getNextZ();

        setWindows((prev) => 
            prev.map((w) => (w.id === id ? {...w, zIndex: newZ } : w))
        );
    }, []);

    const closeAllWindows = useCallback(() => {
        windowsRef.current = [];
        setWindows([]);
    },[]);

    //du kommer ikke til å tro det, dette oppdaterer posjonen på vinduet
    const updatePostition = useCallback((id: string, x:number, y: number) => {
        setWindows((prev) => prev.map((w) => {
            if (w.id !== id) return w;

            const maxY = desktopHeight - 40; // 40px = minimum synlig tittelbar
            const maxX = desktopWidth - 40; // la minst 40px av vinduet være synlig til høyre

            const clampedX = Math.min(Math.max(x, -((w.width ?? 200) - 40)), maxX);
            const clampedY = Math.min(Math.max(y, 0), maxY);

            return { ...w, x: clampedX, y: clampedY };
        }));
    }, []);

    return (
        <WindowManagerContext.Provider value = {{windows, openWindow, closeWindow,closeAllWindows, focusWindow, updatePostition}}>
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