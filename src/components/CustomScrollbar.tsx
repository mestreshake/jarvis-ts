import { GlobalStyles, useTheme } from '@mui/material';

const CustomScrollbar = () => {
  const theme = useTheme();
  return (
    <GlobalStyles
      styles={{
        '*::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '*::-webkit-scrollbar-track': {
          background: theme.palette.background.paper,
        },
        '*::-webkit-scrollbar-thumb': {
          background: theme.palette.primary.main,
          borderRadius: '4px',
          border: `2px solid ${theme.palette.background.paper}`,
        },
        '*::-webkit-scrollbar-thumb:hover': {
          background: theme.palette.primary.dark,
        },

        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`,
        },
      }}
    />
  );
};

export default CustomScrollbar;
