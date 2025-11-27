# ITN FITNESS 랜딩페이지 프로젝트 문서

## 프로젝트 개요

**프로젝트명:** ITN 피트니스 랜딩페이지
**목적:** 동해 지역 재활 전문 피트니스 센터 홍보 및 고객 상담 신청 유도
**배포 URL:** https://itnfitness.vercel.app
**GitHub:** https://github.com/yanghongseok1599/itnfitness

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | Next.js 16.0.3 (App Router, Turbopack) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS |
| UI 컴포넌트 | shadcn/ui |
| 애니메이션 | Framer Motion |
| 3D 효과 | React Three Fiber, @react-three/drei |
| 아이콘 | React Icons (FiArrowRight 등) |
| 배포 | Vercel |
| 폼 제출 | Google Sheets API |
| AI 챗봇 | Google Gemini API |

---

## 프로젝트 구조

```
landing-page/
├── public/
│   ├── 1.jpg, 2.jpg, 3.png          # 회원 후기 이미지
│   ├── 001.png, 002.png             # Before/After, 수상 이력 이미지
│   ├── itn.png                       # 메인 이미지
│   ├── og-image.png                  # Open Graph 이미지
│   ├── googleULrbCZA...html          # Google Search Console 인증 파일
│   ├── robots.txt                    # 검색엔진 크롤링 설정
│   └── sitemap.xml                   # 사이트맵
├── src/
│   ├── app/
│   │   ├── layout.tsx               # 루트 레이아웃 (메타데이터, SEO)
│   │   ├── page.tsx                 # 메인 페이지
│   │   ├── globals.css              # 전역 스타일
│   │   └── api/
│   │       └── chat/
│   │           └── route.ts         # AI 챗봇 API 엔드포인트
│   ├── components/
│   │   ├── aurora-hero.tsx          # 히어로 섹션 (3D 별 효과)
│   │   ├── ai-chatbot.tsx           # AI 상담 챗봇
│   │   ├── countdown-timer.tsx      # 카운트다운 타이머
│   │   ├── naver-map.tsx            # 네이버 지도 링크
│   │   └── ui/                      # shadcn/ui 컴포넌트
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── textarea.tsx
│   └── lib/
│       ├── googleSheets.ts          # Google Sheets 연동
│       └── utils.ts                 # 유틸리티 함수
├── docs/
│   └── PROJECT_DOCUMENTATION.md     # 이 문서
├── next-sitemap.config.js           # 사이트맵 설정
├── tailwind.config.ts               # Tailwind 설정
├── tsconfig.json                    # TypeScript 설정
└── package.json                     # 의존성 관리
```

---

## 주요 기능

### 1. Aurora Hero 섹션 (`aurora-hero.tsx`)
- **3D 별 효과:** React Three Fiber + @react-three/drei Stars 컴포넌트
- **그라데이션 애니메이션:** Framer Motion으로 에메랄드 색상 변화
- **고정 네비게이션:** 스크롤 시에도 상단 고정
- **반응형:** 모바일/데스크탑 폰트 크기 차별화

```tsx
// 색상 애니메이션
const COLORS_TOP = ["#10b981", "#059669", "#047857", "#065f46"];
animate(color, COLORS_TOP, {
  ease: "easeInOut",
  duration: 10,
  repeat: Infinity,
  repeatType: "mirror",
});
```

### 2. 상담 신청 폼
- **Google Sheets 연동:** 신청 정보 자동 저장
- **성공/실패 모달:** 시각적 피드백
- **필드:** 이름, 연락처, 상담 내용

### 3. AI 챗봇 (`ai-chatbot.tsx`)
- **Google Gemini API** 연동
- **ITN 피트니스 전용 응답:** 시스템 프롬프트로 맞춤 설정
- **플로팅 버튼:** 우측 하단 고정

### 4. 카운트다운 타이머 (`countdown-timer.tsx`)
- **매일 밤 10시 마감** 기준
- **실시간 업데이트:** 시, 분, 초 표시

### 5. 네이버 지도 (`naver-map.tsx`)
- **클릭 시 네이버 지도로 이동**
- **주소:** 강원도 동해시 효자남길 33-34 이아빌딩 2층

---

## 페이지 섹션 구성

| 순서 | 섹션명 | 설명 |
|------|--------|------|
| 1 | Hero | 메인 타이틀, CTA 버튼, 3D 별 효과 |
| 2 | Story | 문제/솔루션/결과 카드, 운영자 전문성 |
| 3 | Social Proof | 회원 후기 (사진+텍스트), 성과 지표 |
| 4 | Before/After | 실제 회원 변화 이미지 |
| 5 | 수상 및 이력 | 자격증, 수상 내역 |
| 6 | 차별화 시스템 | ITN만의 4가지 특징 |
| 7 | 프로그램 소개 | 1:1 PT, 필라테스, 재활PT 카드 |
| 8 | 첫 방문 혜택 | 무료 체성분 검사, 할인 정보 |
| 9 | FAQ | 자주 묻는 질문 (아코디언) |
| 10 | 찾아오시는 길 | 지도, 연락처, 운영시간 |
| 11 | 상담 신청 | 폼 + 카카오톡 버튼 |
| 12 | CTA | 최종 행동 유도 |
| 13 | Footer | 연락처, 링크 |

