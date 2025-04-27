import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Confetti from 'react-confetti';
import { Heart } from 'lucide-react';

interface GiftBoxProps {
  onOpen: () => void;
}

const GiftBox = ({ onOpen }: GiftBoxProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const pulse = useSpring({
    from: { scale: 1 },
    to: { scale: isHovering ? 1.05 : 1 },
    config: { tension: 300, friction: 10 },
  });
  
  const handleOpenClick = () => {
    setShowConfetti(true);
    onOpen();
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-16">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      <div className="text-center mb-8">
        <h2 className="font-dancing text-3xl md:text-4xl text-pink-700 mb-2">A Special Gift for You</h2>
        <p className="text-lg text-rose-600">
          Open this gift to see how much I love you! <Heart className="inline" size={16} fill="#e11d48" />
        </p>
      </div>
      
      <animated.div 
        style={pulse}
        className="relative cursor-pointer transition-all"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleOpenClick}
      >
        <div className="w-64 h-64 md:w-72 md:h-72 relative">
          <div className="absolute inset-0 gift-box-wrapper">
            <div className="gift-box">
              <div className="gift-box-lid">
                <div className="gift-box-bow"></div>
              </div>
              <div className="gift-box-body"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-pink-700 text-lg animate-bounce">
            Click to Open <Heart className="inline" size={16} fill="#be185d" />
          </p>
        </div>
      </animated.div>
    </div>
  );
};

export default GiftBox;