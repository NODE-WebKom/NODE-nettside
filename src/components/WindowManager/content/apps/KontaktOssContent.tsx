"use client";
import { useState } from "react";
import Image from "next/image";
import { useIsMobile } from "@/lib/useIsMobile";

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

//tekst for hver knapp
const kontaktInfo = [
  { 
    key: "telefon", 
    label: "Telefon", 
    title: "Ring oss!", 
    text: "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah" 
  },
  { 
    key: "email", 
    label: "Email", 
    title: "E-mail oss!", 
    text: "Send oss en mail. blah blah blah " 
  },
  { 
    key: "sosiale medier", 
    label: "Sosiale medier", 
    title: "Følg oss!", 
    text: "Følg oss på Instagram og Facebook. blah blah blah" 
  },
  { 
    key: "linkedIn", 
    label: "LinkedIn", 
    title: "Følg oss!", 
    text: "blah blah" 
  },
] as const;

export default function KontaktOssContent() {
  const [activeRadio, setActiveRadio] = useState<"telefon" | "email" | "sosiale medier" | "linkedIn">("telefon");
  const activeInfo = kontaktInfo.find((i) => i.key === activeRadio)!;
  const isMobile = useIsMobile() === true;
  
  return (
    <div className={`flex ${isMobile ? "flex-col items-center gap-6" : "flex-row items-start gap-4"}`}>
      
      {/* info boks */}
      <div className={`relative bg-item-yellow w-full
        border-t-2 border-l-2 border-b-2 border-r-2 
        border-t-win-bg-dark-gray border-l-win-bg-dark-gray
        border-b-white border-r-white
        ${
          isMobile
            ? "max-w-[450px] h-auto p-4 flex flex-col items-center gap-3"
            : "w-[450px] h-[380px] p-2 block"
        }`}
      >
        <h1 className={isMobile ? "text-3xl text-center" : "absolute top-[100px] pl-4 text-7xl text-left"}> {activeInfo.title} </h1>

        <Image
          src="window-elements/phoneArt.png"
          alt="old-phone"
          width={300}
          height={300}
          unoptimized
          className={`image-pixelated shrink-0 ${
            isMobile ? "w-40 h-auto" : "absolute top-[150px] -left-[10px] w-[300px] scale-[1.25]"
          }`}
        />

        <p className={`text-sm leading-relaxed ${
          isMobile ? "text-center" : "absolute top-[210px] left-[290px] w-[180px] text-left"
        }`}>{ activeInfo.text} </p>
      </div>

      {/* tekst + radiobutton på siden */}
      <div className={`flex flex-col gap-5 ${isMobile ? "items-center" : "items-start"}`}>
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
