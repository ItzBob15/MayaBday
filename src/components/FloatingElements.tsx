import { useEffect, useState } from 'react';

interface FloatingItem {
  id: number;
  left: string;
  animationDuration: string;
  delay: string;
  size: string;
  type: 'heart' | 'petal';
  color: string;
}

const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingItem[]>([]);
  
  useEffect(() => {
    // Generate random floating elements (hearts and petals)
    const generateElements = () => {
      const newElements: FloatingItem[] = [];
      const elementCount = window.innerWidth < 768 ? 15 : 30;
      
      for (let i = 0; i < elementCount; i++) {
        const isHeart = Math.random() > 0.5;
        const size = `${8 + Math.random() * 16}px`;
        const heartColors = ['#f43f5e', '#e11d48', '#be185d', '#db2777', '#ec4899'];
        const petalColors = ['#f9a8d4', '#fbcfe8', '#fce7f3', '#fda4af', '#fecdd3'];
        
        newElements.push({
          id: i,
          left: `${Math.random() * 100}%`,
          animationDuration: `${10 + Math.random() * 20}s`,
          delay: `${Math.random() * 5}s`,
          size,
          type: isHeart ? 'heart' : 'petal',
          color: isHeart 
            ? heartColors[Math.floor(Math.random() * heartColors.length)]
            : petalColors[Math.floor(Math.random() * petalColors.length)]
        });
      }
      
      setElements(newElements);
    };
    
    generateElements();
    
    const handleResize = () => {
      generateElements();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute floating-element"
          style={{
            left: element.left,
            width: element.size,
            height: element.size,
            animationDuration: element.animationDuration,
            animationDelay: element.delay,
          }}
        >
          {element.type === 'heart' ? (
            <svg viewBox="0 0 24 24" fill={element.color}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill={element.color}>
              <path d="M12,2C9.17,2 6.7,3.59 5.27,6L1,6L1,8L5.27,8C6.7,10.41 9.17,12 12,12C14.83,12 17.3,10.41 18.73,8L23,8L23,6L18.73,6C17.3,3.59 14.83,2 12,2Z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;