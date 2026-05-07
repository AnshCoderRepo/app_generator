'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { PlusCircle, XCircle, CheckCircle } from 'lucide-react';
import { useShortlist } from '@/components/ShortlistContext';
import CollegeImage from './CollegeImage';

export default function CompareTable({ allColleges, initialColleges }: { allColleges: any[], initialColleges: any[] }) {
  const { shortlist, addToShortlist, removeFromShortlist } = useShortlist();
  
  // Sync URL params to shortlist on mount
  useEffect(() => {
    initialColleges.forEach(college => {
      if (college && college.id) {
        addToShortlist(college.id);
      }
    });
  }, []);

  // Source of truth is now always the shortlist
  const collegesToCompare = shortlist
    .map(id => allColleges.find(c => c.id === id))
    .filter(Boolean);

  // Fill up to 3 slots
  const slots = [0, 1, 2].map(i => collegesToCompare[i] || null);

  const handleAdd = (id: string) => {
    if (!id) return;
    addToShortlist(id);
  };

  const handleRemove = (id: string) => {
    removeFromShortlist(id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-6 border-b border-slate-200 border-r w-1/4 bg-slate-50">
              <span className="text-sm text-slate-500 uppercase tracking-wider font-bold">Parameters</span>
            </th>
            {slots.map((college, i) => (
              <th key={i} className="p-6 border-b border-slate-200 w-1/4 relative border-r last:border-r-0 align-top">
                {college ? (
                  <div className="animate-in fade-in slide-in-from-top-1 duration-300">
                    <div className="h-24 w-full mb-4 rounded-xl overflow-hidden relative shadow-sm border border-slate-100">
                      <CollegeImage 
                        src={college.imageUrl} 
                        alt={college.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                    </div>
                    <Link href={`/college/${college.id}`} className="text-base font-bold text-slate-900 hover:text-sky-600 block mb-2 leading-tight transition-colors">
                      {college.name}
                    </Link>
                    <span className="bg-sky-100 text-sky-800 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">{college.type}</span>
                    <button 
                      onClick={() => handleRemove(college.id)}
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-500 transition-colors p-1"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                      <PlusCircle className="text-slate-400" size={24} />
                    </div>
                    <p className="text-sm font-semibold text-slate-500 mb-3">Add College</p>
                    <select 
                      onChange={(e) => handleAdd(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none bg-slate-50 hover:border-sky-400 transition-colors"
                      value=""
                    >
                      <option value="" disabled>Select a college...</option>
                      {allColleges.slice(0, 100).map(c => (
                        <option key={c.id} value={c.id}>{c.name.substring(0, 35)}</option>
                      ))}
                    </select>
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Location */}
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-6 border-b border-slate-200 border-r bg-slate-50 font-semibold text-slate-700">Location</td>
            {slots.map((c, i) => (
              <td key={i} className="p-6 border-b border-slate-200 border-r last:border-r-0 text-slate-600">
                {c ? c.location : '-'}
              </td>
            ))}
          </tr>
          {/* Rating */}
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-6 border-b border-slate-200 border-r bg-slate-50 font-semibold text-slate-700">Rating</td>
            {slots.map((c, i) => (
              <td key={i} className="p-6 border-b border-slate-200 border-r last:border-r-0">
                {c ? (
                  <div className="flex items-center text-amber-500 font-bold">
                     {c.rating.toFixed(1)} / 5.0
                  </div>
                ) : '-'}
              </td>
            ))}
          </tr>
          {/* Fees */}
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-6 border-b border-slate-200 border-r bg-slate-50 font-semibold text-slate-700">Annual Tuition</td>
            {slots.map((c, i) => (
              <td key={i} className="p-6 border-b border-slate-200 border-r last:border-r-0">
                {c ? <span className="font-bold text-slate-900">₹{c.tuition.toLocaleString()}</span> : '-'}
              </td>
            ))}
          </tr>
          {/* Placement */}
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-6 border-b border-slate-200 border-r bg-slate-50 font-semibold text-slate-700">Placement Rate</td>
            {slots.map((c, i) => (
              <td key={i} className="p-6 border-b border-slate-200 border-r last:border-r-0">
                {c ? (
                  <div className="flex items-center text-green-600 font-bold">
                    <CheckCircle size={16} className="mr-1" /> {c.placement}%
                  </div>
                ) : '-'}
              </td>
            ))}
          </tr>
          {/* Course Count */}
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-6 border-slate-200 border-r bg-slate-50 font-semibold text-slate-700">Total Courses</td>
            {slots.map((c, i) => (
              <td key={i} className="p-6 border-slate-200 border-r last:border-r-0 text-slate-600">
                {c ? `${c.courses.length} Courses` : '-'}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
