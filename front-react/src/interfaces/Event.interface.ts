export interface IEvent {
    id: string;
    title: string;
    date: Date;
    location: string;
    price: number;
    image: string;
    category: EventCategory;
    description: string;
  }
  
export enum EventCategory {
    CONCERT = 'concert',
    CONFERENCE = 'conference',
    WORKSHOP = 'workshop'
  }
export default EventCategory;
