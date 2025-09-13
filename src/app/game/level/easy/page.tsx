"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RefreshCcw, Home, Clock, Star } from "lucide-react";

const cardImages = [
  { src: "/images/easy/klepon.png", matched: false },
  { src: "/images/easy/arumanis.png", matched: false },
  { src: "/images/easy/pisjo.png", matched: false },
  { src: "/images/easy/pukis.png", matched: false },
  { src: "/images/easy/risol.png", matched: false },
  { src: "/images/easy/serabi.png", matched: false },
];

export default function EasyLevel() {
  const [cards, setCards] = useState<any[]>([]);
  const [firstChoice, setFirstChoice] = useState<any>(null);
  const [secondChoice, setSecondChoice] = useState<any>(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);

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
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setScore((prev) => prev + 1);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  // Reset pilihan
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-xl px-6 py-4">
        <div className="bg-[#E78A8A] text-white px-4 py-2 rounded-full flex items-center gap-2">
          <Clock className="w-5 h-5" /> {time}s
        </div>
        <h2 className="text-3xl font-bold text-[#FCB53B]">LEVEL EASY</h2>
        <div className="bg-[#E78A8A] text-white px-4 py-2 rounded-full flex items-center gap-2">
          <Star className="w-5 h-5" /> {score}
        </div>
      </div>

      {/* Grid kartu */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        {cards.map((card) => {
          const isFlipped =
            card.matched || card === firstChoice || card === secondChoice;
          return (
            <div
              key={card.id}
              onClick={() => handleChoice(card)}
              className="w-36 h-48 cursor-pointer relative"
            >
              <Image
                src={isFlipped ? card.src : "/back.png"}
                alt="card"
                fill
                className="object-cover rounded-lg"
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
    </div>
  );
}
