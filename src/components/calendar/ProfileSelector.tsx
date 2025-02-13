import { FC } from 'react';

interface ProfileSelectorProps {
  isOpen: boolean;
  onSelect: (category: 'Musique' | 'Sport') => void;
  onClose: () => void;
}

export const ProfileSelector: FC<ProfileSelectorProps> = ({ isOpen, onSelect, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Choisissez votre profil
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onSelect('Musique')}
            className="p-6 border-2 rounded-lg hover:border-blue-500 transition-colors flex flex-col items-center"
          >
            <span className="text-4xl mb-2">🎵</span>
            <span className="font-medium">Concert</span>
          </button>
          <button
            onClick={() => onSelect('Sport')}
            className="p-6 border-2 rounded-lg hover:border-blue-500 transition-colors flex flex-col items-center"
          >
            <span className="text-4xl mb-2">⚽</span>
            <span className="font-medium">Sport</span>
          </button>
        </div>
      </div>
    </div>
  );
};