'use client';

import { useState, useEffect } from 'react';

interface TaskCardProps {
  id: string;
  title: string;
  goalName?: string;
  progress?: number;
  category: string;
  priority: 'high' | 'medium' | 'low';
  deadline?: string;
  completed: boolean;
  onComplete: (id: string) => void;
  showDeleteMode?: boolean;
  onDelete?: (id: string) => void;
}

export default function TaskCard({ 
  id, 
  title, 
  goalName, 
  progress = 0, 
  category, 
  priority, 
  deadline,
  completed,
  onComplete, 
  showDeleteMode = false,
  onDelete 
}: TaskCardProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isOverdue, setIsOverdue] = useState(false);
  const [formattedDeadline, setFormattedDeadline] = useState('');

  useEffect(() => {
    if (deadline) {
      const deadlineDate = new Date(deadline);
      const now = new Date();
      if (deadlineDate < now && !completed) {
        setIsOverdue(true);
      }
      setFormattedDeadline(
        deadlineDate.toLocaleString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    }
  }, [deadline, completed]);


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
    if (!showDeleteMode && !completed) {
      onComplete(id);
    }
  };

  const cardClasses = `
    relative bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-lg transition-all duration-300
    ${!completed ? 'cursor-pointer' : ''}
    ${isPressed && !completed ? 'scale-95' : 'hover:scale-[1.02]'}
    ${isOverdue ? 'border-2 border-red-500' : ''}
    ${completed ? 'opacity-60' : ''}
  `;

  return (
    <div
      className={cardClasses}
      onMouseDown={() => !completed && setIsPressed(true)}
      onMouseUp={() => !completed && setIsPressed(false)}
      onMouseLeave={() => !completed && setIsPressed(false)}
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
          <div className="flex items-center space-x-2 flex-wrap">
            {goalName && <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">{goalName}</span>}
            <div className={`w-2 h-2 ${getPriorityColor(priority)} rounded-full`}></div>
            <span className="text-xs text-gray-500">{getPriorityText(priority)}</span>
            {isOverdue && <span className="text-xs font-bold text-red-500 bg-red-100 px-2 py-1 rounded-full">기한 지남</span>}
          </div>
          <div className="w-8 h-8 flex items-center justify-center">
            <i className={`text-xl ${completed ? 'ri-checkbox-circle-fill text-purple-500' : 'ri-checkbox-blank-circle-line text-gray-400'}`}></i>
          </div>
        </div>
        
        <h3 className={`text-base font-semibold text-gray-800 mb-2 ${completed ? 'line-through' : ''}`}>{title}</h3>
        
        {deadline && (
          <div className="flex items-center space-x-1 mb-3 text-sm text-gray-600">
            <i className="ri-time-line text-sm"></i>
            <span>{formattedDeadline} 까지</span>
          </div>
        )}
        
        <div className="flex items-center space-x-3">
          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getCategoryColor(category)} transition-all duration-500 shadow-sm`}
              style={{ width: `${completed ? 100 : progress}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-600">{completed ? 100 : progress}%</span>
        </div>
      </div>
      
      {!completed && <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>}
    </div>
  );
}