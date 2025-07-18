import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import AuthProvider from './context/AuthContext';
import CustomScrollbar from './components/CustomScrollbar';
import RoutesApp from './Routes';
import JarvisProvider from './context/JarvisContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomScrollbar />
      <AuthProvider>
        <JarvisProvider>
          <RoutesApp />
        </JarvisProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
