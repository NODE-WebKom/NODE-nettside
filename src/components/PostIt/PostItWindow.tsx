"use client";
import { useRef, useCallback } from "react";
import Image from "next/image";

type PostItWindowProps = {
  title: string;
  background?: string;
  x: number;
  y: number;
  zIndex: number;
  width?: number;
  height?: number;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  onClose: () => void;
  children: React.ReactNode;
};

const corner = 28;

export default function Window({
  title,
  background = "#ffe590",
  x,
  y,
  zIndex,
  width = 300,
  height = 300,
  onFocus,
  onMove,
  onClose,
  children,
}: PostItWindowProps) {
  const dragRef = useRef<{
    startX: number;
    startY: number;
    winX: number;
    winY: number;
  } | null>(null);

  const handleTitleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      onFocus();
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        winX: x,
        winY: y,
      };
      function handleMouseMove(e: MouseEvent) {
        if (!dragRef.current) return;
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        onMove(dragRef.current.winX + dx, dragRef.current.winY + dy);
      }
      function handleMouseUp() {
        dragRef.current = null;
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [x, y, onFocus, onMove],
  );

  return (
    <div
      onMouseDown={onFocus}
      style={{
        position: "fixed",
        background,
        left: x,
        top: y,
        width,
        height,
        zIndex,
        clipPath: `polygon(
                  0 0,
                  100% 0,
                  100% ${100 - 25}%,
                  ${75}% 100%,
                  0% 100%)`,
      }}
      className="flex flex-col border-2 
      border-b-black/40 border-r-black/40 border-t-white/50 border-l-white/50"
    >
      {/* note-fold closebutton */}
      <button
        onMouseDown={(e) => e.stopPropagation()}
        onClick={onClose}
        className="absolute bottom-0 right-0 -m-1 border-2 border-black/30 hover:bg-black/5"
        style={{
          width: 78,
          height: 78,
          background: "",
          clipPath: "polygon(100% 0%, 0% 0%, 0% 100%)",
          backgroundColor: background,
        }}
      />

      {/* dragable top */}
      <div
        onMouseDown={handleTitleMouseDown}
        className="px-4 py-4 flex items-center justify-between 
                  custom-cursor-move select-none
                  border-b-2 border-b-black/10 shadow-[0_2px_0_rgba(255,255,255,0.4)]"
      />

      <div className="px-3 py-3">
        <span>{children}</span>
      </div>
    </div>
  );
}
