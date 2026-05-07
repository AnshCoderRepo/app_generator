'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ShortlistContextType = {
  shortlist: string[];
  addToShortlist: (id: string) => void;
  removeFromShortlist: (id: string) => void;
  isInShortlist: (id: string) => boolean;
  clearShortlist: () => void;
};

const ShortlistContext = createContext<ShortlistContextType | undefined>(undefined);

export function ShortlistProvider({ children }: { children: React.ReactNode }) {
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('college_shortlist');
    if (saved) {
      try {
        setShortlist(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse shortlist', e);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('college_shortlist', JSON.stringify(shortlist));
    }
  }, [shortlist, isInitialized]);

  const addToShortlist = (id: string) => {
    setShortlist(prev => {
      if (prev.includes(id)) return prev;
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const removeFromShortlist = (id: string) => {
    setShortlist(prev => prev.filter(item => item !== id));
  };

  const isInShortlist = (id: string) => shortlist.includes(id);

  const clearShortlist = () => setShortlist([]);

  return (
    <ShortlistContext.Provider value={{ shortlist, addToShortlist, removeFromShortlist, isInShortlist, clearShortlist }}>
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist() {
  const context = useContext(ShortlistContext);
  if (context === undefined) {
    throw new Error('useShortlist must be used within a ShortlistProvider');
  }
  return context;
}
