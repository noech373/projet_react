export enum EventCategory {
  CONCERT = 'concert',
  CONFERENCE = 'conference',
  WORKSHOP = 'workshop'
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
}