"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RefreshCcw, Home, Clock, Star } from "lucide-react";
import Card from "../../../components/card";

const baseCards = [
  { pairId: "ha", src: "/images/hard/ha.png", matched: false },
  { pairId: "ha", src: "/images/hard/ha-latin.png", matched: false },
  { pairId: "na", src: "/images/hard/na.png", matched: false },
  { pairId: "na", src: "/images/hard/na-latin.png", matched: false },
  { pairId: "ca", src: "/images/hard/ca.png", matched: false },
  { pairId: "ca", src: "/images/hard/ca-latin.png", matched: false },
  { pairId: "ra", src: "/images/hard/ra.png", matched: false },
  { pairId: "ra", src: "/images/hard/ra-latin.png", matched: false },
  { pairId: "ka", src: "/images/hard/ka.png", matched: false },
  { pairId: "ka", src: "/images/hard/ka-latin.png", matched: false },
  { pairId: "da", src: "/images/hard/da.png", matched: false },
  { pairId: "da", src: "/images/hard/da-latin.png", matched: false },
  { pairId: "ta", src: "/images/hard/ta.png", matched: false },
  { pairId: "ta", src: "/images/hard/ta-latin.png", matched: false },
  { pairId: "sa", src: "/images/hard/sa.png", matched: false },
  { pairId: "sa", src: "/images/hard/sa-latin.png", matched: false },
  { pairId: "ma", src: "/images/hard/ma.png", matched: false },
  { pairId: "ma", src: "/images/hard/ma-latin.png", matched: false },
  { pairId: "ga", src: "/images/hard/ga.png", matched: false },
  { pairId: "ga", src: "/images/hard/ga-latin.png", matched: false },
  { pairId: "ba", src: "/images/hard/ba.png", matched: false },
  { pairId: "ba", src: "/images/hard/ba-latin.png", matched: false },
  { pairId: "pa", src: "/images/hard/pa.png", matched: false },
  { pairId: "pa", src: "/images/hard/pa-latin.png", matched: false },
  { pairId: "ya", src: "/images/hard/ya.png", matched: false },
  { pairId: "ya", src: "/images/hard/ya-latin.png", matched: false },
  { pairId: "la", src: "/images/hard/la.png", matched: false },
  { pairId: "la", src: "/images/hard/la-latin.png", matched: false },
  { pairId: "wa", src: "/images/hard/wa.png", matched: false },
  { pairId: "wa", src: "/images/hard/wa-latin.png", matched: false },
];

export default function HardLevel() {
  const [cards, setCards] = useState<any[]>([]);
  const [firstChoice, setFirstChoice] = useState<any>(null);
  const [secondChoice, setSecondChoice] = useState<any>(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [showWin, setShowWin] = useState(false);

  const playMatchSound = () => new Audio("/sounds/match.mp3").play();
  const playWinSound = () => new Audio("/sounds/win.mp3").play();

  useEffect(() => {
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const shuffleCards = () => {
    const shuffled = [...baseCards]
      .sort(() => Math.random() - 0.5)
      .map((c) => ({ ...c, id: Math.random() }));
    setCards(shuffled);
    setFirstChoice(null);
    setSecondChoice(null);
    setScore(0);
    setTime(0);
    setShowWin(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleChoice = (card: any) => {
    if (!disabled) firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (
        firstChoice.pairId === secondChoice.pairId &&
        firstChoice.id !== secondChoice.id
      ) {
        setCards((prev) =>
          prev.map((c) =>
            c.pairId === firstChoice.pairId ? { ...c, matched: true } : c
          )
        );
        setScore((s) => s + 1);
        playMatchSound();
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.matched)) {
      playWinSound();
      setTimeout(() => setShowWin(true), 500);
    }
  }, [cards]);

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white relative">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-6xl px-6 py-4">
        <div className="bg-[#E78A8A] text-white px-4 py-2 rounded-full flex items-center gap-2">
          <Clock className="w-5 h-5" /> {time}s
        </div>
        <h2 className="text-3xl font-bold text-[#FCB53B]">LEVEL HARD</h2>
        <div className="bg-[#E78A8A] text-white px-4 py-2 rounded-full flex items-center gap-2">
          <Star className="w-5 h-5" /> {score}
        </div>
      </div>

      {/* Grid kartu */}
      <div className="grid grid-cols-10 grid-rows-3 gap-3 mt-6">
        {cards.map((card) => {
          const isFlipped =
            card.matched || card === firstChoice || card === secondChoice;
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

      {/* Pop-up Win */}
      {showWin && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md">
            <h2 className="text-2xl font-bold text-[#FCB53B] mb-4">
              🎉 Congrats!
            </h2>
            <p className="mb-6 text-gray-600">
              Kamu berhasil menamatkan Level Hard!
            </p>
            <Link
              href="/menu"
              className="px-6 py-3 bg-[#FCB53B] text-white rounded-full font-bold shadow-lg hover:scale-105 transition"
            >
              Back to Menu
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
