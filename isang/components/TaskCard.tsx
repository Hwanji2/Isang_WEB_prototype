
'use client';

import { useState } from 'react';

interface TaskCardProps {
  id: string;
  title: string;
  goalName: string;
  progress: number;
  category: string;
  priority: string;
  location?: string;
  onComplete: (id: string) => void;
  showDeleteMode?: boolean;
  onDelete?: (id: string) => void;
}

export default function TaskCard({ 
  id, 
  title, 
  goalName, 
  progress, 
  category, 
  priority, 
  location, 
  onComplete, 
  showDeleteMode = false,
  onDelete 
}: TaskCardProps) {
  const [isPressed, setIsPressed] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors = {
      fitness: 'from-orange-400 to-red-500',
      study: 'from-blue-400 to-indigo-500',
      work: 'from-green-400 to-emerald-500',
      personal: 'from-purple-400 to-pink-500',
      health: 'from-cyan-400 to-teal-500',
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-400';
  };

  const getPriorityText = (priority: string) => {
    const texts = {
      high: '높음',
      medium: '보통',
      low: '낮음'
    };
    return texts[priority as keyof typeof texts] || '보통';
  };

  const handleCardClick = () => {
    if (!showDeleteMode) {
      onComplete(id);
    }
  };

  return (
    <div
      className={`relative bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform ${
        isPressed ? 'scale-95' : 'hover:scale-[1.02]'
      }`}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={handleCardClick}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(category)} opacity-10 rounded-2xl`}></div>
      
      {showDeleteMode && onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center z-20 !rounded-button"
        >
          <i className="ri-close-line text-lg"></i>
        </button>
      )}
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
              {goalName}
            </span>
            <div className={`w-2 h-2 ${getPriorityColor(priority)} rounded-full`}></div>
            <span className="text-xs text-gray-500">{getPriorityText(priority)}</span>
          </div>
          <div className="w-8 h-8 flex items-center justify-center">
            <i className="ri-checkbox-blank-circle-line text-xl text-gray-400"></i>
          </div>
        </div>
        
        <h3 className="text-base font-semibold text-gray-800 mb-2">{title}</h3>
        
        {location && (
          <div className="flex items-center space-x-1 mb-3">
            <i className="ri-map-pin-line text-sm text-gray-500"></i>
            <span className="text-sm text-gray-600">{location}</span>
          </div>
        )}
        
        <div className="flex items-center space-x-3">
          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getCategoryColor(category)} transition-all duration-500 shadow-sm`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-600">{progress}%</span>
        </div>
      </div>
      
      <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
    </div>
  );
}
