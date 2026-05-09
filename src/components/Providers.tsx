'use client';

import { SessionProvider } from "next-auth/react";
import { ShortlistProvider } from "./ShortlistContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ShortlistProvider>
        {children}
      </ShortlistProvider>
    </SessionProvider>
  );
}
