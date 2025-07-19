import type { Visitor } from '../domain/Visitor';
import type { Log } from '../domain/Log';
import { visitorRepository } from '../repositories/visitorRepository';

export const visitorService = {
  saveVisitors: (visitors: Visitor[]): void => {
    visitorRepository.saveVisitors(visitors);
  },

  saveLogs: (logs: Log[]): void => {
    visitorRepository.saveLogs(logs);
  },
  getVisitors: (): Visitor[] => {
    return visitorRepository.loadVisitors();
  },

  getLogs: (): Log[] => {
    return visitorRepository.loadLogs();
  },

  addVisitor: (
    data: Omit<Visitor, 'id' | 'entryDate' | 'active'>,
    user: string | null,
  ): { success: boolean; visitors: Visitor[]; logs: Log[] } => {
    const visitors = visitorRepository.loadVisitors();
    const logs = visitorRepository.loadLogs();

    const activeInRoom = visitors.filter(
      (v) => v.room === data.room && v.active,
    );
    if (activeInRoom.length >= 3) {
      return { success: false, visitors, logs };
    }

    const existingVisitor = visitors.find(v => v.cpf === data.cpf);

    const newVisit: Visitor = {
      // Usa os dados do formulário como base
      ...data,
      // Se o visitante já existe, mantém seus dados pessoais para consistência
      // mas remove exitDate para garantir que seja uma nova visita
      ...(existingVisitor && {
        name: existingVisitor.name,
        birthDate: existingVisitor.birthDate,
        email: existingVisitor.email,
      }),
      // Atribui um ID, data de entrada e status para a nova visita
      id: crypto.randomUUID(),
      entryDate: new Date().toISOString(),
      active: true,
      // A sala pode mudar a cada visita, então sempre usa a do formulário
      room: data.room,
      // Garante que exitDate não exista no novo registro
      exitDate: undefined,
    };

    const updatedVisitors = [...visitors, newVisit];

    const newLog: Log = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type: 'entry',
      visitorName: newVisit.name,
      room: newVisit.room,
      authorizedBy: user || 'System',
    };
    const updatedLogs = [...logs, newLog];

    visitorRepository.saveVisitors(updatedVisitors);
    visitorRepository.saveLogs(updatedLogs);

    return { success: true, visitors: updatedVisitors, logs: updatedLogs };
  },

  registerExit: (
    id: string,
    user: string | null,
  ): { visitors: Visitor[]; logs: Log[] } => {
    const visitors = visitorRepository.loadVisitors();
    const logs = visitorRepository.loadLogs();
    const exitedVisitor = visitors.find((v) => v.id === id);

    const updatedVisitors = visitors.map((v) =>
      v.id === id
        ? { ...v, exitDate: new Date().toISOString(), active: false }
        : v,
    );

    let updatedLogs = logs;
    if (exitedVisitor) {
      const newLog: Log = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        type: 'exit',
        visitorName: exitedVisitor.name,
        room: exitedVisitor.room,
        authorizedBy: user || 'System',
      };
      updatedLogs = [...logs, newLog];
    }

    visitorRepository.saveVisitors(updatedVisitors);
    visitorRepository.saveLogs(updatedLogs);

    return { visitors: updatedVisitors, logs: updatedLogs };
  },
};
