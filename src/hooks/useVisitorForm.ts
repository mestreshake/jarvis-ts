import { useState, useMemo } from 'react';
import type { Visitor } from '../domain/Visitor';
import { useJarvis } from './useJarvis';
import { isValidCPF, isValidEmail, formatCPF } from '../utils/validation';
import dayjs from 'dayjs';

export type VisitorMode = 'existing' | 'new';

export const useVisitorForm = () => {
  const { addVisitor, visitors } = useJarvis();
  const [mode, setMode] = useState<VisitorMode>('existing');
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [form, setForm] = useState({
    name: '',
    cpf: '',
    room: '',
    birthDate: '',
    email: '',
  });
  const [dialog, setDialog] = useState({ open: false, msg: '' });
  const [dateError, setDateError] = useState<boolean>(false);

  const previousVisitors = useMemo(
    () =>
      Array.from(
        new Map(visitors.map((v: Visitor) => [v.cpf, v])).values(),
      ) as Visitor[],
    [visitors],
  );

  const handleModeChange = (newMode: VisitorMode) => {
    setMode(newMode);
    setForm({ name: '', cpf: '', room: '', birthDate: '', email: '' });
    setSelectedVisitor(null);
  };

  const handleVisitorSelect = (visitor: Visitor | null) => {
    setSelectedVisitor(visitor);
    if (visitor) {
      setForm((prev) => ({
        ...prev,
        name: visitor.name,
        cpf: visitor.cpf,
        birthDate: visitor.birthDate || '',
        email: visitor.email || '',
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let v = value;
    if (name === 'name') v = v.toUpperCase();
    if (name === 'email') v = v.toLowerCase();
    if (name === 'cpf') v = formatCPF(v);
    setForm((prev) => ({ ...prev, [name]: v }));
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setForm((prev) => ({
      ...prev,
      birthDate: date ? date.format('YYYY-MM-DD') : '',
    }));
  };

  const handleDateError = (error: string | null) => {
    setDateError(!!error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cpfToCheck =
      mode === 'existing' && selectedVisitor ? selectedVisitor.cpf : form.cpf;

    if (mode === 'new' && cpfToCheck) {
      if (visitors.some((v: Visitor) => v.cpf === cpfToCheck)) {
        return setDialog({
          open: true,
          msg: 'Este CPF já possui cadastro. Use a opção "Já visitei".',
        });
      }
      if (!isValidCPF(cpfToCheck)) {
        return setDialog({
          open: true,
          msg: 'CPF inválido. Digite um CPF válido.',
        });
      }
      if (form.email && !isValidEmail(form.email)) {
        return setDialog({
          open: true,
          msg: 'Email inválido. Digite um email válido.',
        });
      }
      if (dateError) {
        return setDialog({
          open: true,
          msg: 'A data de nascimento inserida é inválida. Corrija-a ou deixe o campo em branco.',
        });
      }
    }

    if (cpfToCheck) {
      const alreadyActive = visitors.find(
        (v: Visitor) => v.cpf === cpfToCheck && v.active,
      );
      if (alreadyActive) {
        return setDialog({
          open: true,
          msg: `${alreadyActive.name} já está na sala ${alreadyActive.room}.`,
        });
      }
    }

    const payload =
      mode === 'existing' && selectedVisitor
        ? { ...selectedVisitor, room: form.room }
        : { ...form };

    if (!payload.room || (mode === 'new' && (!payload.name || !payload.cpf))) {
      return setDialog({
        open: true,
        msg: 'Nome, CPF e Sala são obrigatórios.',
      });
    }

    const ok = addVisitor(payload);
    if (!ok) {
      setDialog({
        open: true,
        msg: 'Limite de 3 visitantes ativos na sala atingido.',
      });
    } else {
      setForm({ name: '', cpf: '', room: '', birthDate: '', email: '' });
      setSelectedVisitor(null);
    }
  };

  return {
    mode,
    form,
    dialog,
    previousVisitors,
    selectedVisitor,
    handleModeChange,
    handleVisitorSelect,
    handleChange,
    handleDateChange,
    handleDateError,
    handleSubmit,
    closeDialog: () => setDialog({ ...dialog, open: false }),
  };
};
