'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  LogOut,
  LayoutDashboard,
  Video,
  Library,
  Settings,
  Menu,
  FolderTree,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const menuItems = [
  {
    title: 'Kontrol Paneli',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'Canlı Yayınlar',
    icon: Video,
    href: '/live',
  },
  {
    title: 'İçerik Kütüphanesi',
    icon: Library,
    href: '/',
  },
  {
    title: 'Kategoriler',
    icon: FolderTree,
    href: '/kategoriler',
  },
  {
    title: 'Kullanıcılar',
    icon: Users,
    href: '/users',
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const toggleSidebar = () => setIsOpen(!isOpen);
    document.addEventListener('toggleSidebar', toggleSidebar);
    return () => document.removeEventListener('toggleSidebar', toggleSidebar);
  }, [isOpen]);

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <Button
        className="fixed top-4 left-4 z-50 md:hidden bg-[#1b4332] hover:bg-[#2d6a4f] text-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(true)}>
        <Menu className="h-7 w-7" />
      </Button>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Content */}
      <div
        className={`
        md:block 
        w-56 
        bg-[#1b4332] 
        text-white 
        min-h-screen
        ${isOpen ? 'fixed' : 'hidden'} 
        md:relative 
        top-0 
        left-0 
        z-50
        transition-transform 
        duration-300 
        transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-white bg-[#2d6a4f] hover:bg-[#1b4332] p-2 rounded-lg transition-colors"
          onClick={() => setIsOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {/* Logo */}
        <div className="p-3">
          <Image src="/elmus.png" alt="El Mustafa Eğitim" width={80} height={48} />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-2">
          {menuItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-3 rounded-md transition-colors text-base mb-1
                  ${isActive ? 'bg-[#f4a261] text-white font-medium' : 'hover:bg-[#2d6a4f]/50'}`}
                onClick={() => setIsOpen(false)}>
                <item.icon className="w-5 h-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Sign Out */}
        <div className="p-3 border-t border-[#2d6a4f] w-full mt-auto">
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="w-full justify-start text-white hover:bg-[#2d6a4f]/50 text-base py-2">
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </>
  );
}
