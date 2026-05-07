'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { PlusCircle, XCircle, CheckCircle, GraduationCap, MapPin, Award, TrendingUp, Search } from 'lucide-react';
import { useShortlist } from '@/components/ShortlistContext';
import CollegeImage from './CollegeImage';

export default function CompareTable({ allColleges, initialColleges }: { allColleges: any[], initialColleges: any[] }) {
  const { shortlist, addToShortlist, removeFromShortlist } = useShortlist();
  
  useEffect(() => {
    initialColleges.forEach(college => {
      if (college && college.id) {
        addToShortlist(college.id);
      }
    });
  }, []);

  const collegesToCompare = shortlist
    .map(id => allColleges.find(c => c.id === id))
    .filter(Boolean);

  const slots = [0, 1, 2].map(i => collegesToCompare[i] || null);

  const handleAdd = (id: string) => {
    if (!id) return;
    addToShortlist(id);
  };

  const handleRemove = (id: string) => {
    removeFromShortlist(id);
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="p-10 border-b border-slate-100 border-r w-1/4 bg-slate-50/50 backdrop-blur-sm">
                <div className="flex flex-col gap-2">
                   <div className="bg-slate-900 w-10 h-10 rounded-xl flex items-center justify-center mb-2">
                      <TrendingUp size={20} className="text-white" />
                   </div>
                   <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Comparison Matrix</h3>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cross-Platform Analysis</p>
                </div>
              </th>
              {slots.map((college, i) => (
                <th key={i} className="p-10 border-b border-slate-100 w-1/4 relative border-r last:border-r-0 align-top">
                  {college ? (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="h-32 w-full mb-6 rounded-3xl overflow-hidden relative shadow-xl border border-slate-100 group">
                        <CollegeImage 
                          src={college.imageUrl} 
                          alt={college.name} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                        <button 
                          onClick={() => handleRemove(college.id)}
                          className="absolute top-3 right-3 bg-white/20 hover:bg-red-500 backdrop-blur-md text-white transition-all p-2 rounded-xl shadow-lg border border-white/20 active:scale-90"
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                      <Link href={`/college/${college.id}`} className="text-lg font-black text-slate-900 hover:text-sky-600 block mb-3 leading-tight transition-colors line-clamp-2 min-h-[3rem]">
                        {college.name}
                      </Link>
                      <div className="flex items-center gap-2">
                         <span className="bg-sky-50 text-sky-600 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest border border-sky-100">{college.type}</span>
                         <div className="flex items-center gap-1 text-amber-500">
                           <Award size={12} className="fill-amber-500" />
                           <span className="text-xs font-black">{college.rating.toFixed(1)}</span>
                         </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-6 bg-slate-50/30 rounded-3xl border border-dashed border-slate-200 group hover:border-sky-500 hover:bg-sky-50/30 transition-all duration-300">
                      <div className="w-14 h-14 rounded-[1.5rem] bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                        <PlusCircle className="text-slate-300 group-hover:text-sky-500" size={28} />
                      </div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Add Institution</p>
                      <div className="px-4 w-full">
                        <div className="relative">
                          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <select 
                            onChange={(e) => handleAdd(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all appearance-none cursor-pointer"
                            value=""
                          >
                            <option value="" disabled>Select College</option>
                            {allColleges.slice(0, 100).map(c => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { label: 'Location', key: 'location', icon: <MapPin size={16} /> },
              { label: 'Fees (1st Yr)', key: 'tuition', icon: <TrendingUp size={16} />, format: (v: any) => `₹${v.toLocaleString()}` },
              { label: 'Success Rate', key: 'placement', icon: <CheckCircle size={16} />, format: (v: any) => `${v}%` },
              { label: 'Courses', key: 'courses', icon: <GraduationCap size={16} />, format: (v: any) => `${v.length} Programs` },
            ].map((param, pIdx) => (
              <tr key={pIdx} className="group hover:bg-slate-50/50 transition-colors">
                <td className="p-8 border-r border-slate-100 bg-slate-50/30">
                  <div className="flex items-center gap-3 text-slate-500 group-hover:text-sky-600 transition-colors">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 group-hover:border-sky-200">
                      {param.icon}
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">{param.label}</span>
                  </div>
                </td>
                {slots.map((c, i) => (
                  <td key={i} className="p-8 border-r last:border-r-0">
                    {c ? (
                      <div className="font-black text-slate-900 tracking-tight text-lg animate-in fade-in zoom-in-95 duration-500">
                        {param.format ? param.format(c[param.key]) : c[param.key]}
                      </div>
                    ) : (
                      <span className="text-slate-200 font-black">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
