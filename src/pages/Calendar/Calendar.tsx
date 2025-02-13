import { useState, useEffect } from 'react';
import { useEvents } from '../../hooks/useEvents';
import { ProfileSelector } from '../../components/calendar/ProfileSelector';
import { IEvent } from '../../interfaces/Event.interface';

const Calendar = () => {
  const [showProfileSelector, setShowProfileSelector] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'Musique' | 'Sport' | null>(null);
  const { events } = useEvents();
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  useEffect(() => {
    if (selectedCategory) {
      const filtered = events.filter(event => event.category === selectedCategory);
      setFilteredEvents(filtered);
    }
  }, [selectedCategory, events]);

  const handleProfileSelect = (category: 'Musique' | 'Sport') => {
    setSelectedCategory(category);
    setShowProfileSelector(false);
  };

  const groupEventsByDate = () => {
    const grouped = new Map<string, IEvent[]>();
    filteredEvents.forEach(event => {
      const date = new Date(event.date).toISOString().split('T')[0];
      if (!grouped.has(date)) {
        grouped.set(date, []);
      }
      grouped.get(date)?.push(event);
    });
    return grouped;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    // Ajouter les jours du mois précédent
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    // Ajouter les jours du mois en cours
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    if (!date) return [];
    return filteredEvents.filter(event => 
      new Date(event.date).toISOString().split('T')[0] === date.toISOString().split('T')[0]
    );
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileSelector
        isOpen={showProfileSelector}
        onSelect={handleProfileSelect}
        onClose={() => setShowProfileSelector(false)}
      />

      {selectedCategory && (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              Calendrier des {selectedCategory === 'Musique' ? 'Concerts' : 'Événements Sportifs'}
            </h1>
            <button
              onClick={() => setSelectedCategory(selectedCategory === 'Musique' ? 'Sport' : 'Musique')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedCategory === 'Musique'
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              Basculer vers {selectedCategory === 'Musique' ? 'Sport' : 'Concerts'}
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePreviousMonth}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                ←
              </button>
              
              <div className="flex gap-2">
                <select
                  value={currentDate.getMonth()}
                  onChange={handleMonthChange}
                  className="bg-white dark:bg-gray-700 border rounded p-1"
                >
                  {months.map((month, index) => (
                    <option key={month} value={index}>{month}</option>
                  ))}
                </select>

                <select
                  value={currentDate.getFullYear()}
                  onChange={handleYearChange}
                  className="bg-white dark:bg-gray-700 border rounded p-1"
                >
                  {Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
                <div key={day} className="text-center font-semibold p-2">
                  {day}
                </div>
              ))}
              
              {getDaysInMonth(currentDate).map((date, index) => (
                <div
                  key={index}
                  className={`min-h-[100px] border p-1 relative ${
                    date 
                      ? 'bg-gray-50 dark:bg-gray-700' 
                      : 'bg-gray-100 dark:bg-gray-600'
                  } ${
                    date?.toDateString() === new Date().toDateString()
                      ? 'ring-2 ring-blue-500'
                      : ''
                  }`}
                >
                  {date && (
                    <>
                      <div className="text-right text-sm mb-1">
                    {date.getDate()}
                    </div>
                    <div className="space-y-1 max-h-[80px] overflow-y-auto">
                    {getEventsForDate(date).map(event => (
                        <div
                        key={event.id}
                        className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 ${
                            event.category === 'Musique'
                            ? 'bg-purple-100 dark:bg-purple-800'
                            : 'bg-green-100 dark:bg-green-800'
                        }`}
                        title={event.title}
                        >
                        <span className="whitespace-normal text-overflow-clip">{event.title}</span>
                        </div>
                    ))}
                    </div>

                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;