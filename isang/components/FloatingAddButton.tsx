
'use client';

import { useState } from 'react';

interface FloatingAddButtonProps {
  onClick: () => void;
}

export default function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="fixed bottom-28 right-6 z-40">
      {/* 반짝이는 외곽 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping opacity-30"></div>
      
      {/* 글로우 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-40 animate-pulse"></div>
      
      {/* 메인 버튼 */}
      <button
        className={`relative w-16 h-16 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 !rounded-button transform ${
          isPressed ? 'scale-90' : 'hover:scale-110 hover:rotate-90'
        }`}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onClick={onClick}
        style={{
          filter: 'drop-shadow(0 8px 25px rgba(147, 51, 234, 0.4))',
          boxShadow: '0 0 30px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* 내부 글로우 */}
        <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
        
        {/* 플러스 아이콘 */}
        <i className="ri-add-line text-2xl text-white relative z-10 drop-shadow-sm"></i>
        
        {/* 미니 반짝임 효과 */}
        <div className="absolute top-2 right-3 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
      </button>
    </div>
  );
}
