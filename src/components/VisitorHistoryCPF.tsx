import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useJarvis } from '../hooks/useJarvis';
import type { Visitor } from '../domain/Visitor';
import { VariableSizeList } from 'react-window';
import dayjs from 'dayjs';

// Constantes de altura
const CLOSED_HEIGHT = 82;
const VISIT_ROW_HEIGHT = 53;
const TABLE_HEADER_HEIGHT = 56;
const MAX_HEIGHT = 600;

const VisitorHistoryCPF: React.FC = () => {
  const listRef = useRef<VariableSizeList>(null);
  const sizeMap = useRef<Record<number, number>>({});
  const { visitors } = useJarvis();
  const [expanded, setExpanded] = useState<string[]>([]); // múltiplos abertos

  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
    }
  }, [expanded]);

  const grouped = useMemo(() => {
    return visitors.reduce((acc: Record<string, Visitor[]>, v: Visitor) => {
      acc[v.cpf] = acc[v.cpf] ? [...acc[v.cpf], v] : [v];
      return acc;
    }, {});
  }, [visitors]);

  const items = useMemo(
    () => Object.entries(grouped) as [string, Visitor[]][],
    [grouped],
  );

  const getItemSize = useCallback(
    (index: number) => {
      if (sizeMap.current[index]) return sizeMap.current[index];

      const [cpf, visits] = items[index];

      if (expanded.includes(cpf)) {
        const contentHeight =
          TABLE_HEADER_HEIGHT + visits.length * VISIT_ROW_HEIGHT;
        const totalHeight = CLOSED_HEIGHT + contentHeight;
        sizeMap.current[index] = totalHeight;
        return totalHeight;
      }

      sizeMap.current[index] = CLOSED_HEIGHT;
      return CLOSED_HEIGHT;
    },
    [items, expanded],
  );

  const totalHeight = useMemo(() => {
    const total = items.reduce((sum, _, index) => sum + getItemSize(index), 0);
    return Math.min(total, MAX_HEIGHT);
  }, [items, getItemSize]);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const [cpf, visits] = items[index];
    const displayName = visits[0]?.name ?? cpf;
    const isOpen = expanded.includes(cpf);

    return (
      <div style={style}>
        <Box sx={{ px: { xs: 1, sm: 2 }, py: 0.75 }}>
          <Accordion
            expanded={isOpen}
            onChange={(_, isExp) => {
              sizeMap.current = {}; // Invalidate size cache
              setExpanded((prev) =>
                isExp ? [...prev, cpf] : prev.filter((id) => id !== cpf),
              );
            }}
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
              sx={{ alignItems: 'center' }}
            >
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 600 }}>{displayName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  CPF: {cpf}
                  {visits[0]?.birthDate &&
                    ` • Nasc: ${dayjs(visits[0].birthDate).format('DD/MM/YY')}`}
                  {visits[0]?.email && ` • ${visits[0].email}`}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mr: 1, ml: 2, whiteSpace: 'nowrap' }}
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
                  <AccordionDetails sx={{ p: 2, pt: 0, background: '#fafbfc' }}>
                    <Table
                      size="small"
                      sx={{
                        background: '#fff',
                        borderRadius: 1,
                        overflow: 'hidden',
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>Sala</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            Entrada
                          </TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Saída</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {visits
                          .sort(
                            (a: Visitor, b: Visitor) =>
                              new Date(b.entryDate).getTime() -
                              new Date(a.entryDate).getTime(),
                          )
                          .map((v: Visitor) => (
                            <TableRow
                              key={v.id}
                              sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                            >
                              <TableCell>{v.room}</TableCell>
                              <TableCell>
                                {new Date(v.entryDate).toLocaleString()}
                              </TableCell>
                              <TableCell>
                                {v.exitDate
                                  ? new Date(v.exitDate).toLocaleString()
                                  : '--'}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </AccordionDetails>
                </motion.section>
              )}
            </AnimatePresence>
          </Accordion>
        </Box>
      </div>
    );
  };

  return (
    <Box sx={{ height: '100%' }}>
      <VariableSizeList
        ref={listRef}
        height={totalHeight}
        width="100%"
        itemCount={items.length}
        itemSize={getItemSize}
        overscanCount={4}
      >
        {Row}
      </VariableSizeList>
    </Box>
  );
};

export default VisitorHistoryCPF;
