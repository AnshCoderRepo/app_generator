'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

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
  const { data: session } = useSession();

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
    if (session?.user) {
      fetch('/api/saved/colleges')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            const dbIds = data.map((item: any) => item.collegeId);
            setShortlist(prev => {
              const merged = Array.from(new Set([...prev, ...dbIds]));
              return merged;
            });
          }
        })
        .catch(err => console.error('Error fetching saved colleges', err));
    }
  }, [session]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('college_shortlist', JSON.stringify(shortlist));
    }
  }, [shortlist, isInitialized]);

  const addToShortlist = async (id: string) => {
    if (session?.user) {
      try {
        await fetch('/api/saved/colleges', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ collegeId: id }),
        });
      } catch (err) {
        console.error('Error saving college to DB', err);
      }
    }

    setShortlist(prev => {
      if (prev.includes(id)) return prev;
      if (prev.length >= 6) { // Increased limit slightly for better UX
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const removeFromShortlist = async (id: string) => {
    if (session?.user) {
      try {
        await fetch('/api/saved/colleges', {
          method: 'POST', // The endpoint toggles
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ collegeId: id }),
        });
      } catch (err) {
        console.error('Error removing college from DB', err);
      }
    }
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
