'use client';

interface NaverMapProps {
  className?: string;
}

export default function NaverMap({ className }: NaverMapProps) {
  return (
    <div className={`${className} relative`}>
      {/* 네이버 지도 iframe */}
      <iframe
        src="https://map.naver.com/p/entry/place/38339173?c=15,0,0,0,dh"
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* 하단 오버레이 - 클릭 유도 */}
      <a
        href="https://naver.me/Fr7zuIIp"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-center justify-between hover:from-black/80 transition-all"
      >
        <div className="text-white">
          <p className="font-bold text-lg">ITN 피트니스</p>
          <p className="text-sm text-white/80">강원도 동해시 효자남길 33-34</p>
        </div>
        <div className="bg-[#c9a962] hover:bg-[#d4b87a] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg transition-all">
          길찾기 →
        </div>
      </a>
    </div>
  );
}
