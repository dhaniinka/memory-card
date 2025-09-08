"use client";

import Link from "next/link";
import { Folder, ArrowLeft, Leaf, Brain, Flame } from "lucide-react";

export default function MenuPage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white px-6 bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/bg-hijau.jpeg')", // ganti sesuai file kamu di /public
      }}
    >
      {/* Overlay biar lebih jelas */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Tombol Home di pojok kiri atas */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg text-white font-semibold shadow-md hover:bg-red-700 transition transform hover:scale-105 z-20"
      >
        <ArrowLeft className="w-5 h-5" />
        Home
      </Link>

      {/* Konten utama */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Judul */}
        <h1 className="text-4xl font-extrabold mb-10 flex items-center gap-2 drop-shadow-lg">
          <Folder className="w-8 h-8 text-yellow-400" />
          Pilih Level
        </h1>

        {/* Tombol Level */}
        <div className="flex flex-col gap-6 w-48">
          <Link
            href="/game/easy"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 rounded-xl text-white font-semibold shadow-md hover:bg-green-700 transition transform hover:scale-105"
          >
            <Leaf className="w-5 h-5" />
            Easy
          </Link>

          <Link
            href="/game/medium"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 rounded-xl text-white font-semibold shadow-md hover:bg-yellow-600 transition transform hover:scale-105"
          >
            <Brain className="w-5 h-5" />
            Medium
          </Link>

          <Link
            href="/game/hard"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 rounded-xl text-white font-semibold shadow-md hover:bg-red-700 transition transform hover:scale-105"
          >
            <Flame className="w-5 h-5" />
            Hard
          </Link>
        </div>
      </div>
    </div>
  );
}
