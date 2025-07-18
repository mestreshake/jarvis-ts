import type { Visitor } from '../domain/Visitor';
import type { Log } from '../domain/Log';

const VISITORS_KEY = 'jarvis-visitors';
const LOGS_KEY = 'jarvis-logs';

export const visitorRepository = {
  loadVisitors: (): Visitor[] => {
    const data = localStorage.getItem(VISITORS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveVisitors: (visitors: Visitor[]): void => {
    localStorage.setItem(VISITORS_KEY, JSON.stringify(visitors));
  },

  loadLogs: (): Log[] => {
    const data = localStorage.getItem(LOGS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveLogs: (logs: Log[]): void => {
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  },
};
