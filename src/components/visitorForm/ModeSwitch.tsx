import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import i18nTexts from '../../i18nTexts';

export type VisitorMode = 'existing' | 'new';

interface ModeSwitchProps {
  mode: VisitorMode;
  onChange: (mode: VisitorMode) => void;
}

const ModeSwitch: React.FC<ModeSwitchProps> = ({ mode, onChange }) => (
  <RadioGroup
    row
    aria-label="Tipo de visita"
    value={mode}
    onChange={(e) => onChange(e.target.value as VisitorMode)}
  >
    <FormControlLabel value="existing" control={<Radio />} label={i18nTexts.visitor.modeExisting} />
    <FormControlLabel value="new" control={<Radio />} label={i18nTexts.visitor.modeNew} />
  </RadioGroup>
);

export default ModeSwitch;
