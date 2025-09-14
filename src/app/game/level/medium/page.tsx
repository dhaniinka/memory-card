"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { RefreshCcw, Home, Clock, Star, PartyPopper } from "lucide-react";
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

  const matchSoundRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);

  // Timer
  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gameOver]);

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

  useEffect(() => {
    shuffleCards();
  }, []);

  // Handle pilihan kartu
  const handleChoice = (card: any) => {
    if (!disabled && !card.matched && card !== firstChoice) {
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
        matchSoundRef.current?.play();
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  // Cek game selesai
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameOver(true);
      winSoundRef.current?.play();
    }
  }, [cards]);

  // Reset pilihan
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white relative">
      {/* Suara */}
      <audio ref={matchSoundRef} src="/sounds/match.mp3" />
      <audio ref={winSoundRef} src="/sounds/win.mp3" />

      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-4xl px-6 py-4">
        <div className="bg-[#E78A8A] text-white px-4 py-2 rounded-full flex items-center gap-2">
          <Clock className="w-5 h-5" /> {time}s
        </div>
        <h2 className="text-3xl font-bold text-[#FCB53B]">LEVEL MEDIUM</h2>
        <div className="bg-[#E78A8A] text-white px-4 py-2 rounded-full flex items-center gap-2">
          <Star className="w-5 h-5" /> {score}
        </div>
      </div>

      {/* Grid kartu → dinamis & responsif */}
      <div
        className="
          grid 
          grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 
          gap-3 sm:gap-4 lg:gap-6 
          mt-6 w-full max-w-6xl px-4
        "
      >
        {cards.map((card) => {
          const isFlipped =
            card.matched || card === firstChoice || card === secondChoice;
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
      <div className="flex gap-6 mt-10">
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
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
            <h2 className="text-3xl font-bold text-[#FCB53B] flex items-center justify-center gap-2">
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
                className="px-5 py-2 bg-[#B45253] text-white rounded-full shadow-md hover:scale-105 transition"
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
