import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface SnakeGameProps {
  onComplete: () => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 200;
const TARGET_SCORE = 5;

const SnakeGame = ({ onComplete }: SnakeGameProps) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    setFood(newFood);
  }, []);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        setDirection(prev => prev !== 'DOWN' ? 'UP' : prev);
        break;
      case 'ArrowDown':
        setDirection(prev => prev !== 'UP' ? 'DOWN' : prev);
        break;
      case 'ArrowLeft':
        setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev);
        break;
      case 'ArrowRight':
        setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev);
        break;
    }
  }, []);

  useEffect(() => {
    if (!gameStarted) return;
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, handleKeyPress]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        switch (direction) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        // Check collision with walls
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Check collision with food
        if (head.x === food.x && head.y === food.y) {
          generateFood();
          setScore(prev => {
            const newScore = prev + 1;
            if (newScore >= TARGET_SCORE) {
              onComplete();
            }
            return newScore;
          });
          newSnake.unshift(head);
          return newSnake;
        }

        newSnake.unshift(head);
        newSnake.pop();
        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(gameInterval);
  }, [direction, food, gameStarted, gameOver, generateFood, onComplete]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const endX = touch.clientX;
      const endY = touch.clientY;

      const diffX = endX - startX;
      const diffY = endY - startY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        setDirection(diffX > 0 ? 'RIGHT' : 'LEFT');
      } else {
        setDirection(diffY > 0 ? 'DOWN' : 'UP');
      }
    };

    document.addEventListener('touchend', handleTouchEnd, { once: true });
  };

  if (!gameStarted) {
    return (
      <div className="text-center p-8">
        <h3 className="text-2xl font-dancing text-pink-700 mb-4">Snake Game</h3>
        <p className="text-pink-600 mb-4">Score {TARGET_SCORE} points to unlock the next surprise!</p>
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
      className="relative max-w-md mx-auto"
      onTouchStart={handleTouchStart}
    >
      <div className="absolute top-4 left-4 bg-white/80 rounded-full px-4 py-2">
        Score: {score}/{TARGET_SCORE}
      </div>
      
      <div 
        className="relative bg-pink-100 rounded-xl overflow-hidden"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE
        }}
      >
        {snake.map((segment, index) => (
          <motion.div
            key={index}
            className="absolute bg-pink-500"
            style={{
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              borderRadius: index === 0 ? '50%' : '2px'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
        ))}
        
        <motion.div
          className="absolute"
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Heart className="text-pink-600" fill="#db2777" size={16} />
        </motion.div>
      </div>

      {gameOver && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center bg-white p-6 rounded-xl">
            <p className="text-xl text-pink-700 mb-4">Game Over!</p>
            <button
              onClick={() => {
                setSnake([{ x: 10, y: 10 }]);
                setDirection('RIGHT');
                setGameOver(false);
                setScore(0);
              }}
              className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;