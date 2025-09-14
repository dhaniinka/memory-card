"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  RefreshCcw,
  Home,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  PartyPopper,
  Volume2,
  VolumeX,
} from "lucide-react";
import Card from "../../../components/card";

const cardImages = [
  { src: "/images/easy/klepon.png", matched: false },
  { src: "/images/easy/arumanis.png", matched: false },
  { src: "/images/easy/pisjo.png", matched: false },
  { src: "/images/easy/pukis.png", matched: false },
  { src: "/images/easy/risol.png", matched: false },
  { src: "/images/easy/serabi.png", matched: false },
];

// ✅ mapping level -> next level
const nextLevelMap: Record<string, string | null> = {
  easy: "medium",
  medium: "hard",
  hard: null,
};

export default function EasyLevel() {
  const level = "easy";
  const nextLevel = nextLevelMap[level];

  const [cards, setCards] = useState<any[]>([]);
  const [firstChoice, setFirstChoice] = useState<any>(null);
  const [secondChoice, setSecondChoice] = useState<any>(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [showInfo, setShowInfo] = useState(true);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [preview, setPreview] = useState(false);

  const [isMuted, setIsMuted] = useState(false);

  // 🔊 audio ref
  const level1SoundRef = useRef<HTMLAudioElement | null>(null);
  const matchSoundRef = useRef<HTMLAudioElement | null>(null);
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);

  // Timer jalan hanya saat main beneran
  useEffect(() => {
    if (gameOver || showInfo || preview) return;
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [gameOver, showInfo, preview]);

  // Shuffle kartu
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setFirstChoice(null);
    setSecondChoice(null);
    setScore(0);
    setTime(0);
    setGameOver(false);
  };

  // ✅ cek apakah user sudah pilih "jangan tampilkan lagi"
  useEffect(() => {
    const hide = sessionStorage.getItem("hideGameInfo");
    if (hide === "true") {
      setShowInfo(false);
      shuffleCards();
      setPreview(true);
      setTimeout(() => setPreview(false), 3000);
      setTimeout(() => {
        if (!isMuted) {
          level1SoundRef.current?.play().catch(() => {});
        }
      }, 500);
    }
  }, []);

  // Play musik background
  useEffect(() => {
    if (!isMuted && !showInfo && !preview && !gameOver) {
      level1SoundRef.current?.play().catch(() => {});
    } else {
      level1SoundRef.current?.pause();
      if (level1SoundRef.current) level1SoundRef.current.currentTime = 0;
    }
  }, [showInfo, preview, gameOver, isMuted]);

  const handleChoice = (card: any) => {
    if (!disabled && !card.matched && card !== firstChoice && !preview) {
      firstChoice ? setSecondChoice(card) : setFirstChoice(card);
    }
  };

  // ✅ Cek match dengan timing lebih natural
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);

      if (firstChoice.src === secondChoice.src) {
        // MATCH ✅
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.src === firstChoice.src ? { ...c, matched: true } : c
          )
        );
        setScore((s) => s + 1);

        // 🎵 langsung play
        if (!isMuted && matchSoundRef.current) {
          matchSoundRef.current.currentTime = 0;
          matchSoundRef.current.play().catch(() => {});
        }

        // reset turn dengan delay 800ms
        setTimeout(() => resetTurn(), 800);
      } else {
        // WRONG ❌
        // kasih delay sedikit sebelum sound bunyi
        setTimeout(() => {
          if (!isMuted && wrongSoundRef.current) {
            wrongSoundRef.current.currentTime = 0;
            wrongSoundRef.current.play().catch(() => {});
          }
        }, 350);

        // reset setelah 1000ms
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  // ✅ Cek game selesai dengan jeda sebelum pop-up muncul
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      level1SoundRef.current?.pause();
      if (!isMuted && winSoundRef.current) {
        winSoundRef.current.currentTime = 0;
        winSoundRef.current.play().catch(() => {});
      }
      // jeda 1 detik biar lebih smooth
      setTimeout(() => {
        setGameOver(true);
      }, 1000);
    }
  }, [cards]);

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  // Tutup popup info
  const handleStart = () => {
    if (dontShowAgain) {
      sessionStorage.setItem("hideGameInfo", "true");
    }
    setShowInfo(false);
    shuffleCards();
    setPreview(true);

    setTimeout(() => {
      setPreview(false);
    }, 3000);

    setTimeout(() => {
      if (!isMuted) {
        level1SoundRef.current?.play().catch(() => {});
      }
    }, 500);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen relative bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-merah.png')" }}
    >
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/20" />

      {/* 🔊 Audio */}
      <audio ref={level1SoundRef} src="/sounds/level1.mp3" loop muted={isMuted} />
      <audio ref={matchSoundRef} src="/sounds/match.mp3" muted={isMuted} />
      <audio ref={wrongSoundRef} src="/sounds/wrong.mp3" muted={isMuted} />
      <audio ref={winSoundRef} src="/sounds/win.mp3" muted={isMuted} />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center w-full max-w-xl px-6 py-4">
        <div className="bg-[#E78A8A] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
          <Clock className="w-5 h-5" /> {time}s
        </div>
        <h2 className="text-3xl font-bold text-[#FCB53B] uppercase drop-shadow-md">
          LEVEL {level}
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMuted((m) => !m)}
            className="p-2 rounded-full bg-white/80 shadow"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <div className="bg-[#E78A8A] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
            <Star className="w-5 h-5" /> {score}
          </div>
        </div>
      </div>

      {/* Grid kartu */}
      <div className="relative z-10 grid grid-cols-4 gap-4 mt-6">
        {cards.map((card) => {
          const isFlipped =
            preview || card.matched || card === firstChoice || card === secondChoice;
          return (
            <Card
              key={card.id}
              card={card}
              isFlipped={isFlipped}
              handleChoice={handleChoice}
            />
          );
        })}
      </div>

      {/* Tombol bawah */}
      <div className="relative z-10 flex gap-6 mt-10">
        <button
          onClick={() => {
            shuffleCards();
            setPreview(true);
            setTimeout(() => setPreview(false), 3000);
          }}
          className="px-6 py-3 bg-[#B45253] text-white rounded-full font-bold shadow-lg hover:scale-105 transition flex items-center gap-2"
        >
          <RefreshCcw className="w-5 h-5" /> Restart
        </button>
        <Link
          href="/menu"
          className="px-6 py-3 bg-[#FCB53B] text-white rounded-full font-bold shadow-lg hover:scale-105 transition flex items-center gap-2"
        >
          <Home className="w-5 h-5" /> Menu
        </Link>
      </div>

      {/* Pop-up Cara Main */}
      {showInfo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-[#FCB53B] mb-4">🎉 Cara Bermain</h2>
            <ul className="text-left text-gray-700 space-y-2 mb-6">
              <li>• Klik salah satu kartu untuk membukanya.</li>
              <li>• Buka kartu kedua untuk mencari pasangan.</li>
              <li>• Jika cocok ✔, kartu tetap terbuka.</li>
              <li>• Jika tidak ✘, kartu akan tertutup kembali.</li>
              <li>• Cocokkan semua pasangan untuk menang 🎉</li>
            </ul>
            <div className="flex justify-center gap-6 mb-6">
              <div className="flex flex-col items-center">
                <Image src="/back.png" alt="Tertutup" width={80} height={100} />
                <p className="mt-2 text-sm text-gray-600">Tertutup</p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/images/easy/klepon.png"
                  alt="Terbuka"
                  width={80}
                  height={100}
                />
                <p className="mt-2 text-sm text-gray-600">Terbuka</p>
              </div>
            </div>
            <button
              onClick={handleStart}
              className="px-6 py-2 bg-[#FCB53B] text-white rounded-full shadow-md hover:scale-105 transition mb-4"
            >
              Mulai
            </button>
            <div className="flex items-center justify-center gap-2">
              <input
                type="checkbox"
                id="dontShowAgain"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
              />
              <label htmlFor="dontShowAgain" className="text-sm text-gray-600">
                Jangan tampilkan lagi
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up Congrats */}
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
            <h2 className="text-3xl font-bold text-[#FCB53B] flex items-center justify-center gap-2 drop-shadow-md">
              <PartyPopper className="w-7 h-7 text-[#FCB53B]" /> Congrats!
            </h2>
            <p className="mt-2 text-lg text-gray-700">
              Kamu berhasil menyelesaikan level ini.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Waktu: {time}s | Skor: {score}
            </p>
            <div className="flex gap-4 justify-center mt-6">
              {nextLevel ? (
                <Link
                  href={`/game/level/${nextLevel}`}
                  className="px-5 py-2 bg-[#4CAF50] text-white rounded-full shadow-md hover:scale-105 transition"
                >
                  Lanjut Level {nextLevel}
                </Link>
              ) : (
                <button
                  onClick={() => {
                    shuffleCards();
                    setPreview(true);
                    setTimeout(() => setPreview(false), 3000);
                  }}
                  className="px-5 py-2 bg-[#B45253] text-white rounded-full shadow-md hover:scale-105 transition"
                >
                  Main Lagi
                </button>
              )}
              <Link
                href="/menu"
                className="px-5 py-2 bg-[#FCB53B] text-white rounded-full shadow-md hover:scale-105 transition"
              >
                Menu
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
