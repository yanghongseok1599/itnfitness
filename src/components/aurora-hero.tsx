"use client";

import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#10b981", "#059669", "#047857", "#065f46"];

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      {/* 상단 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white text-2xl font-bold">ITN</span>
            <span className="text-emerald-400 text-2xl font-bold">FITNESS</span>
          </div>
          <div className="flex gap-8 text-white">
            <a href="#services" className="hover:text-emerald-400 transition">서비스</a>
            <a href="#benefits" className="hover:text-emerald-400 transition">혜택</a>
            <a href="#contact-form" className="hover:text-emerald-400 transition">문의하기</a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto w-full space-y-8 mt-20">
        {/* 타이틀 및 설명 */}
        <div className="text-center space-y-6 mb-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{ lineHeight: '1.3' }}>
            당신의 건강한 변화,<br />
            <span className="text-emerald-400">ITN 피트니스</span>에서 시작하세요
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            전문 트레이너와 함께하는 맞춤형 피트니스 프로그램
          </p>

          {/* CTA 버튼 */}
          <div className="mt-8">
            <motion.a
              href="#contact-form"
              style={{
                border,
                boxShadow,
              }}
              whileHover={{
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.985,
              }}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600/80 hover:bg-emerald-600 px-10 py-4 text-lg font-bold text-white transition-colors shadow-lg shadow-emerald-500/50"
            >
              무료 상담 신청하기
              <FiArrowRight className="transition-transform group-hover:-rotate-45" />
            </motion.a>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};
