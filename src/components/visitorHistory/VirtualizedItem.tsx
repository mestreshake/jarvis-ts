import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import type { Visitor } from '../../domain/Visitor';
import { VisitorTable } from './VisitorTable';

interface VirtualizedItemProps {
  index: number;
  style: React.CSSProperties;
  data: {
    items: [string, Visitor[]][];
    expanded: string[];
    onToggle: (cpf: string, isExpanded: boolean) => void;
    isMobile: boolean;
  };
}

export const VirtualizedItem: React.FC<VirtualizedItemProps> = ({
  index,
  style,
  data,
}) => {
  const { items, expanded, onToggle, isMobile } = data;
  const [cpf, visits] = items[index];
  const displayName = visits[0]?.name ?? cpf;
  const isOpen = expanded.includes(cpf);

  const getTooltipText = () => {
    let tooltip = `CPF: ${cpf}`;
    if (visits[0]?.birthDate) {
      tooltip += ` • Nasc: ${dayjs(visits[0].birthDate).format('DD/MM/YY')}`;
    }
    if (visits[0]?.email) {
      tooltip += ` • ${visits[0].email}`;
    }
    return tooltip;
  };

  return (
    <div style={style}>
      <Box sx={{ px: { xs: 1, sm: 2 }, py: 0.75 }}>
        <Accordion
          expanded={isOpen}
          onChange={(_, isExp) => onToggle(cpf, isExp)}
          disableGutters
          sx={{
            borderRadius: 2,
            boxShadow: isOpen ? 3 : 0,
            transition: 'box-shadow 0.3s ease, border-radius 0.3s ease',
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              alignItems: 'center',
              minHeight: isMobile ? 60 : 56,
              '& .MuiAccordionSummary-content': {
                margin: isMobile ? '8px 0' : '12px 0',
                overflow: 'hidden',
                minWidth: 0,
              },
              '& .MuiAccordionSummary-expandIconWrapper': {
                flexShrink: 0,
              },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                minWidth: 0,
                overflow: 'hidden',
                pr: 1,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                  lineHeight: 1.2,
                }}
                title={displayName}
              >
                {displayName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                  lineHeight: 1.1,
                  mt: 0.25,
                }}
                title={getTooltipText()}
              >
                CPF: {cpf}
                {visits[0]?.birthDate &&
                  ` • Nasc: ${dayjs(visits[0].birthDate).format('DD/MM/YY')}`}
                {!isMobile && visits[0]?.email && ` • ${visits[0].email}`}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                flexShrink: 0,
                ml: isMobile ? 0.5 : 2,
                whiteSpace: 'nowrap',
                fontSize: isMobile ? '0.7rem' : '0.75rem',
                alignSelf: 'center',
              }}
            >
              ({visits.length} visita{visits.length > 1 ? 's' : ''})
            </Typography>
          </AccordionSummary>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.section
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <AccordionDetails
                  sx={{ p: isMobile ? 1 : 2, pt: 0, background: '#fafbfc' }}
                >
                  <VisitorTable visits={visits} isMobile={isMobile} />
                </AccordionDetails>
              </motion.section>
            )}
          </AnimatePresence>
        </Accordion>
      </Box>
    </div>
  );
};
