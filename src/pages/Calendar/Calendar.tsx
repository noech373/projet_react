import { useState, useEffect } from 'react';
import { useEvents } from '../../hooks/useEvents';
import { ProfileSelector } from '../../components/calendar/ProfileSelector';
import { IEvent } from '../../interfaces/Event.interface';
import CalendarHeader from '../../components/calendar/CalendarHeader';
import CalendarGrid from '../../components/calendar/CalendarGrid';
import EventPreview from '../../components/calendar/EventPreview';

const Calendar = () => {
  const [showProfileSelector, setShowProfileSelector] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'Musique' | 'Sport' | null>(null);
  const { events } = useEvents();
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null); // État pour l'événement sélectionné

  // State management only - UI components have been moved to separate files

  useEffect(() => {
    if (selectedCategory) {
      const filtered = events.filter(event => event.category.toLowerCase() === selectedCategory.toLowerCase());
      setFilteredEvents(filtered);
    }
  }, [selectedCategory, events]);

  const handleProfileSelect = (category: 'Musique' | 'Sport') => {
    setSelectedCategory(category);
    setShowProfileSelector(false);
  };

  // These functions have been moved to the CalendarGrid component

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(currentDate.getFullYear(), parseInt(event.target.value)));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(parseInt(event.target.value), currentDate.getMonth()));
  };

  const handleEventClick = (event: IEvent) => {
    setSelectedEvent(event);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileSelector
        isOpen={showProfileSelector}
        onSelect={handleProfileSelect}
        onClose={() => setShowProfileSelector(false)}
      />

      {selectedCategory && (
        <div className="space-y-6">
          <CalendarHeader 
            currentDate={currentDate}
            selectedCategory={selectedCategory}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
            onCategoryToggle={() => setSelectedCategory(selectedCategory === 'Musique' ? 'Sport' : 'Musique')}
          />

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <CalendarGrid 
              currentDate={currentDate}
              filteredEvents={filteredEvents}
              onEventClick={handleEventClick}
            />
          </div>
        </div>
      )}

      {/* Event preview modal */}
      {selectedEvent && (
        <EventPreview
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default Calendar;
