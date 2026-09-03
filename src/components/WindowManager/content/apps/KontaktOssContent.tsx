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
  
  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-4">
      
      {/* info boks */}
      <div className="relative bg-item-yellow w-full max-w-[450px] md:w-[450px] h-auto md:h-[380px] p-4 md:p-2
        flex flex-col items-center gap-3 md:block
        border-t-2 border-l-2 border-b-2 border-r-2 
        border-t-win-bg-dark-gray border-l-win-bg-dark-gray
        border-b-white border-r-white"
      >
        <h1 className="text-3xl text-center md:absolute md:top-[100px] md:pl-4 md:text-7xl md:text-left"> {activeInfo.title} </h1>

        <Image
          src="window-elements/phoneArt.png"
          alt="old-phone"
          width={300}
          height={300}
          unoptimized
          className="image-pixelated w-40 h-auto shrink-0
            md:absolute md:top-[150px] md:-left-[10px] md:w-[300px] md:scale-[1.25]"
        />

        <p className="text-sm text-center leading-relaxed md:absolute md:top-[210px] md:left-[290px] md:w-[180px] md:text-left">{ activeInfo.text} </p>
      </div>

      {/* tekst + radiobutton på siden */}
      <div className="flex flex-col items-center gap-5 md:items-start">
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
