export type EventCategory = "all" | "concert" | "theatre" | "sport";
export type DateFilter = "all" | "upcoming" | "past";
export type PriceSort = "none" | "asc" | "desc";

export interface IEventFilters {
    searchQuery: string;
    category: EventCategory;
    dateFilter: DateFilter;
    priceSort: PriceSort;
  }

export default IEventFilters;