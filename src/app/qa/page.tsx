'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, HelpCircle } from 'lucide-react';

const initialQuestions = [
  {
    id: 1,
    author: 'Rahul K.',
    text: 'Is the placement for CSE at IIT Madras really 100%?',
    answers: [
      { id: 1, author: 'Alumni2023', text: 'Almost 100%. Usually, anyone who sits for placements gets placed unless they opt out for higher studies.' }
    ]
  },
  {
    id: 2,
    author: 'Sneha P.',
    text: 'How is the hostel life at BITS Pilani?',
    answers: []
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
        text: newQuestion,
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
          answers: [...q.answers, { id: Date.now(), author: 'Guest User', text }]
        };
      }
      return q;
    }));
    setReplyText({ ...replyText, [qId]: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center text-slate-500 hover:text-sky-600 transition-colors">
              <ArrowLeft size={20} className="mr-2" /> Back to Search
            </Link>
            <h1 className="ml-8 font-bold text-xl text-slate-900">Community Q&A</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Ask Question Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <div className="flex items-center mb-4">
            <HelpCircle className="text-sky-600 mr-2" size={24} />
            <h2 className="text-lg font-bold text-slate-900">Have a question about a college or exam?</h2>
          </div>
          <form onSubmit={handleAsk} className="flex flex-col gap-3">
            <textarea 
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Type your question here..." 
              className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-sky-500 min-h-[100px] resize-none"
              required
            ></textarea>
            <button type="submit" className="self-end bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2 rounded-xl transition-colors">
              Post Question
            </button>
          </form>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {questions.map((q) => (
            <div key={q.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 mr-3 flex-shrink-0">
                  {q.author[0]}
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block">{q.author}</span>
                  <p className="text-slate-800 mt-1 font-medium">{q.text}</p>
                </div>
              </div>
              
              {/* Answers */}
              <div className="ml-13 pl-4 border-l-2 border-slate-100 mt-4 space-y-4">
                {q.answers.map(a => (
                  <div key={a.id} className="flex items-start">
                    <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center font-bold text-sky-600 mr-3 flex-shrink-0 text-xs">
                      {a.author[0]}
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 text-xs block">{a.author}</span>
                      <p className="text-slate-600 text-sm mt-0.5">{a.text}</p>
                    </div>
                  </div>
                ))}
                
                {/* Reply Form */}
                <form onSubmit={(e) => handleReply(e, q.id)} className="flex items-center gap-2 mt-4">
                  <MessageCircle size={16} className="text-slate-400 flex-shrink-0" />
                  <input 
                    type="text" 
                    value={replyText[q.id] || ''}
                    onChange={(e) => setReplyText({...replyText, [q.id]: e.target.value})}
                    placeholder="Write a reply..." 
                    className="flex-1 py-2 px-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-sky-500"
                  />
                  <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                    Reply
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
