import { FC } from 'react';
import { IEventFilters, EventCategory } from '../../../interfaces/EventsFilter.interface';

interface EventFilterProps {
  filters: IEventFilters;
  onFilterChange: (filters: Partial<IEventFilters>) => void;
}

export const EventFilter: FC<EventFilterProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="event-filters flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm">
      <input
        type="text"
        value={filters.searchQuery}
        onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
        placeholder="Rechercher..."
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <select
        value={filters.category}
        onChange={(e) => onFilterChange({ category: e.target.value as EventCategory })}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">Toutes les catégories</option>
        <option value="concert">Concerts</option>
        <option value="theatre">Théâtre</option>
        <option value="sport">Sport</option>
      </select>
    </div>
  );
};

export default EventFilter;