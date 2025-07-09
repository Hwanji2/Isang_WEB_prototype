
'use client';

import { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
import TaskCard from '../components/TaskCard';
import FloatingAddButton from '../components/FloatingAddButton';
import TaskCreationModal from '../components/TaskCreationModal';
import FocusMode from '../components/FocusMode';
import RecordVisibilityModal from '../components/RecordVisibilityModal';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('전체');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: '30분 조깅하기',
      goalName: '운동',
      progress: 75,
      category: 'fitness',
      priority: 'high',
      location: '한강공원'
    },
    {
      id: '2', 
      title: '영어 단어 50개 외우기',
      goalName: '학습',
      progress: 60,
      category: 'study',
      priority: 'medium',
      location: ''
    },
    {
      id: '3',
      title: '프로젝트 기획서 작성',
      goalName: '업무',
      progress: 30,
      category: 'work',
      priority: 'high',
      location: '사무실'
    },
    {
      id: '4',
      title: '물 2L 마시기',
      goalName: '건강',
      progress: 80,
      category: 'health',
      priority: 'low',
      location: ''
    },
    {
      id: '5',
      title: '독서 1시간',
      goalName: '개인성장',
      progress: 45,
      category: 'personal',
      priority: 'medium',
      location: '도서관'
    }
  ]);

  const [categories, setCategories] = useState([
    { id: 'all', name: '전체', color: 'from-gray-400 to-gray-500' },
    { id: 'fitness', name: '운동', color: 'from-orange-400 to-red-500' },
    { id: 'study', name: '학습', color: 'from-blue-400 to-indigo-500' },
    { id: 'work', name: '업무', color: 'from-green-400 to-emerald-500' },
    { id: 'health', name: '건강', color: 'from-cyan-400 to-teal-500' },
    { id: 'personal', name: '개인성장', color: 'from-purple-400 to-pink-500' },
  ]);

  const [showDeleteMode, setShowDeleteMode] = useState(false);

  // AI 우선순위 자동 설정
  const getAIPriority = (title: string, category: string) => {
    const urgentKeywords = ['긴급', '마감', '중요', '회의', '프로젝트', '시험', '발표'];
    const routineKeywords = ['물', '운동', '산책', '독서', '정리'];
    
    const titleLower = title.toLowerCase();
    
    if (urgentKeywords.some(keyword => titleLower.includes(keyword))) {
      return 'high';
    } else if (routineKeywords.some(keyword => titleLower.includes(keyword))) {
      return 'low';
    } else {
      return 'medium';
    }
  };

  const handleTaskComplete = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setIsFocusModeOpen(true);
    }
  };

  const handleFocusComplete = (proof: any) => {
    setIsFocusModeOpen(false);
    setIsRecordModalOpen(true);
  };

  const handleRecordConfirm = (settings: any) => {
    if (selectedTask) {
      setTasks(tasks.map(task => 
        task.id === selectedTask.id 
          ? { ...task, progress: 100 }
          : task
      ));
    }
    setSelectedTask(null);
    setIsRecordModalOpen(false);
  };

  const handleAddTask = (newTask: any) => {
    const priority = getAIPriority(newTask.title, newTask.category);
    setTasks([...tasks, { ...newTask, priority }]);
  };

  const handleAddCategory = (newCategory: any) => {
    setCategories([...categories, newCategory]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (categoryId !== 'all') {
      setCategories(categories.filter(cat => cat.id !== categoryId));
      // 해당 카테고리의 할일들도 삭제
      setTasks(tasks.filter(task => task.category !== categoryId));
    }
  };

  const filteredTasks = activeFilter === '전체' 
    ? tasks 
    : tasks.filter(task => {
        const category = categories.find(cat => cat.name === activeFilter);
        return category && task.category === category.id;
      });

  // 우선순위별 정렬
  const sortedTasks = filteredTasks.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-white/20 z-40">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">오늘의 목표</h1>
            <p className="text-sm text-gray-600">힘내서 완료해보세요! 💪</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowDeleteMode(!showDeleteMode)}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 !rounded-button ${
                showDeleteMode ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <i className="ri-delete-bin-line"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="fixed top-20 left-0 right-0 bg-white/60 backdrop-blur-sm z-30">
        <div className="flex space-x-2 p-4 overflow-x-auto">
          {categories.map((category) => (
            <div key={category.id} className="relative">
              <button
                onClick={() => setActiveFilter(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 !rounded-button ${
                  activeFilter === category.name
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-white/70 text-gray-600 hover:bg-white/90'
                }`}
              >
                {category.name}
              </button>
              {showDeleteMode && category.id !== 'all' && (
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs !rounded-button"
                >
                  <i className="ri-close-line"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="pt-36 pb-32 px-4">
        <div className="space-y-4">
          {sortedTasks.map((task) => (
            <div key={task.id} className="relative">
              <TaskCard
                {...task}
                onComplete={handleTaskComplete}
                showDeleteMode={showDeleteMode}
                onDelete={handleDeleteTask}
              />
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
                <i className="ri-task-line text-3xl text-white"></i>
              </div>
              <p className="text-gray-500">해당 카테고리에 할 일이 없습니다</p>
            </div>
          )}
        </div>
      </div>

      <FloatingAddButton onClick={() => setIsAddModalOpen(true)} />
      <BottomNav />

      <TaskCreationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddTask}
        onAddCategory={handleAddCategory}
        categories={categories}
      />

      <FocusMode
        isOpen={isFocusModeOpen}
        task={selectedTask}
        onClose={() => setIsFocusModeOpen(false)}
        onComplete={handleFocusComplete}
      />

      <RecordVisibilityModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        onConfirm={handleRecordConfirm}
      />
    </div>
  );
}
