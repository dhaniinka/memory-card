"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface CardProps {
  card: { id: number; src: string; matched: boolean };
  isFlipped: boolean;
  handleChoice: (card: any) => void;
}

export default function Card({ card, isFlipped, handleChoice }: CardProps) {
  const handleClick = () => {
    if (!isFlipped) {
      handleChoice(card);
    }
  };

  return (
    <div
      className="w-24 aspect-[3/4] sm:w-28 md:w-32 cursor-pointer relative"
      onClick={handleClick}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Back side */}
        <div
          className="absolute w-full h-full"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src="/back.png"
            alt="back card"
            fill
            className="object-contain rounded-xl"
          />
        </div>

        {/* Front side */}
        <div
          className="absolute w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Image
            src={card.src}
            alt="front card"
            fill
            className="object-contain rounded-xl"
          />
        </div>
      </motion.div>
    </div>
  );
}
