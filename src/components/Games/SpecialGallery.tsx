import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const SpecialGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // You can replace these URLs with your own photos from the /public/photos directory
  const photos = [
    {
      url: '/photos/photo1.jpg', // Place your photos in public/photos/
      message: "From the day i met you, I knew you were special. Your smile lights up my world."
    },
    {
      url: '/photos/photo2.jpg',
      message: "Every moment with you is a treasure. Happy Birthday, Casey!"
    },
    {
      url: '/photos/photo3.jpg',
      message: "You make every day brighter just by being you. I'm so lucky to have you."
    },
    {
      url: '/photos/photo4.jpg',
      message: "Here's to many more years of love, laughter, and adventures together!"
    }
  ];

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleSwipe = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const startX = touch.clientX;

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const endX = touch.clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextPhoto();
        } else {
          prevPhoto();
        }
      }
    };

    document.addEventListener('touchend', handleTouchEnd, { once: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl overflow-hidden shadow-2xl"
    >
      <div 
        className="relative h-[300px] md:h-[500px]"
        onTouchStart={handleSwipe}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={photos[currentIndex].url}
              alt="Special moment"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <div className="absolute bottom-0 w-full p-4 md:p-8 text-center">
                <p className="text-white font-dancing text-xl md:text-2xl mb-4">
                  {photos[currentIndex].message}
                </p>
                <Heart className="inline-block text-pink-500 animate-pulse" fill="#ec4899" size={32} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevPhoto}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 p-2 rounded-full backdrop-blur-sm hover:bg-white/50 transition-all"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>

        <button
          onClick={nextPhoto}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 p-2 rounded-full backdrop-blur-sm hover:bg-white/50 transition-all"
        >
          <ChevronRight className="text-white" size={24} />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SpecialGallery;