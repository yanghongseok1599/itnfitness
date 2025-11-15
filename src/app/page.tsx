"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import VideoPlayer from "@/components/video-player";
import { useState } from "react";
import { submitToGoogleSheets } from "@/lib/googleSheets";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        alert("✅ " + result.message);
        setFormData({ name: "", phone: "", message: "" });
      } else {
        alert("❌ " + result.message);
      }
    } catch (error) {
      console.error("제출 오류:", error);
      alert("❌ 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto w-full space-y-8">
          {/* 타이틀 및 설명 */}
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <span className="text-purple-400 text-sm font-medium">ITN</span>
              <span className="text-white/80 text-sm">재활 전문 피트니스</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{ lineHeight: '1.3' }}>
              통증을 넘어,<br />지속 가능한 건강으로
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              재활 전문가 기반의 정확한 평가와 교정운동 시스템으로 통증을 줄이고 건강한 움직임을 회복하세요
            </p>
          </div>

          {/* 비디오 플레이어 */}
          <VideoPlayer src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />

          {/* CTA 버튼 */}
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <a
              href="#contact-form"
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/50"
            >
              상담 신청하기
            </a>
            <a
              href="#contact-form"
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              체험 등록하기
            </a>
            <a
              href="https://pf.kakao.com"
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              💬 카카오톡 상담
            </a>
          </div>

          {/* 마이크로 디테일 */}
          <div className="flex flex-wrap gap-6 justify-center text-sm text-white/60 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span>의학 석사 보유</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span>52개 기관 교육</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span>10년+ 경력</span>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            왜 ITN 피트니스인가?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="bg-gray-800/50 border-gray-700 p-8 hover:border-purple-600 transition-colors">
              <div className="text-5xl mb-4">😣</div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">문제</h3>
              <p className="text-gray-300">
                허리, 목, 어깨, 무릎 통증으로 운동을 시작하기 두렵고,
                기존 헬스장에서 통증이 더 악화된 경험이 있으신가요?
              </p>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-8 hover:border-purple-600 transition-colors">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">솔루션</h3>
              <p className="text-gray-300">
                ITN은 재활 전문가의 정확한 평가를 통해 개인 맞춤형
                교정운동 프로그램을 제공합니다.
              </p>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 p-8 hover:border-purple-600 transition-colors">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">결과</h3>
              <p className="text-gray-300">
                통증 감소는 물론, 재발 방지와 지속 가능한 건강한
                움직임을 되찾게 됩니다.
              </p>
            </Card>
          </div>

          {/* 전문성 강조 */}
          <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-lg p-10 border border-purple-700">
            <h3 className="text-3xl font-bold mb-8 text-center">운영자 전문성</h3>
            <div className="grid md:grid-cols-2 gap-6 text-lg">
              <div className="flex items-start">
                <span className="text-purple-400 mr-3">✓</span>
                <span>의학 석사 학위 보유</span>
              </div>
              <div className="flex items-start">
                <span className="text-purple-400 mr-3">✓</span>
                <span>52개 국·공기관 교육 진행</span>
              </div>
              <div className="flex items-start">
                <span className="text-purple-400 mr-3">✓</span>
                <span>재활 전문 트레이너 자격</span>
              </div>
              <div className="flex items-start">
                <span className="text-purple-400 mr-3">✓</span>
                <span>10년+ 통증 개선 경력</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            회원들의 변화
          </h2>

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
              <p className="text-purple-400 font-semibold">- 김○○ (48세, 사무직)</p>
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
              <p className="text-purple-400 font-semibold">- 이○○ (35세, 자영업)</p>
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
              <p className="text-purple-400 font-semibold">- 박○○ (52세, 직장인)</p>
            </Card>
          </div>

          {/* 성과 지표 */}
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-gradient-to-b from-purple-900/30 to-purple-800/30 rounded-lg p-8 border border-purple-700">
              <div className="text-5xl font-bold text-purple-400 mb-2">200+</div>
              <div className="text-gray-300">통증 개선 사례</div>
            </div>
            <div className="bg-gradient-to-b from-purple-900/30 to-purple-800/30 rounded-lg p-8 border border-purple-700">
              <div className="text-5xl font-bold text-purple-400 mb-2">95%</div>
              <div className="text-gray-300">회원 만족도</div>
            </div>
            <div className="bg-gradient-to-b from-purple-900/30 to-purple-800/30 rounded-lg p-8 border border-purple-700">
              <div className="text-5xl font-bold text-purple-400 mb-2">52개</div>
              <div className="text-gray-300">기관 교육 실적</div>
            </div>
            <div className="bg-gradient-to-b from-purple-900/30 to-purple-800/30 rounded-lg p-8 border border-purple-700">
              <div className="text-5xl font-bold text-purple-400 mb-2">10년+</div>
              <div className="text-gray-300">전문 경력</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Elements Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            ITN만의 차별화된 시스템
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-purple-600 rounded-full p-3 mr-4 flex-shrink-0">
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
                <div className="bg-purple-600 rounded-full p-3 mr-4 flex-shrink-0">
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
                <div className="bg-purple-600 rounded-full p-3 mr-4 flex-shrink-0">
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
                <div className="bg-purple-600 rounded-full p-3 mr-4 flex-shrink-0">
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

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 px-4 bg-black">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
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
                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            더 이상 통증으로 고민하지 마세요
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            동해 지역 NO.1 재활 전문 피트니스<br />
            ITN이 여러분의 건강한 삶을 책임집니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-6 text-xl"
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
              <h3 className="text-2xl font-bold text-purple-400 mb-4">ITN 피트니스</h3>
              <p className="text-gray-400">
                통증 없이 지속 가능한 건강을 만듭니다
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">빠른 링크</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition">프로그램 안내</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">이용 요금</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">오시는 길</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">문의</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 전화: 010-XXXX-XXXX</li>
                <li>📍 위치: 강원도 동해시</li>
                <li>⏰ 운영: 월-금 06:00-22:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>&copy; 2024 ITN Fitness. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
