
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const songs = [
  { title: "01 - Clouds", src: "/music/Clouds.mp3", volume: 0.6},
  { title: "02 - Fallen Down", src: "/music/Fallen Down.mp3", volume: 0.1},
  { title: "03 - Haggstrom", src: "/music/Haggstrom.mp3", volume: 1.0 },
  { title: "04 - Great Fairy's Harp", src: "/music/Great Fairy's Harp Theme.mp3", volume: 0.6},
  { title: "05 - At Doom's Gate", src: "/music/At Doom's Gate.mp3", volume: 0.6 },
];

export default function wallpaperContent() {
  const [songIndex, setSongIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = songs[songIndex].volume;
    }
  }, [songIndex]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if(playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      await audioRef.current.play();
      setPlaying(true);
    }
  };

  const changeSong = (index: number) => {
    setSongIndex(index);
    setPlaying(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const nextSong = () => {
    const next = songIndex === songs.length -1
    ? 0
    : songIndex +1;

    changeSong(next);
  };

  const prevSong = () => {
    const prev = songIndex === 0
    ? songs.length -1
    : songIndex -1;

    changeSong(prev);
  };
  
  return(
      <div className="bg-win-bg-dark-gray w-full h-[240px] p-2
        border-2
        border-b-win-dark-shadow border-r-win-dark-shadow
        border-t-white border-l-white
        flex items-center justify-center"
      >
        {/* snurrende CD */}
        <div className="size-55 rounded-full bg-win-dark-gray
                        flex items-center justify-center overflow-hidden"
              style={{
                boxShadow: `inset 2px 2px 0px 0px var(--color-win-bg-gray),
                            inset -2px -2px 0px 0px var(--color-win-dark-shadow)`
        }}>
          <div className=" absolute size-10 rounded-full bg-black"/>

          <Image
            src="/window-elements/CD.png"
            alt="CD"
            width={200}
            height={200}
            style= {{
              animation: "slow-spin 10s linear infinite",
              animationPlayState: playing ? "running" : "paused",
            }}
            
            />
        </div>

        {/* musikken */}
        <audio
          ref = {audioRef}
          src={songs[songIndex].src}
        />

        {/* kontroller -------------------------------------*/}
        <div className="ml-4">

          {/* sang tittel */}
          <div className="bg-black w-[170px] h-[40px] p-2 text-[#44A367]
                          border-t-2 border-l-2 border-b-2 border-r-2 
                          border-t-win-dark-shadow border-l-win-dark-shadow
                          border-b-white border-r-white"
          >
            {songs[songIndex].title}
          </div>
    
          {/* knapper */}
          <div className="grid grid-cols-3 gap-2 mt-4
                          text-black">

            <button 
              className="bg-win-bg-dark-gray w-[50px] h-[40px]
                        border-2 border-t-white border-l-white 
                        border-b-win-dark-shadow border-r-win-dark-shadow"
              onClick={prevSong}
            >
              prev
            </button>

            <button 
              className={`bg-win-bg-dark-gray w-[50px] h-[40px]
                        ${playing 
                          ? "border-2 border-b-white border-r-white border-t-win-dark-shadow border-l-win-dark-shadow" 
                          : "border-2 border-t-white border-l-white border-b-win-dark-shadow border-r-win-dark-shadow"}`}

              onClick={togglePlay}
            >
              {playing? "⏸" : "▶︎"}
            </button>

            <button 
              className="bg-win-bg-dark-gray w-[50px] h-[40px]
                        border-2 border-t-white border-l-white 
                        border-b-win-dark-shadow border-r-win-dark-shadow"
              onClick={nextSong}
            >
              next
            </button>
          </div>


        </div>
        
      </div>
    )
}
