'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from './context/AuthContext';
import BottomNav from '../components/BottomNav';
import TaskCard from '../components/TaskCard';
import FloatingAddButton from '../components/FloatingAddButton';
import TaskCreationModal from '../components/TaskCreationModal';
import FocusMode from '../components/FocusMode';
import RecordVisibilityModal from '../components/RecordVisibilityModal';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Task {
  id: string;
  title: string;
  goalName?: string;
  progress?: number;
  category: string;
  priority: 'high' | 'medium' | 'low';
  deadline?: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

interface Category {
    id: string;
    name: string;
    color: string;
}

interface MyRecord {
    id: string;
    date: string;
    content: string;
    image: string | null;
    public: boolean;
}

export default function Home() {
  const { currentUser } = useContext(AuthContext) || {};
  const router = useRouter();

  useEffect(() => {
    if (currentUser === null) {
      router.push('/login');
    }
  }, [currentUser, router]);

  const [activeFilter, setActiveFilter] = useState('전체');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskProof, setTaskProof] = useState<{ text: string; image: string | null } | null>(null);

  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', [
    { id: 'all', name: '전체', color: 'from-gray-400 to-gray-500' },
    { id: 'fitness', name: '운동', color: 'from-orange-400 to-red-500' },
    { id: 'study', name: '학습', color: 'from-blue-400 to-indigo-500' },
    { id: 'work', name: '업무', color: 'from-green-400 to-emerald-500' },
    { id: 'health', name: '건강', color: 'from-cyan-400 to-teal-500' },
    { id: 'personal', name: '개인성장', color: 'from-purple-400 to-pink-500' },
  ]);
  const [recentActivities, setRecentActivities] = useLocalStorage<any[]>('recentActivities', []);
  const [myRecords, setMyRecords] = useLocalStorage<MyRecord[]>('myRecords', []);


  const [showDeleteMode, setShowDeleteMode] = useState(false);

  const getAIPriority = (title: string, category: string) => {
    const urgentKeywords = ['긴급', '마감', '중요', '회의', '프로젝트', '시험', '발표'];
    const routineKeywords = ['물', '운동', '산책', '독서', '정리'];
    const titleLower = title.toLowerCase();
    if (urgentKeywords.some(keyword => titleLower.includes(keyword))) return 'high';
    if (routineKeywords.some(keyword => titleLower.includes(keyword))) return 'low';
    return 'medium';
  };

  const handleTaskComplete = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setIsFocusModeOpen(true);
    }
  };

  const handleFocusComplete = (proof: { text: string; image: string | null }) => {
    setTaskProof(proof);
    setIsFocusModeOpen(false);
    setIsRecordModalOpen(true);
  };

  const handleRecordConfirm = (settings: { public: boolean; share: boolean }) => {
    if (selectedTask && taskProof) {
        const now = new Date();
        const updatedTasks = tasks.map(task => 
            task.id === selectedTask.id 
            ? { ...task, completed: true, progress: 100, completedAt: now.toISOString() }
            : task
        );
        setTasks(updatedTasks);

        const newActivity = {
            id: `activity-${Date.now()}`,
            task: `${selectedTask.title} 완료`,
            time: '방금 전',
            type: 'task',
            proof: taskProof.text || `"${selectedTask.title}" 할 일을 성공적으로 마쳤습니다.`
        };
        setRecentActivities([newActivity, ...recentActivities]);

        const newRecord: MyRecord = {
            id: `record-${Date.now()}`,
            date: now.toISOString().split('T')[0],
            content: taskProof.text,
            image: taskProof.image,
            public: settings.public,
        };
        setMyRecords([newRecord, ...myRecords]);
    }
    setSelectedTask(null);
    setTaskProof(null);
    setIsRecordModalOpen(false);
  };

  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const priority = getAIPriority(newTaskData.title, newTaskData.category);
    const newTask: Task = {
        ...newTaskData,
        id: `task-${Date.now()}`,
        priority: newTaskData.priority || priority,
        completed: false,
        createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
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
      setTasks(tasks.filter(task => task.category !== categoryId));
    }
  };

  const filteredTasks = activeFilter === '전체' 
    ? tasks 
    : tasks.filter(task => {
        const category = categories.find(cat => cat.name === activeFilter);
        return category && task.category === category.id;
      });

  const getDynamicPriority = (task: Task): number => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    let score = priorityOrder[task.priority];

    if (task.deadline) {
      const deadlineTime = new Date(task.deadline).getTime();
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000;

      if (deadlineTime < now) {
        score += 20; // Overdue
      } else if (deadlineTime < now + oneDay) {
        score += 10; // Due within 24 hours
      }
    }
    return score;
  };

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
    }
    return getDynamicPriority(b) - getDynamicPriority(a);
  });

  if (!currentUser) {
    return null; // Or a loading spinner
  }

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
                onComplete={() => handleTaskComplete(task.id)}
                showDeleteMode={showDeleteMode}
                onDelete={() => handleDeleteTask(task.id)}
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

