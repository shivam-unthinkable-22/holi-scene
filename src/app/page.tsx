"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import HoliScene from "@/components/HoliScene";

export default function Home() {
  const params = useSearchParams();
  const name = params.get("name") || "Friend";

  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 120,
    });
  }, []);

  const whatsappShare = () => {
    const url = `${window.location.origin}?name=${name}`;
    const text = `Happy Holi ${name}! 🌈🎉 ${url}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-gradient-to-br from-pink-500 via-yellow-400 to-blue-500">

      <HoliScene />
      <div id="capture" className="relative z-10" />

      <div
        id="capture"
        className="relative z-10 bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl max-w-md w-full"
      >
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-3xl md:text-5xl font-bold text-white"
        >
          Happy Holi, {name}! 🎉
        </motion.h1>

        <p className="mt-4 text-white text-sm md:text-lg">
          Tap anywhere outside card and enjoy 3D color explosion!
        </p>

        <button
          onClick={whatsappShare}
          className="mt-4 bg-green-500 text-white px-6 py-3 rounded-full"
        >
          🔗 Share on WhatsApp
        </button>
      </div>
    </main>
  );
}
