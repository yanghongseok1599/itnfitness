"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AIChatbot from "@/components/ai-chatbot";
import CountdownTimer from "@/components/countdown-timer";
import NaverMap from "@/components/naver-map";
import { AuroraHero } from "@/components/aurora-hero";
import { useState } from "react";
import { submitToGoogleSheets } from "@/lib/googleSheets";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitToGoogleSheets({
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
        source: "랜딩페이지"
      });

      if (result.success) {
        setShowSuccessModal(true);
        setFormData({ name: "", phone: "", message: "" });
      } else {
        setErrorMessage(result.message);
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("제출 오류:", error);
      setErrorMessage("오류가 발생했습니다. 다시 시도해주세요.");
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <AuroraHero />

      {/* Story Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            왜 ITN 피트니스인가?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="bg-gray-800/50 border-gray-700 p-8 hover:border-emerald-600 transition-colors">
              <div className="text-5xl mb-4">😣</div>
              <h3 className="text-2xl font-bold mb-4 text-emerald-400">문제</h3>
              <p className="text-gray-300">
                허리, 목, 어깨, 무릎 통증으로 운동을 시작하기 두렵고,
                기존 헬스장에서 통증이 더 악화된 경험이 있으신가요?
              </p>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-8 hover:border-emerald-600 transition-colors">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold mb-4 text-emerald-400">솔루션</h3>
              <p className="text-gray-300">
                ITN은 재활 전문가의 정확한 평가를 통해 개인 맞춤형
                교정운동 프로그램을 제공합니다.
              </p>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-8 hover:border-emerald-600 transition-colors">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-emerald-400">결과</h3>
              <p className="text-gray-300">
                통증 감소는 물론, 재발 방지와 지속 가능한 건강한
                움직임을 되찾게 됩니다.
              </p>
            </Card>
          </div>

          {/* 큰 이미지 섹션 */}
          <div className="mb-20">
            <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/itn.png"
                alt="ITN 피트니스"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* 전문성 강조 */}
          <div className="bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 rounded-lg p-10 border border-emerald-700">
            <h3 className="text-3xl font-bold mb-8 text-left">운영자 전문성</h3>
            <div className="grid md:grid-cols-2 gap-6 text-lg">
              <div className="flex items-start">
                <span className="text-emerald-400 mr-3">✓</span>
                <span>국회의원상 수상 재활트레이너</span>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-400 mr-3">✓</span>
                <span>자세체형교정 전공 통합 의학 석사</span>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-400 mr-3">✓</span>
                <span>52개 국·공기관 체형교정 출강 강사</span>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-400 mr-3">✓</span>
                <span>재활 및 스포츠 전문서적 21권 집필</span>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-400 mr-3">✓</span>
                <span>국가대표 및 유소년 선수 의무 트레이너</span>
              </div>
              <div className="flex items-start">
                <span className="text-emerald-400 mr-3">✓</span>
                <span>연예인 체형교정 및 재활 담당</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            회원들의 변화
          </h2>

          {/* 이미지 섹션 */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/1.jpg"
                alt="ITN 피트니스 후기 1"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/2.jpg"
                alt="ITN 피트니스 후기 2"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/3.png"
                alt="ITN 피트니스 후기 3"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "5년 동안 고생했던 허리 통증이 3개월 만에 거의 사라졌어요.
                이제는 아침에 일어나는 것도 두렵지 않습니다!"
              </p>
              <p className="text-emerald-400 font-semibold">- 김○○ (48세, 직장인)</p>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "목과 어깨 통증으로 약만 먹다가 ITN을 만났습니다.
                정확한 진단과 체계적인 운동으로 완전히 회복했어요."
              </p>
              <p className="text-emerald-400 font-semibold">- 이○○ (35세, 전업주부)</p>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "무릎 통증 때문에 운동을 포기했었는데,
                이곳에서 올바른 방법을 배워 지금은 건강하게 운동하고 있습니다."
              </p>
              <p className="text-emerald-400 font-semibold">- 박○○ (52세, 직장인)</p>
            </Card>
          </div>

          {/* 성과 지표 */}
          <div className="grid md:grid-cols-5 gap-6 text-center">
            <div className="bg-gradient-to-b from-emerald-900/30 to-emerald-800/30 rounded-lg p-6 border border-emerald-700">
              <div className="text-3xl font-bold text-emerald-400 mb-2">1200명+</div>
              <div className="text-sm text-gray-300">통증 개선 사례</div>
            </div>
            <div className="bg-gradient-to-b from-emerald-900/30 to-emerald-800/30 rounded-lg p-6 border border-emerald-700">
              <div className="text-3xl font-bold text-emerald-400 mb-2">95%</div>
              <div className="text-sm text-gray-300">회원 만족도</div>
            </div>
            <div className="bg-gradient-to-b from-emerald-900/30 to-emerald-800/30 rounded-lg p-6 border border-emerald-700">
              <div className="text-3xl font-bold text-emerald-400 mb-2">52개</div>
              <div className="text-sm text-gray-300">기관 교육 실적</div>
            </div>
            <div className="bg-gradient-to-b from-emerald-900/30 to-emerald-800/30 rounded-lg p-6 border border-emerald-700">
              <div className="text-3xl font-bold text-emerald-400 mb-2">10년+</div>
              <div className="text-sm text-gray-300">전문 경력</div>
            </div>
            <div className="bg-gradient-to-b from-emerald-900/30 to-emerald-800/30 rounded-lg p-6 border border-emerald-700">
              <div className="text-3xl font-bold text-emerald-400 mb-2">7200명+</div>
              <div className="text-sm text-gray-300">총 누적회원</div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            실제 회원님들의 변화
          </h2>
          <p className="text-center text-gray-400 mb-16 text-lg">
            체계적인 교정 운동으로 만들어낸 놀라운 변화를 확인하세요
          </p>

          <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/001.png?v=2"
              alt="ITN 피트니스 Before After 변화"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-300 text-lg mb-6">
              "정확한 평가와 맞춤형 교정운동으로 여러분도 이런 변화를 경험할 수 있습니다"
            </p>
            <div className="inline-block bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 rounded-lg px-8 py-4 border border-emerald-700">
              <p className="text-emerald-400 font-semibold text-lg">
                평균 3~6개월 내 눈에 띄는 체형 변화
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 수상 및 이력 Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            수상 및 이력
          </h2>
          <p className="text-center text-gray-400 mb-16 text-lg">
            전문성을 인정받은 공인된 자격과 수상 내역
          </p>

          <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/002.png"
              alt="ITN 피트니스 수상 및 이력"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-gradient-to-b from-emerald-900/30 to-emerald-800/30 rounded-lg p-6 border border-emerald-700">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">정부 인증</h3>
              <p className="text-gray-300 text-sm">국회의원상 수상 재활트레이너</p>
            </div>
            <div className="bg-gradient-to-b from-emerald-900/30 to-emerald-800/30 rounded-lg p-6 border border-emerald-700">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">학위</h3>
              <p className="text-gray-300 text-sm">자세체형교정 전공 통합 의학 석사</p>
            </div>
            <div className="bg-gradient-to-b from-emerald-900/30 to-emerald-800/30 rounded-lg p-6 border border-emerald-700">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">전문서적</h3>
              <p className="text-gray-300 text-sm">재활 및 스포츠 전문서적 21권 집필</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Elements Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            ITN만의 차별화된 시스템
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-emerald-600 rounded-full p-3 mr-4 flex-shrink-0">
                  <span className="text-2xl">📋</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">정밀 평가 시스템</h3>
                  <p className="text-gray-300">
                    의학적 근거 기반의 체계적인 평가로 통증의 근본 원인을 파악합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-emerald-600 rounded-full p-3 mr-4 flex-shrink-0">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">맞춤형 교정 운동</h3>
                  <p className="text-gray-300">
                    개인의 상태에 맞춘 1:1 맞춤 프로그램으로 안전하게 진행합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-emerald-600 rounded-full p-3 mr-4 flex-shrink-0">
                  <span className="text-2xl">🔄</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">재발 방지 관리</h3>
                  <p className="text-gray-300">
                    통증 개선 후에도 지속적인 관리로 재발을 철저히 예방합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-emerald-600 rounded-full p-3 mr-4 flex-shrink-0">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">전문가 직접 지도</h3>
                  <p className="text-gray-300">
                    의학 석사 보유 전문가가 직접 모든 과정을 책임집니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 프로그램 소개 Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              당신에게 맞는 프로그램을 찾아드립니다
            </h2>
            <p className="text-xl text-gray-400">
              1200명이 선택한 ITN 피트니스의 체계적인 재활 프로그램
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* 1:1 트레이닝 PT */}
            <div className="bg-gradient-to-b from-emerald-900/20 to-gray-900/20 rounded-2xl p-8 border border-emerald-700/50 hover:border-emerald-500 transition-all hover:shadow-2xl hover:shadow-emerald-500/20">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-emerald-400">1:1 트레이닝 PT</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                검증된 운동 전문가들의 집중 밀착 지도
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span className="text-gray-300">개인별 체형 분석 및 평가</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span className="text-gray-300">맞춤형 운동 프로그램</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span className="text-gray-300">50분 세션</span>
                </li>
              </ul>
              <div className="text-center pt-6 border-t border-emerald-700/30">
                <p className="text-gray-400 text-sm mb-2">상담을 통한 맞춤 견적</p>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6"
                  onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
                >
                  무료 상담 신청
                </Button>
              </div>
            </div>

            {/* 1:1 / 2:1 필라테스 PT */}
            <div className="bg-gradient-to-b from-emerald-900/20 to-gray-900/20 rounded-2xl p-8 border-2 border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-emerald-500 text-black px-6 py-2 rounded-full text-sm font-bold">
                  인기
                </span>
              </div>
              <div className="text-5xl mb-4">🧘</div>
              <h3 className="text-2xl font-bold mb-4 text-emerald-400">1:1 / 2:1 필라테스 PT</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                소수 정예로 진행되는 전문 필라테스 재활 프로그램
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span className="text-gray-300">1:1 또는 2:1 맞춤 수업</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span className="text-gray-300">체형 교정 및 통증 완화</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span className="text-gray-300">50분 세션</span>
                </li>
              </ul>
              <div className="text-center pt-6 border-t border-emerald-700/30">
                <p className="text-gray-400 text-sm mb-2">합리적인 가격으로 시작</p>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6"
                  onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
                >
                  무료 상담 신청
                </Button>
              </div>
            </div>

            {/* 1:1 재활+컨디셔닝 PT */}
            <div className="bg-gradient-to-b from-emerald-900/20 to-gray-900/20 rounded-2xl p-8 border border-emerald-700/50 hover:border-emerald-500 transition-all hover:shadow-2xl hover:shadow-emerald-500/20">
              <div className="text-5xl mb-4">💪</div>
              <h3 className="text-2xl font-bold mb-4 text-emerald-400">1:1 재활+컨디셔닝 PT</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                통증 부위별 정밀 분석 후 의학 석사 전문가의 1:1 맞춤 케어로 통증 개선 후 건강한 신체 능력 향상까지 원스톱 케어
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span className="text-gray-300">재발 방지 운동 프로그램</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span className="text-gray-300">체력 및 근력 향상 훈련</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span className="text-gray-300">50분 세션</span>
                </li>
              </ul>
              <div className="text-center pt-6 border-t border-emerald-700/30">
                <p className="text-gray-400 text-sm mb-2">장기 프로그램 할인</p>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6"
                  onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
                >
                  무료 상담 신청
                </Button>
              </div>
            </div>
          </div>

          {/* 첫 방문 혜택 강조 */}
          <div className="bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 rounded-2xl p-10 border-2 border-emerald-500 text-center">
            <h3 className="text-3xl font-bold mb-4 text-emerald-400">🎁 첫 방문 특별 혜택</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-2xl font-bold text-white mb-2">무료 체성분 검사</p>
                <p className="text-gray-300">정밀 전신 체형 검사 및 리포트 제공</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-2">무료 체형 평가</p>
                <p className="text-gray-300">전문가 1:1 상담 포함</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-2">맞춤 운동 플랜</p>
                <p className="text-gray-300">개인별 솔루션 제안</p>
              </div>
            </div>
            <p className="text-emerald-300 text-lg font-semibold mb-2">
              ⏰ 이번 주 신청자 한정 - 첫 달 20% 할인
            </p>
            <p className="text-white text-sm mb-4">오늘 밤 10시 마감</p>
            <CountdownTimer />
            <Button
              size="lg"
              className="bg-white text-emerald-900 hover:bg-gray-100 px-12 py-7 text-xl font-bold mt-6"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              지금 바로 시작하기 →
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            자주 묻는 질문
          </h2>
          <p className="text-center text-gray-400 mb-16 text-lg">
            궁금하신 점을 빠르게 확인하세요
          </p>

          <div className="space-y-4">
            <details className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 hover:border-emerald-500 transition-all group">
              <summary className="cursor-pointer text-xl font-bold text-white flex justify-between items-center">
                <span>🏃‍♂️ 처음 운동하는데 가능한가요?</span>
                <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed pl-8">
                네, 가능합니다! ITN 피트니스는 운동 경험이 전혀 없는 분들도 안전하게 시작할 수 있도록 개인별 맞춤 프로그램을 제공합니다.
                의학 석사 전문가가 현재 체력 수준과 통증 상태를 정밀하게 평가한 후, 가장 적합한 강도와 방법으로 시작합니다.
                운동 초보자의 95%가 3개월 내 눈에 띄는 개선 효과를 경험하고 있습니다.
              </p>
            </details>

            <details className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 hover:border-emerald-500 transition-all group">
              <summary className="cursor-pointer text-xl font-bold text-white flex justify-between items-center">
                <span>📅 몇 개월 정도 다녀야 효과가 있나요?</span>
                <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed pl-8">
                개인차가 있지만, 대부분 <strong className="text-emerald-400">3~6개월 내 명확한 체형 변화</strong>를 경험하십니다.
                급성 통증의 경우 2~4주 내 호전되는 경우가 많으며, 만성 통증은 3개월 이상의 꾸준한 관리가 필요합니다.
                1200명 이상의 회원 데이터 분석 결과, 평균 3.5개월 차에 가장 높은 만족도를 보였습니다.
              </p>
            </details>

            <details className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 hover:border-emerald-500 transition-all group">
              <summary className="cursor-pointer text-xl font-bold text-white flex justify-between items-center">
                <span>🤕 통증이 심한데도 운동할 수 있나요?</span>
                <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed pl-8">
                오히려 통증이 있을 때 <strong className="text-emerald-400">정확한 재활 운동이 더 중요</strong>합니다.
                ITN 피트니스는 국회의원상을 수상한 재활 전문가가 통증의 근본 원인을 찾아 맞춤형 교정 운동을 제공합니다.
                무리하지 않는 범위에서 단계적으로 진행하며, 통증이 심한 경우 초기에는 통증 완화에 집중한 후 점진적으로 운동 강도를 높입니다.
              </p>
            </details>

            <details className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 hover:border-emerald-500 transition-all group">
              <summary className="cursor-pointer text-xl font-bold text-white flex justify-between items-center">
                <span>🚗 주차장이 있나요?</span>
                <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed pl-8">
                네, 넉넉한 주차 공간을 보유하고 있습니다. <strong className="text-emerald-400">60대 이상 주차 가능</strong>하며,
                주차 요금은 무료입니다. 대중교통 이용 시에도 접근성이 좋은 위치에 있습니다.
              </p>
            </details>

            <details className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 hover:border-emerald-500 transition-all group">
              <summary className="cursor-pointer text-xl font-bold text-white flex justify-between items-center">
                <span>⏰ 영업시간은 어떻게 되나요?</span>
                <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed pl-8">
                <strong className="text-emerald-400">평일 06:00 - 01:00 (익일)</strong><br/>
                <strong className="text-emerald-400">토요일, 공휴일: 09:00 - 19:00</strong><br/>
                <strong className="text-emerald-400">일요일: 휴관</strong><br/><br/>
                새벽부터 새벽까지 운영하여 직장인 분들도 편리하게 이용하실 수 있습니다.
              </p>
            </details>

            <details className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 hover:border-emerald-500 transition-all group">
              <summary className="cursor-pointer text-xl font-bold text-white flex justify-between items-center">
                <span>💰 가격은 어떻게 되나요?</span>
                <span className="text-emerald-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-300 leading-relaxed pl-8">
                프로그램별, 기간별로 다양한 옵션이 있어 상담을 통해 맞춤 견적을 제공해드립니다.
                첫 방문 시 <strong className="text-emerald-400">무료 체성분 검사 및 체형 평가</strong>를 받으실 수 있으며,
                이번 주 신청자 한정 <strong className="text-emerald-400">첫 달 20% 할인</strong> 혜택을 드립니다.
              </p>
            </details>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">더 궁금하신 점이 있으신가요?</p>
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-6 text-lg"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              1:1 상담 신청하기
            </Button>
          </div>
        </div>
      </section>

      {/* 위치 및 연락처 Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            찾아오시는 길
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* 지도 */}
            <NaverMap className="rounded-2xl overflow-hidden shadow-2xl h-96" />

            {/* 연락처 정보 */}
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-start">
                  <div className="bg-emerald-600 rounded-full p-3 mr-4">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">주소</h3>
                    <p className="text-gray-300">강원도 동해시 효자남길 33-34</p>
                    <p className="text-gray-300">이아빌딩 2층</p>
                    <p className="text-gray-400 text-sm mt-1">주차 60대 이상 가능 (무료)</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-start">
                  <div className="bg-emerald-600 rounded-full p-3 mr-4">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">전화 상담</h3>
                    <p className="text-gray-300 text-2xl font-bold text-emerald-400">010-9745-2246</p>
                    <p className="text-gray-400 text-sm mt-1">평일 06:00-01:00 / 토·공휴일 09:00-19:00</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-start">
                  <div className="bg-emerald-600 rounded-full p-3 mr-4">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">운영시간</h3>
                    <p className="text-gray-300">평일: 06:00 - 01:00 (익일)</p>
                    <p className="text-gray-300">토요일, 공휴일: 09:00 - 19:00</p>
                    <p className="text-gray-300">일요일: 휴관</p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-7 text-lg"
                onClick={() => window.open("https://pf.kakao.com", "_blank")}
              >
                💬 카카오톡으로 빠른 상담
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 px-4 bg-black">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            상담 신청하기
          </h2>
          <p className="text-center text-gray-300 mb-10 text-lg">
            통증 없는 건강한 삶, 지금 바로 시작하세요
          </p>

          <Card className="bg-gray-800/50 border-gray-700 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white text-lg">이름</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  className="mt-2 bg-gray-900 border-gray-700 text-white"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white text-lg">연락처</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  className="mt-2 bg-gray-900 border-gray-700 text-white"
                  placeholder="010-1234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-white text-lg">상담 내용</Label>
                <Textarea
                  id="message"
                  className="mt-2 bg-gray-900 border-gray-700 text-white"
                  placeholder="통증 부위나 궁금한 점을 자유롭게 작성해주세요"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "제출 중..." : "상담 신청하기"}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 text-lg py-6"
                  onClick={() => window.open("https://pf.kakao.com", "_blank")}
                >
                  💬 카카오톡으로 빠른 상담
                </Button>
              </div>
            </form>
          </Card>

          <p className="text-center text-gray-500 mt-6 text-sm">
            ※ 입력하신 정보는 상담 목적으로만 사용되며 안전하게 보호됩니다.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            더 이상 통증으로 고민하지 마세요
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            동해 지역 NO.1 재활 전문 피트니스<br />
            ITN이 여러분의 건강한 삶을 책임집니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-6 text-xl"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              지금 바로 상담 신청
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">ITN 피트니스</h3>
              <p className="text-gray-400">
                통증 없이 지속 가능한 건강을 만듭니다
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">빠른 링크</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition">프로그램 안내</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">이용 요금</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">오시는 길</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">문의</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 전화: 010-9745-2246</li>
                <li>📍 위치: 강원도 동해시 효자남길 33-34</li>
                <li className="text-sm">이아빌딩 2층</li>
                <li>⏰ 평일: 06:00-01:00 (익일)</li>
                <li className="text-sm">토·공휴일: 09:00-19:00</li>
                <li className="text-sm">일요일: 휴관</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>&copy; 2024 ITN Fitness. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <AIChatbot />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)}>
          <div className="bg-gradient-to-br from-gray-900 to-emerald-900/30 border-2 border-emerald-500 rounded-2xl p-8 max-w-md mx-4 shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce-once">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">상담 신청 완료!</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                신청해주셔서 감사합니다.<br />
                빠른 시일 내에 연락드리겠습니다.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition-all w-full"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowErrorModal(false)}>
          <div className="bg-gradient-to-br from-gray-900 to-red-900/30 border-2 border-red-500 rounded-2xl p-8 max-w-md mx-4 shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">오류 발생</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {errorMessage}
              </p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all w-full"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce-once {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-bounce-once {
          animation: bounce-once 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}
