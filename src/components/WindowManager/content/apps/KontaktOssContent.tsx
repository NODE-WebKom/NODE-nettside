"use client";
import Image from "next/image";

// felles stil for lenkene inni teksten under
const inlineLinkClass = "text-blue-700 underline hover:text-blue-900";

// SoMe - vises som klikkbare "apper" (ikon + navn) under teksten i boksen
type SocialApp = {
  id: string;
  src: string;
  label: string;
  href: string;
};

const socialApps: SocialApp[] = [
  {
    id: "facebook",
    src: "/icons/facebook.png",
    label: "FaceBook",
    href: "https://www.facebook.com/groups/602424971523361/",
  },
  {
    id: "insta",
    src: "/icons/insta.png",
    label: "Instagram",
    href: "https://www.instagram.com/node.uib/",
  },
  {
    id: "linkedIn",
    src: "/icons/linkedin.png",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/node-aiki/",
  },
  
];

function SocialAppButton({ app }: { app: SocialApp }) {
  return (
    <button
      onClick={() => window.open(app.href, "_blank", "noopener,noreferrer")}
      aria-label={app.label}
      className="group flex flex-col items-center w-16 py-1 hover:bg-black/10"
    >
      <Image
        src={app.src}
        alt=""
        width={40}
        height={40}
        unoptimized
        className="image-pixelated"
      />
      {/* <span className="text-xs leading-none text-black text-center mt-1">
        <span className="underline">{app.label[0]}</span>
        {app.label.slice(1)}
      </span> */}
    </button>
  );
}

export default function KontaktOssContent() {
  return (
    // gul boks - samme form som før, strekkes ikke ut
    <div
      className="relative bg-item-yellow h-[380px] w-[550px]
        border-t-2 border-l-2 border-b-2 border-r-2
        border-t-win-bg-dark-gray border-l-win-bg-dark-gray
        border-b-white border-r-white p-2 block"
    >
      <h1 className="absolute top-[60px] pl-4 text-7xl text-left">Kontakt oss!</h1>

      <Image
        src="window-elements/phoneArt.png"
        alt="old-phone"
        width={300}
        height={300}
        unoptimized
        className="image-pixelated shrink-0 absolute top-[95px] -left-[40px] w-[300px] scale-[1.25]"
      />

      <p className="text-md leading-relaxed absolute top-[170px] right-[35px] w-[210px] text-left">
        Er dere en bedrift som ønsker en bedriftspresentasjon, vil lyse ut en
        jobbannonse eller samarbeide med oss på andre måter? Ta kontakt på{" "}
        <a
          href="mailto:node@uib.no?subject=Kontakt%20fra%20nettsiden&body=Hei%20NODE!%0A%0A"
          className={inlineLinkClass}
        >
          node@uib.no
        </a>
        !
      </p>

      {/* SoMe - klikkbare apper under teksten */}
      <div className="absolute top-[310px] right-[50px] w-[210px] flex flex-row">
        {socialApps.map((app) => (
          <SocialAppButton key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
