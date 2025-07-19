import { createContext, useContext } from 'react';
import type { Visitor } from '../domain/Visitor';
import type { Log } from '../domain/Log';

interface VisitorRegistryState {
  visitors: Visitor[];
  logs: Log[];
  addVisitor: (v: Omit<Visitor, 'id' | 'entryDate' | 'active'>) => boolean;
  registerExit: (id: string) => void;
}

export const VisitorRegistryContext = createContext<VisitorRegistryState | undefined>(undefined);

export const useVisitorRegistry = () => {
  const ctx = useContext(VisitorRegistryContext);
  if (!ctx) {
    throw new Error('useVisitorRegistry must be used within a VisitorRegistryProvider');
  }
  return ctx;
};
