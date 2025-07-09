'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: 'ri-home-4-fill', label: 'Home' },
    { href: '/add', icon: 'ri-add-circle-fill', label: 'Add' },
    { href: '/my', icon: 'ri-user-3-fill', label: 'My' },
    { href: '/feed', icon: 'ri-global-fill', label: 'Feed' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-white/20 z-50">
      <div className="grid grid-cols-4 h-20 px-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${
              pathname === item.href
                ? 'text-purple-600 transform scale-110'
                : 'text-gray-500 hover:text-purple-400'
            }`}
          >
            <div className={`w-6 h-6 flex items-center justify-center ${
              pathname === item.href ? 'drop-shadow-lg' : ''
            }`}>
              <i className={`${item.icon} text-xl`}></i>
            </div>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}