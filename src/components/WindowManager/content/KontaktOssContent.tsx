"use client";
import { useState } from "react";
import Image from "next/image";

//radio button
type RadioProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Radio = ({ id, label, checked, onChange }: RadioProps) => (
  <div className="flex items-center gap-3">

    <div className="relative w-5 h-5">
      <input 
        type="radio" 
        id={id} 
        checked={checked}
        onChange={onChange}
        className="appearance-none w-5 h-5 rounded-full bg-win-bg-light-gray custom-cursor-pointer"
        style={{
          boxShadow: `inset 1px 1px 0px 0px var(--color-win-dark-shadow),
                      inset -1px -1px 0px 0px var(--color-white)`
        }}
      />
      {checked && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-2 h-2 bg-black rounded-full pointer-events-none"/>
      )}

    </div>
    <label htmlFor={id} className="text-xl"> {label} </label>
  </div>
)

export default function KontaktOssContent() {
  const [activeRadio, setActiveRadio] = useState<"telefon" | "email" | "sosiale medier" | "linkedIn">("telefon");

  return (
    <div className="flex flex-row items-start gap-4">
      
      {/* info boks */}
      <div className="bg-item-yellow w-full max-w-[450px] aspect-[425/360] p-2
        border-t-2 border-l-2 border-b-2 border-r-2 
        border-t-win-bg-dark-gray border-l-win-bg-dark-gray
        border-b-white border-r-white"
      >
        
      </div>

      {/* tekst + radiobutton på siden */}
      <div className="flex flex-col gap-5">
        <span className="text-4xl font-bold">Finn oss her</span>

        <Radio
          id="telefon"
          label="Telefon"
          checked={activeRadio === "telefon"}
          onChange={() => setActiveRadio("telefon")}
        />

        <Radio
          id="email"
          label="Email"
          checked={activeRadio === "email"}
          onChange={() => setActiveRadio("email")}
        />

        <Radio
          id="sosiale medier"
          label="Sosiale medier"
          checked={activeRadio === "sosiale medier"}
          onChange={() => setActiveRadio("sosiale medier")}
        />

        <Radio
          id="linkedIn"
          label="LinkedIn"
          checked={activeRadio === "linkedIn"}
          onChange={() => setActiveRadio("linkedIn")}
        />

      </div>
    </div>
  );
}