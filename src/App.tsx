import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import AuthProvider from './context/AuthContext';
import CustomScrollbar from './components/CustomScrollbar';
import RoutesApp from './routes/Routes';
import VisitorRegistryProvider from './context/VisitorRegistryContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomScrollbar />
      <AuthProvider>
        <VisitorRegistryProvider>
          <RoutesApp />
        </VisitorRegistryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
