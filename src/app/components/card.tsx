"use client";

import Image from "next/image";

export default function Card({ card, handleChoice, flipped }: any) {
  const handleClick = () => {
    if (!flipped) {
      handleChoice(card);
    }
  };

  return (
    <div className="relative w-36 h-48 cursor-pointer perspective"> {/* lebih besar */}
      <div
        className={`relative w-full h-full duration-500 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Depan kartu */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg">
          <Image
            src={card.src}
            alt="card front"
            width={200}
            height={260}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Belakang kartu */}
        <div
          onClick={handleClick}
          className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl overflow-hidden shadow-lg"
        >
          <Image
            src="/images/card-back.png"
            alt="card back"
            width={200}
            height={260}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
