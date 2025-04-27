import { useState } from 'react';
import { Heart, Music } from 'lucide-react';

interface HeaderProps {
  name: string;
  audioPlaying: boolean;
  toggleAudio: () => void;
}

const Header = ({ name, audioPlaying, toggleAudio }: HeaderProps) => {
  const birthdayDate = new Date("2025-05-03");
  const formattedDate = birthdayDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="relative z-20">
      <div className="backdrop-blur-sm bg-white/30 rounded-xl shadow-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="font-dancing text-3xl md:text-5xl text-pink-800 mb-4 md:mb-0 text-center md:text-left">
            Happy Birthday <span className="text-rose-600">{name}</span> <Heart className="inline" size={28} fill="#be185d" />
          </h1>
          
          <button 
            onClick={toggleAudio}
            className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-full shadow-md hover:bg-pink-700 transition-all"
          >
            <Music size={18} />
            <span>{audioPlaying ? 'Pause Music' : 'Play Music'}</span>
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <div className="inline-block px-6 py-3 bg-white/50 rounded-lg">
            <p className="text-xl md:text-2xl font-dancing text-pink-800">
              <Heart className="inline mr-2" size={20} fill="#be185d" />
              {formattedDate}
              <Heart className="inline ml-2" size={20} fill="#be185d" />
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;