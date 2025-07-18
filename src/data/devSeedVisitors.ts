import type { Visitor } from '../domain/Visitor';
import type { Log } from '../domain/Log';

export function generateSeedData(activeCount: number, pastCount: number) {
  const rooms = ['101', '102', '103', '104', '105'];
  const visitors: Visitor[] = [];
  const logs: Log[] = [];
  const now = Date.now();

  // Active visitors (no exitDate)
  for (let i = 0; i < activeCount; i++) {
    const id = `active-${i}`;
    const entry = new Date(now - i * 1000 * 60 * 10).toISOString();
    const v: Visitor = {
      id,
      name: `VISITANTE ${i}`,
      cpf: String(90000000000 + i).replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4',
      ),
      room: rooms[i % rooms.length],
      email: `visitante${i}@teste.com`,
      entryDate: entry,
      active: true,
    };
    visitors.push(v);
    logs.push({
      id: `log-entry-${id}`,
      timestamp: entry,
      type: 'entry',
      visitorName: v.name,
      room: v.room,
      authorizedBy: 'System',
    });
  }

  // Past visitors (inactive with exitDate)
  for (let i = 0; i < pastCount; i++) {
    const id = `past-${i}`;
    const entryMs = now - (i + activeCount) * 1000 * 60 * 60;
    const exitMs = entryMs + 1000 * 60 * 30;
    const entry = new Date(entryMs).toISOString();
    const exit = new Date(exitMs).toISOString();
    const v: Visitor = {
      id,
      name: `VISITANTE ${i + activeCount}`,
      cpf: String(80000000000 + i).replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4',
      ),
      room: rooms[i % rooms.length],
      email: `visitante${i + activeCount}@teste.com`,
      entryDate: entry,
      exitDate: exit,
      active: false,
    };
    visitors.push(v);
    logs.push({
      id: `log-entry-${id}`,
      timestamp: entry,
      type: 'entry',
      visitorName: v.name,
      room: v.room,
      authorizedBy: 'System',
    });
    logs.push({
      id: `log-exit-${id}`,
      timestamp: exit,
      type: 'exit',
      visitorName: v.name,
      room: v.room,
      authorizedBy: 'System',
    });
  }

  return { visitors, logs };
}
