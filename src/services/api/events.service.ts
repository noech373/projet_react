import { IEvent } from '../../interfaces/Event.interface';

export const EventsService = {
  async getAll(): Promise<IEvent[]> {
    const response = await fetch('http://localhost:3000/events');
    return response.json();
  },

  async getById(id: string): Promise<IEvent> {
    const response = await fetch(`http://localhost:3000/events/${id}`);
    return response.json();
  },

  async updateAvailableSeats(id: string, seatsToSubtract: number): Promise<IEvent> {
    // First get the current event to know the current available seats
    const event = await this.getById(id);
    
    // Calculate new available seats
    const newAvailableSeats = Math.max(0, event.availableSeats - seatsToSubtract);
    
    // Update the event with new available seats
    const response = await fetch(`http://localhost:3000/events/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        availableSeats: newAvailableSeats
      })
    });
    
    return response.json();
  }
};

export default EventsService;
