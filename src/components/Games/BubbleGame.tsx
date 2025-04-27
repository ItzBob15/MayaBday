import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface BubbleGameProps {
  onComplete: () => void;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

const BubbleGame = ({ onComplete }: BubbleGameProps) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const targetScore = 10;

  useEffect(() => {
    if (!gameStarted) return;

    const createBubble = () => {
      const newBubble: Bubble = {
        id: Date.now(),
        x: Math.random() * (window.innerWidth - 60),
        y: window.innerHeight,
        size: 30 + Math.random() * 30,
        speed: 1 + Math.random() * 2,
      };
      setBubbles(prev => [...prev, newBubble]);
    };

    const interval = setInterval(createBubble, 1000);
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrame);
    };
  }, [gameStarted]);

  const animate = () => {
    setBubbles(prev => 
      prev
        .map(bubble => ({
          ...bubble,
          y: bubble.y - bubble.speed,
        }))
        .filter(bubble => bubble.y + bubble.size > 0)
    );
    requestAnimationFrame(animate);
  };

  const handleBubblePop = (id: number) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== id));
    setScore(prev => {
      const newScore = prev + 1;
      if (newScore >= targetScore) {
        onComplete();
      }
      return newScore;
    });
  };

  if (!gameStarted) {
    return (
      <div className="text-center p-8">
        <h3 className="text-2xl font-dancing text-pink-700 mb-4">Bubble Pop</h3>
        <p className="text-pink-600 mb-4">Pop {targetScore} heart bubbles to unlock the next surprise!</p>
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
    <div className="relative h-[400px] w-full overflow-hidden bg-gradient-to-b from-pink-100 to-pink-200 rounded-xl">
      <div className="absolute top-4 left-4 bg-white/80 rounded-full px-4 py-2 z-10">
        Score: {score}/{targetScore}
      </div>

      <AnimatePresence>
        {bubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute cursor-pointer"
            style={{
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
            }}
            onClick={() => handleBubblePop(bubble.id)}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-pink-200 rounded-full opacity-50 animate-pulse" />
              <Heart
                className="absolute inset-0 m-auto text-pink-500"
                size={bubble.size * 0.6}
                fill="#ec4899"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BubbleGame;