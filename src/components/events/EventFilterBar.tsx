import React from 'react';
import { IEventFilters, EventCategory, DateFilter, PriceSort } from '../../interfaces/EventsFilter.interface';

interface EventFilterBarProps {
  filters: IEventFilters;
  onFilterChange: (newFilters: Partial<IEventFilters>) => void;
}

const EventFilterBar: React.FC<EventFilterBarProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <select
        value={filters.category}
        onChange={(e) => onFilterChange({ category: e.target.value as EventCategory })}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="all">Toutes catégories</option>
        <option value="concert">Concerts</option>
        <option value="theatre">Théâtre</option>
        <option value="sport">Sport</option>
      </select>

      <select
        value={filters.dateFilter}
        onChange={(e) => onFilterChange({ dateFilter: e.target.value as DateFilter })}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="all">Toutes dates</option>
        <option value="upcoming">À venir</option>
        <option value="past">Passés</option>
      </select>

      <select
        value={filters.priceSort}
        onChange={(e) => onFilterChange({ priceSort: e.target.value as PriceSort })}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="none">Prix: Aucun tri</option>
        <option value="asc">Prix: Croissant</option>
        <option value="desc">Prix: Décroissant</option>
      </select>
    </div>
  );
};

export default EventFilterBar; 