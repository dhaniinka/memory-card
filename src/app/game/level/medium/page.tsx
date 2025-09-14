"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  RefreshCcw,
  Home,
  Clock,
  Star,
  PartyPopper,
  Volume2,
  VolumeX,
} from "lucide-react";
import Card from "../../../components/card"; // pastikan path sesuai

// Daftar gambar level Medium
const cardImages = [
  { src: "/images/medium/bagong.png", matched: false },
  { src: "/images/medium/dewishinta.png", matched: false },
  { src: "/images/medium/gatotkaca.png", matched: false },
  { src: "/images/medium/petruk.png", matched: false },
  { src: "/images/medium/prabudasarata.png", matched: false },
  { src: "/images/medium/prabudewanata.png", matched: false },
  { src: "/images/medium/praburama.png", matched: false },
  { src: "/images/medium/rahwana.png", matched: false },
  { src: "/images/medium/semar.png", matched: false },
  { src: "/images/medium/srikresna.png", matched: false },
  { src: "/images/medium/werkudara.png", matched: false },
  { src: "/images/medium/gareng.png", matched: false },
];

export default function MediumLevel() {
  const [cards, setCards] = useState<any[]>([]);
  const [firstChoice, setFirstChoice] = useState<any>(null);
  const [secondChoice, setSecondChoice] = useState<any>(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // ✅ preview awal
  const [preview, setPreview] = useState(true);

  // ✅ kontrol suara
  const [isMuted, setIsMuted] = useState(false);
  const level2SoundRef = useRef<HTMLAudioElement | null>(null);
  const matchSoundRef = useRef<HTMLAudioElement | null>(null);
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);

  // Timer jalan hanya setelah preview selesai
  useEffect(() => {
    if (gameOver || preview) return;
    const timer = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gameOver, preview]);

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
    setPreview(true);

    // Tutup semua kartu otomatis setelah 4 detik
    setTimeout(() => {
      setPreview(false);
    }, 4000);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  // Play musik background
  useEffect(() => {
    if (!isMuted && !preview && !gameOver) {
      level2SoundRef.current?.play().catch(() => {});
    } else {
      level2SoundRef.current?.pause();
      if (level2SoundRef.current) level2SoundRef.current.currentTime = 0;
    }
  }, [preview, gameOver, isMuted]);

  // Handle pilihan kartu
  const handleChoice = (card: any) => {
    if (!disabled && !card.matched && card !== firstChoice && !preview) {
      firstChoice ? setSecondChoice(card) : setFirstChoice(card);
    }
  };

  // Bandingkan kartu
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === firstChoice.src ? { ...card, matched: true } : card
          )
        );
        setScore((prev) => prev + 1);

        // 🎵 sound match langsung
        if (!isMuted && matchSoundRef.current) {
          matchSoundRef.current.currentTime = 0;
          matchSoundRef.current.play().catch(() => {});
        }

        setTimeout(() => resetTurn(), 600);
      } else {
        // 🎵 sound wrong delay biar natural
        setTimeout(() => {
          if (!isMuted && wrongSoundRef.current) {
            wrongSoundRef.current.currentTime = 0;
            wrongSoundRef.current.play().catch(() => {});
          }
        }, 350);

        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  // Cek game selesai
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      level2SoundRef.current?.pause();
      if (!isMuted && winSoundRef.current) {
        winSoundRef.current.currentTime = 0;
        winSoundRef.current.play().catch(() => {});
      }
      setTimeout(() => setGameOver(true), 1000);
    }
  }, [cards]);

  // Reset pilihan
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen relative bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-merah.png')" }}
    >
      {/* Overlay biar konten jelas */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Suara */}
      <audio ref={level2SoundRef} src="/sounds/level2.mp3" loop muted={isMuted} />
      <audio ref={matchSoundRef} src="/sounds/match.mp3" muted={isMuted} />
      <audio ref={wrongSoundRef} src="/sounds/wrong.mp3" muted={isMuted} />
      <audio ref={winSoundRef} src="/sounds/win.mp3" muted={isMuted} />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center w-full max-w-4xl px-6 py-4">
        <div className="bg-[#E78A8A] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
          <Clock className="w-5 h-5" /> {time}s
        </div>
        <h2 className="text-3xl font-bold text-[#FCB53B] uppercase drop-shadow-md">
          LEVEL MEDIUM
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
      <div
        className="
          relative z-10
          grid 
          grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 
          gap-3 sm:gap-4 lg:gap-6 
          mt-6 w-full max-w-6xl px-4
        "
      >
        {cards.map((card) => {
          const isFlipped =
            preview || card.matched || card === firstChoice || card === secondChoice;
          return (
            <div
              key={card.id}
              className="
                aspect-[3/4] 
                w-[clamp(70px,10vw,120px)] 
                mx-auto
              "
            >
              <Card
                card={card}
                isFlipped={isFlipped}
                handleChoice={handleChoice}
              />
            </div>
          );
        })}
      </div>

      {/* Tombol bawah */}
      <div className="relative z-10 flex gap-6 mt-10">
        <button
          onClick={shuffleCards}
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

      {/* Pop-up Congrats */}
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
            <h2 className="text-3xl font-bold text-[#FCB53B] flex items-center justify-center gap-2 drop-shadow-md">
              <PartyPopper className="w-6 h-6 text-[#FCB53B]" /> Congrats!
            </h2>
            <p className="mt-2 text-lg text-gray-700">
              Kamu berhasil menyelesaikan level ini.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Waktu: {time}s | Skor: {score}
            </p>
            <div className="flex gap-4 justify-center mt-6">
              <Link
                href="/game/level/hard"
                className="px-5 py-2 bg-[#4CAF50] text-white rounded-full shadow-md hover:scale-105 transition"
              >
                Lanjut Level Berikutnya
              </Link>
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
