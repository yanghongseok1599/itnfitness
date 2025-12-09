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
import { useState, useEffect } from "react";
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
  const [showFixedCTA, setShowFixedCTA] = useState(false);

  // Scroll animation observer - optimized for mobile
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // 약간의 딜레이 후 observer 적용 (초기 렌더링 후)
    setTimeout(() => {
      const elements = document.querySelectorAll(".animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale");
      elements.forEach((el, index) => {
        // 초기에 뷰포트에 있는 요소들은 순차적으로 나타나게
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) {
          setTimeout(() => {
            el.classList.add("visible");
          }, index * 100);
        } else {
          observer.observe(el);
        }
      });
    }, 200);

    // Fixed CTA visibility
    const handleScroll = () => {
      setShowFixedCTA(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <AuroraHero />

      {/* Story Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll">
            <h2 className="text-2xl md:text-5xl font-bold text-center mb-4 text-gold-gradient">
              왜 ITN 피트니스인가?
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c9a962] to-transparent mx-auto mb-16"></div>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-8 mb-20 animate-on-scroll">
            <Card className="bg-white border-gray-200 p-2 md:p-8 card-hover shadow-sm">
              <h3 className="text-xs md:text-2xl font-bold mb-1 md:mb-4 text-[#c9a962] text-center">문제</h3>
              <p className="text-gray-600 text-[10px] md:text-base leading-tight md:leading-normal text-center">
                <span className="md:hidden">통증으로 운동이 두렵고 악화된 경험</span>
                <span className="hidden md:inline">허리, 목, 어깨, 무릎 통증으로 운동을 시작하기 두렵고, 기존 헬스장에서 통증이 더 악화된 경험이 있으신가요?</span>
              </p>
            </Card>

            <Card className="bg-white border-gray-200 p-2 md:p-8 card-hover shadow-sm">
              <h3 className="text-xs md:text-2xl font-bold mb-1 md:mb-4 text-[#c9a962] text-center">솔루션</h3>
              <p className="text-gray-600 text-[10px] md:text-base leading-tight md:leading-normal text-center">
                <span className="md:hidden">전문가의 맞춤형 교정운동 프로그램</span>
                <span className="hidden md:inline">ITN은 재활 전문가의 정확한 평가를 통해 개인 맞춤형 교정운동 프로그램을 제공합니다.</span>
              </p>
            </Card>

            <Card className="bg-white border-gray-200 p-2 md:p-8 card-hover shadow-sm">
              <h3 className="text-xs md:text-2xl font-bold mb-1 md:mb-4 text-[#c9a962] text-center">결과</h3>
              <p className="text-gray-600 text-[10px] md:text-base leading-tight md:leading-normal text-center">
                <span className="md:hidden">통증 감소와<br />재발 방지</span>
                <span className="hidden md:inline">통증 감소는 물론, 재발 방지와 지속 가능한 건강한 움직임을 되찾게 됩니다.</span>
              </p>
            </Card>
          </div>

          {/* 큰 이미지 섹션 */}
          <div className="mb-20 animate-on-scroll">
            <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <img
                src="/itn.png"
                alt="ITN 피트니스"
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* 전문성 강조 */}
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 md:p-10 border border-[#c9a962]/30 shadow-sm">
            <h3 className="animate-on-scroll text-xl md:text-3xl font-bold mb-4 md:mb-8 text-left text-gold-gradient">운영자 전문성</h3>
            <div className="grid md:grid-cols-2 gap-3 md:gap-6 text-sm md:text-lg">
              {[
                "국회의원상 수상 재활트레이너",
                "자세체형교정 전공 통합 의학 석사",
                "52개 국·공기관 체형교정 출강 강사",
                "재활 및 스포츠 전문서적 21권 집필",
                "국가대표 및 유소년 선수 의무 트레이너",
                "연예인 체형교정 및 재활 담당"
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="animate-on-scroll flex items-start"
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                >
                  <span className="text-[#c9a962] mr-3">✓</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll">
            <h2 className="text-2xl md:text-5xl font-bold text-center mb-4 text-gold-gradient">
              회원들의 변화
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c9a962] to-transparent mx-auto mb-16"></div>
          </div>

          {/* 모바일 버전 */}
          <div className="md:hidden space-y-6 mb-16 animate-on-scroll">
            {[
              { img: "/1.jpg", review: "5년 동안 고생했던 허리 통증이 3개월 만에 거의 사라졌어요. 이제는 아침에 일어나는 것도 두렵지 않습니다!", name: "김○○ (48세, 직장인)" },
              { img: "/2.jpg", review: "목과 어깨 통증으로 약만 먹다가 ITN을 만났습니다. 정확한 진단과 체계적인 운동으로 완전히 회복했어요.", name: "이○○ (35세, 전업주부)" },
              { img: "/3.png", review: "무릎 통증 때문에 운동을 포기했었는데, 이곳에서 올바른 방법을 배워 지금은 건강하게 운동하고 있습니다.", name: "박○○ (52세, 직장인)" }
            ].map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                  <img src={item.img} alt={`ITN 피트니스 후기 ${idx + 1}`} className="w-full h-auto object-cover" />
                </div>
                <Card className="bg-white border-gray-200 p-4 card-hover shadow-sm">
                  <div className="flex items-center mb-2">
                    <div className="flex text-[#c9a962] text-sm">
                      {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2 text-sm">"{item.review}"</p>
                  <p className="text-[#c9a962] font-semibold text-sm">- {item.name}</p>
                </Card>
              </div>
            ))}
          </div>

          {/* 데스크탑 버전 */}
          <div className="hidden md:block animate-on-scroll">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {["/1.jpg", "/2.jpg", "/3.png"].map((src, idx) => (
                <div key={idx} className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 card-hover">
                  <img src={src} alt={`ITN 피트니스 후기 ${idx + 1}`} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { review: "5년 동안 고생했던 허리 통증이 3개월 만에 거의 사라졌어요. 이제는 아침에 일어나는 것도 두렵지 않습니다!", name: "김○○ (48세, 직장인)" },
                { review: "목과 어깨 통증으로 약만 먹다가 ITN을 만났습니다. 정확한 진단과 체계적인 운동으로 완전히 회복했어요.", name: "이○○ (35세, 전업주부)" },
                { review: "무릎 통증 때문에 운동을 포기했었는데, 이곳에서 올바른 방법을 배워 지금은 건강하게 운동하고 있습니다.", name: "박○○ (52세, 직장인)" }
              ].map((item, idx) => (
                <Card key={idx} className="bg-white border-gray-200 p-6 card-hover shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="flex text-[#c9a962]">
                      {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">"{item.review}"</p>
                  <p className="text-[#c9a962] font-semibold">- {item.name}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* 성과 지표 */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-6 text-center animate-on-scroll">
            {[
              { num: "1200명+", label: "통증 개선 사례" },
              { num: "95%", label: "회원 만족도" },
              { num: "52개", label: "기관 교육 실적" },
              { num: "10년+", label: "전문 경력" },
              { num: "7200명+", label: "총 누적회원" }
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-b from-white to-gray-50 rounded-lg p-3 md:p-6 border border-[#c9a962]/30 card-hover shadow-sm">
                <div className="text-lg md:text-3xl font-bold text-[#c9a962] mb-1 md:mb-2">{item.num}</div>
                <div className="text-xs md:text-sm text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll">
            <h2 className="text-2xl md:text-5xl font-bold text-center mb-4 text-gold-gradient">
              실제 회원님들의 변화
            </h2>
            <p className="text-center text-gray-500 mb-16 text-lg">
              체계적인 교정 운동으로 만들어낸 놀라운 변화를 확인하세요
            </p>
          </div>

          <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200 animate-on-scroll">
            <img src="/001.png?v=3" alt="ITN 피트니스 Before After 변화" className="w-full h-auto object-cover" />
          </div>

          <div className="mt-12 text-center animate-on-scroll">
            <p className="text-gray-600 text-lg mb-6">
              "정확한 평가와 맞춤형 교정운동으로 여러분도 이런 변화를 경험할 수 있습니다"
            </p>
            <div className="inline-block bg-gradient-to-r from-gray-50 to-white rounded-lg px-8 py-4 border border-[#c9a962]/30 shadow-sm">
              <p className="text-[#c9a962] font-semibold text-lg">
                평균 3~6개월 내 눈에 띄는 체형 변화
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 수상 및 이력 Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll">
            <h2 className="text-2xl md:text-5xl font-bold text-center mb-4 text-gold-gradient">
              수상 및 이력
            </h2>
            <p className="text-center text-gray-500 mb-16 text-lg">
              전문성을 인정받은 공인된 자격과 수상 내역
            </p>
          </div>

          <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200 animate-on-scroll">
            <img src="/002.png" alt="ITN 피트니스 수상 및 이력" className="w-full h-auto object-cover" />
          </div>

          <div className="mt-8 md:mt-12 grid grid-cols-3 gap-2 md:gap-6 text-center animate-on-scroll">
            {[
              { num: "01", title: "정부 인증", desc: "국회의원상 수상 재활트레이너" },
              { num: "02", title: "학위", desc: "자세체형교정 전공 통합 의학 석사" },
              { num: "03", title: "전문서적", desc: "재활 및 스포츠 전문서적 21권 집필" }
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-b from-white to-gray-50 rounded-lg p-3 md:p-6 border border-[#c9a962]/30 card-hover shadow-sm">
                <div className="text-[#c9a962] text-2xl md:text-4xl font-bold mb-2 md:mb-4">{item.num}</div>
                <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2">{item.title}</h3>
                <p className="text-gray-600 text-xs md:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Elements Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll">
            <h2 className="text-2xl md:text-5xl font-bold text-center mb-4 text-gold-gradient">
              ITN만의 차별화된 시스템
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c9a962] to-transparent mx-auto mb-16"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-10 animate-on-scroll">
            <div className="space-y-4 md:space-y-6">
              {[
                { num: "1", title: "정밀 평가 시스템", desc: "의학적 근거 기반의 체계적인 평가로 통증의 근본 원인을 파악합니다." },
                { num: "2", title: "맞춤형 교정 운동", desc: "개인의 상태에 맞춘 1:1 맞춤 프로그램으로 안전하게 진행합니다." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="bg-[#c9a962] rounded-full w-10 h-10 md:w-12 md:h-12 mr-3 md:mr-4 flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-sm md:text-lg font-bold">{item.num}</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 md:space-y-6">
              {[
                { num: "3", title: "재발 방지 관리", desc: "통증 개선 후에도 지속적인 관리로 재발을 철저히 예방합니다." },
                { num: "4", title: "전문가 직접 지도", desc: "의학 석사 보유 전문가가 직접 모든 과정을 책임집니다." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="bg-[#c9a962] rounded-full w-10 h-10 md:w-12 md:h-12 mr-3 md:mr-4 flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-sm md:text-lg font-bold">{item.num}</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 프로그램 소개 Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-xl md:text-5xl font-bold mb-4 md:mb-6 text-gold-gradient">
              당신에게 맞는 프로그램을 찾아드립니다
            </h2>
            <p className="text-sm md:text-xl text-gray-500">
              1200명이 선택한 ITN 피트니스의 체계적인 재활 프로그램
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-8 mb-12 animate-on-scroll">
            {[
              { title: "1:1 PT", desc: "검증된 운동 전문가들의 집중 밀착 지도", features: ["개인별 체형 분석", "맞춤형 프로그램", "50분 세션"], price: "맞춤 견적" },
              { title: "필라테스", desc: "소수 정예로 진행되는 전문 필라테스 재활 프로그램", features: ["1:1 또는 2:1 수업", "체형 교정", "50분 세션"], price: "합리적 가격", popular: true },
              { title: "재활PT", desc: "통증 부위별 정밀 분석 후 의학 석사 전문가의 1:1 맞춤 케어", features: ["재발 방지 프로그램", "근력 향상 훈련", "50분 세션"], price: "장기 할인" }
            ].map((item, idx) => (
              <div key={idx} className={`bg-gradient-to-b from-white to-gray-50 rounded-xl md:rounded-2xl p-2 md:p-8 border ${item.popular ? 'border-2 border-[#c9a962] glow' : 'border-gray-200'} card-hover relative shadow-sm`}>
                {item.popular && (
                  <div className="absolute -top-2 md:-top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#c9a962] text-white px-2 md:px-6 py-0.5 md:py-2 rounded-full text-[8px] md:text-sm font-bold">
                      인기
                    </span>
                  </div>
                )}
                <h3 className="text-xs md:text-2xl font-bold mb-1 md:mb-4 text-[#c9a962] text-center mt-2 md:mt-4">{item.title}</h3>
                <p className="text-gray-600 mb-2 md:mb-6 leading-tight md:leading-relaxed text-[10px] md:text-base text-center hidden md:block">
                  {item.desc}
                </p>
                <ul className="space-y-1 md:space-y-3 mb-2 md:mb-8 text-[10px] md:text-base hidden md:block">
                  {item.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start">
                      <span className="text-[#c9a962] mr-1 md:mr-2">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center pt-2 md:pt-6 border-t border-gray-200">
                  <p className="text-gray-500 text-[8px] md:text-sm mb-1 md:mb-2">{item.price}</p>
                  <Button
                    className="w-full bg-[#c9a962] hover:bg-[#d4b87a] text-white py-1 md:py-6 text-[10px] md:text-base font-bold"
                    onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    상담 신청
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* 첫 방문 혜택 강조 */}
          <div className="animate-on-scroll bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 md:p-10 border-2 border-[#c9a962] text-center glow shadow-lg">
            <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-[#c9a962]">첫 방문 특별 혜택</h3>
            <div className="grid grid-cols-3 gap-2 md:gap-6 mb-4 md:mb-6">
              {[
                { title: "무료 체성분 검사", desc: "정밀 전신 체형 검사 및 리포트 제공" },
                { title: "무료 체형 평가", desc: "전문가 1:1 상담 포함" },
                { title: "맞춤 운동 플랜", desc: "개인별 솔루션 제안" }
              ].map((item, idx) => (
                <div key={idx}>
                  <p className="text-sm md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">{item.title}</p>
                  <p className="text-gray-600 text-xs md:text-base">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-[#c9a962] text-sm md:text-lg font-semibold mb-2">
              이번 주 신청자 한정 PT등록 시<br />헬스 1개월 무료증정 !
            </p>
            <p className="text-gray-700 text-sm mb-4">오늘 밤 10시 마감</p>
            <CountdownTimer />
            <Button
              size="lg"
              className="bg-[#c9a962] hover:bg-[#d4b87a] text-white px-6 md:px-12 py-4 md:py-7 text-sm md:text-xl font-bold mt-4 md:mt-6 pulse-gold"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              지금 바로 시작하기 →
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="animate-on-scroll">
            <h2 className="text-2xl md:text-5xl font-bold text-center mb-4 text-gold-gradient">
              자주 묻는 질문
            </h2>
            <p className="text-center text-gray-500 mb-8 md:mb-16 text-sm md:text-lg">
              궁금하신 점을 빠르게 확인하세요
            </p>
          </div>

          <div className="space-y-3 md:space-y-4 animate-on-scroll">
            {[
              { q: "처음 운동하는데 가능한가요?", a: "네, 가능합니다! ITN 피트니스는 운동 경험이 전혀 없는 분들도 안전하게 시작할 수 있도록 개인별 맞춤 프로그램을 제공합니다. 의학 석사 전문가가 현재 체력 수준과 통증 상태를 정밀하게 평가한 후, 가장 적합한 강도와 방법으로 시작합니다." },
              { q: "몇 개월 정도 다녀야 효과가 있나요?", a: "개인차가 있지만, 대부분 3~6개월 내 명확한 체형 변화를 경험하십니다. 급성 통증의 경우 2~4주 내 호전되는 경우가 많으며, 만성 통증은 3개월 이상의 꾸준한 관리가 필요합니다." },
              { q: "통증이 심한데도 운동할 수 있나요?", a: "오히려 통증이 있을 때 정확한 재활 운동이 더 중요합니다. ITN 피트니스는 국회의원상을 수상한 재활 전문가가 통증의 근본 원인을 찾아 맞춤형 교정 운동을 제공합니다." },
              { q: "주차장이 있나요?", a: "네, 넉넉한 주차 공간을 보유하고 있습니다. 60대 이상 주차 가능하며, 주차 요금은 무료입니다." },
              { q: "영업시간은 어떻게 되나요?", a: "평일 06:00 - 01:00 (익일), 토요일/공휴일: 09:00 - 19:00, 일요일: 휴관입니다." },
              { q: "가격은 어떻게 되나요?", a: "프로그램별, 기간별로 다양한 옵션이 있어 상담을 통해 맞춤 견적을 제공해드립니다. 첫 방문 시 무료 체성분 검사 및 체형 평가를 받으실 수 있습니다." }
            ].map((item, idx) => (
              <details key={idx} className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 hover:border-[#c9a962]/50 transition-all group shadow-sm">
                <summary className="cursor-pointer text-base md:text-xl font-bold text-gray-900 flex justify-between items-center">
                  <span>{item.q}</span>
                  <span className="text-[#c9a962] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 md:mt-4 text-gray-600 leading-relaxed pl-0 md:pl-4 text-sm md:text-base">
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8 md:mt-12 text-center animate-on-scroll">
            <p className="text-gray-500 mb-4 md:mb-6 text-sm md:text-base">더 궁금하신 점이 있으신가요?</p>
            <Button
              size="lg"
              className="bg-[#c9a962] hover:bg-[#d4b87a] text-white px-6 md:px-10 py-4 md:py-6 text-sm md:text-lg font-bold"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              1:1 상담 신청하기
            </Button>
          </div>
        </div>
      </section>

      {/* 위치 및 연락처 Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll">
            <h2 className="text-2xl md:text-5xl font-bold text-center mb-4 text-gold-gradient">
              찾아오시는 길
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c9a962] to-transparent mx-auto mb-16"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 animate-on-scroll">
            <NaverMap className="rounded-2xl overflow-hidden shadow-xl h-96 border border-gray-200" />

            <div className="space-y-6">
              {[
                { icon: "📍", title: "주소", lines: ["강원도 동해시 효자남길 33-34", "이아빌딩 2층"], sub: "주차 60대 이상 가능 (무료)" },
                { icon: "📞", title: "전화 상담", lines: ["010-9745-2246"], sub: "평일 06:00-01:00 / 토·공휴일 09:00-19:00", highlight: true, link: "tel:010-9745-2246" },
                { icon: "⏰", title: "운영시간", lines: ["평일: 06:00 - 01:00 (익일)", "토요일, 공휴일: 09:00 - 19:00", "일요일: 휴관"] }
              ].map((item, idx) => {
                const CardContent = (
                  <div className="flex items-start">
                    <div className="bg-[#c9a962] rounded-full p-3 mr-4">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                      {item.lines.map((line, lidx) => (
                        <p key={lidx} className={item.highlight ? "text-2xl font-bold text-[#c9a962]" : "text-gray-600"}>{line}</p>
                      ))}
                      {item.sub && <p className="text-gray-500 text-sm mt-1">{item.sub}</p>}
                    </div>
                  </div>
                );

                return item.link ? (
                  <a key={idx} href={item.link} className="block bg-white rounded-xl p-6 border border-gray-200 card-hover shadow-sm hover:border-[#c9a962] transition-colors">
                    {CardContent}
                  </a>
                ) : (
                  <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 card-hover shadow-sm">
                    {CardContent}
                  </div>
                );
              })}

              <Button
                size="lg"
                className="w-full bg-[#c9a962] hover:bg-[#d4b87a] text-white font-bold py-7 text-lg"
                onClick={() => window.open("https://pf.kakao.com/_nxkQtn", "_blank")}
              >
                카카오톡으로 빠른 상담
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="animate-on-scroll">
            <h2 className="text-2xl md:text-5xl font-bold text-center mb-4 text-gold-gradient">
              상담 신청하기
            </h2>
            <p className="text-center text-gray-500 mb-10 text-lg">
              통증 없는 건강한 삶, 지금 바로 시작하세요
            </p>
          </div>

          <Card className="bg-white border-gray-200 p-8 animate-on-scroll shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-900 text-lg">이름</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  className="mt-2 bg-gray-50 border-gray-200 text-gray-900 focus:border-[#c9a962]"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-900 text-lg">연락처</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  className="mt-2 bg-gray-50 border-gray-200 text-gray-900 focus:border-[#c9a962]"
                  placeholder="010-1234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-900 text-lg">상담 내용</Label>
                <Textarea
                  id="message"
                  className="mt-2 bg-gray-50 border-gray-200 text-gray-900 focus:border-[#c9a962]"
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
                className="w-full bg-[#c9a962] hover:bg-[#d4b87a] text-white text-lg py-6 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "제출 중..." : "상담 신청하기"}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full bg-[#f5efe6] hover:bg-[#ebe4d8] text-[#8b7355] border-[#d4c4a8] text-lg py-6"
                  onClick={() => window.open("https://pf.kakao.com/_nxkQtn", "_blank")}
                >
                  카카오톡으로 빠른 상담
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
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          <h2 className="text-2xl md:text-5xl font-bold mb-6 text-gold-gradient">
            더 이상 통증으로 고민하지 마세요
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            동해 지역 NO.1 재활 전문 피트니스<br />
            ITN이 여러분의 건강한 삶을 책임집니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#c9a962] hover:bg-[#d4b87a] text-white px-10 py-6 text-xl font-bold pulse-gold"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              지금 바로 상담 신청
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-[#c9a962] mb-4">ITN 피트니스</h3>
              <p className="text-gray-400">
                통증 없이 지속 가능한 건강을 만듭니다
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">빠른 링크</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#c9a962] transition">프로그램 안내</a></li>
                <li><a href="#" className="hover:text-[#c9a962] transition">이용 요금</a></li>
                <li><a href="#" className="hover:text-[#c9a962] transition">오시는 길</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">문의</h4>
              <ul className="space-y-2 text-gray-400">
                <li>전화: 010-9745-2246</li>
                <li>위치: 강원도 동해시 효자남길 33-34</li>
                <li className="text-sm">이아빌딩 2층</li>
                <li>평일: 06:00-01:00 (익일)</li>
                <li className="text-sm">토·공휴일: 09:00-19:00</li>
                <li className="text-sm">일요일: 휴관</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>© 2024 ITN Fitness. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Fixed CTA Button */}
      <div className={`cta-fixed ${showFixedCTA ? 'visible' : ''} bg-white/95 backdrop-blur-sm border-t border-[#c9a962]/30 p-4 shadow-lg`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-[#c9a962] font-bold">지금 상담 신청하고 특별 혜택 받으세요!</p>
            <p className="text-gray-500 text-sm">첫 방문 시 무료 체형 평가 + 헬스 1개월 무료</p>
          </div>
          <Button
            className="bg-[#c9a962] hover:bg-[#d4b87a] text-white font-bold px-8 py-6 text-lg pulse-gold flex-shrink-0"
            onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
          >
            무료 상담 신청 →
          </Button>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)}>
          <div className="bg-white border-2 border-[#c9a962] rounded-2xl p-8 max-w-md mx-4 shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#c9a962] rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce-once">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">상담 신청 완료!</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                신청해주셔서 감사합니다.<br />
                빠른 시일 내에 연락드리겠습니다.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-[#c9a962] hover:bg-[#d4b87a] text-white font-bold py-3 px-8 rounded-lg transition-all w-full"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowErrorModal(false)}>
          <div className="bg-white border-2 border-red-500 rounded-2xl p-8 max-w-md mx-4 shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">오류 발생</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
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
    </div>
  );
}
