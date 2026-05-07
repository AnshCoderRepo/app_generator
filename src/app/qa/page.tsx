'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, HelpCircle, User, Send, ThumbsUp, TrendingUp, Hash, Search, Sparkles } from 'lucide-react';

const initialQuestions = [
  {
    id: 1,
    author: 'Rahul K.',
    role: 'Aspirant',
    text: 'Is the placement for CSE at IIT Madras really 100%?',
    likes: 24,
    answers: [
      { id: 1, author: 'Alumni2023', role: 'Verified Alumni', text: 'Almost 100%. Usually, anyone who sits for placements gets placed unless they opt out for higher studies.' }
    ]
  },
  {
    id: 2,
    author: 'Sneha P.',
    role: 'Student',
    text: 'How is the hostel life at BITS Pilani? Specifically looking for details on Raman Bhavan.',
    likes: 12,
    answers: []
  },
  {
    id: 3,
    author: 'Dr. Amit V.',
    role: 'Professor',
    text: 'For Medical aspirants, should one prioritize AIIMS Delhi or JIPMER for research opportunities?',
    likes: 45,
    answers: [
      { id: 1, author: 'MediCore', role: 'Counselor', text: 'AIIMS Delhi has more clinical exposure, while JIPMER has specialized research labs. Both are top-tier.' }
    ]
  }
];

export default function QAPage() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [newQuestion, setNewQuestion] = useState('');
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    
    setQuestions([
      {
        id: Date.now(),
        author: 'Guest User',
        role: 'Explorer',
        text: newQuestion,
        likes: 0,
        answers: []
      },
      ...questions
    ]);
    setNewQuestion('');
  };

  const handleReply = (e: React.FormEvent, qId: number) => {
    e.preventDefault();
    const text = replyText[qId];
    if (!text?.trim()) return;

    setQuestions(questions.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          answers: [...q.answers, { id: Date.now(), author: 'Guest User', role: 'Explorer', text }]
        };
      }
      return q;
    }));
    setReplyText({ ...replyText, [qId]: '' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-slate-900 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg">
                <ArrowLeft className="h-5 w-5 text-white" />
              </div>
              <span className="font-black text-sm uppercase tracking-widest text-slate-900">Back to Search</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-sky-600 p-2 rounded-xl shadow-lg shadow-sky-600/20">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <span className="font-black text-xl text-slate-900 tracking-tighter uppercase">Community<span className="text-sky-600">Q&A</span></span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-slate-900 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute top-0 -left-4 w-96 h-96 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
           <div className="absolute bottom-0 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            Connect with the <span className="text-sky-400">Next Generation</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto mb-10">
            Ask questions, share experiences, and get verified answers from students, alumni, and experts.
          </p>
          
          <div className="max-w-2xl mx-auto relative group">
             <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
               <Search size={20} className="text-slate-500 group-focus-within:text-sky-400 transition-colors" />
             </div>
             <input 
               type="text" 
               placeholder="Search discussions or keywords..."
               className="w-full bg-white/5 border border-white/10 text-white pl-14 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all font-medium placeholder:text-slate-600"
             />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Feed */}
          <div className="flex-1 space-y-8">
            {/* Ask Box */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 group focus-within:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-sky-50 p-2 rounded-xl">
                  <HelpCircle className="text-sky-600" size={24} />
                </div>
                <h2 className="text-xl font-black text-slate-900">Start a Discussion</h2>
              </div>
              <form onSubmit={handleAsk} className="space-y-4">
                <textarea 
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="What's on your mind? (e.g. Admission dates, Campus life, Placements)" 
                  className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none focus:border-sky-500 focus:bg-white min-h-[150px] resize-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  required
                ></textarea>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-sky-100 hover:text-sky-600 transition-colors">#Admission</span>
                    <span className="bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-sky-100 hover:text-sky-600 transition-colors">#Placement</span>
                  </div>
                  <button type="submit" className="bg-slate-900 hover:bg-sky-600 text-white font-black px-10 py-3.5 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center gap-2">
                    Post Discussion <Send size={18} />
                  </button>
                </div>
              </form>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {questions.map((q) => (
                <div key={q.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 hover:border-sky-100 transition-all">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center font-black text-slate-500 shadow-inner">
                        {q.author[0]}
                      </div>
                      <div>
                        <span className="font-black text-slate-900 block">{q.author}</span>
                        <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest px-2 py-0.5 bg-sky-50 rounded-full">{q.role}</span>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-sky-600 transition-colors">
                       <ThumbsUp size={18} />
                       <span className="text-sm font-black">{q.likes}</span>
                    </button>
                  </div>

                  <p className="text-slate-800 text-lg font-bold leading-relaxed mb-8 pl-1">{q.text}</p>
                  
                  {/* Answers */}
                  <div className="space-y-6 ml-4 pl-8 border-l-2 border-slate-100">
                    {q.answers.map(a => (
                      <div key={a.id} className="group/answer">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-sky-100 rounded-xl flex items-center justify-center font-black text-sky-600 text-xs">
                            {a.author[0]}
                          </div>
                          <span className="font-black text-slate-700 text-xs">{a.author}</span>
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest px-1.5 py-0.5 bg-slate-50 rounded-full border border-slate-100">{a.role}</span>
                        </div>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed group-hover/answer:text-slate-900 transition-colors">{a.text}</p>
                      </div>
                    ))}
                    
                    {/* Reply Form */}
                    <form onSubmit={(e) => handleReply(e, q.id)} className="flex items-center gap-3 mt-8">
                      <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={14} className="text-slate-300" />
                      </div>
                      <div className="flex-1 relative">
                        <input 
                          type="text" 
                          value={replyText[q.id] || ''}
                          onChange={(e) => setReplyText({...replyText, [q.id]: e.target.value})}
                          placeholder="Contribute your insight..." 
                          className="w-full py-3 px-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium outline-none focus:border-sky-500 focus:bg-white transition-all pr-12"
                        />
                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-sky-600 hover:bg-sky-50 rounded-xl transition-all">
                          <Send size={18} />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0 space-y-8">
             <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp size={20} className="text-sky-600" />
                  <h3 className="font-black text-sm uppercase tracking-widest text-slate-900">Trending Topics</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                   {['Admission2026', 'Placements', 'IITMadras', 'HostelLife', 'Scholarships', 'EntranceExams'].map(tag => (
                     <Link href="#" key={tag} className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:border-sky-500 hover:text-sky-600 transition-all group">
                       <Hash size={14} className="text-slate-300 group-hover:text-sky-400" />
                       {tag}
                     </Link>
                   ))}
                </div>
             </div>

             <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <Sparkles size={64} />
                </div>
                <h3 className="text-xl font-black mb-4 leading-tight">Become a Student Ambassador</h3>
                <p className="text-slate-400 text-sm font-medium mb-6">Help others find their path and earn exclusive rewards.</p>
                <button className="w-full bg-sky-600 hover:bg-sky-500 text-white font-black py-3 rounded-2xl transition-all active:scale-95">
                  Learn More
                </button>
             </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="pt-8 border-t border-white/5 text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase">
             © 2026 CollegeFinder • Empowering Voices
           </div>
        </div>
      </footer>
    </div>
  );
}
