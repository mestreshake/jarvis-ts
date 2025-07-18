import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import type { Visitor } from '../../domain/Visitor';
import ListboxComponent from '../VirtualizedListbox';
import i18nTexts from '../../i18nTexts';

interface ExistingVisitorSelectProps {
  visitors: Visitor[];
  selectedVisitor: Visitor | null;
  onChange: (visitor: Visitor | null) => void;
}

const ExistingVisitorSelect: React.FC<ExistingVisitorSelectProps> = ({
  visitors,
  selectedVisitor,
  onChange,
}) => (
  <Autocomplete
    slots={{ listbox: ListboxComponent }}
    options={visitors}
    getOptionLabel={(option: Visitor) => option.name.toUpperCase()}
    isOptionEqualToValue={(o: Visitor, v: Visitor) => o.cpf === v.cpf}
    value={selectedVisitor}
    onChange={(_e, value: Visitor | null) => onChange(value)}
    renderInput={(params) => (
      <TextField {...params} label={i18nTexts.visitor.selectVisitor} required />
    )}
    renderOption={(props, option) => (
      <li
        {...props}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: 8,
          minWidth: 0,
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <div style={{ width: '100%' }}>
          <div
            style={{
              fontWeight: 600,
              fontSize: 16,
              color: '#222',
              whiteSpace: 'pre-line',
              wordBreak: 'break-word',
            }}
          >
            {option.name}
          </div>
          <div
            style={{
              fontSize: 13,
              color: '#555',
              marginTop: 1,
              whiteSpace: 'pre-line',
              wordBreak: 'break-word',
            }}
          >
            CPF: {option.cpf}
          </div>
        </div>
      </li>
    )}
  />
);

export default ExistingVisitorSelect;
