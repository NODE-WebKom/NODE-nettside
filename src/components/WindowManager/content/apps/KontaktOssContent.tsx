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
// felles stil for lenkene inni teksten under
const inlineLinkClass = "text-blue-700 underline hover:text-blue-900";

const kontaktInfo = [
  {
    key: "mail",
    label: "mail",
    title: "Kontakt oss!",
    text: (
      <>
        Er dere en bedrift som ønsker en bedriftspresentasjon, vil lyse ut en
        jobbannonse eller samarbeide med oss på andre måter? Ta kontakt på{" "}
        <a
          href="mailto:node@uib.no?subject=Kontakt%20fra%20nettsiden&body=Hei%20NODE!%0A%0A"
          className={inlineLinkClass}
        >
          node@uib.no
        </a>
        !
      </>
    ),
  },
  {
    key: "insta",
    label: "Instagram",
    title: "Følg oss!",
    text: (
      <>
        Vil du se bilder fra arrangementer og få med deg hva som skjer i
        NODE? Følg oss på Instagram{" "}
        <a
          href="https://www.instagram.com/node.uib/"
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLinkClass}
        >
          @node.uib
        </a>{" "}
      </>
    ),
  },
  {
    key: "linkedIn",
    label: "LinkedIn",
    title: "Sjekk oss ut!",
    text: (
      <>
        På jakt etter jobbmuligheter eller vil du bygge nettverket ditt? Følg{" "}
        <a
          href="https://www.linkedin.com/company/node-aiki/"
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLinkClass}
        >
          NODE på LinkedIn
        </a>{" "}
        for karrieretips og faglige oppdateringer.
      </>
    ),
  },
] as const;

export default function KontaktOssContent() {
  const [activeRadio, setActiveRadio] = useState<"mail" | "insta" | "linkedIn">("mail");
  const activeInfo = kontaktInfo.find((i) => i.key === activeRadio)!;
  
  return (
    <div className="flex flex-row items-start gap-4">
      
      {/* info boks */}
      <div className="relative bg-item-yellow h-[380px] w-[500px]
        border-t-2 border-l-2 border-b-2 border-r-2 
        border-t-win-bg-dark-gray border-l-win-bg-dark-gray
        border-b-white border-r-white p-2 block"
      >
        <h1 className="absolute top-[60px] pl-4 text-7xl text-left"> {activeInfo.title} </h1>

        <Image
          src="window-elements/phoneArt.png"
          alt="old-phone"
          width={300}
          height={300}
          unoptimized
          className="image-pixelated shrink-0 absolute top-[95px] -left-[40px] w-[300px] scale-[1.25]"
        />

        <p className="text-md leading-relaxed absolute top-[170px] left-[270px] w-[210px] text-left">
          { activeInfo.text} 
        </p>
      </div>

      {/* tekst + radiobutton på siden */}
      <div className="flex flex-col gap-5 items-start">
        <span className="text-4xl font-bold">Finn oss her</span>

        <Radio
          id="mail"
          label="Mail"
          checked={activeRadio === "mail"}
          onChange={() => setActiveRadio("mail")}
        />

        <Radio
          id="insta"
          label="Instagram"
          checked={activeRadio === "insta"}
          onChange={() => setActiveRadio("insta")}
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
