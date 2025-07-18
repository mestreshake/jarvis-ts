import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useJarvis } from '../hooks/useJarvis';
import i18nTexts from '../i18nTexts';

export default function ActiveVisitors() {
  const { visitors, registerExit } = useJarvis();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const active = visitors
    .filter((v) => v.active)
    .sort(
      (a, b) =>
        new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime(),
    );

  if (isMobile) {
    return (
      <Stack spacing={2}>
        {active.map((v) => (
          <Paper
            key={v.id}
            sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {v.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              CPF: {v.cpf}
            </Typography>
            {v.email && (
              <Typography variant="body2" color="text.secondary">
                Email: {v.email}
              </Typography>
            )}
            <Typography variant="body2">Sala: {v.room}</Typography>
            <Typography variant="body2">
              Entrada: {new Date(v.entryDate).toLocaleString()}
            </Typography>
            <Box mt={1}>
              <Button
                fullWidth
                variant="contained"
                size="small"
                onClick={() => registerExit(v.id)}
              >
                Registrar saída
              </Button>
            </Box>
          </Paper>
        ))}
      </Stack>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>CPF</TableCell>
          <TableCell>Sala</TableCell>
          <TableCell>Entrada</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {active.map((v) => (
          <TableRow key={v.id}>
            <TableCell>{v.name}</TableCell>
            <TableCell>{v.email || i18nTexts.misc.nA}</TableCell>
            <TableCell>{v.cpf}</TableCell>
            <TableCell>{v.room}</TableCell>
            <TableCell>{new Date(v.entryDate).toLocaleString()}</TableCell>
            <TableCell>
              <Button onClick={() => registerExit(v.id)}>
                {i18nTexts.visitor.exit}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
