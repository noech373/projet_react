import { EventCategory } from './EventsFilter.interface';

export interface IEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  category: EventCategory;
  price: number;
  image: string;
}