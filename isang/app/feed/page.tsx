
'use client';

import { useState } from 'react';
import BottomNav from '../../components/BottomNav';

export default function FeedPage() {
  const [posts, setPosts] = useState([
    {
      id: '1',
      user: {
        name: '김민수',
        avatar: 'https://readdy.ai/api/search-image?query=friendly%20Korean%20man%20profile%20photo%2C%20professional%20headshot%2C%20clean%20background%2C%20realistic%20portrait%20photography%2C%20natural%20lighting&width=100&height=100&seq=feed1&orientation=squarish'
      },
      time: '2시간 전',
      task: '30분 조깅 완료',
      proof: {
        type: 'text',
        content: '한강에서 30분 조깅 완료! 오늘도 목표 달성 💪'
      },
      likes: 12,
      hearts: 8,
      liked: false,
      hearted: true
    },
    {
      id: '2',
      user: {
        name: '박지영',
        avatar: 'https://readdy.ai/api/search-image?query=friendly%20Korean%20woman%20profile%20photo%2C%20professional%20headshot%2C%20clean%20background%2C%20realistic%20portrait%20photography%2C%20natural%20lighting&width=100&height=100&seq=feed2&orientation=squarish'
      },
      time: '4시간 전',
      task: '영어 단어 50개 암기',
      proof: {
        type: 'photo',
        content: 'https://readdy.ai/api/search-image?query=English%20vocabulary%20notebook%20with%20handwritten%20words%2C%20study%20materials%2C%20learning%20notes%2C%20educational%20content%2C%20desk%20setup%20with%20books&width=300&height=200&seq=feed3&orientation=landscape'
      },
      likes: 18,
      hearts: 15,
      liked: true,
      hearted: false
    },
    {
      id: '3',
      user: {
        name: '이준호',
        avatar: 'https://readdy.ai/api/search-image?query=friendly%20Korean%20man%20profile%20photo%2C%20professional%20headshot%2C%20clean%20background%2C%20realistic%20portrait%20photography%2C%20natural%20lighting&width=100&height=100&seq=feed4&orientation=squarish'
      },
      time: '6시간 전',
      task: '독서 1시간 완료',
      proof: {
        type: 'text',
        content: '자기계발서 읽기 완료. 오늘 배운 내용을 실천해보자! 📚'
      },
      likes: 25,
      hearts: 20,
      liked: false,
      hearted: true
    },
    {
      id: '4',
      user: {
        name: '최서연',
        avatar: 'https://readdy.ai/api/search-image?query=friendly%20Korean%20woman%20profile%20photo%2C%20professional%20headshot%2C%20clean%20background%2C%20realistic%20portrait%20photography%2C%20natural%20lighting&width=100&height=100&seq=feed5&orientation=squarish'
      },
      time: '8시간 전',
      task: '요가 30분 수행',
      proof: {
        type: 'photo',
        content: 'https://readdy.ai/api/search-image?query=yoga%20mat%20with%20water%20bottle%20and%20towel%2C%20peaceful%20exercise%20setup%2C%20fitness%20equipment%2C%20healthy%20lifestyle%2C%20clean%20minimal%20background&width=300&height=200&seq=feed6&orientation=landscape'
      },
      likes: 22,
      hearts: 18,
      liked: true,
      hearted: true
    }
  ]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleHeart = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          hearted: !post.hearted,
          hearts: post.hearted ? post.hearts - 1 : post.hearts + 1
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 pb-24">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-white/20 z-40">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-gray-800">피드</h1>
          <div className="flex items-center space-x-3">
            <button className="w-10 h-10 flex items-center justify-center">
              <i className="ri-search-line text-xl text-gray-600"></i>
            </button>
            <button className="w-10 h-10 flex items-center justify-center">
              <i className="ri-notification-3-line text-xl text-gray-600"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="pt-20 px-4 space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]"
          >
            {/* User Info */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-purple-400 to-pink-400 p-0.5">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="w-full h-full rounded-full object-cover bg-white"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{post.user.name}</h3>
                <p className="text-sm text-gray-500">{post.time}</p>
              </div>
              <button className="w-8 h-8 flex items-center justify-center">
                <i className="ri-more-2-line text-gray-400"></i>
              </button>
            </div>

            {/* Task */}
            <div className="mb-4">
              <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.task}
              </div>
            </div>

            {/* Proof Content */}
            <div className="mb-4">
              {post.proof.type === 'text' ? (
                <p className="text-gray-700 leading-relaxed">{post.proof.content}</p>
              ) : (
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={post.proof.content}
                    alt="Proof"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 transition-all duration-200 ${
                    post.liked ? 'text-purple-600' : 'text-gray-500 hover:text-purple-500'
                  }`}
                >
                  <i className={`ri-thumb-up-${post.liked ? 'fill' : 'line'} text-lg`}></i>
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>

                <button
                  onClick={() => handleHeart(post.id)}
                  className={`flex items-center space-x-2 transition-all duration-200 ${
                    post.hearted ? 'text-red-500' : 'text-gray-500 hover:text-red-400'
                  }`}
                >
                  <i className={`ri-heart-${post.hearted ? 'fill' : 'line'} text-lg`}></i>
                  <span className="text-sm font-medium">{post.hearts}</span>
                </button>
              </div>

              <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <i className="ri-share-line text-lg"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
