"use client"

import PostItWindow from "@/components/PostIt/PostItWindow";
import { usePostItManager } from "./PostItManagerContext";

export default function PostItRenderer() {
    const { postIts, focusPostIt, updatePosition, closePostIt } = usePostItManager();

    return (
        <>
        {postIts.map((p) => (
            <PostItWindow
                key={p.id}
                title={p.title}
                background={p.background}
                x={p.x}
                y={p.y}
                width={p.width}
                height={p.height}
                zIndex={p.zIndex}
                onFocus={() => focusPostIt(p.id)}
                onMove={(x, y) => updatePosition(p.id, x, y)}
                onClose={() => closePostIt(p.id)}
            >
                {p.content}
            </PostItWindow>
        ))}
        </>
    );
}