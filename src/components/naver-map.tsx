'use client';

interface NaverMapProps {
  className?: string;
}

export default function NaverMap({ className }: NaverMapProps) {
  return (
    <a
      href="https://naver.me/Fr7zuIIp"
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} block relative cursor-pointer group`}
    >
      {/* 배경 이미지 (지도 스크린샷 또는 그라디언트) */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-gray-900/60 to-emerald-800/40"></div>

      {/* 콘텐츠 */}
      <div className="relative h-full flex flex-col items-center justify-center text-center p-8 group-hover:scale-105 transition-transform duration-300">
        <div className="text-7xl mb-6 animate-bounce">📍</div>
        <h3 className="text-3xl font-bold text-emerald-400 mb-3">ITN 피트니스</h3>
        <p className="text-white text-lg mb-2">강원도 동해시 효자남길 33-34</p>
        <p className="text-gray-300 mb-6">이아빌딩 2층</p>
        <div className="bg-emerald-600 group-hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all">
          네이버 지도에서 보기 →
        </div>
        <p className="text-gray-400 text-sm mt-4">클릭하여 길찾기 시작</p>
      </div>
    </a>
  );
}
