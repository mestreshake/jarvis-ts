import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { VisitorRegistryContext } from '../hooks/useVisitorRegistry';
import type { Visitor } from '../domain/Visitor';
import type { Log } from '../domain/Log';
import { visitorService } from '../services/visitorService';
import { generateSeedData } from '../data/devSeedVisitors';

const VisitorRegistryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const initialVisitors = visitorService.getVisitors();
    if (initialVisitors.length === 0) {
      const { visitors: seedVisitors, logs: seedLogs } = generateSeedData(
        8,
        40,
      );
      visitorService.saveVisitors(seedVisitors);
      visitorService.saveLogs(seedLogs);
      setVisitors(seedVisitors);
      setLogs(seedLogs);
    } else {
      setVisitors(initialVisitors);
      setLogs(visitorService.getLogs());
    }
  }, []);

  const addVisitor = useCallback(
    (data: Omit<Visitor, 'id' | 'entryDate' | 'active'>) => {
      const result = visitorService.addVisitor(data, user);
      if (result.success) {
        setVisitors(result.visitors);
        setLogs(result.logs);
      }
      return result.success;
    },
    [user],
  );

  const registerExit = useCallback(
    (id: string) => {
      const { visitors, logs } = visitorService.registerExit(id, user);
      setVisitors(visitors);
      setLogs(logs);
    },
    [user],
  );

  return (
    <VisitorRegistryContext.Provider
      value={{ visitors, logs, addVisitor, registerExit }}
    >
      {children}
    </VisitorRegistryContext.Provider>
  );
};

export default VisitorRegistryProvider;
