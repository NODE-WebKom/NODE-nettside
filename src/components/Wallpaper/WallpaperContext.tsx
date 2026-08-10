"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Image from "next/image";

export type Wallpaper = 
  | {type: "color"; value:string}
  | {type: "image"; value: string};

const STORAGE_KEY = "node-wallpaper"
const defaultWallpaper : Wallpaper = { type: "color", value:"#8799b3"};

type WallpaperContextType = {
  wallpaper: Wallpaper;
  setWallpaper: (wp: Wallpaper) => void;
};

const WallpaperContext = createContext<WallpaperContextType | null>(null);

export function WallpaperProvider({ children }: { children: ReactNode }) {
  const [wallpaper, setWallpaperState] = useState<Wallpaper>(defaultWallpaper);

  //henter lagret bakgrunn fra local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if(stored) setWallpaperState(JSON.parse(stored));
    } catch {
      //manglende data
    }
  }, []);

  function setWallpaper(wp: Wallpaper) {
    setWallpaperState(wp);
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wp));
    } catch {
      //incognito osv ignoreres
    }
  }

  return (
    <WallpaperContext.Provider value={{ wallpaper, setWallpaper}}>
      {children}
    </WallpaperContext.Provider>
  )
}

export function useWallpaper(){
    const ctx = useContext(WallpaperContext);
    if(!ctx) throw new Error("useWallpaper må brukes inne i WallpaperProvider");
    return ctx;
}
