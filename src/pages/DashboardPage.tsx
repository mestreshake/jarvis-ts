import {
  Container,
  Tab,
  Tabs,
  Box,
  Button,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
} from '@mui/material';
import starkLogo from '../assets/stark_logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import VisitorForm from '../components/VisitorForm';
import ActiveVisitors from '../components/ActiveVisitors';
import VisitorHistory from '../components/VisitorHistory';
import VirtualizedLogsList from '../components/VirtualizedLogsList';
import { useAuth } from '../hooks/useAuth';

export default function DashboardPage() {
  const [tab, setTab] = useState(0);
  const { isAuthenticated, logout } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="inherit" elevation={1} sx={{ mb: 2 }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ flex: 1, minWidth: 0 }}
          >
            <IconButton
              edge="start"
              color="inherit"
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                width: 200,
                maxHeight: 74,
                mr: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={starkLogo}
                alt="Stark Tower Logo"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
                loading="eager"
              />
            </Box>
          </Stack>
          {isAuthenticated && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={logout}
              sx={{ ml: 2, minWidth: 90 }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
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
          <Tabs
            value={tab}
            onChange={(_event: React.SyntheticEvent, v: number) => setTab(v)}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}
          >
            <Tab label="Entrada" />
            <Tab label="Ativos" />
            <Tab label="Histórico" />
            <Tab label="Logs" />
          </Tabs>
          <Box
            sx={{
              pt: { xs: 2, md: 3 },
              flexGrow: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {tab === 0 && <VisitorForm />}
            {tab === 1 && <ActiveVisitors />}
            {tab === 2 && <VisitorHistory />}
            {tab === 3 && <VirtualizedLogsList />}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
