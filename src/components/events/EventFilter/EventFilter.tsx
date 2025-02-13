import { FC } from 'react';
import { IEventFilters, EventCategory } from '../../../interfaces/EventsFilter.interface';

interface EventFilterProps {
  filters: IEventFilters;
  onFilterChange: (filters: Partial<IEventFilters>) => void;
}

export const EventFilter: FC<EventFilterProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="event-filters">
      <input
        type="text"
        value={filters.searchQuery}
        onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
        placeholder="Rechercher..."
      />
      <select
        value={filters.category}
        onChange={(e) => onFilterChange({ category: e.target.value as EventCategory })}
      >
        <option value="all">Toutes les catégories</option>
        <option value={EventCategory.CONCERT}>Concerts</option>
        <option value={EventCategory.CONFERENCE}>Conférences</option>
        <option value={EventCategory.WORKSHOP}>Ateliers</option>
      </select>
      {/* Autres filtres */}
    </div>
  );
};
export default EventFilter;