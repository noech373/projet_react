export interface IEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  price: number;
  image?: string;
  location?: string;
  description?: string;
  availableSeats?: number;
}

export enum EventCategory {
  CONCERT = 'Musique',
  SPORT = 'Sport'
}