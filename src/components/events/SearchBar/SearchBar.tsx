import { FC, ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Rechercher un événement..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
        🔍
      </span>
    </div>
  );
};
export default SearchBar;