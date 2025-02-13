import { FC } from 'react';
import { IEventFilters, EventCategory } from '../../../interfaces/EventsFilter.interface';

interface EventFilterBarProps {
  filters: IEventFilters;
  onFilterChange: (filters: Partial<IEventFilters>) => void;
}

export const EventFilterBar: FC<EventFilterBarProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <select
        value={filters.category}
        onChange={(e) => onFilterChange({ category: e.target.value as EventCategory })}
        className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
      >
        <option value="all">Toutes les catégories</option>
        <option value="Musique">Concerts</option>
        <option value="Sport">Sport</option>
      </select>

      <select
        value={filters.dateFilter}
        onChange={(e) => onFilterChange({ dateFilter: e.target.value as 'all' | 'upcoming' | 'past' })}
        className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
      >
        <option value="all">Toutes les dates</option>
        <option value="upcoming">À venir</option>
        <option value="past">Passés</option>
      </select>

      <select
        value={filters.priceSort}
        onChange={(e) => onFilterChange({ priceSort: e.target.value as 'none' | 'asc' | 'desc' })}
        className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
      >
        <option value="none">Prix : Pas de tri</option>
        <option value="asc">Prix : Croissant</option>
        <option value="desc">Prix : Décroissant</option>
      </select>
    </div>
  );
};

export default EventFilterBar; 