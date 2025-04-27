import { useState, useEffect, useCallback } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeartCatcherProps {
  onComplete: () => void;
}

const HeartCatcher = ({ onComplete }: HeartCatcherProps) => {
  const [position, setPosition] = useState({ x: 50, y: 0 });
  const [score, setScore] = useState(0);
  const [basketPosition, setBasketPosition] = useState(50);
  const [gameStarted, setGameStarted] = useState(false);
  const targetScore = 10;

  const moveBasket = useCallback((e: MouseEvent) => {
    const container = document.getElementById('game-container');
    if (container) {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      setBasketPosition(Math.max(0, Math.min(100, x)));
    }
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    const container = document.getElementById('game-container');
    if (container) {
      container.addEventListener('mousemove', moveBasket);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', moveBasket);
      }
    };
  }, [gameStarted, moveBasket]);

  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      setPosition(prev => ({
        x: Math.random() * 100,
        y: prev.y + 2
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    if (position.y >= 90) {
      if (Math.abs(position.x - basketPosition) < 10) {
        setScore(prev => {
          const newScore = prev + 1;
          if (newScore >= targetScore) {
            onComplete();
          }
          return newScore;
        });
      }
      setPosition({ x: Math.random() * 100, y: 0 });
    }
  }, [position, basketPosition, onComplete]);

  if (!gameStarted) {
    return (
      <div className="text-center p-8">
        <h3 className="text-2xl font-dancing text-pink-700 mb-4">Heart Catcher</h3>
        <p className="text-pink-600 mb-4">Catch {targetScore} hearts to unlock a special surprise!</p>
        <button
          onClick={() => setGameStarted(true)}
          className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all"
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div 
      id="game-container"
      className="relative w-full h-[400px] bg-gradient-to-b from-pink-100 to-pink-200 rounded-xl overflow-hidden"
    >
      <div className="absolute top-4 left-4 bg-white/80 rounded-full px-4 py-2">
        Score: {score}/{targetScore}
      </div>

      <motion.div
        className="absolute"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
        }}
      >
        <Heart className="text-pink-500" fill="#ec4899" size={24} />
      </motion.div>

      <motion.div
        className="absolute bottom-0"
        style={{
          left: `${basketPosition}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
          <Heart className="text-pink-600" size={32} />
        </div>
      </motion.div>
    </div>
  );
};

export default HeartCatcher;