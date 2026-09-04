"use client";
import { useRef, useCallback } from "react";
import Image from "next/image";
import { useDesktopScale } from "@/components/DesktopScale";
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

type WindowProps = {
  title: string;
  icon?: string;
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

export default function Window({
  title,
  icon,
  x,
  y,
  zIndex,
  width,
  height,
  onFocus,
  onMove,
  onClose,
  children,
}: WindowProps) {
  const dragRef = useRef<{
    startX: number;
    startY: number;
    winX: number;
    winY: number;
  } | null>(null);
  const { scale } = useDesktopScale();

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
        const dx = (e.clientX - dragRef.current.startX) / scale;
        const dy = (e.clientY - dragRef.current.startY) / scale;
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
    [x, y, onFocus, onMove, scale],
  );

  return (
    <div
      onMouseDown={onFocus}
      style={{ position: "fixed", left: x, top: y, width, height, zIndex }}
      className="bg-win-bg-gray p-[3px]
        border-t-[3px] border-l-[3px] border-b-[3px] border-r-[3px]
        border-t-white border-l-white
        border-b-win-dark-shadow border-r-win-dark-shadow
        shadow-[inset_-1px_-1px_0_var(--color-win-bg-dark-gray)]"
    >
      <div
        onMouseDown={handleTitleMouseDown}
        className=" px-2 py-2 mb-2 h-7 flex items-center justify-between custom-cursor-move select-none"
        style={{
          background:
            "linear-gradient(to right, var(--color-win-blue) 60%, var(--color-win-dark-blue) 100%",
        }}
      >
        {/* favicon */}
        <div className="flex items-center gap-1.5 min-w-0">
          {icon && (
            <Image
              src={icon}
              alt=""
              width={22}
              height={22}
              unoptimized
              className="image-pixelated shrink-0"
            />
          )}

          <span className="text-white text-sm  truncate">{title}</span>
        </div>

        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={onClose}
          aria-label={`Lukk ${title}`}
          className="bg-win-bg-gray w-[18px] h-[18px] flex items-center justify-center shrink-0
            border-2
            border-t-white border-l-white
            border-b-win-dark-shadow border-r-win-dark-shadow

            hover:border-b-white hover:border-r-white
            hover:border-t-win-dark-shadow hover:border-l-win-dark-shadow
           "
        >
          <CloseIcon />
        </button>
      </div>

      <div className="px-4 py-3 text-black">{children}</div>
    </div>
  );
}
