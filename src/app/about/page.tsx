"use client";

import Link from "next/link";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { Jua } from "next/font/google";
import { usePathname } from "next/navigation";
import { useMusic } from "../musicprovider"; // ⬅️ import hook dari provider

// Font Jua
const jua = Jua({
  weight: "400",
  subsets: ["latin"],
});

export default function AboutPage() {
  const pathname = usePathname();
  const { isPlaying, toggleMusic } = useMusic(); // ⬅️ ambil state musik global

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Game Info", path: "/gameinfo" },
  ];

  // Data anggota kelompok
  const members = [
    { name: "HAZEERA SYADZA ZUL ISLAMADINA (15)", img: "/images/easy/pisjo.png" },
    { name: "INKA NARARYA KARUNIAWARDHANI (16)", img: "/images/easy/klepon.png" },
    { name: "MARITSA KHANSA EVANTHE (21)", img: "/images/easy/pukis.png" },
    { name: "NADIA HANA BELINDA (27)", img: "/images/easy/arumanis.png" },
    { name: "SILVIA RESTA AUDITYAS (31)", img: "/images/easy/klepon.png" },
    { name: "VANESHA MAULIDYA PRISTIANY (32)", img: "/images/easy/klepon.png" },
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
      {/* Navbar (konsisten sama homepage) */}
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
        <h2 className="bg-[#FCB53B] text-[#84994F] font-bold text-3xl px-10 py-3 rounded-full shadow-lg">
          Anggota Kelompok
        </h2>
      </div>

      {/* Anggota Kelompok Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 px-6 lg:px-12">
        {members.map((m, idx) => {
          const tilt = idx % 2 === 0 ? "-rotate-6" : "rotate-6";
          return (
            <div
              key={idx}
              className="flex items-center gap-4 transform hover:scale-105 transition duration-300"
            >
              {/* 🔽 Gambar diperkecil */}
              <Image
                src={m.img}
                alt={m.name}
                width={65}
                height={85}
                className={`drop-shadow-lg ${tilt} hover:rotate-0 transition-transform duration-300
                            w-[50px] h-[70px] sm:w-[55px] sm:h-[75px] md:w-[60px] md:h-[80px] lg:w-[65px] lg:h-[85px]`}
              />
              <p className="font-semibold text-xs md:text-sm lg:text-base text-[#FFE797] leading-snug">
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
