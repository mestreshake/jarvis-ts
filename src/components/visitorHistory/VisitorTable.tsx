import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import type { Visitor } from '../../domain/Visitor';

interface VisitorTableProps {
  visits: Visitor[];
  isMobile: boolean;
}

export const VisitorTable: React.FC<VisitorTableProps> = ({
  visits,
  isMobile,
}) => {
  const formatDate = (date: string, isMobile: boolean) => {
    return isMobile
      ? new Date(date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
      : new Date(date).toLocaleString();
  };

  const sortedVisits = visits.sort(
    (a: Visitor, b: Visitor) =>
      new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime(),
  );

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Table
        size="small"
        sx={{
          background: '#fff',
          borderRadius: 1,
          overflow: 'hidden',
          minWidth: isMobile ? 300 : 'auto',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 'bold',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                padding: isMobile ? '6px 8px' : '6px 16px',
              }}
            >
              Sala
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 'bold',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                padding: isMobile ? '6px 8px' : '6px 16px',
              }}
            >
              Entrada
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 'bold',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                padding: isMobile ? '6px 8px' : '6px 16px',
              }}
            >
              Saída
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedVisits.map((visit: Visitor, index: number) => (
            <TableRow
              key={`${visit.id}-${visit.entryDate}-${index}`}
              sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
            >
              <TableCell
                sx={{
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                  padding: isMobile ? '4px 8px' : '6px 16px',
                  maxWidth: isMobile ? '80px' : '120px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={visit.room}
              >
                {visit.room}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                  padding: isMobile ? '4px 8px' : '6px 16px',
                  whiteSpace: 'nowrap',
                  maxWidth: isMobile ? '100px' : '150px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                title={new Date(visit.entryDate).toLocaleString()}
              >
                {formatDate(visit.entryDate, isMobile)}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                  padding: isMobile ? '4px 8px' : '6px 16px',
                  whiteSpace: 'nowrap',
                  maxWidth: isMobile ? '100px' : '150px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                title={
                  visit.exitDate
                    ? new Date(visit.exitDate).toLocaleString()
                    : 'Presente'
                }
              >
                {visit.exitDate
                  ? formatDate(visit.exitDate, isMobile)
                  : 'Presente'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
