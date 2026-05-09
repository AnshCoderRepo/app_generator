'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, User, LogOut, Heart, List } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import CartNavbarItem from './CartNavbarItem';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navLinks = [
    { name: 'Browse Colleges', href: '/' },
    { name: 'Comparison Tool', href: '/compare' },
    { name: 'Admission Predictor', href: '/predictor' },
    { name: 'Community Q&A', href: '/qa' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-sky-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-sky-600/20">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="font-black text-2xl text-slate-900 tracking-tighter uppercase">
              College<span className="text-sky-600">Finder</span>
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-10">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-sm font-bold transition-colors ${
                    pathname === link.href 
                    ? 'text-sky-600 border-b-2 border-sky-600 pb-1' 
                    : 'text-slate-500 hover:text-sky-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            <div className="h-6 w-[1px] bg-slate-200"></div>
            
            <div className="flex items-center gap-5">
              <CartNavbarItem />
              
              {session ? (
                <div className="flex items-center gap-4">
                  <Link 
                    href="/dashboard" 
                    className="flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors"
                    title="My Saved Items"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden">
                      {session.user?.image ? (
                        <img src={session.user.image} alt={session.user.name || ''} className="w-full h-full object-cover" />
                      ) : (
                        <User size={18} className="text-slate-400" />
                      )}
                    </div>
                  </Link>
                  <button 
                    onClick={() => signOut()}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                    title="Log Out"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
