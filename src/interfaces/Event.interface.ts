export enum EventCategory {
  CONCERT = 'music',
  SPORT = 'sport',
}

export interface IEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  organizer: string;
  category: EventCategory;
  price: number;
  image: string;
  availableSeats: number;
}