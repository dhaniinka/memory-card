"use client";

import Link from "next/link";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { Jua } from "next/font/google";
import { usePathname } from "next/navigation";
import { useMusic } from "../musicprovider"; // ⬅️ musik global

const jua = Jua({
  weight: "400",
  subsets: ["latin"],
});

export default function GameInfoPage() {
  const pathname = usePathname();
  const { isPlaying, toggleMusic } = useMusic();

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
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-5xl font-bold text-[#FCB53B]">GAME INFO</h1>
        <p className="mt-2 text-white font-semibold drop-shadow-md">
          Cara bermain memory game step by step
        </p>
      </div>

      {/* Container Steps */}
      <div className="flex flex-col gap-6 mt-8 px-4 max-w-5xl mx-auto mb-16">
        {/* Baris 1 */}
        <div className="grid grid-cols-2 gap-4">
          {/* Step 1 */}
          <div className="bg-white/10 rounded-lg p-4 flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-[#FCB53B] text-white flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div className="grid grid-cols-2 gap-1 mt-3">
              <Image src="/back.png" alt="Card" width={60} height={75} />
              <Image src="/back.png" alt="Card" width={60} height={75} />
              <Image src="/back.png" alt="Card" width={60} height={75} />
              <Image src="/back.png" alt="Card" width={60} height={75} />
            </div>
            <p className="mt-2 text-white text-xs">Semua kartu masih tertutup</p>
          </div>

          {/* Step 2 */}
          <div className="bg-white/10 rounded-lg p-4 flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-[#FCB53B] text-white flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div className="grid grid-cols-2 gap-1 mt-3">
              <Image src="/images/easy/klepon.png" alt="Card" width={60} height={75} />
              <Image src="/back.png" alt="Card" width={60} height={75} />
              <Image src="/back.png" alt="Card" width={60} height={75} />
              <Image src="/back.png" alt="Card" width={60} height={75} />
            </div>
            <p className="mt-2 text-white text-xs">Membuka 2 kartu</p>
          </div>
        </div>

        {/* Baris 2 */}
        <div className="grid grid-cols-3 gap-4">
          {/* Step 3 */}
          <div className="bg-white/10 rounded-lg p-4 flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-[#FCB53B] text-white flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div className="grid grid-cols-2 gap-1 mt-3">
              <Image src="/images/easy/klepon.png" alt="Card" width={60} height={75} />
              <Image src="/images/easy/pukis.png" alt="Card" width={60} height={75} />
              <Image src="/back.png" alt="Card" width={60} height={75} />
              <Image src="/back.png" alt="Card" width={60} height={75} />
            </div>
            <p className="mt-2 text-white text-xs">Kartu salah, akan tertutup</p>
          </div>

          {/* Step 4 */}
          <div className="bg-white/10 rounded-lg p-4 flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-[#FCB53B] text-white flex items-center justify-center text-sm font-bold">
              4
            </div>
            <div className="grid grid-cols-2 gap-1 mt-3">
              <Image src="/images/easy/klepon.png" alt="Card" width={60} height={75} />
              <Image src="/back.png" alt="Card" width={60} height={75} />
              <Image src="/back.png" alt="Card" width={60} height={75} />
              <Image src="/images/easy/klepon.png" alt="Card" width={60} height={75} />
            </div>
            <p className="mt-2 text-white text-xs">
              Kartu benar, akan tetap terbuka
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-white/10 rounded-lg p-4 flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-[#FCB53B] text-white flex items-center justify-center text-sm font-bold">
              5
            </div>
            <div className="grid grid-cols-2 gap-1 mt-3">
              <Image src="/images/easy/klepon.png" alt="Card" width={60} height={75} />
              <Image src="/images/easy/pukis.png" alt="Card" width={60} height={75} />
              <Image src="/images/easy/pukis.png" alt="Card" width={60} height={75} />
              <Image src="/images/easy/klepon.png" alt="Card" width={60} height={75} />
            </div>
            <p className="mt-2 text-white text-xs">
              Selesaikan sampai semua kartu terbuka 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
