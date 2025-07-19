import { Box } from '@mui/material';
import VisitorForm from '../../components/VisitorForm';
import ActiveVisitors from '../../components/ActiveVisitors';
import VisitorHistory from '../../components/VisitorHistory';
import VirtualizedLogsList from '../../components/VirtualizedLogsList';

interface Props {
  index: number;
}

export default function TabPanelContent({ index }: Props) {
  return (
    <Box
      sx={{
        pt: { xs: 2, md: 3 },
        flexGrow: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      {index === 0 && <VisitorForm />}
      {index === 1 && <ActiveVisitors />}
      {index === 2 && <VisitorHistory />}
      {index === 3 && <VirtualizedLogsList />}
    </Box>
  );
}
