/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useCallback, useRef } from 'react';
import type { Visitor } from '../domain/Visitor';

const ITEM_HEIGHT = 80;
const EXPANDED_ITEM_BASE_HEIGHT = 200;
const VISIT_ROW_HEIGHT = 40;

export const useVisitorVirtualization = (
  visitors: Visitor[],
  isMobile: boolean,
) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const listRef = useRef<any>(null);

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

  const handleToggle = useCallback((cpf: string, isExpanded: boolean) => {
    setExpanded((prev) =>
      isExpanded ? [...prev, cpf] : prev.filter((id) => id !== cpf),
    );

    // Reset o cache de alturas quando um item é expandido/colapsado
    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
    }
  }, []);

  // Calcula a altura dinâmica de cada item baseado no estado de expansão
  const getItemSize = useCallback(
    (index: number) => {
      const [cpf, visits] = items[index];
      const isOpen = expanded.includes(cpf);

      if (!isOpen) {
        return ITEM_HEIGHT;
      }

      // Altura expandida: header + padding + tabela (header + rows)
      const tableHeaderHeight = 40;
      const visitRowsHeight = visits.length * VISIT_ROW_HEIGHT;
      const padding = isMobile ? 16 : 32;

      return (
        EXPANDED_ITEM_BASE_HEIGHT +
        tableHeaderHeight +
        visitRowsHeight +
        padding
      );
    },
    [expanded, items, isMobile],
  );

  const itemData = useMemo(
    () => ({
      items,
      expanded,
      onToggle: handleToggle,
      isMobile,
    }),
    [items, expanded, handleToggle, isMobile],
  );

  return {
    items,
    expanded,
    listRef,
    getItemSize,
    itemData,
    handleToggle,
  };
};
