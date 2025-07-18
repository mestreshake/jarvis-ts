import React from 'react';
import i18nTexts from '../i18nTexts';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useJarvis } from '../hooks/useJarvis';
import {
  ListItem,
  ListItemText,
  Box,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';
import { Login, Logout } from '@mui/icons-material';

export default function VirtualizedLogsList() {
  const { logs } = useJarvis();
  const sorted = [...logs].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const log = sorted[index];
    const isEntry = log.type === 'entry';

    const primaryText = `${isEntry ? i18nTexts.logs.entry : i18nTexts.logs.exit}: ${log.visitorName} ${i18nTexts.logs.inRoom} ${log.room}`;
    const secondaryText = `${i18nTexts.logs.by}: ${log.authorizedBy} ${i18nTexts.logs.at} ${new Date(log.timestamp).toLocaleString()}`;

    return (
      <ListItem divider style={style} key={log.id} disableGutters>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: isEntry ? 'success.light' : 'error.light' }}>
            {isEntry ? <Login /> : <Logout />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="body1">{primaryText}</Typography>}
          secondary={
            <Typography variant="body2" color="text.secondary">
              {secondaryText}
            </Typography>
          }
        />
      </ListItem>
    );
  };

  return (
    <Box sx={{ height: '100%', width: '100%', p: { xs: 2, md: 0 } }}>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemCount={sorted.length}
            itemSize={72}
            overscanCount={5}
          >
            {Row}
          </FixedSizeList>
        )}
      </AutoSizer>
    </Box>
  );
}
