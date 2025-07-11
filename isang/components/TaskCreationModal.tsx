
'use client';

import { useState } from 'react';
import AIAssistantModal from './AIAssistantModal';

interface TaskCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: any) => void;
  onAddCategory: (category: any) => void;
  categories: any[];
}

export default function TaskCreationModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  onAddCategory, 
  categories 
}: TaskCreationModalProps) {
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [deadline, setDeadline] = useState('');
  
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('from-purple-400 to-pink-500');

  const availableColors = [
    'from-red-400 to-pink-500',
    'from-orange-400 to-red-500',
    'from-yellow-400 to-orange-500',
    'from-green-400 to-emerald-500',
    'from-teal-400 to-cyan-500',
    'from-blue-400 to-indigo-500',
    'from-indigo-400 to-purple-500',
    'from-purple-400 to-pink-500',
    'from-pink-400 to-rose-500',
  ];

  const filterCategories = categories.filter(cat => cat.id !== 'all');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview('');
  };

  const handleAISuggestion = (task: string, category: string) => {
    setTaskTitle(task);
    setSelectedCategory(category);
    setIsAIModalOpen(false);
  };

  const handleAddNewCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: Date.now().toString(),
        name: newCategoryName,
        color: newCategoryColor
      };
      onAddCategory(newCategory);
      setSelectedCategory(newCategory.id);
      setNewCategoryName('');
      setShowNewCategoryForm(false);
    }
  };

  const handleSubmit = () => {
    if (taskTitle.trim() && selectedCategory) {
      onSubmit({
        id: Date.now().toString(),
        title: taskTitle,
        category: selectedCategory,
        progress: 0,
        goalName: filterCategories.find(c => c.id === selectedCategory)?.name || '',
        image: imagePreview,
        deadline: deadline,
      });
      // 폼 초기화
      setTaskTitle('');
      setSelectedCategory('');
      setSelectedImage(null);
      setImagePreview('');
      setDeadline('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
        
        <div className="relative w-full bg-white/90 backdrop-blur-xl rounded-t-3xl p-6 shadow-2xl transform transition-all duration-300 max-h-[80vh] overflow-y-auto">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
          
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">새로운 할 일 추가</h2>
          
          <div className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="할 일을 입력하세요"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
              />
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">카테고리 선택</h3>
              
              {showNewCategoryForm ? (
                <div className="space-y-3 mb-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="새 카테고리 이름"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="flex-1 p-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={handleAddNewCategory}
                      className="px-4 py-3 bg-green-500 text-white rounded-2xl font-medium hover:bg-green-600 transition-all duration-200 !rounded-button"
                    >
                      추가
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setNewCategoryColor(color)}
                        className={`w-8 h-8 bg-gradient-to-r ${color} rounded-full border-2 transition-all duration-200 !rounded-button ${
                          newCategoryColor === color ? 'border-gray-600 scale-110' : 'border-transparent'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setShowNewCategoryForm(false)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    취소
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowNewCategoryForm(true)}
                  className="w-full p-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-purple-300 hover:text-purple-500 transition-all duration-200 mb-4 !rounded-button"
                >
                  + 새 카테고리 추가
                </button>
              )}
              
              <div className="flex flex-wrap gap-3">
                {filterCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 !rounded-button ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 마감 기한 설정 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">마감 기한 (선택)</h3>
              <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="업로드된 이미지"
                  className="w-full h-40 object-cover rounded-2xl"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-200 !rounded-button"
                >
                  <i className="ri-close-line text-sm"></i>
                </button>
              </div>
            )}
            
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">추가 옵션</h3>
              <div className="flex space-x-4">
                <label className="flex-1 p-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center space-x-2 hover:bg-white/80 transition-all duration-200 cursor-pointer !rounded-button">
                  <i className="ri-camera-line text-lg text-gray-600"></i>
                  <span className="text-sm text-gray-600">사진</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <button className="flex-1 p-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center space-x-2 hover:bg-white/80 transition-all duration-200 !rounded-button">
                  <i className="ri-map-pin-line text-lg text-gray-600"></i>
                  <span className="text-sm text-gray-600">위치</span>
                </button>
                <button 
                  onClick={() => setIsAIModalOpen(true)}
                  className="flex-1 p-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center space-x-2 hover:bg-white/80 transition-all duration-200 !rounded-button"
                >
                  <i className="ri-robot-line text-lg text-gray-600"></i>
                  <span className="text-sm text-gray-600">AI</span>
                </button>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!taskTitle.trim() || !selectedCategory}
            className="w-full mt-8 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none !rounded-button"
          >
            할 일 추가하기
          </button>
        </div>
      </div>

      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onSuggestTask={handleAISuggestion}
      />
    </>
  );
}
