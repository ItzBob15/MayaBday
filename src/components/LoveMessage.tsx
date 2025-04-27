import { useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Heart } from 'lucide-react';

interface LoveMessageProps {
  showMessage: boolean;
  currentStep: number;
  nextStep: () => void;
}

const LoveMessage = ({ showMessage, currentStep, nextStep }: LoveMessageProps) => {
  const fadeIn = useSpring({
    opacity: showMessage ? 1 : 0,
    transform: showMessage ? 'translateY(0px)' : 'translateY(50px)',
    config: { tension: 100, friction: 20 },
  });
  
  const messages = [
    {
      title: "Happy Birthday, Maya!",
      message: "Today is all about celebrating the most amazing person I know (YOU)"
    },
    {
      title: "You're My Everything",
      message: "From the moment we met, I knew you were special. Your laugh, your kind heart, actually, everything about you is perfect to me."
    },
    {
      title: "Our Journey Together",
      message: "Every moment with you has been a blessing. You've filled my life with joy, laughter, and so much love."
    },
    {
      title: "What I Love About You",
      message: "Your kindness, your strength, your passion, creativity, empathy, sa totoo lang, there are countless things I adore about you. You inspire me to be better every day."
    },
    {
      title: "My Wish For You",
      message: "On your special day, I wish you all the happiness in the world. May this year bring you joy, success, and everything your heart desires."
    },
    {
      title: "Forever & Always",
      message: "No matter what life throws our way, I'll always be by your side. My heart is yours, today and always. I love you more than words can express, Casey."
    }
  ];
  
  useEffect(() => {
    if (showMessage) {
      document.addEventListener('click', nextStep);
      return () => {
        document.removeEventListener('click', nextStep);
      };
    }
  }, [showMessage, nextStep]);
  
  return (
    <animated.div style={fadeIn} className="w-full">
      <div className="backdrop-blur-sm bg-white/40 rounded-xl shadow-lg p-6 md:p-8 transition-all">
        <div className="flex flex-col items-center">
          <div className="mb-4 flex items-center">
            <Heart className="text-pink-600 mr-2" size={24} fill="#db2777" />
            <h2 className="font-dancing text-3xl text-rose-700">
              {messages[currentStep]?.title}
            </h2>
            <Heart className="text-pink-600 ml-2" size={24} fill="#db2777" />
          </div>
          
          <p className="text-lg text-center text-pink-900 leading-relaxed mb-6">
            {messages[currentStep]?.message}
          </p>
          
          <div className="flex space-x-1 my-4">
            {messages.map((_, index) => (
              <div 
                key={index}
                className={`h-2 w-8 rounded-full ${
                  index === currentStep
                    ? 'bg-pink-600'
                    : index < currentStep
                    ? 'bg-pink-400'
                    : 'bg-pink-200'
                }`}
              />
            ))}
          </div>
          
          {currentStep < messages.length - 1 && (
            <p className="text-sm text-pink-600 mt-4 animate-pulse">
              Tap to continue...
            </p>
          )}
        </div>
      </div>
    </animated.div>
  );
};

export default LoveMessage;