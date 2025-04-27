import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import Header from './components/Header';
import GiftBox from './components/GiftBox';
import LoveMessage from './components/LoveMessage';
import PhotoGallery from './components/PhotoGallery';
import Footer from './components/Footer';
import FloatingElements from './components/FloatingElements';
import GameContainer from './components/Games/GameContainer';
import './styles/animations.css';

function App() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audio] = useState(new Audio('https://cdn-p.smehost.net/sites/2be3345b7fb34d598a28ec9437fe4cd8/wp-content/uploads/2023/08/Lil-Boo-Thang.mp3'));
  
  useEffect(() => {
    audio.loop = true;
    return () => {
      audio.pause();
    };
  }, [audio]);

  useEffect(() => {
    if (audioPlaying) {
      audio.play().catch(() => {
        setAudioPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [audioPlaying, audio]);

  const handleGiftOpen = () => {
    setIsGiftOpened(true);
    setTimeout(() => {
      setShowMessage(true);
    }, 1000);
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-pink-100 via-pink-200 to-rose-300">
      <FloatingElements />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Header 
          name="Maya" 
          audioPlaying={audioPlaying} 
          toggleAudio={() => setAudioPlaying(!audioPlaying)} 
        />
        
        <main className="flex flex-col items-center justify-center mt-8 md:mt-12">
          {!isGiftOpened ? (
            <GiftBox onOpen={handleGiftOpen} />
          ) : (
            <div className="w-full max-w-2xl mx-auto">
              <LoveMessage 
                showMessage={showMessage} 
                currentStep={currentStep} 
                nextStep={nextStep} 
              />
              
              {currentStep >= 4 && <GameContainer />}
              
              <div className="flex justify-center my-8">
                <button 
                  onClick={nextStep}
                  disabled={currentStep >= 5}
                  className={`flex items-center space-x-2 px-6 py-3 bg-pink-500 text-white rounded-full shadow-lg transform transition-all hover:scale-105 hover:bg-pink-600 ${currentStep >= 5 ? 'opacity-50 cursor-not-allowed' : 'animate-pulse'}`}
                >
                  <span>Next</span>
                  <Heart size={18} fill="white" />
                </button>
              </div>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;