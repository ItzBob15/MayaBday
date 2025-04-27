import { useState } from 'react';
import BubbleGame from './BubbleGame';
import MemoryGame from './MemoryGame';
import SpecialGallery from './SpecialGallery';

const GameContainer = () => {
  const [completedGames, setCompletedGames] = useState({
    bubbleGame: false,
    memoryGame: false
  });

  const handleGameComplete = (game: 'bubbleGame' | 'memoryGame') => {
    setCompletedGames(prev => ({
      ...prev,
      [game]: true
    }));
  };

  const allGamesCompleted = completedGames.bubbleGame && completedGames.memoryGame;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 px-4">
      {!completedGames.bubbleGame && (
        <BubbleGame onComplete={() => handleGameComplete('bubbleGame')} />
      )}
      
      {completedGames.bubbleGame && !completedGames.memoryGame && (
        <MemoryGame onComplete={() => handleGameComplete('memoryGame')} />
      )}
      
      {allGamesCompleted && <SpecialGallery />}
    </div>
  );
};

export default GameContainer;