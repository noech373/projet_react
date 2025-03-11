import React from 'react';

interface CalendarHeaderProps {
  currentDate: Date;
  selectedCategory: 'Musique' | 'Sport';
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onMonthChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onYearChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onCategoryToggle: () => void;
}

const months = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  selectedCategory,
  onPreviousMonth,
  onNextMonth,
  onMonthChange,
  onYearChange,
  onCategoryToggle
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Calendrier des {selectedCategory === 'Musique' ? 'Concerts' : 'Événements Sportifs'}
        </h1>
        <button
          onClick={onCategoryToggle}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            selectedCategory === 'Musique'
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}
        >
          Basculer vers {selectedCategory === 'Musique' ? 'Sport' : 'Concerts'}
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPreviousMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          ←
        </button>
        
        <div className="flex gap-2">
          <select
            value={currentDate.getMonth()}
            onChange={onMonthChange}
            className="bg-white dark:bg-gray-700 border rounded p-1"
          >
            {months.map((month, index) => (
              <option key={month} value={index}>{month}</option>
            ))}
          </select>

          <select
            value={currentDate.getFullYear()}
            onChange={onYearChange}
            className="bg-white dark:bg-gray-700 border rounded p-1"
          >
            {Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <button
          onClick={onNextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          →
        </button>
      </div>
    </>
  );
};

export default CalendarHeader;