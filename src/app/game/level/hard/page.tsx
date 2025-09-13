"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RefreshCcw, Home, Clock, Star } from "lucide-react";
import Card from "../../../components/card"; // pastikan path sesuai

const cardImages = [
  { src: "/images/hard/klepon.png", matched: false },
  { src: "/images/hard/arumanis.png", matched: false },
  { src: "/images/hard/pisjo.png", matched: false },
  { src: "/images/hard/pukis.png", matched: false },
  { src: "/images/hard/risol.png", matched: false },
  { src: "/images/hard/serabi.png", matched: false },
  { src: "/images/hard/lupis.png", matched: false },
  { src: "/images/hard/cenil.png", matched: false },
  { src: "/images/hard/dadar.png", matched: false },
  { src: "/images/hard/wajik.png", matched: false },
  { src: "/images/hard/getuk.png", matched: false },
  { src: "/images/hard/ondeonde.png", matched: false },
  { src: "/images/hard/kueku.png", matched: false },
  { src: "/images/hard/apem.png", matched: false },
  { src: "/images/hard/nagasari.png", matched: false },
  { src: "/images/hard/klethik.png", matched: false },
  { src: "/images/hard/lapis.png", matched: false },
  { src: "/images/hard/kueputu.png", matched: false },
];

export default function HardLevel() {
  const [cards, setCards] = useState<any[]>([]);
  const [firstChoice, setFirstChoice] = useState<any>(null);
  const [secondChoice, setSecondChoice] = useState<any>(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);

  // Suara
  const playMatchSound = () => {
    const audio = new Audio("/sounds/match.mp3");
    audio.play();
  };
  const playWinSound = () => {
    const audio = new Audio("/sounds/win.mp3");
    audio.play();
  };

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  // Handle pilihan kartu
  const handleChoice = (card: any) => {
    if (!disabled) {
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
        playMatchSound();
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  // Cek kalau menang
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      playWinSound();
      setTimeout(() => {
        alert("🎉 Congrats! Kamu berhasil menamatkan Level Hard!");
      }, 500);
    }
  }, [cards]);

  // Reset pilihan
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-5xl px-6 py-4">
        <div className="bg-[#E78A8A] text-white px-4 py-2 rounded-full flex items-center gap-2">
          <Clock className="w-5 h-5" /> {time}s
        </div>
        <h2 className="text-3xl font-bold text-[#FCB53B]">LEVEL HARD</h2>
        <div className="bg-[#E78A8A] text-white px-4 py-2 rounded-full flex items-center gap-2">
          <Star className="w-5 h-5" /> {score}
        </div>
      </div>

      {/* Grid kartu */}
      <div className="grid grid-cols-6 gap-4 mt-6">
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
    </div>
  );
}