---

## 모바일 반응형 설계

### Tailwind 브레이크포인트
- **기본 (모바일):** `text-sm`, `p-2`, `gap-2`
- **md 이상 (768px+):** `md:text-lg`, `md:p-8`, `md:gap-8`

### 주요 반응형 적용 사항

```tsx
// 히어로 타이틀
<h1 className="text-2xl md:text-7xl">

// 프로그램 카드 - 3열 유지
<div className="grid grid-cols-3 gap-2 md:gap-8">

// 후기 섹션 - 모바일: 사진+후기 짝지어서
<div className="md:hidden">  // 모바일 전용
<div className="hidden md:block">  // 데스크탑 전용
```

---

## SEO 설정

### 메타데이터 (`layout.tsx`)

```tsx
export const metadata: Metadata = {
  title: "ITN 피트니스 - 통증 없이 지속 가능한 건강 | 동해 재활 전문 피트니스",
  description: "동해 지역 NO.1 재활 전문 피트니스...",
  keywords: ["동해 피트니스", "재활운동", "통증 치료", ...],

  // Open Graph
  openGraph: { ... },

  // Twitter Card
  twitter: { ... },

  // 검색엔진 인증
  verification: {
    google: 'ULrbCZA1O6k1gKttO1b84SmVd_rFYYgGdWa0cPbZAIg',
  },
};
```

### 검색엔진 인증 메타 태그

```html
<!-- Google Search Console -->
<meta name="google-site-verification" content="ULrbCZA1O6k1gKttO1b84SmVd_rFYYgGdWa0cPbZAIg" />

<!-- Naver Search Advisor -->
<meta name="naver-site-verification" content="aa6012e6abe058a43ddf8adc69707acf80b064ce" />
```

### JSON-LD 구조화 데이터
- **@type:** HealthAndBeautyBusiness
- **위치, 서비스, 평점 정보 포함**

---

## 외부 서비스 연동

### 1. 카카오톡 채널
- **URL:** https://pf.kakao.com/_nxkQtn
- **적용 위치:** 모든 "카카오톡으로 빠른 상담" 버튼

### 2. 네이버 지도
- **URL:** https://naver.me/Fr7zuIIp

### 3. Google Sheets
- **용도:** 상담 신청 데이터 저장
- **설정:** `.env` 파일의 API 키 필요

### 4. Google Gemini API
- **용도:** AI 챗봇
- **설정:** `.env` 파일의 API 키 필요

---

## 환경 변수 (.env)

```env
# Google Sheets API
GOOGLE_SHEETS_API_KEY=your_api_key
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key
```

---

## 배포 (Vercel)

### 자동 배포
```bash
git add .
git commit -m "커밋 메시지"
git push origin master
```
- GitHub 푸시 시 Vercel 자동 빌드/배포

### 수동 배포
```bash
npx vercel --prod
```

---

## 주요 커밋 히스토리

| 날짜 | 커밋 | 내용 |
|------|------|------|
| - | Initial | 프로젝트 초기 설정 |
| - | Aurora Hero | 3D 별 효과 히어로 섹션 추가 |
| - | Mobile responsive | 모바일 반응형 최적화 |
| - | Kakao channel | 카카오톡 채널 링크 연동 |
| - | SEO meta tags | Google/Naver 검색엔진 인증 |

---

## 연락처 정보

| 항목 | 내용 |
|------|------|
| 상호명 | ITN 피트니스 |
| 주소 | 강원도 동해시 효자남길 33-34 이아빌딩 2층 |
| 전화 | 010-9745-2246 |
| 운영시간 | 평일 06:00-01:00, 토/공휴일 09:00-19:00, 일요일 휴관 |
| 주차 | 60대 이상 무료 |

---

## 문제 해결 가이드

### 1. 빌드 오류
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install
```

### 2. 3D 효과 렌더링 문제
- React Three Fiber는 클라이언트 전용
- `"use client"` 지시어 필수

### 3. 환경 변수 미적용
- Vercel 대시보드에서 환경 변수 설정 확인
- 재배포 필요

---

## 향후 개선 사항

- [ ] 커스텀 도메인 연결
- [ ] Google Analytics 연동
- [ ] 카카오 픽셀 설치 (광고 추적)
- [ ] 페이지 로딩 속도 최적화
- [ ] 이미지 WebP 변환

---

*문서 최종 업데이트: 2025-11-26*
