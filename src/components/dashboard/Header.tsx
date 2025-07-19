import { AppBar, Toolbar, Stack, IconButton, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import starkLogo from '../../assets/stark_logo.png';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
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
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
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
  );
}
