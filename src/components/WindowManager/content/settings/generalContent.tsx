
"use client";
import { useState } from "react";
import Image from "next/image";

import WarningContent from "./warningContent"
import { useWindowManager } from "@/components/WindowManager/WindowManagerContext";
import { usePostItManager } from "@/components/WindowManager/PostItManagerContext";
import { useNilsStatus, BOTS, type BotId } from "@/components/WindowManager/content/chatbot/NilsBotContent";

const BOT_ORDER: BotId[] = ["nils", "nilsPetter"];

export default function GeneralContent() {
  const { openWindow, closeWindow, closeAllWindows } = useWindowManager();
  const { closeAllPostIts } = usePostItManager();
  const { botId, setBotId } = useNilsStatus();
  const [activeTab, setActiveTab] = useState<"general" | "user">("general");
  const [draftBotId, setDraftBotId] = useState<BotId>(botId);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return(
    <>
      {/* faner */}
      <div className="flex">
        <button
          onClick={() => setActiveTab("general")}
          className={`relative bg-win-bg-gray px-4 py-1 text-sm rounded-t-sm
                    w-[80px]
                    border-t-2 border-l-2 border-r-2
                    border-t-white border-l-white border-r-win-dark-shadow
                    ${activeTab === "general"
                      ? "border-b-0 -mb-[2px] z-10"
                      : "hover:bg-win-bg-dark-gray"}`}
        >
          General
        </button>

        <button
          onClick={() => setActiveTab("user")}
          className={`relative bg-win-bg-gray px-4 py-1 text-sm rounded-t-sm
                    w-[80px]
                    border-t-2 border-l-2 border-r-2
                    border-t-white border-l-white border-r-win-dark-shadow
                    ${activeTab === "user"
                      ? "border-b-0 -mb-[2px] z-10"
                      : "hover:bg-win-bg-dark-gray"}`}
        >
          User
        </button>
      </div>

      {activeTab === "general" && (
        <>
          <div className="flex flex-row items-start
            bg-win-bg-gray w-full h-[465px] p-2 border-2
            border-b-win-bg-dark-gray border-r-win-bg-dark-gray
            border-t-white border-l-white"
          >
            <Image
              src="/window-elements/pcFrame.png"
              alt="computerFrame"
              width={200}
              height={200}
              className="mt-10 ml-2"
            />
            <Image
              src="/pictures/nevralenils.png"
              alt="logo"
              width={100}
              height={100}
              className="absolute top-40 left-21"
            />

            <span className="whitespace-pre">
             {`
              System:
                    Microsoft Windows 95
                    4.00.950

              Registered to:
                    Nils
                    24261-420-9471421-067

              Computer:
                    Intel Pentium Processor 100 MHz
                    4.0MB RAM`}
            </span>
          </div>

          <div className="flex felx-row justify-end gap-2 mt-2">

            <button
              key={"warning"}
              onClick={() => {
                closeAllWindows();
                closeAllPostIts();

                openWindow({
                  id: "warning",
                  title: "Warning",
                  icon: "",
                  width: 320,
                  height: 130,
                  x: window.innerWidth / 2 - 160,
                  y: window.innerHeight / 2 - 100,
                  content: <WarningContent />,
                });
              }}
              className="flex justify-center items-center
                        bg-win-bg-gray w-[120px] h-[30px]
                        border-2
                        border-t-white border-l-white
                        border-b-win-dark-shadow border-r-win-dark-shadow

                        hover:border-b-white hover:border-r-white
                        hover:border-t-win-dark-shadow hover:border-l-win-dark-shadow"
            >
              <span className="text-sm">Delete everything</span>
            </button>

            <button
              key={"Cancel"}
              onClick={() => closeWindow("general")}
              className="flex justify-center items-center
                        bg-win-bg-gray w-[120px] h-[30px]
                        border-2
                        border-t-white border-l-white
                        border-b-win-dark-shadow border-r-win-dark-shadow

                        hover:border-b-white hover:border-r-white
                        hover:border-t-win-dark-shadow hover:border-l-win-dark-shadow"
            >
              <span className="text-sm">Cancel</span>
            </button>

          </div>
        </>
      )}

      {activeTab === "user" && (
        <div
          className="flex flex-col items-start
          bg-win-bg-gray w-full h-[465px] p-6 gap-2 border-2
          border-b-win-bg-dark-gray border-r-win-bg-dark-gray
          border-t-white border-l-white"
          onClick={() => setUserDropdownOpen(false)}
        >
          <span className="text-sm">Choose another user:</span>

          {/* dropdown */}
          <div className="relative w-[220px]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setUserDropdownOpen((open) => !open)}
              className="w-full flex items-center justify-between bg-white px-2 py-1 text-sm text-black
                        border-2 border-t-win-dark-shadow border-l-win-dark-shadow
                        border-b-white border-r-white"
            >
              <span>{BOTS[draftBotId].name}</span>
              <span className="ml-2">▼</span>
            </button>

            {userDropdownOpen && (
              <div
                className="absolute top-full left-0 w-full mt-[1px] bg-white z-20
                          border-2 border-t-win-dark-shadow border-l-win-dark-shadow
                          border-b-win-dark-shadow border-r-win-dark-shadow"
              >
                {BOT_ORDER.map((id) => (
                  <button
                    key={id}
                    onClick={() => {
                      setDraftBotId(id);
                      setUserDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1 text-sm
                              ${draftBotId === id
                                ? "bg-win-blue text-white"
                                : "text-black hover:bg-win-blue hover:text-white"}`}
                  >
                    {BOTS[id].name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setBotId(draftBotId)}
            disabled={draftBotId === botId}
            className="flex justify-center items-center mt-4
                      bg-win-bg-gray w-[120px] h-[30px]
                      border-2
                      border-t-white border-l-white
                      border-b-win-dark-shadow border-r-win-dark-shadow

                      hover:border-b-white hover:border-r-white
                      hover:border-t-win-dark-shadow hover:border-l-win-dark-shadow
                      disabled:opacity-60 disabled:pointer-events-none"
          >
            <span className="text-sm">Lagre</span>
          </button>
        </div>
      )}
    </>
    )
}
