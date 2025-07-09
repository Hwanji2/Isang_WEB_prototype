'use client';

import { useState } from 'react';

interface RecordVisibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (settings: any) => void;
}

export default function RecordVisibilityModal({ isOpen, onClose, onConfirm }: RecordVisibilityModalProps) {
  const [addRecord, setAddRecord] = useState(true);
  const [isPublic, setIsPublic] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm({ addRecord, isPublic });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-sm bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">기록 설정</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm rounded-2xl">
            <div>
              <h3 className="font-semibold text-gray-800">기록 추가</h3>
              <p className="text-sm text-gray-600">완료 기록을 저장합니다</p>
            </div>
            <button
              onClick={() => setAddRecord(!addRecord)}
              className={`relative w-12 h-6 rounded-full transition-all duration-200 !rounded-button ${
                addRecord ? 'bg-purple-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                addRecord ? 'transform translate-x-6' : ''
              }`}></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm rounded-2xl">
            <div>
              <h3 className="font-semibold text-gray-800">공개 범위</h3>
              <p className="text-sm text-gray-600">
                {isPublic ? '전체 공개' : '나만 보기'}
              </p>
            </div>
            <button
              onClick={() => setIsPublic(!isPublic)}
              className={`relative w-12 h-6 rounded-full transition-all duration-200 !rounded-button ${
                isPublic ? 'bg-purple-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                isPublic ? 'transform translate-x-6' : ''
              }`}></div>
            </button>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 p-3 bg-gray-200 text-gray-700 rounded-2xl font-medium hover:bg-gray-300 transition-all duration-200 !rounded-button"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 !rounded-button"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}