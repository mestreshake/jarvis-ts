export interface Log {
  id: string;
  timestamp: string;
  type: 'entry' | 'exit';
  visitorName: string;
  room: string;
  authorizedBy: string;
}
