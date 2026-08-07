"use client";

import { useWallpaper } from "./WallpaperContext";

export default function WallpaperBackground() {
    const {wallpaper} = useWallpaper();

    const style = 
        wallpaper.type === "color"
            ? { backgroundColor: wallpaper.value }
            : { backgroundImage: `url(${wallpaper.value})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            };
    
    return <div className="fixed inset-0 -z-10" style={style}/>
}