'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../../components/BottomNav';

export default function AddPage() {
  const router = useRouter();
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const categories = [
    { id: 'fitness', name: '운동', color: 'from-orange-400 to-red-500', icon: 'ri-run-line' },
    { id: 'study', name: '공부', color: 'from-blue-400 to-indigo-500', icon: 'ri-book-open-line' },
    { id: 'work', name: '업무', color: 'from-green-400 to-emerald-500', icon: 'ri-briefcase-line' },
    { id: 'personal', name: '개인', color: 'from-purple-400 to-pink-500', icon: 'ri-user-line' },
    { id: 'health', name: '건강', color: 'from-cyan-400 to-teal-500', icon: 'ri-heart-pulse-line' },
  ];

  const goals = [
    '체중 감량 5kg',
    '영어 회화 실력 향상',
    '프로젝트 완료',
    '독서 습관 형성',
    '수면 패턴 개선',
  ];

  const priorities = [
    { id: 'low', name: '낮음', color: 'bg-green-100 text-green-700' },
    { id: 'medium', name: '보통', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'high', name: '높음', color: 'bg-red-100 text-red-700' },
  ];

  const handleSubmit = () => {
    if (taskTitle.trim() && selectedCategory) {
      // Add task logic here
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 pb-24">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-white/20 z-40">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center"
          >
            <i className="ri-arrow-left-line text-xl text-gray-600"></i>
          </button>
          <h1 className="text-xl font-bold text-gray-800">새로운 할 일</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="pt-20 px-4 space-y-6">
        {/* Task Input */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">무엇을 하실 건가요?</h3>
          <input
            type="text"
            placeholder="할 일을 입력하세요"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
          />
        </div>

        {/* Category Selection */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">카테고리</h3>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-2xl transition-all duration-200 !rounded-button ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                    : 'bg-white/70 text-gray-600 hover:bg-white/90'
                }`}
              >
                <i className={`${category.icon} text-2xl mb-2 block`}></i>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Goal Selection */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">연결할 목표</h3>
          <div className="space-y-2">
            {goals.map((goal, index) => (
              <button
                key={index}
                onClick={() => setSelectedGoal(goal)}
                className={`w-full p-3 rounded-2xl text-left transition-all duration-200 !rounded-button ${
                  selectedGoal === goal
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/70 text-gray-700 hover:bg-white/90'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        {/* Priority Selection */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">우선순위</h3>
          <div className="flex space-x-3">
            {priorities.map((p) => (
              <button
                key={p.id}
                onClick={() => setPriority(p.id)}
                className={`flex-1 p-3 rounded-2xl text-sm font-medium transition-all duration-200 !rounded-button ${
                  priority === p.id
                    ? p.color
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Due Date */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">마감일</h3>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Additional Options */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">추가 옵션</h3>
          <div className="grid grid-cols-3 gap-3">
            <button className="p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 flex flex-col items-center space-y-2 hover:bg-white/80 transition-all duration-200 !rounded-button">
              <i className="ri-camera-line text-2xl text-gray-600"></i>
              <span className="text-sm text-gray-600">사진</span>
            </button>
            <button className="p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 flex flex-col items-center space-y-2 hover:bg-white/80 transition-all duration-200 !rounded-button">
              <i className="ri-mic-line text-2xl text-gray-600"></i>
              <span className="text-sm text-gray-600">음성</span>
            </button>
            <button className="p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 flex flex-col items-center space-y-2 hover:bg-white/80 transition-all duration-200 !rounded-button">
              <i className="ri-robot-line text-2xl text-gray-600"></i>
              <span className="text-sm text-gray-600">AI 도움</span>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!taskTitle.trim() || !selectedCategory}
          className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none !rounded-button"
        >
          할 일 추가하기
        </button>
      </div>

      <BottomNav />
    </div>
  );
}