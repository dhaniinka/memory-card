"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "../../../components/card"; // sama kaya easy, pake Card.tsx
import { RefreshCcw, FolderOpen, Timer, Star, Leaf } from "lucide-react";

// Tambah lebih banyak gambar untuk mode Medium
const cardImages = [
  { src: "/cards/pisangijo.png", matched: false },
  { src: "/cards/klepon.png", matched: false },
  { src: "/cards/getuk.png", matched: false },
  { src: "/cards/lupis.png", matched: false },
  { src: "/cards/serabi.png", matched: false },
  { src: "/cards/wajik.png", matched: false },
  { src: "/cards/dadar.png", matched: false },
  { src: "/cards/nagasari.png", matched: false },
  { src: "/cards/cenil.png", matched: false },
  { src: "/cards/apem.png", matched: false },
  { src: "/cards/jemblem.png", matched: false },
  { src: "/cards/kueku.png", matched: false },
];

export default function GameMedium() {
  const [cards, setCards] = useState<any[]>([]);
  const [choiceOne, setChoiceOne] = useState<any>(null);
  const [choiceTwo, setChoiceTwo] = useState<any>(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90); // 90 detik

  // Shuffle cards saat start
  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffled);
    setScore(0);
    setTimeLeft(90);
  };

  // Pilih kartu
  const handleChoice = (card: any) => {
    if (!disabled) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  // Cek match
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prev) =>
          prev.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        setScore((prev) => prev + 10);
        resetTurn();
      } else {
        setTimeout(() => {
          setScore((prev) => (prev > 0 ? prev - 2 : 0));
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Timer jalan
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Reset pilihan
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  // Auto mulai game saat buka halaman
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white px-4"
      style={{
        backgroundImage: "url('/bg-hijau.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header status */}
      <div className="flex justify-between items-center w-full max-w-5xl mb-6">
        {/* Timer (kiri) */}
        <p className="text-xl font-semibold flex items-center gap-2">
          <Timer className="w-6 h-6 text-yellow-300" /> {timeLeft}s
        </p>

        {/* Judul (tengah) */}
        <h1 className="text-3xl font-bold flex items-center gap-2 text-center">
          <Leaf className="w-8 h-8 text-green-300" /> Medium Mode
        </h1>

        {/* Score (kanan) */}
        <p className="text-xl font-semibold flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-300" /> {score}
        </p>
      </div>

      {/* Grid kartu 5x5 */}
      <div className="grid grid-cols-5 gap-6 max-w-5xl">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            handleChoice={handleChoice}
          />
        ))}
      </div>

      {/* Tombol kontrol */}
      <div className="flex gap-4 mt-10">
        <button
          onClick={shuffleCards}
          className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 flex items-center gap-2"
        >
          <RefreshCcw className="w-5 h-5" /> Restart
        </button>

        <Link
          href="/menu"
          className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 flex items-center gap-2"
        >
          <FolderOpen className="w-5 h-5" /> Menu
        </Link>
      </div>
    </div>
  );
}
