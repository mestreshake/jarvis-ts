import React from 'react';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { useJarvis } from '../hooks/useJarvis';
import { VirtualizedItem } from './visitorHistory/VirtualizedItem';
import { EmptyState } from './visitorHistory/EmptyState';
import { useVisitorVirtualization } from '../hooks/useVisitorVirtualization';

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
        height: '100%',
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef}
            height={height}
            width={width}
            itemCount={items.length}
            itemSize={getItemSize}
            itemData={itemData}
            overscanCount={5}
          >
            {VirtualizedItem}
          </List>
        )}
      </AutoSizer>
    </Box>
  );
};

export default VisitorHistory;
