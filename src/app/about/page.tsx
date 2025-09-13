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

export default function AboutPage() {
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

  // Data anggota kelompok
  const members = [
    { name: "HAZEERA SYADZA ZUL ISLAMADINA (15)", img: "/images/easy/pisjo.png" },
    { name: "HAZEERA SYADZA ZUL ISLAMADINA (15)", img: "/images/easy/klepon.png" },
    { name: "HAZEERA SYADZA ZUL ISLAMADINA (15)", img: "/images/easy/pukis.png" },
    { name: "HAZEERA SYADZA ZUL ISLAMADINA (15)", img: "/images/easy/arumanis.png" },
    { name: "HAZEERA SYADZA ZUL ISLAMADINA (15)", img: "/images/easy/klepon.png" },
    { name: "HAZEERA SYADZA ZUL ISLAMADINA (15)", img: "/images/easy/klepon.png" },
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
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={70} height={70} />
        </div>

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
      <div className="flex flex-col items-center mt-20"> {/* 🔽 Digeser lebih ke bawah */}
        <h2 className="bg-[#FCB53B] text-white font-bold text-3xl px-10 py-3 rounded-full shadow-lg">
          Anggota Kelompok
        </h2>
      </div>

      {/* Anggota Kelompok Grid 3 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-20 px-10 place-items-center">
        {members.map((m, idx) => {
          // selang-seling miring
          const tilt = idx % 2 === 0 ? "-rotate-8" : "rotate-8";
          return (
            <div
              key={idx}
              className="flex items-center gap-4 transform hover:scale-110 transition duration-300"
            >
              <Image
                src={m.img}
                alt={m.name}
                width={90}
                height={120}
                className={`drop-shadow-lg ${tilt} hover:rotate-0 transition-transform duration-300`}
              />
              <p className="font-semibold text-lg drop-shadow-md text-[#FFE797]">
                {m.name}
              </p>
            </div>
          );
        })}
      </div>

      {/* Spacer biar bawahnya nggak kosong */}
      <div className="h-20"></div>
    </div>
  );
}
