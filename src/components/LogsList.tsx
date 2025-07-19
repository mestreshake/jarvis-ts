import { List, ListItem, ListItemText } from '@mui/material';
import { useVisitorRegistry } from '../hooks/useVisitorRegistry';

export default function LogsList() {
  const { logs } = useVisitorRegistry();
  return (
    <List>
      {logs.map((l) => (
        <ListItem key={l.id}>
          <ListItemText
            primary={
              <>
                <span style={{ fontWeight: 500, marginRight: 24 }}>
                  {l.visitorName}
                </span>
                <span>
                  ({l.type === 'entry' ? 'Entrada' : 'Saída'}) na sala {l.room}{' '}
                  — Por:{' '}
                  <span style={{ fontWeight: 500 }}>{l.authorizedBy}</span> em{' '}
                  {new Date(l.timestamp).toLocaleString()}
                </span>
              </>
            }
            secondary={null}
          />
        </ListItem>
      ))}
    </List>
  );
}
