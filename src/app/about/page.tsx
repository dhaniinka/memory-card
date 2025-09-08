"use client";

import Link from "next/link";
import { Users, User, ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white px-6 bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/bg-hijau.jpeg')", // ganti sesuai file gambar kamu di /public
      }}
    >
      {/* Overlay biar teks lebih jelas */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Tombol Home di pojok kiri atas */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg text-white font-semibold shadow-md hover:bg-green-700 transition transform hover:scale-105 z-20"
      >
        <ArrowLeft className="w-5 h-5" />
        Home
      </Link>

      {/* Konten */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Judul */}
        <h1 className="text-4xl font-extrabold mb-6 flex items-center gap-2 drop-shadow-lg">
          <Users className="w-8 h-8 text-yellow-400" />
          About Us
        </h1>

        {/* Deskripsi */}
        <p className="text-lg text-center mb-8 max-w-xl leading-relaxed drop-shadow-md">
          Game Memory Card ini dibuat untuk memenuhi tugas kelompok.
          Berikut anggota kelompok kami:
        </p>

        {/* Daftar Anggota */}
        <ul className="space-y-3 text-lg">
          <li className="flex items-center gap-2 drop-shadow-md">
            <User className="w-5 h-5 text-green-400" />
            Anggota 1 – HAZEERA SYADZA ZUL ISLAMADINA (15)
          </li>
          <li className="flex items-center gap-2 drop-shadow-md">
            <User className="w-5 h-5 text-green-400" />
            Anggota 2 – INKA NARARYA KARUNIAWARDHANI (16)
          </li>
          <li className="flex items-center gap-2 drop-shadow-md">
            <User className="w-5 h-5 text-green-400" />
            Anggota 3 – MARITSA KHANSA EVANTHE (21)
          </li>
          <li className="flex items-center gap-2 drop-shadow-md">
            <User className="w-5 h-5 text-green-400" />
            Anggota 4 – NADIA HANA BELINDA (27)
          </li>
          <li className="flex items-center gap-2 drop-shadow-md">
            <User className="w-5 h-5 text-green-400" />
            Anggota 5 – SILVIA RESTA AUDITYAS (31)
          </li>
          <li className="flex items-center gap-2 drop-shadow-md">
            <User className="w-5 h-5 text-green-400" />
            Anggota 6 – VANESHA MAULIDYA PRISTIANY (32)
          </li>
        </ul>
      </div>
    </div>
  );
}
