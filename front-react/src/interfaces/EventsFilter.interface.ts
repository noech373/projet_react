import { EventCategory } from "./Event.interface";

export interface IEventFilters {
    searchQuery: string;
    category: EventCategory | 'all';
    dateFilter: 'all' | 'upcoming' | 'past';
    priceSort: 'none' | 'asc' | 'desc';
  }

export default IEventFilters;