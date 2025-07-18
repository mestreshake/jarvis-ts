import { List, ListItem, ListItemText } from '@mui/material';
import { useJarvis } from '../hooks/useJarvis';

export default function LogsList() {
  const { logs } = useJarvis();
  return (
    <List>
      {logs.map((l) => (
        <ListItem key={l.id}>
          <ListItemText
            primary={`${l.visitorName} (${l.type === 'entry' ? 'Entrada' : 'Saída'}) na sala ${l.room}`}
            secondary={`Por: ${l.authorizedBy} em ${new Date(l.timestamp).toLocaleString()}`}
          />
        </ListItem>
      ))}
    </List>
  );
}
