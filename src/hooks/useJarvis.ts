import { createContext, useContext } from 'react';
import type { Visitor } from '../domain/Visitor';
import type { Log } from '../domain/Log';

interface JarvisState {
  visitors: Visitor[];
  logs: Log[];
  addVisitor: (v: Omit<Visitor, 'id' | 'entryDate' | 'active'>) => boolean;
  registerExit: (id: string) => void;
}

export const JarvisContext = createContext<JarvisState | undefined>(undefined);

export const useJarvis = () => {
  const ctx = useContext(JarvisContext);
  if (!ctx) {
    throw new Error('useJarvis must be used within a JarvisProvider');
  }
  return ctx;
};
