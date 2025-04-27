import { useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const PhotoGallery = () => {
  const photos = [
    {
      url: 'https://images.pexels.com/photos/1024963/pexels-photo-1024963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Our first date'
    },
    {
      url: 'https://images.pexels.com/photos/3693042/pexels-photo-3693042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Summer getaway'
    },
    {
      url: 'https://images.pexels.com/photos/6211097/pexels-photo-6211097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'That perfect night'
    },
    {
      url: 'https://images.pexels.com/photos/7577834/pexels-photo-7577834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      caption: 'Always making memories'
    }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const transitions = useTransition(currentIndex, {
    from: { opacity: 0, transform: 'scale(0.9)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.9)' },
    config: { tension: 300, friction: 20 },
  });
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };
  
  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };
  
  return (
    <div className="w-full my-8">
      <h2 className="font-dancing text-3xl text-center text-pink-700 mb-6">
        Our Favorite Moments <Heart className="inline" size={20} fill="#be185d" />
      </h2>
      
      <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-xl">
        {transitions((style, index) => (
          <animated.div
            style={style}
            className="absolute inset-0 w-full h-full"
          >
            <div className="relative w-full h-full">
              <img
                src={photos[index].url}
                alt={photos[index].caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-4 text-white w-full text-center">
                  <p className="font-dancing text-2xl">{photos[index].caption}</p>
                </div>
              </div>
            </div>
          </animated.div>
        ))}
        
        <button
          onClick={goToPrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/50 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/50 transition-all"
        >
          <ChevronRight size={24} />
        </button>
        
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;