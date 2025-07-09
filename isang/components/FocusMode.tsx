'use client';

import { useState } from 'react';

interface FocusModeProps {
  isOpen: boolean;
  task: any;
  onClose: () => void;
  onComplete: (proof: any) => void;
}

export default function FocusMode({ isOpen, task, onClose, onComplete }: FocusModeProps) {
  const [proofText, setProofText] = useState('');
  const [proofType, setProofType] = useState('text');

  if (!isOpen || !task) return null;

  const handleComplete = () => {
    onComplete({
      type: proofType,
      content: proofText,
      timestamp: new Date().toISOString(),
    });
    setProofText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-black/30"></div>
      
      <button
        onClick={onClose}
        className="absolute top-8 left-6 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white z-10 !rounded-button"
      >
        <i className="ri-close-line text-xl"></i>
      </button>
      
      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-6 mx-auto animate-pulse shadow-2xl">
            <i className="ri-focus-3-fill text-3xl text-white"></i>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            {task.title}
          </h1>
          <p className="text-purple-200 text-lg">
            집중해서 완료해보세요!
          </p>
        </div>
        
        <div className="w-full max-w-sm space-y-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
            <h3 className="text-white font-semibold mb-4">완료 증명 제출</h3>
            
            <div className="flex space-x-2 mb-4">
              {[
                { id: 'text', icon: 'ri-edit-line', label: '텍스트' },
                { id: 'photo', icon: 'ri-camera-line', label: '사진' },
                { id: 'voice', icon: 'ri-mic-line', label: '음성' },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setProofType(type.id)}
                  className={`flex-1 p-3 rounded-xl transition-all duration-200 !rounded-button ${
                    proofType === type.id
                      ? 'bg-white text-purple-600 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <i className={`${type.icon} text-lg block mb-1`}></i>
                  <span className="text-xs">{type.label}</span>
                </button>
              ))}
            </div>
            
            {proofType === 'text' && (
              <textarea
                value={proofText}
                onChange={(e) => setProofText(e.target.value)}
                placeholder="완료 내용을 입력하세요..."
                className="w-full p-4 bg-white/20 backdrop-blur-sm rounded-2xl border-none text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                rows={4}
              />
            )}
            
            {proofType === 'photo' && (
              <div className="p-8 border-2 border-dashed border-white/30 rounded-2xl text-center">
                <i className="ri-camera-line text-3xl text-white/60 mb-2 block"></i>
                <p className="text-white/60 text-sm">사진을 업로드하세요</p>
              </div>
            )}
            
            {proofType === 'voice' && (
              <div className="p-8 text-center">
                <button className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-red-600 transition-all duration-200 !rounded-button">
                  <i className="ri-mic-fill text-2xl text-white"></i>
                </button>
                <p className="text-white/60 text-sm">음성 녹음하기</p>
              </div>
            )}
          </div>
          
          <button
            onClick={handleComplete}
            disabled={proofType === 'text' && !proofText.trim()}
            className="w-full p-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed !rounded-button"
          >
            완료하기
          </button>
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-pink-300 rounded-full animate-bounce opacity-50"></div>
      </div>
    </div>
  );
}