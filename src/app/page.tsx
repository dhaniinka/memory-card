"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Play, FolderOpen, Users, Volume2, VolumeX } from "lucide-react";

export default function HomePage() {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Progress bar looping terus
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 500); // 10 detik penuh
    return () => clearInterval(timer);
  }, []);

  // Toggle musik
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden"
      style={{
        backgroundImage: "url('/bg-hijau.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🎵 Backsound */}
      <audio ref={audioRef} loop autoPlay>
        <source src="/audio/backsound.mp3" type="audio/mpeg" />
      </audio>
      <button
        onClick={toggleMusic}
        className="absolute top-4 right-4 bg-black/40 px-3 py-2 rounded-lg text-lg shadow-md hover:scale-110 transition"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* 🃏 Dekorasi kartu kiri */}
      <div className="absolute left-24 top-1/2 -translate-y-1/2 flex flex-row space-x-[-60px] animate-sway">
        <Image
          src="/images/easyback.png"
          alt="card back"
          width={150}
          height={220}
          className="opacity-50 rotate-[-15deg] drop-shadow-lg animate-zoomSlow"
        />
        <Image
          src="/images/easyback.png"
          alt="card back"
          width={150}
          height={220}
          className="opacity-80 rotate-[-5deg] drop-shadow-lg animate-zoomSlow"
        />
        <Image
          src="/images/easyback.png"
          alt="card back"
          width={150}
          height={220}
          className="opacity-100 rotate-[5deg] drop-shadow-lg animate-zoomSlow"
        />
      </div>

      {/* 🃏 Dekorasi kartu kanan */}
      <div className="absolute right-24 top-1/2 -translate-y-1/2 flex flex-row-reverse space-x-[-60px] space-x-reverse animate-sway">
        <Image
          src="/images/pisjo.png"
          alt="card front"
          width={150}
          height={220}
          className="opacity-50 rotate-[15deg] drop-shadow-lg animate-zoomSlow"
        />
        <Image
          src="/images/pisjo.png"
          alt="card front"
          width={150}
          height={220}
          className="opacity-80 rotate-[5deg] drop-shadow-lg animate-zoomSlow"
        />
        <Image
          src="/images/pisjo.png"
          alt="card front"
          width={150}
          height={220}
          className="opacity-100 rotate-[-5deg] drop-shadow-lg animate-zoomSlow"
        />
      </div>

      {/* ✨ Judul */}
      <h1
        className="text-6xl font-extrabold mb-6 tracking-widest animate-pulse"
        style={{
          color: "#FCB53B",
          textShadow: "3px 3px 8px rgba(0,0,0,0.7)",
        }}
      >
        GAME START
      </h1>

      {/* ⚡ Progress bar */}
      <div
        className="w-72 h-5 rounded-full overflow-hidden mb-6 relative"
        style={{ backgroundColor: "#B45253" }}
      >
        <div
          className="h-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            backgroundColor: "#FFE797",
          }}
        ></div>
        <span
          className="absolute inset-0 flex items-center justify-center text-xs font-bold"
          style={{ color: "black" }}
        >
          {progress}%
        </span>
      </div>

      {/* Teks kecil kedip */}
      <p
        className="mb-10 animate-pulse text-sm font-bold tracking-widest"
        style={{ color: "#FFE797" }}
      >
        PRESS PLAY TO START
      </p>

      {/* Tombol */}
      <div className="flex gap-6">
        <Link
          href="/game/level/easy"
          className="flex items-center gap-2 px-6 py-3 text-lg font-bold rounded-xl shadow-md bg-green-500 text-white hover:bg-green-600 transition transform hover:scale-110"
        >
          <Play size={20} /> Play
        </Link>

        <Link
          href="/menu"
          className="flex items-center gap-2 px-6 py-3 text-lg font-bold rounded-xl shadow-md bg-yellow-400 text-black hover:bg-yellow-500 transition transform hover:scale-110"
        >
          <FolderOpen size={20} /> Menu
        </Link>

        <Link
          href="/about"
          className="flex items-center gap-2 px-6 py-3 text-lg font-bold rounded-xl shadow-md bg-orange-500 text-white hover:bg-orange-600 transition transform hover:scale-110"
        >
          <Users size={20} /> About Us
        </Link>
      </div>

      {/* 🔧 Animasi custom */}
      <style jsx>{`
        @keyframes sway {
          0%,
          100% {
            transform: translateY(-50%) rotate(0deg);
          }
          50% {
            transform: translateY(-52%) rotate(2deg);
          }
        }
        .animate-sway {
          animation: sway 4s ease-in-out infinite;
        }

        @keyframes zoomSlow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-zoomSlow {
          animation: zoomSlow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
