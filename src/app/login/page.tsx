'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, ArrowLeft, Mail, Lock, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem('user', JSON.stringify({ email }));
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-950 px-4 py-12 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-sky-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse animation-delay-2000"></div>
      
      <div className="max-w-md w-full relative z-10">
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-10 group">
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm uppercase tracking-widest">Back to Search</span>
        </Link>

        <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 p-10 md:p-12 shadow-2xl shadow-black/50">
          <div className="text-center mb-10">
            <div className="inline-flex bg-sky-600 p-4 rounded-[1.5rem] mb-6 shadow-xl shadow-sky-600/30">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-slate-400 font-medium">Continue your journey towards the perfect education.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-500 group-focus-within:text-sky-500 transition-colors" />
                </div>
                <input 
                  type="email" 
                  required 
                  placeholder="name@university.com"
                  className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-6 py-4 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all font-medium placeholder:text-slate-600"
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-500 group-focus-within:text-sky-500 transition-colors" />
                </div>
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-6 py-4 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all font-medium placeholder:text-slate-600"
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                />
              </div>
            </div>

            <button type="submit" className="w-full group relative bg-sky-600 hover:bg-sky-500 text-white font-black py-4 rounded-[1.5rem] transition-all shadow-xl shadow-sky-600/30 overflow-hidden active:scale-[0.98]">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Log In <Sparkles size={18} className="animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-white/5 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Don't have an account? <Link href="#" className="text-sky-500 hover:text-sky-400 font-black transition-colors">Join the Community</Link>
            </p>
          </div>
        </div>
        
        <p className="text-center mt-12 text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
          © 2026 CollegeFinder • Trusted by 2M+ Students
        </p>
      </div>
    </div>
  );
}
