import { Tabs, Tab } from '@mui/material';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function TabsNavigation({ value, onChange }: Props) {
  return (
    <Tabs
      value={value}
      onChange={(_e, v) => onChange(v)}
      variant="fullWidth"
      sx={{ borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}
    >
      <Tab label="Entrada" />
      <Tab label="Ativos" />
      <Tab label="Histórico" />
      <Tab label="Logs" />
    </Tabs>
  );
}
