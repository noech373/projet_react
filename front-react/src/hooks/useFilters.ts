import { useState, useCallback } from 'react';
import { IEventFilters } from '../interfaces/EventsFilter.interface';

export const useFilters = (initialFilters: IEventFilters) => {
  const [filters, setFilters] = useState<IEventFilters>(initialFilters);

  const updateFilters = useCallback((newFilters: Partial<IEventFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  return {
    filters,
    updateFilters,
    resetFilters
  };
};
