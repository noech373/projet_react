export enum EventCategory {
  CONCERT = 'concert',
  CONFERENCE = 'conference',
  WORKSHOP = 'workshop'
}

export type DateFilter = "all" | "upcoming" | "past";
export type PriceSort = "none" | "asc" | "desc";

export interface IEventFilters {
    searchQuery: string;
    category: EventCategory | 'all';
    dateFilter: DateFilter;
    priceSort: PriceSort;
    eventsPerPage: number;
  }

export default IEventFilters;