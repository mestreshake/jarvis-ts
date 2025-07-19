import { useState } from 'react';
import { Container, Paper, Box } from '@mui/material';
import Header from '../components/dashboard/Header';
import TabsNavigation from '../components/dashboard/TabsNavigation';
import TabPanelContent from '../components/dashboard/TabPanelContent';

export default function DashboardPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Container maxWidth="lg" sx={{ pb: 4 }}>
        <Paper
          sx={{
            p: { xs: 0, sm: 2, md: 3 },
            borderRadius: { xs: 0, sm: 3 },
            boxShadow: { xs: 'none', sm: 4 },
            overflow: 'hidden',
            height: { xs: 'calc(100dvh - 120px)', sm: '85vh' },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TabsNavigation value={tab} onChange={setTab} />
          <TabPanelContent index={tab} />
        </Paper>
      </Container>
    </Box>
  );
}
