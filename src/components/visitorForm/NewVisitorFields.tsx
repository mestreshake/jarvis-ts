import React from 'react';
import { TextField, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import i18nTexts from '../../i18nTexts';
interface NewVisitorFieldsProps {
  form: {
    name: string;
    cpf: string;
    birthDate: string;
    email: string;
  };
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (date: dayjs.Dayjs | null) => void;
  onDateError: (error: string | null) => void;
}

const NewVisitorFields: React.FC<NewVisitorFieldsProps> = ({
  form,
  onFormChange,
  onDateChange,
  onDateError,
}) => (
  <Stack spacing={2}>
    <TextField
      label={i18nTexts.visitor.name}
      name="name"
      value={form.name}
      onChange={onFormChange}
      required
    />
    <TextField
      label={i18nTexts.visitor.cpf}
      name="cpf"
      value={form.cpf}
      onChange={onFormChange}
      required
    />
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DatePicker
        label={i18nTexts.visitor.birthDate}
        value={form.birthDate ? dayjs(form.birthDate) : null}
        onChange={onDateChange}
        onError={onDateError}
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            InputLabelProps: { shrink: true },
          },
        }}
        sx={{ width: '100%' }}
      />
    </LocalizationProvider>
    <TextField
      label={i18nTexts.visitor.email}
      name="email"
      type="email"
      value={form.email}
      onChange={onFormChange}
    />
  </Stack>
);

export default NewVisitorFields;
