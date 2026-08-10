"use client"

import {createContext, useContext, useState, useCallback, ReactNode} from "react";
import { useDesktopStack } from "./DesktopStackContext";

export type PostItData = {
    id: string;
    title: string;
    background?: string;
    content: ReactNode;
    x: number;
    y: number;
    width?: number;
    height?: number;
    zIndex: number;
};

type OpenPostItOptions = {
    id: string;
    title: string;
    background?: string;
    content: ReactNode;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
};

type PostItManagerContextType = {
    postIts: PostItData[];
    openPostIt: (opts: OpenPostItOptions) => void;
    closePostIt: (id: string) => void;
    closeAllPostIts: () => void;
    focusPostIt: (id: string) => void;
    updatePosition: (id: string, x: number, y: number) => void;
};

const PostItManagerContext = createContext<PostItManagerContextType | null>(null);

export function PostItManagerProvider({ children }: { children: ReactNode }) {
    const [postIts, setPostIts] = useState<PostItData[]>([]);
    const { getNextZ } = useDesktopStack();

    const openPostIt = useCallback(
        (opts: OpenPostItOptions) => {
            const newZ = getNextZ();

            setPostIts((prev) => {
                const exists = prev.find((p) => p.id === opts.id);

                if (exists) {
                    return prev.map((p) => (p.id === opts.id ? {...p, zIndex: newZ} : p));
                }
                const width = opts.width ?? 300;
                const height = opts.height ?? 300;
                const centerX =(window.innerWidth - width) /2;
                const centerY = (window.innerHeight - height)/2;
                
                const offset = prev.length *40;

                return [
                    ...prev,
                    {
                        id: opts.id,
                        title: opts.title,
                        background: opts.background,
                        content: opts.content,
                        x: opts.x ?? centerX + offset,
                        y: opts.y ?? centerY + offset,
                        width: opts.width,
                        height: opts.height,
                        zIndex: newZ,
                    },
                ];
            });
        }, [getNextZ]);

    const closePostIt = useCallback((id: string) => {
        setPostIts((prev) => prev.filter((p) => p.id !== id));
    }, []);

     const closeAllPostIts = useCallback(() => {
        setPostIts([]);
    },[]);

    const focusPostIt = useCallback((id: string) => {
        const newZ = getNextZ();
        setPostIts((prev) =>
            prev.map((p) => (p.id === id ? {...p, zIndex: newZ } : p))
        );
    }, [getNextZ]);

    const updatePosition = useCallback((id: string, x: number, y: number) => {
        setPostIts((prev) => prev.map((p) =>
            p.id === id ? { ...p, x, y } : p
        ));
        // legg evt på clamp-logikken som WindowManager
    }, []);

    return (
        <PostItManagerContext.Provider value={{postIts, openPostIt, closePostIt,closeAllPostIts, focusPostIt, updatePosition}}>
            {children}
        </PostItManagerContext.Provider>
    );
}

export function usePostItManager() {
    const ctx = useContext(PostItManagerContext);
    if(!ctx) {
        throw new Error("usePostItManager må brukes inni en PostItManagerProvider")
    }
    return ctx;
}