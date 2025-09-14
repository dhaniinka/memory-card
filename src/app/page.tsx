"use client";

import Link from "next/link";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { Jua } from "next/font/google";
import { usePathname } from "next/navigation";
import { useMusic } from "./musicprovider"; // ✅ pakai global music

// Font Jua
const jua = Jua({
  weight: "400",
  subsets: ["latin"],
});

export default function HomePage() {
  const pathname = usePathname();
  const { isPlaying, toggleMusic } = useMusic(); // ✅ ambil state dari provider

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Game Info", path: "/gameinfo" },
  ];

  // list gambar
  const cardImages = [
    { src: "/images/easy/klepon.png", alt: "Klepon" },
    { src: "/images/medium/dewishinta.png", alt: "Arumanis" },
    { src: "/images/easy/risol.png", alt: "Risol" },
    { src: "/images/easy/pisjo.png", alt: "Pisang Ijo" },
    { src: "/images/hard/pa.png", alt: "Pukis" },
    { src: "/images/easy/serabi.png", alt: "Serabi" },
  ];

  return (
    <div
      className={`flex flex-col items-center min-h-screen ${jua.className}`}
      style={{
        backgroundImage: "url('/bg-hijau.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#D9D9D9]/20">
        <Image src="/logo.png" alt="Logo" width={70} height={70} />

        <ul className="flex gap-10 text-white text-lg font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`relative px-2 py-1 ${
                  pathname === item.path
                    ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-[#B45253]"
                    : "hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:w-full hover:h-[3px] hover:after:bg-[#B45253] after:transition-all after:duration-300"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Tombol musik global */}
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

      {/* Title */}
      <div className="flex flex-col items-center mt-15">
        <h1 className="text-5xl font-bold text-[#FCB53B]">MEMORY GAME</h1>
        <Link
          href="/game/level/easy"
          className="mt-6 bg-[#FFE797] hover:bg-[#FCB53B] text-[#B45253] font-semibold px-10 py-3 rounded-full shadow-lg transition"
        >
          PLAY
        </Link>
        <p className="mt-3 text-lg font-bold text-white drop-shadow-lg">
          PRESS PLAY TO START
        </p>
      </div>

      {/* Gambar Overlap (Kipas) */}
      <div className="flex justify-center items-end mt-10 mb-8">
        {cardImages.map((card, i) => (
          <div
            key={i}
            className={`relative -ml-10 first:ml-0 transition-transform duration-300 hover:scale-105`}
            style={{
              transform: `rotate(${i * 10 - 25}deg)`,
              zIndex: i,
            }}
          >
            {/* Responsive ukuran kartu */}
            <Image
              src={card.src}
              alt={card.alt}
              width={100}
              height={140}
              className="object-contain rounded-lg 
                         sm:w-[120px] sm:h-[160px] 
                         md:w-[140px] md:h-[190px] 
                         lg:w-[160px] lg:h-[220px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
