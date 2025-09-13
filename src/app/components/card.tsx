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
      className="w-24 aspect-[3/4] sm:w-28 md:w-32 cursor-pointer relative perspective"
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back */}
        <div className="absolute w-full h-full backface-hidden">
          <Image
            src="/back.png"
            alt="back card"
            fill
            className="object-contain rounded-xl"
          />
        </div>

        {/* Front */}
        <div className="absolute w-full h-full rotate-y-180 backface-hidden">
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
