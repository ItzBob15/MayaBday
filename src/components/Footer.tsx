import { useState } from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  const [isWished, setIsWished] = useState(false);
  const [wishCount, setWishCount] = useState(0);
  
  const handleWishClick = () => {
    setIsWished(true);
    setWishCount(prev => prev + 1);
  };
  
  return (
    <footer className="mt-12 mb-6 text-center">
      <div className="backdrop-blur-sm bg-white/20 rounded-xl p-4 max-w-md mx-auto">
        <p className="text-lg text-pink-800 mb-4">
          Send a birthday wish with love ❤️
        </p>
        
        <button
          onClick={handleWishClick}
          className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full shadow-lg transition-all hover:scale-105 flex items-center mx-auto"
        >
          <span>Send Love</span>
          <Heart className="ml-2" size={18} fill="white" />
        </button>
        
        {isWished && (
          <div className="mt-4 animate-fadeIn">
            <p className="text-rose-600 font-dancing text-xl">
              {wishCount === 1 
                ? "You've sent your love!" 
                : `You've sent your love ${wishCount} times!`}
            </p>
            <p className="text-sm text-pink-700 mt-2">
              Every click sends more love her way
            </p>
          </div>
        )}
        
        <p className="mt-6 text-sm text-pink-900 font-dancing text-xl">
          Made with <Heart className="inline" size={16} fill="#be185d" /> for Maya
        </p>
      </div>
    </footer>
  );
};

export default Footer;