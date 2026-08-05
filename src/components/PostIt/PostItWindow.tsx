'use client'
import { useRef, useCallback } from "react";
import Image from "next/image";

// X-ikonet
function CloseIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      className="shrink-0"
      // style={{ filter: "drop-shadow(1px 1px 0 white)" }}
    >
      <g stroke="#000" strokeWidth="2" strokeLinecap="square">
        <line x1="1" y1="1" x2="9" y2="9" />
        <line x1="9" y1="1" x2="1" y2="9" />
      </g>
    </svg>
  );
}

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
  background = "#fff59d",
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
  const dragRef = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null);

  const handleTitleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      onFocus();
      dragRef.current = { startX: e.clientX, startY: e.clientY, winX: x, winY: y };

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
    [x, y, onFocus, onMove]
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
        clipPath:`polygon(0 0, calc(100%-${corner}px) 0, 100% ${corner}px, 100% 100%, 0 100%)`,
        boxShadow: "3px 4px 8px rgba(0,0,0,0.25)"
      }}

      className="flex flex-col"
    >
      {/* dragable top */}
      <div
        onMouseDown={handleTitleMouseDown}
        className=" px-3 py-2 flex items-center justify-between custom-cursor-move select-none"
        style={{
          background: "#fbc02d"
        }}
      >
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={onClose}
          className="w-5 h-5 flex items-center justify-center shrink-0 hover:bg-black/10 rounded-sm"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="px-3 py-3 text-[#3a2f00] grow overflow-auto">{children}</div>
    </div>
  );
}