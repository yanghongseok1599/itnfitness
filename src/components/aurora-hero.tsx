"use client";

import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#c9a962", "#d4b87a", "#a88a4a", "#c9a962"];

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

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 100%, #ffffff 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-white px-4 py-24 text-gray-900"
    >
      {/* 배경 영상 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[1] opacity-30"
      >
        <source src="https://raw.githubusercontent.com/yanghongseok1599/itnfitness/master/public/ITNM.mp4" type="video/mp4" />
      </video>

      {/* 상단 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-gray-900 text-lg md:text-2xl font-bold">ITN</span>
            <span className="text-[#c9a962] text-lg md:text-2xl font-bold">FITNESS</span>
          </div>
          <div className="flex gap-4 md:gap-8 text-gray-700 text-sm md:text-base">
            <a href="#services" className="hover:text-[#c9a962] transition">서비스</a>
            <a href="#benefits" className="hover:text-[#c9a962] transition">혜택</a>
            <a href="#contact-form" className="hover:text-[#c9a962] transition">문의하기</a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto w-full space-y-8 mt-20">
        {/* 타이틀 및 설명 */}
        <div className="text-center space-y-6 mb-10">
          <h1 className="text-2xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg" style={{ lineHeight: '1.3' }}>
            당신의 건강한 변화,<br />
            <span className="text-white">ITN 피트니스</span>에서 시작하세요
          </h1>
          <p className="text-sm md:text-2xl max-w-3xl mx-auto leading-relaxed px-4 text-white/90 drop-shadow-md">
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
              className="inline-flex items-center gap-2 rounded-full bg-[#c9a962] hover:bg-[#d4b87a] px-6 py-3 md:px-10 md:py-4 text-sm md:text-lg font-bold text-white transition-colors shadow-lg shadow-[#c9a962]/30"
            >
              무료 상담 신청하기
              <FiArrowRight className="transition-transform group-hover:-rotate-45" />
            </motion.a>
          </div>
        </div>
      </div>

    </motion.section>
  );
};
