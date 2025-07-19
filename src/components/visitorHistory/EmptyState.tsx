import React from 'react';
import { Box, Typography } from '@mui/material';

export const EmptyState: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        color: 'text.secondary',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography variant="h6" color="text.secondary">
        📋
      </Typography>
      <Typography>Nenhum visitante encontrado</Typography>
    </Box>
  );
};
