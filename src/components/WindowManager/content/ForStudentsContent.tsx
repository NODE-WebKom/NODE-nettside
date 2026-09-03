"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import { useIsMobile } from "@/lib/useIsMobile";

export type ForStudentsItem = {
  id: string;
  name: string;
  content: ReactNode;
};

type ForStudentsContentProps = {
  title: string;
  items: ForStudentsItem[];
};

export default function ForStudentsContent({ title, items,}: ForStudentsContentProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const isMobile = useIsMobile() === true;

  const selectedItem =
    items.find((item) => item.id === selectedId) ?? null;

  return (
    <div
      className={`grid w-full gap-x-2 ${
        isMobile
          ? "grid-cols-1 gap-y-2"
          : "grid-cols-[250fr_680fr] grid-rows-[auto_1fr] gap-y-[2px]"
      }`}
    >
      {/* Overskrift over filtreet */}
      <div
        className={`flex h-full items-center border-2 border-t-win-bg-dark-gray
          border-l-win-bg-dark-gray border-b-white border-r-white
          bg-win-bg-gray px-1
          ${isMobile ? "" : "col-start-1 row-start-1"}`}
      >
        <p>Alle filer</p>
      </div>

      {/* Venstre: filtre */}
      <div
        className={`bg-white p-2
          border-2 border-t-win-dark-shadow border-l-win-dark-shadow
          border-b-white border-r-white
          ${
            isMobile
              ? "max-h-64 overflow-y-auto"
              : "col-start-1 row-start-2 aspect-[182/360] overflow-visible"
          }`}
      >
        <div className="select-none text-sm">
          
          {/* Desktop */}
          <div className="relative -left-[3px] flex h-6 items-center">
            <div className="relative flex h-6 items-center gap-2">
              <Image
                src="/window-elements/computerPlaceholder.png"
                alt="Datamaskin"
                width={16}
                height={16}
              />
              <span className="text-lg">Desktop</span>
            </div>
          </div>

          {/* Mappe */}
          <div className="relative pl-1">
            <div className="absolute left-[5px] -top-[5px] h-6 border-l border-dotted border-black" />

            <div className="relative flex items-center">
              <div className="absolute left-[6px] top-1/2 w-2 border-t border-dotted border-black" />

              <span
                className="relative -left-[4px] flex h-3 w-3 shrink-0
                  items-center justify-center border border-black bg-white
                  text-[8px] leading-none"
              >
                -
              </span>

              <Image
                src="/window-elements/folderPlaceholder.png"
                alt="Mappe"
                width={20}
                height={20}
              />

              <span className="ml-1 text-lg">{title}</span>
            </div>

            {/* Filer */}
            <div className="relative pl-1">
              <div className="absolute bottom-2 left-[22px] -top-[4px] border-l border-dotted border-black" />

              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative flex h-6 items-center"
                >
                  <div className="absolute left-[26px] top-1/2 w-2 border-t border-dotted border-black" />

                  <span
                    className="relative z-10 left-[13px] flex h-3 w-3 shrink-0
                      items-center justify-center border border-black bg-white
                      text-[8px] leading-none"
                  >
                    -
                  </span>

                  <button
                    onClick={() => setSelectedId(item.id)}
                    className={`ml-6 h-6 w-full px-1 py-0.5 text-left text-base
                      ${
                        selectedId === item.id
                          ? "bg-win-blue text-white"
                          : "hover:bg-win-blue hover:text-white"
                      }`}
                  >
                    {item.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overskrift over innholdet */}
      <div
        className={`flex h-full items-center border-2 border-t-win-bg-dark-gray
          border-l-win-bg-dark-gray border-b-white border-r-white
          bg-win-bg-gray px-1
          ${isMobile ? "" : "col-start-2 row-start-1"}`}
      >
        <p>
          Innhold i {selectedItem ? selectedItem.name : ""}
        </p>
      </div>

      {/* Høyre: valgt fil */}
      <div
        className={`h-full overflow-y-auto bg-white p-2
          border-2 border-t-win-dark-shadow border-l-win-dark-shadow
          border-b-white border-r-white
          ${isMobile ? "" : "col-start-2 row-start-2"}`}
      >
        {selectedItem?.content}
      </div>
    </div>
  );
}
