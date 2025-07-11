
'use client';

import { useState, useEffect, ChangeEvent, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';
import BottomNav from '../../components/BottomNav';
import { useLocalStorage } from '../../hooks/useLocalStorage';


// Define the user type for better type checking
interface User {
  name: string;
  nickname: string;
  avatar: string;
  level: number;
  totalScore: number;
}

export default function MyPage() {
  const { currentUser } = useContext(AuthContext) || {};
  const router = useRouter();

  useEffect(() => {
    if (currentUser === null) {
      router.push('/login');
    }
  }, [currentUser, router]);

  const [user, setUser] = useLocalStorage<User>('user', {
    name: '김이상',
    nickname: '@isang_achiever',
    avatar: 'https://readdy.ai/api/search-image?query=friendly%20Korean%20person%20profile%20photo%2C%20professional%20headshot%2C%20clean%20background%2C%20realistic%20portrait%20photography%2C%20natural%20lighting&width=120&height=120&seq=mypage1&orientation=squarish',
    level: 15,
    totalScore: 2847
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedAvatar, setEditedAvatar] = useState(user.avatar);

  const [goals] = useLocalStorage('goals', [
    { id: '1', name: '운동', progress: 85, target: 100, color: 'from-orange-400 to-red-500' },
    { id: '2', name: '학습', progress: 72, target: 100, color: 'from-blue-400 to-indigo-500' },
    { id: '3', name: '업무', progress: 90, target: 100, color: 'from-green-400 to-emerald-500' },
    { id: '4', name: '건강', progress: 68, target: 100, color: 'from-cyan-400 to-teal-500' },
    { id: '5', name: '개인성장', progress: 55, target: 100, color: 'from-purple-400 to-pink-500' },
  ]);

  const [badges, setBadges] = useLocalStorage('badges', [
    { id: '1', name: '3일 연속', description: '3일 연속 할일 완료', icon: 'ri-fire-fill', color: 'from-orange-400 to-red-500', earned: true, progress: 3, target: 3 },
    { id: '2', name: '100점 돌파', description: '총 점수 100점 달성', icon: 'ri-trophy-fill', color: 'from-yellow-400 to-orange-500', earned: true, progress: 2847, target: 100 },
    { id: '3', name: '완벽한 주', description: '일주일 모든 할일 완료', icon: 'ri-star-fill', color: 'from-purple-400 to-pink-500', earned: true, progress: 1, target: 1 },
    { id: '4', name: '초보 탈출', description: '레벨 10 달성', icon: 'ri-rocket-fill', color: 'from-blue-400 to-indigo-500', earned: true, progress: 15, target: 10 },
    { id: '5', name: '월간 왕', description: '한 달간 1위 유지', icon: 'ri-crown-fill', color: 'from-purple-500 to-pink-600', earned: false, progress: 15, target: 30 },
    { id: '6', name: '마스터', description: '레벨 50 달성', icon: 'ri-award-fill', color: 'from-green-400 to-emerald-500', earned: false, progress: 15, target: 50 },
  ]);

  const [recentActivities, setRecentActivities] = useLocalStorage('recentActivities', [
    { id: '1', task: '30분 조깅 완료', time: '2시간 전', type: 'fitness', proof: '한강공원에서 3km 달리기 완료!' },
    { id: '2', task: '영어 단어 50개 암기', time: '4시간 전', type: 'study', proof: '오늘 새로운 단어 50개 외웠어요.' },
    { id: '3', task: '프로젝트 회의 참석', time: '어제', type: 'work', proof: '팀 회의에서 새로운 아이디어 제안' },
    { id: '4', task: '독서 1시간', time: '어제', type: 'personal', proof: '자기계발서 30페이지 읽기 완료' },
    { id: '5', task: '물 2L 마시기', time: '2일 전', type: 'health', proof: '하루 권장량 달성!' },
  ]);

  const [myRecords, setMyRecords] = useLocalStorage('myRecords', [
    { id: '1', date: '2024-01-15', content: '오늘 정말 힘들었지만 모든 할일을 완료했다!', image: '', public: true },
    { id: '2', date: '2024-01-14', content: '운동 30분 완료. 체력이 조금씩 늘고 있는 것 같다.', image: '', public: false },
    { id: '3', date: '2024-01-13', content: '새로운 프로젝트 시작. 기대된다!', image: '', public: true },
  ]);

  const [showBadgeDetail, setShowBadgeDetail] = useState(false);
  const [showRecords, setShowRecords] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  const handleSave = () => {
    setUser(prevUser => ({
      ...prevUser,
      name: editedName,
      avatar: editedAvatar,
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user.name);
    setEditedAvatar(user.avatar);
    setIsEditing(false);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);//
    }
  };

  const updateBadgeProgress = () => {
    setBadges(badges.map(badge => {
      let newProgress = badge.progress;
      switch(badge.id) {
        case '1': newProgress = Math.min(badge.target, badge.progress + 1); break;
        case '2': newProgress = user.totalScore; break;
        case '5': newProgress = Math.min(badge.target, badge.progress + 1); break;
        case '6': newProgress = user.level; break;
      }
      return { ...badge, progress: newProgress, earned: newProgress >= badge.target };
    }));
  };

  const deleteActivity = (id: string) => {
    setRecentActivities(recentActivities.filter(activity => activity.id !== id));
  };

  const refreshActivities = () => {
    const newActivities = [
      { id: Date.now().toString(), task: '새로운 활동 추가됨', time: '방금 전', type: 'fitness', proof: '새로고침으로 추가된 활동' },
      ...recentActivities.slice(0, 4)
    ];
    setRecentActivities(newActivities);
  };

  const deleteRecord = (id: string) => {
    setMyRecords(myRecords.filter(record => record.id !== id));
  };

  useEffect(() => {
    updateBadgeProgress();
  }, [user.totalScore, user.level]);

  // When user data changes, update the edited state as well
  useEffect(() => {
    setEditedName(user.name);
    setEditedAvatar(user.avatar);
  }, [user]);

  if (!currentUser) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 pb-24">
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-white/20 z-40">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-gray-800">내 정보</h1>
          <Link href="/settings" className="w-10 h-10 flex items-center justify-center">
            <i className="ri-settings-3-line text-xl text-gray-600"></i>
          </Link>
        </div>
      </div>

      <div className="pt-20 px-4 space-y-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          {isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20">
                  <img
                    src={editedAvatar}
                    alt="Avatar Preview"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer text-white hover:bg-purple-700">
                    <i className="ri-camera-line"></i>
                    <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  </label>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full text-xl font-bold text-gray-800 border-b-2 border-purple-300 focus:border-purple-500 outline-none bg-transparent"
                  />
                  <p className="text-gray-600">{user.nickname}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">취소</button>
                <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">저장</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-r from-purple-400 to-pink-400 p-1">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                  <p className="text-gray-600">{user.nickname}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <i className="ri-vip-crown-fill text-yellow-500"></i>
                      <span className="text-sm font-medium">레벨 {user.level}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <i className="ri-coin-fill text-purple-500"></i>
                      <span className="text-sm font-medium">{user.totalScore}점</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsEditing(true)} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-purple-600">
                  <i className="ri-pencil-line text-xl"></i>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Goal Progress Dashboard */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">목표 진행률</h3>
          <div className="space-y-4">
            {goals.map((goal:any) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{goal.name}</span>
                  <span className="text-sm font-medium text-gray-600">
                    {goal.progress}/{goal.target}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${goal.color} transition-all duration-500 shadow-sm`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Score Chart */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">주간 점수 그래프</h3>
          <div className="h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-end justify-around p-4">
            {[85, 92, 78, 95, 88, 91, 96].map((score, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div
                  className="w-6 bg-gradient-to-t from-purple-400 to-pink-400 rounded-t-lg transition-all duration-500"
                  style={{ height: `${score}%` }}
                ></div>
                <span className="text-xs text-gray-600">
                  {[ '월', '화', '수', '목', '금', '토', '일'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Badge Gallery */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">배지 갤러리</h3>
            <button
              onClick={() => setShowBadgeDetail(true)}
              className="text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              자세히 보기
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {badges.slice(0, 6).map((badge:any) => (
              <div
                key={badge.id}
                className={`aspect-square rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300 ${
                  badge.earned
                    ? `bg-gradient-to-br ${badge.color} text-white shadow-lg hover:scale-105`
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <i className={`${badge.icon} text-2xl mb-2`}></i>
                <span className="text-xs font-medium">{badge.name}</span>
                {!badge.earned && (
                  <div className="w-full bg-white/30 rounded-full h-1 mt-2">
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-300"
                      style={{ width: `${(badge.progress / badge.target) * 100}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* My Records */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">내 기록</h3>
            <button
              onClick={() => setShowRecords(!showRecords)}
              className="text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              {showRecords ? '접기' : '전체 보기'}
            </button>
          </div>
          <div className="space-y-3">
            {(showRecords ? myRecords : myRecords.slice(0, 2)).map((record:any) => (
              <div
                key={record.id}
                className="relative p-4 bg-white/50 rounded-2xl hover:bg-white/70 transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{record.date}</p>
                    <p className="text-gray-800">{record.content}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <i className={`${record.public ? 'ri-global-line' : 'ri-lock-line'} text-sm text-gray-500`}></i>
                      <span className="text-xs text-gray-500">
                        {record.public ? '공개' : '비공개'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteRecord(record.id)}
                    className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all duration-200"
                  >
                    <i className="ri-delete-bin-line text-sm"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">최근 활동</h3>
            <div className="flex space-x-2">
              <button
                onClick={refreshActivities}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-purple-600 transition-all duration-200 !rounded-button"
              >
                <i className="ri-refresh-line"></i>
              </button>
              <button
                onClick={() => setShowActivities(!showActivities)}
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                {showActivities ? '접기' : '전체 보기'}
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {(showActivities ? recentActivities : recentActivities.slice(0, 3)).map((activity:any) => (
              <div
                key={activity.id}
                className="relative flex items-center space-x-3 p-3 bg-white/50 rounded-2xl hover:bg-white/70 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <i className="ri-check-line text-white"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{activity.task}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                  {activity.proof && (
               <>
    {/* eslint-disable react/no-unescaped-entities */}
    <p className="text-xs text-gray-500 mt-1 italic">&quot;{activity.proof}&quot;</p>
    {/* eslint-enable react/no-unescaped-entities */}
  </>
                  )}
                </div>
                <button
                  onClick={() => deleteActivity(activity.id)}
                  className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all duration-200"
                >
                  <i className="ri-close-line text-sm"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badge Detail Modal */}
      {showBadgeDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowBadgeDetail(false)}></div>
          <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">배지 상세 정보</h2>
              <button
                onClick={() => setShowBadgeDetail(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="space-y-4">
              {badges.map((badge:any) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl transition-all duration-300 ${
                    badge.earned
                      ? `bg-gradient-to-r ${badge.color} text-white`
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <i className={`${badge.icon} text-2xl`}></i>
                    <div className="flex-1">
                      <h3 className="font-bold">{badge.name}</h3>
                      <p className="text-sm opacity-90">{badge.description}</p>
                    </div>
                    {badge.earned && <i className="ri-check-line text-xl"></i>}
                  </div>
                  {!badge.earned && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>진행도</span>
                        <span>{badge.progress}/{badge.target}</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div 
                          className="h-full bg-purple-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((badge.progress / badge.target) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
