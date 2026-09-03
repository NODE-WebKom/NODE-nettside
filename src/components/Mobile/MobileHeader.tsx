"use client";
import { ReactNode } from "react";

function FakeWindow({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`inline-block bg-win-bg-gray p-[3px]
        border-t-[3px] border-l-[3px] border-b-[3px] border-r-[3px]
        border-t-white border-l-white
        border-b-win-dark-shadow border-r-win-dark-shadow
        shadow-[inset_-1px_-1px_0_var(--color-win-bg-dark-gray)] ${className}`}
    >
      <div
        className="h-6 mb-2"
        style={{
          background:
            "linear-gradient(to right, var(--color-win-blue) 60%, var(--color-win-dark-blue) 100%)",
        }}
      />
      <div className="px-3 py-2 text-black flex items-center justify-center whitespace-nowrap">
        {children}
      </div>
    </div>
  );
}

export default function MobileHeader() {
  return (
    <div className="fixed top-2 inset-x-0 z-[20010] flex justify-center pointer-events-none">
      <div className="flex flex-col items-start">
        <FakeWindow>
          <span className="text-black text-5xl pr-8 font-extrabold tracking-tight">
            NODE
          </span>
        </FakeWindow>

        <FakeWindow className="ml-34 -mt-15">
          <span className="text-black text-md font-bold">
            Linjeforeningen for kunstig intelligens
          </span>
        </FakeWindow>
      </div>
    </div>
  );
}