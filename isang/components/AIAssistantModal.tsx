
'use client';

import { useState } from 'react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuggestTask: (task: string, category: string) => void;
}

export default function AIAssistantModal({ isOpen, onClose, onSuggestTask }: AIAssistantModalProps) {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'ai', message: string}>>([]);

  const suggestions = [
    { text: "운동 루틴 추천해줘", category: "fitness" },
    { text: "효과적인 학습 방법 알려줘", category: "study" },
    { text: "생산성 향상 팁", category: "work" },
    { text: "건강한 습관 만들기", category: "health" },
  ];

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = userInput;
    setUserInput('');
    setIsLoading(true);
    
    setConversation(prev => [...prev, { role: 'user', message: userMessage }]);

    // AI 응답 시뮬레이션
    setTimeout(() => {
      const aiResponses = [
        "30분 조깅을 추천합니다. 체력 향상에 도움이 됩니다.",
        "영어 단어 20개씩 매일 외우는 것을 추천해요.",
        "프로젝트를 작은 단위로 나누어 관리해보세요.",
        "물을 하루 2L 마시는 습관을 만들어보세요.",
        "독서를 30분씩 꾸준히 하는 것을 추천합니다.",
        "요가나 스트레칭을 매일 15분씩 해보세요.",
        "한강공원에서 산책하며 운동해보세요.",
        "도서관에서 집중해서 공부하는 시간을 만드세요.",
        "사무실 근처 카페에서 업무 정리를 해보세요.",
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setConversation(prev => [...prev, { role: 'ai', message: randomResponse }]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: {text: string, category: string}) => {
    setUserInput(suggestion.text);
  };

  const handleAddTask = (message: string) => {
    // AI 메시지에서 할일 추출
    const taskMatch = message.match(/(.+?)(?:\.|을|를|는|을|하는)/);
    const task = taskMatch ? taskMatch[1].trim() : message;
    const category = determineCategory(message);
    
    onSuggestTask(task, category);
    onClose();
  };

  const determineCategory = (message: string): string => {
    if (message.includes('조깅') || message.includes('운동') || message.includes('요가') || message.includes('스트레칭')) return 'fitness';
    if (message.includes('영어') || message.includes('단어') || message.includes('학습') || message.includes('공부')) return 'study';
    if (message.includes('프로젝트') || message.includes('업무') || message.includes('관리') || message.includes('회의')) return 'work';
    if (message.includes('물') || message.includes('건강') || message.includes('습관')) return 'health';
    return 'personal';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full bg-white/90 backdrop-blur-xl rounded-t-3xl shadow-2xl transform transition-all duration-300 max-h-[80vh] flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <i className="ri-robot-fill text-white text-lg"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">AI 도우미</h2>
              <p className="text-sm text-gray-600">더 나은 할일을 만들도록 도와드릴게요</p>
            </div>
          </div>
        </div>

        {/* 대화 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px]">
          {conversation.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-chat-smile-3-line text-2xl text-purple-500"></i>
              </div>
              <p className="text-gray-600 mb-6">생산적인 할일 만들기를 어떻게 도와드릴까요?</p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-3">빠른 제안:</p>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="block w-full p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl text-left text-sm text-gray-700 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 !rounded-button"
                  >
                    {suggestion.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] p-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/70 text-gray-800'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    {msg.role === 'ai' && (
                      <button
                        onClick={() => handleAddTask(msg.message)}
                        className="mt-2 text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full hover:bg-purple-200 transition-all duration-200 !rounded-button"
                      >
                        할일로 추가
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/70 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* 입력 영역 */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="생산성에 대해 무엇이든 물어보세요..."
              className="flex-1 p-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <button
              onClick={handleSend}
              disabled={!userInput.trim() || isLoading}
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl flex items-center justify-center hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none !rounded-button"
            >
              <i className="ri-send-plane-fill text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
