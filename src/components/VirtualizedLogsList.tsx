import React from 'react';
import i18nTexts from '../i18n/i18nTexts';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useVisitorRegistry } from '../hooks/useVisitorRegistry';
import {
  ListItem,
  Box,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';
import { Login, Logout } from '@mui/icons-material';

export default function VirtualizedLogsList() {
  const { logs } = useVisitorRegistry();
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

    const actionText = isEntry ? i18nTexts.logs.entry : i18nTexts.logs.exit;
    const secondaryText = `${i18nTexts.logs.by}: ${log.authorizedBy} ${i18nTexts.logs.at} ${new Date(log.timestamp).toLocaleString()}`;

    return (
      <ListItem divider style={style} key={log.id} disableGutters>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: isEntry ? 'success.light' : 'error.light' }}>
            {isEntry ? <Login /> : <Logout />}
          </Avatar>
        </ListItemAvatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography
              variant="body1"
              fontWeight="medium"
              color={isEntry ? 'success.main' : 'error.main'}
            >
              {' '}
              {actionText}:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {log.visitorName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0 }}>
            <Typography variant="body2" color="text.secondary">
              {i18nTexts.logs.inRoom}:
            </Typography>
            <Typography
              variant="body2"
              color="text.primary"
              fontWeight="medium"
            >
              {log.room}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              mt: 0,
            }}
          >
            {secondaryText}
          </Typography>
        </Box>
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
