import { IEvent } from '../../interfaces/Event.interface';

export const EventsService = {
  async getAll(): Promise<IEvent[]> {
    const response = await fetch('http://localhost:3000/events');
    return response.json();
  },

  async getById(id: string): Promise<IEvent> {
    const response = await fetch(`http://localhost:3000/events/${id}`);
    return response.json();
  }
};

export default EventsService;
