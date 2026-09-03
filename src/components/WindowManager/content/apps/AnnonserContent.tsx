"use client";
import Image from "next/image";

// fin strek
function DividerHalf({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 305 90" className={`flex-1 h-auto ${flip ? "scale-x-[-1]" : ""}`} fill="none">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M 55 45 C 44 45 37 42 38 38 C 39 35 44 36 43 39 C 43 41 40 41 40 39" />
        <path d="M 55 45 L 280 45" />
        <path d="M 280 45 C 291 45 298 48 297 52 C 296 55 291 54 292 51 C 292 49 295 49 295 51" />
      </g>
    </svg>
  );
}

function Divider() {
  return (
    <div className="w-full flex items-center gap-3 text-gray-400 dark:text-gray-500">
      <DividerHalf />
      <span className="text-xl pt-[4px] leading-none select-none shrink-0">✧</span>
      <DividerHalf flip />
    </div>
  );
}

// -------- annonse-typer og data --------
type AdItem = {
  id: string;
  title: string;
  image?: string; // f.eks "/pictures/xyz.jpg" - fylles inn senere
};

type AdSet = {
  id: string;
  long: AdItem;
  flatTop: AdItem;
  flatBottom: AdItem;
};

// legg til flere sett her etter hvert som dere får nye annonser
const adSets: AdSet[] = [
  {
    id: "set-1",
    long: { id: "l1", title: "Tittel på bedrift" },
    flatTop: { id: "f1", title: "Tittel" },
    flatBottom: { id: "f2", title: "Tittel" },
  },
  {
    id: "set-2",
    long: { id: "l2", title: "Tittel på bedrift" },
    flatTop: { id: "f3", title: "Tittel" },
    flatBottom: { id: "f4", title: "Tittel" },
  },
];

// -------- byggeklosser --------
function AdImage({ image }: { image?: string }) {
  return (
    <div className="relative w-full h-full bg-gray-100 flex items-center justify-center overflow-hidden">
      {image ? (
        <Image src={image} alt="" fill className="object-cover" />
      ) : (
        <span className="text-xs text-gray-400">Bilde</span>
      )}
    </div>
  );
}

function AdText({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-1.5 p-2 h-full justify-center">
      <p className="font-bold text-sm leading-tight">{title}</p>
      <div className="h-1.5 bg-gray-300 w-3/4 rounded-sm" />
      <div className="h-1 bg-gray-200 w-full rounded-sm" />
      <div className="h-1 bg-gray-200 w-full rounded-sm" />
      <div className="h-1 bg-gray-200 w-2/3 rounded-sm" />
    </div>
  );
}

// flat annonse: bilde + tekst side om side
function FlatAdCard({ item }: { item: AdItem }) {
  return (
    <div className="flex border border-gray-300 bg-white h-full">
      <div className="w-1/2 h-full">
        <AdImage image={item.image} />
      </div>
      <div className="w-1/2 h-full">
        <AdText title={item.title} />
      </div>
    </div>
  );
}

// lang annonse: bilde over, tekst under
function LongAdCard({ item }: { item: AdItem }) {
  return (
    <div className="flex flex-col border border-gray-300 bg-white h-full">
      <div className="flex-1">
        <AdImage image={item.image} />
      </div>
      <div className="h-[110px]">
        <AdText title={item.title} />
      </div>
    </div>
  );
}

// -------- ett sett med 3 annonser (speiles basert på index) --------
// på mobil (under md:) stables de tre annonsene rett under hverandre i stedet
// for det asymmetriske avis-oppsettet, som bare brukes fra og med md:
function AdSetGrid({ set, mirrored }: { set: AdSet; mirrored: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-2 w-full shrink-0 snap-start md:grid-cols-3 md:grid-rows-2 md:h-full">
      {mirrored ? (
        <>
          <div className="h-40 md:h-auto md:col-start-1 md:col-span-1 md:row-start-1 md:row-span-2">
            <LongAdCard item={set.long} />
          </div>
          <div className="h-32 md:h-auto md:col-start-2 md:col-span-2 md:row-start-1 md:row-span-1">
            <FlatAdCard item={set.flatTop} />
          </div>
          <div className="h-32 md:h-auto md:col-start-2 md:col-span-2 md:row-start-2 md:row-span-1">
            <FlatAdCard item={set.flatBottom} />
          </div>
        </>
      ) : (
        <>
          <div className="h-32 md:h-auto md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-1">
            <FlatAdCard item={set.flatTop} />
          </div>
          <div className="h-32 md:h-auto md:col-start-1 md:col-span-2 md:row-start-2 md:row-span-1">
            <FlatAdCard item={set.flatBottom} />
          </div>
          <div className="h-40 md:h-auto md:col-start-3 md:col-span-1 md:row-start-1 md:row-span-2">
            <LongAdCard item={set.long} />
          </div>
        </>
      )}
    </div>
  );
}

// -------- hovedkomponent --------
export default function AnnonserContent() {
  return (
    <div className="w-full h-auto md:h-[470px] bg-white p-2 rounded border-2 
                    border-t-white border-l-white
                    border-b-win-dark-shadow border-r-win-dark-shadow flex flex-col">
      <div className="w-full h-[70px] shrink-0 bg-blue-300 border-t-5 border-t-red-700">
        <p className="text-3xl md:text-5xl pl-4 pt-2 font-entsans font-bold"> NODE NEWS</p>
      </div>

      {/* <Divider /> */}

      <div className="flex-1 overflow-y-auto snap-y snap-mandatory mt-2 flex flex-col gap-4">
        {adSets.map((set, index) => (
          <AdSetGrid key={set.id} set={set} mirrored={index % 2 === 1} />
        ))}
      </div>
    </div>
  );
}
