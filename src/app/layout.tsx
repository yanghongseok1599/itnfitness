import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://landing-page-eight-kappa-56.vercel.app'),

  // Google Search Console 인증
  verification: {
    google: 'ULrbCZA1O6k1gKttO1b84SmVd_rFYYgGdWa0cPbZAIg',
  },

  // 기본 메타데이터
  title: {
    default: "ITN 피트니스 - 통증 없이 지속 가능한 건강 | 동해 재활 전문 피트니스",
    template: "%s | ITN 피트니스"
  },
  description: "동해 지역 NO.1 재활 전문 피트니스. 의학 석사 보유 전문가의 정확한 평가와 맞춤형 교정운동으로 허리·목·어깨·무릎 통증을 근본적으로 개선합니다. 52개 국공기관 교육 실적, 10년+ 경력.",

  // 키워드 (SEO 최적화)
  keywords: [
    // 지역 + 업종
    "동해 피트니스", "동해 헬스장", "동해시 헬스장", "동해 재활운동", "동해 PT",
    // 체형교정
    "동해 체형교정", "동해시 체형교정",
    // 필라테스
    "동해 필라테스", "동해시 필라테스",
    // 통증 관련
    "허리 통증 운동", "목 통증 치료", "어깨 통증 개선", "무릎 통증 재활",
    // 서비스 특징
    "재활 전문 피트니스", "교정 운동", "통증 치료 운동", "맞춤형 PT",
    // 브랜드
    "ITN 피트니스", "ITN FITNESS",
    // 추가 키워드
    "의학 석사 트레이너", "재활 전문가", "통증 개선", "자세 교정",
    "강원도 피트니스", "동해시 헬스", "재활 트레이닝"
  ],

  // 저자 정보
  authors: [
    { name: "ITN Fitness" },
    { name: "ITN 피트니스", url: "https://landing-page-eight-kappa-56.vercel.app" }
  ],

  // 제작자
  creator: "ITN Fitness",
  publisher: "ITN Fitness",

  // 분류
  category: "Health & Fitness",

  // Open Graph (Facebook, KakaoTalk 등)
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://landing-page-eight-kappa-56.vercel.app",
    siteName: "ITN 피트니스",
    title: "ITN 피트니스 - 통증 없이 지속 가능한 건강",
    description: "동해 지역 NO.1 재활 전문 피트니스. 의학 석사 보유 전문가가 허리·목·어깨·무릎 통증을 근본적으로 개선합니다.",
    images: [
      {
        url: "https://landing-page-eight-kappa-56.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "ITN 피트니스 - 재활 전문 피트니스 센터",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "ITN 피트니스 - 통증 없이 지속 가능한 건강",
    description: "동해 지역 NO.1 재활 전문 피트니스. 의학 석사 보유 전문가가 허리·목·어깨·무릎 통증을 근본적으로 개선합니다.",
    images: ["https://landing-page-eight-kappa-56.vercel.app/og-image.png"],
    creator: "@ITNFitness",
  },

  // 검색 엔진 최적화
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 뷰포트
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },

  // 추가 메타데이터
  alternates: {
    canonical: "https://landing-page-eight-kappa-56.vercel.app",
  },

  // 앱 링크 (모바일 최적화)
  appleWebApp: {
    capable: true,
    title: "ITN 피트니스",
    statusBarStyle: "black-translucent",
  },

  // 포맷 감지
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD 구조화 데이터 (검색 엔진 최적화)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": "https://landing-page-eight-kappa-56.vercel.app",
    "name": "ITN 피트니스",
    "alternateName": "ITN FITNESS",
    "description": "동해 지역 재활 전문 피트니스 센터. 의학 석사 보유 전문가의 맞춤형 교정운동으로 통증을 근본적으로 개선합니다.",
    "url": "https://landing-page-eight-kappa-56.vercel.app",
    "logo": "https://landing-page-eight-kappa-56.vercel.app/og-image.png",
    "image": "https://landing-page-eight-kappa-56.vercel.app/og-image.png",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "동해시",
      "addressRegion": "강원도",
      "addressCountry": "KR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.5247",
      "longitude": "129.1144"
    },
    "areaServed": {
      "@type": "City",
      "name": "동해시"
    },
    "serviceArea": {
      "@type": "City",
      "name": "동해시"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "재활 운동 서비스",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "맞춤형 재활 운동",
            "description": "개인별 통증 평가 후 맞춤형 교정 운동 프로그램"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "통증 치료 PT",
            "description": "허리, 목, 어깨, 무릎 통증 전문 1:1 트레이닝"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "200",
      "bestRating": "5"
    },
    "sameAs": [
      "https://www.instagram.com/itn.fitness",
      "https://pf.kakao.com"
    ]
  };

  return (
    <html lang="ko">
      <head>
        {/* Google Search Console 인증 */}
        <meta name="google-site-verification" content="ULrbCZA1O6k1gKttO1b84SmVd_rFYYgGdWa0cPbZAIg" />
        {/* Naver Search Advisor 인증 */}
        <meta name="naver-site-verification" content="aa6012e6abe058a43ddf8adc69707acf80b064ce" />
        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
