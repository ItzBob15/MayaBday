import { useState, useEffect } from 'react';
import { Heart, Star, Gift, Cake, Crown, BellRing as Ring, Music, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface MemoryGameProps {
  onComplete: () => void;
}

interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const icons = [
  { name: 'heart', component: <Heart size={24} fill="#ec4899" className="text-white" /> },
  { name: 'star', component: <Star size={24} fill="#fbbf24" className="text-white" /> },
  { name: 'gift', component: <Gift size={24} fill="#8b5cf6" className="text-white" /> },
  { name: 'cake', component: <Cake size={24} fill="#f472b6" className="text-white" /> },
  { name: 'crown', component: <Crown size={24} fill="#fcd34d" className="text-white" /> },
  { name: 'ring', component: <Ring size={24} fill="#f59e0b" className="text-white" /> },
  { name: 'music', component: <Music size={24} fill="#60a5fa" className="text-white" /> },
  { name: 'sparkles', component: <Sparkles size={24} fill="#a78bfa" className="text-white" /> },
];

const MemoryGame = ({ onComplete }: MemoryGameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState(false);

  const initializeCards = () => {
    const duplicatedIcons = [...icons, ...icons];
    const shuffledCards = duplicatedIcons
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon: icon.name,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setGameStarted(true);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (cards[id].isMatched) return;
    if (flippedCards.includes(id)) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      if (firstCard.icon === secondCard.icon) {
        const newCards = [...cards];
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);
        setMatchedPairs(prev => {
          const newPairs = prev + 1;
          if (newPairs === icons.length) {
            setTimeout(() => onComplete(), 500);
          }
          return newPairs;
        });
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[first].isFlipped = false;
          newCards[second].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, onComplete]);

  if (!gameStarted) {
    return (
      <div className="text-center p-8">
        <h3 className="text-2xl font-dancing text-pink-700 mb-4">Memory Match</h3>
        <p className="text-pink-600 mb-4">Match all pairs to unlock a special surprise!</p>
        <button
          onClick={initializeCards}
          className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all"
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={`aspect-square rounded-xl cursor-pointer ${
              card.isFlipped || card.isMatched
                ? 'bg-pink-500'
                : 'bg-pink-200'
            }`}
            onClick={() => handleCardClick(card.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full flex items-center justify-center">
              {(card.isFlipped || card.isMatched) && 
                icons.find(i => i.name === card.icon)?.component
              }
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-4 text-pink-600">
        Pairs matched: {matchedPairs}/{icons.length}
      </div>
    </div>
  );
};

export default MemoryGame;