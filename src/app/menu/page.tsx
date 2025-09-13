"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Jua } from "next/font/google";
import { usePathname } from "next/navigation";

const jua = Jua({
  weight: "400",
  subsets: ["latin"],
});

export default function MenuPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const pathname = usePathname();

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Game Info", path: "/gameinfo" },
  ];

  return (
    <div
      className={`flex flex-col min-h-screen relative overflow-hidden ${jua.className}`}
      style={{
        backgroundImage: "url('/bg-hijau.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Audio */}
      <audio ref={audioRef} src="/backsound.mp3" autoPlay loop />

      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#D9D9D9]/20">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={70} height={70} />
        </div>

        {/* Menu */}
        <ul className="flex gap-10 text-white text-lg font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`relative px-2 py-1 ${
                  pathname === item.path
                    ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-[#B45253]"
                    : "hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:w-full hover:after:h-[3px] hover:after:bg-[#B45253] hover:after:scale-x-100 after:transition-transform after:duration-300"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Sound Button */}
        <button
          onClick={toggleMusic}
          className="p-3 rounded-full bg-[#FFE797] hover:bg-[#FCB53B] shadow-md transition"
        >
          {isPlaying ? (
            <Volume2 className="text-[#B45253] w-6 h-6" />
          ) : (
            <VolumeX className="text-[#B45253] w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Judul */}
      <div className="flex flex-col items-center mt-20">
        <h2 className="text-[#FCB53B] font-extrabold text-5xl drop-shadow-lg">
          CHOOSE LEVEL
        </h2>
        <p className="mt-2 text-white font-bold text-lg drop-shadow-md">
          PRESS PLAY TO START
        </p>
      </div>

      {/* Tombol Level */}
      <div className="flex flex-col gap-6 mt-14 w-[85%] max-w-md mx-auto">
        {/* Easy */}
        <Link
          href="/game/easy"
          className="flex items-center justify-center gap-x-3 px-6 py-3 rounded-full bg-[#FFE797] text-[#B45253] font-bold text-xl shadow-md hover:scale-105 transition"
        >
          <span>Easy</span>
          <Image
            src="/images/easy/klepon.png"
            alt="Easy"
            width={50}
            height={50}
            className="rotate-6"
          />
        </Link>

        {/* Medium */}
        <Link
          href="/game/medium"
          className="flex items-center justify-center gap-x-3 px-6 py-3 rounded-full bg-[#FCB53B] text-white font-bold text-xl shadow-md hover:scale-105 transition"
        >
          <Image
            src="/images/easy/pisjo.png"
            alt="Medium"
            width={50}
            height={50}
            className="-rotate-6"
          />
          <span>Medium</span>
        </Link>

        {/* Hard */}
        <Link
          href="/game/hard"
          className="flex items-center justify-center gap-x-3 px-6 py-3 rounded-full bg-[#B45253] text-white font-bold text-xl shadow-md hover:scale-105 transition"
        >
          <span>Hard</span>
          <Image
            src="/images/easy/arumanis.png"
            alt="Hard"
            width={50}
            height={50}
            className="rotate-6"
          />
        </Link>
      </div>
    </div>
  );
}
