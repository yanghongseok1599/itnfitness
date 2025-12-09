'use client';

import { useEffect, useState } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const deadline = new Date();

      // Set deadline to 10 PM (22:00) today
      deadline.setHours(22, 0, 0, 0);

      // If current time is past 10 PM, set deadline to tomorrow 10 PM
      if (now >= deadline) {
        deadline.setDate(deadline.getDate() + 1);
      }

      const difference = deadline.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
      }

      return { hours: 0, minutes: 0, seconds: 0 };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      <div className="flex items-center gap-1">
        <div className="bg-gray-100 text-[#c9a962] font-bold text-2xl px-4 py-3 rounded-lg min-w-[60px] text-center shadow-sm">
          {formatNumber(timeLeft.hours)}
        </div>
        <span className="text-[#c9a962] font-bold text-xl">:</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="bg-gray-100 text-[#c9a962] font-bold text-2xl px-4 py-3 rounded-lg min-w-[60px] text-center shadow-sm">
          {formatNumber(timeLeft.minutes)}
        </div>
        <span className="text-[#c9a962] font-bold text-xl">:</span>
      </div>
      <div className="bg-gray-100 text-[#c9a962] font-bold text-2xl px-4 py-3 rounded-lg min-w-[60px] text-center shadow-sm">
        {formatNumber(timeLeft.seconds)}
      </div>
    </div>
  );
}
