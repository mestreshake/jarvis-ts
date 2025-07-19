import React from 'react';
import { VariableSizeList as List } from 'react-window';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { useJarvis } from '../hooks/useJarvis';
import { VirtualizedItem } from './visitorHistory/VirtualizedItem';
import { EmptyState } from './visitorHistory/EmptyState';
import { useVisitorVirtualization } from '../hooks/useVisitorVirtualization';

const MAX_HEIGHT = 600;

const VisitorHistory: React.FC = () => {
  const { visitors } = useJarvis();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { items, listRef, getItemSize, itemData } = useVisitorVirtualization(
    visitors,
    isMobile,
  );

  if (items.length === 0) {
    return <EmptyState />;
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: MAX_HEIGHT,
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      <List
        ref={listRef}
        height={MAX_HEIGHT}
        itemCount={items.length}
        itemSize={getItemSize}
        itemData={itemData}
        overscanCount={5}
        width="100%"
      >
        {VirtualizedItem}
      </List>
    </Box>
  );
};

export default VisitorHistory;
