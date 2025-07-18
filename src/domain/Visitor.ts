export interface Visitor {
  id: string;
  name: string;
  cpf: string;
  room: string;
  birthDate?: string;
  email?: string;
  entryDate: string;
  exitDate?: string;
  active: boolean;
}
