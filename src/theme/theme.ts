import {
  createTheme,
  type ThemeOptions,
  type Shadows,
} from '@mui/material/styles';

const airbnbShadows: Shadows = Array.from(
  { length: 25 },
  () => '0 2px 12px rgba(0,0,0,0.08)',
) as Shadows;

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: { main: '#FF385C' },
    secondary: { main: '#222' },
    background: { default: '#f7f7f7', paper: '#ffffff' },
  },
  typography: {
    fontFamily: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
    button: { textTransform: 'none', fontWeight: 600 },
    h6: { letterSpacing: 0.5, fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
  shadows: airbnbShadows,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '@keyframes fadeInUp': {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        },
        body: {
          backgroundColor: '#f7f7f7',
          color: '#222',
          animation: 'fadeInUp 0.4s ease-out',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          paddingInline: 24,
          fontWeight: 700,
          boxShadow: airbnbShadows[2],
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: airbnbShadows[4],
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: airbnbShadows[1],
        },
      },
    },
  },
};

const theme = createTheme(lightThemeOptions);
export default theme;
