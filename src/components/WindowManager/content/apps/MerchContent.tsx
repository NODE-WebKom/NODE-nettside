"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Popup {
  id: number;
  top: number;
  left: number;
}

const AD_LINK = "https://node.myspreadshop.no/all";

export default function MerchContent() {
  const[popups, setPopups] = useState<Popup[]>([]);
  const counter = useRef(0);

  //popup ad
  useEffect(() => {
    const interval = setInterval(() => {

      const id = counter.current++;
      const newPopup: Popup = {
        id,
        top: Math.random() * (window.innerHeight -200),
        left: Math.random() * (window.innerWidth - 300),
      };

      setPopups((prev) => [...prev, newPopup]);

      setTimeout(() => {
        setPopups((prev) => prev.filter((p) => p.id !== id));
      }, 3600);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  
  return(
    <div className="relative flex flex-col justify-center font-entsans">

      {/* rosa boks */}
      <div className="bg-[#ffeafd] w-full max-w-[682px] aspect-[645/360] p-2
        border-t-2 border-l-2 border-b-2 border-r-2 
        border-t-win-bg-dark-gray border-l-win-bg-dark-gray
        border-b-white border-r-white"
      >
        
        {/*snurrende sol */}
        <Image
          src="/window-elements/sun.webp"
          alt="Sun"
          width={300}
          height={300}
          style={{
            animation: "slow-spin 45s linear infinite",
          }}
          className="absolute right-8 -top-[180px] translate-y-1/2 z-0"
        />
      
      <h1 className="text-[45px] leading-tight">GET YOURSELF <br /> THAT NODE</h1>

      <h1 className="text-[85px] rainbow-extrude leading-tight left-10 ml-4"> STYLE</h1>

      </div>

      {/* rosa blokk */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 
                      bg-[#ff0fe7] w-65 h-85" 
            style={{ clipPath: "polygon(50% 0%, 100% 5%, 100% 100%, 0% 100%)"}}
      />

      {/* turkis blokk */}
      <div className="absolute right-30 top-68 -translate-y-1/2 
                      bg-[#0ff7ff] w-70 h-35" 
            style={{ clipPath: "polygon(30% 0%, 100% 100%, 0% 100%, 0% 100%)"}}
      />

      {/* orginal ad */}
      <a
        href={AD_LINK}
        target = "_blank"
        rel="noopner noreferrer"
        className="absolute -bottom-8 -left-10
                  z-40 bg-[#efefef] border-4
                  border-t-30
                  border-win-dark-blue
                  p-4 w-68 h-40"
      >
      </a>

      <a
        href={AD_LINK}
        target = "_blank"
        rel="noopner noreferrer"
        className="absolute -bottom-4 -left-2
                  z-40 bg-white border-4
                  border-t-30
                  border-win-blue
                  p-4 w-68 h-40"
      >
        <p className="text-4xl font-entsans text-center text-[#ff004c] text-shadow-lg"> Buy now !</p> 
        <p className="text-5xl font-arizona text-center pt-1 text-[#ff004c] text-shadow-md"> click here !</p>

      </a>

      {/* kopi ad */}
      {popups.map((popup) =>(

        <a
        key={popup.id}
        href={AD_LINK}
        target = "_blank"
        rel="noopner noreferrer"
        className="fixed -bottom-4 -left-2
                  z-50 bg-white border-4
                  border-t-30
                  border-win-blue
                  p-4 w-68 h-32 animate-popup"
        style={{ top: popup.top, left: popup.left }}
      >
        <p className="text-5xl font-arizona text-center pt-2 text-[#ff004c] text-shadow-sm"> click here !</p>

      </a> 

      ))}
      

    </div>
  );
}