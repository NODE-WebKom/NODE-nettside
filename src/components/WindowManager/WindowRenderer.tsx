"use client"

import Window from "@/components/Window/Window";
import { useWindowManager } from "./WindowManagerContext";

export default function WindowRenderer() {
    const { windows, focusWindow, updatePostition, closeWindow } = useWindowManager();

    return(
        <>
        {windows.map((w) => (
            <Window 
                key ={w.id} 
                title = {w.title} 
                icon = {w.icon}
                x = {w.x} 
                y ={w.y} 
                width = {w.width} 
                height = {w.height} 
                zIndex = {w.zIndex} 
                onFocus = {() => focusWindow(w.id)}
                onMove = {(x,y) => updatePostition(w.id, x, y)}
                onClose = {() => closeWindow(w.id)}
            >
                {w.content}
            </Window>
        ))}
        </>
    );
}