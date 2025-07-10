'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../../components/BottomNav';

export default function SettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  const settingsOptions = [
    {
      id: 'profile',
      title: 'Profile Settings',
      subtitle: 'Edit your personal information',
      icon: 'ri-user-settings-line',
      color: 'from-blue-400 to-indigo-500',
      hasToggle: false
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Manage your notification preferences',
      icon: 'ri-notification-3-line',
      color: 'from-purple-400 to-pink-500',
      hasToggle: true,
      toggleValue: notifications,
      toggleAction: setNotifications
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      subtitle: 'Control your privacy settings',
      icon: 'ri-shield-user-line',
      color: 'from-green-400 to-emerald-500',
      hasToggle: false
    },
    {
      id: 'public',
      title: 'Public Profile',
      subtitle: 'Make your profile visible to others',
      icon: 'ri-global-line',
      color: 'from-cyan-400 to-teal-500',
      hasToggle: true,
      toggleValue: publicProfile,
      toggleAction: setPublicProfile
    },
    {
      id: 'backup',
      title: 'Auto Backup',
      subtitle: 'Automatically backup your data',
      icon: 'ri-cloud-line',
      color: 'from-orange-400 to-red-500',
      hasToggle: true,
      toggleValue: autoBackup,
      toggleAction: setAutoBackup
    },
    {
      id: 'appearance',
      title: 'Appearance',
      subtitle: 'Customize app appearance',
      icon: 'ri-palette-line',
      color: 'from-pink-400 to-rose-500',
      hasToggle: false
    }
  ];

  const accountOptions = [
    {
      id: 'export',
      title: 'Export Data',
      subtitle: 'Download your personal data',
      icon: 'ri-download-line',
      color: 'text-blue-600'
    },
    {
      id: 'support',
      title: 'Help & Support',
      subtitle: 'Get help or contact support',
      icon: 'ri-customer-service-line',
      color: 'text-green-600'
    },
    {
      id: 'about',
      title: 'About',
      subtitle: 'App version and information',
      icon: 'ri-information-line',
      color: 'text-gray-600'
    },
    {
      id: 'logout',
      title: 'Sign Out',
      subtitle: 'Sign out of your account',
      icon: 'ri-logout-box-line',
      color: 'text-red-600'
    }
  ];

  const handleSettingClick = (id: string) => {
    switch(id) {
      case 'profile':
        // Navigate to profile edit
        break;
      case 'privacy':
        // Navigate to privacy settings
        break;
      case 'appearance':
        // Navigate to appearance settings
        break;
      case 'export':
        // Handle data export
        break;
      case 'support':
        // Navigate to support
        break;
      case 'about':
        // Show about dialog
        break;
      case 'logout':
        // Handle logout
        break;
      default:
        break;
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
          <h1 className="text-xl font-bold text-gray-800">Settings</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="pt-20 px-4 space-y-6">
        {/* User Profile Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-purple-400 to-pink-400 p-1">
              <img
                src="https://readdy.ai/api/search-image?query=friendly%20Korean%20person%20profile%20photo%2C%20professional%20headshot%2C%20clean%20background%2C%20realistic%20portrait%20photography%2C%20natural%20lighting&width=120&height=120&seq=settings1&orientation=squarish"
                alt="Profile"
                className="w-full h-full rounded-full object-cover bg-white"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-800">김이상</h2>
              <p className="text-gray-600">@isang_achiever</p>
              <div className="flex items-center space-x-1 mt-1">
                <i className="ri-vip-crown-fill text-yellow-500 text-sm"></i>
                <span className="text-sm text-gray-600">Level 15 • 2847 points</span>
              </div>
            </div>
            <button className="w-8 h-8 flex items-center justify-center">
              <i className="ri-edit-2-line text-gray-400"></i>
            </button>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">General</h3>
          <div className="space-y-1">
            {settingsOptions.map((option, index) => (
              <div
                key={option.id}
                className="flex items-center justify-between p-4 hover:bg-white/50 rounded-2xl transition-all duration-200 cursor-pointer"
                onClick={() => !option.hasToggle && handleSettingClick(option.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${option.color} rounded-full flex items-center justify-center`}>
                    <i className={`${option.icon} text-white text-lg`}></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{option.title}</h4>
                    <p className="text-sm text-gray-600">{option.subtitle}</p>
                  </div>
                </div>
                {option.hasToggle ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                  option.toggleAction?.(!option.toggleValue);

                    }}
                    className={`relative w-12 h-6 rounded-full transition-all duration-200 !rounded-button ${
                      option.toggleValue ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                      option.toggleValue ? 'transform translate-x-6' : ''
                    }`}></div>
                  </button>
                ) : (
                  <i className="ri-arrow-right-s-line text-gray-400"></i>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Account</h3>
          <div className="space-y-1">
            {accountOptions.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleSettingClick(option.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/50 rounded-2xl transition-all duration-200 text-left !rounded-button"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <i className={`${option.icon} ${option.color} text-lg`}></i>
                  </div>
                  <div>
                    <h4 className={`font-medium ${option.id === 'logout' ? 'text-red-600' : 'text-gray-800'}`}>
                      {option.title}
                    </h4>
                    <p className="text-sm text-gray-600">{option.subtitle}</p>
                  </div>
                </div>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </button>
            ))}
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl" style={{fontFamily: 'Pacifico, serif'}}>logo</span>
          </div>
          <h3 className="font-bold text-gray-800 mb-1">TaskFlow</h3>
          <p className="text-sm text-gray-600 mb-4">Version 1.0.0</p>
          <p className="text-xs text-gray-500">
            © 2024 TaskFlow. All rights reserved.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}