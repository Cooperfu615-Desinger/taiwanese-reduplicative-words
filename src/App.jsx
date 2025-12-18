import { useState, useCallback } from 'react';
import { CentralCard } from './components/CentralCard';
import wordsData from './data/data.json';

function App() {
  const [currentWord, setCurrentWord] = useState(() => {
    const randomIndex = Math.floor(Math.random() * wordsData.words.length);
    return wordsData.words[randomIndex];
  });

  const handleShuffle = useCallback(() => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * wordsData.words.length);
    } while (wordsData.words[newIndex].id === currentWord.id && wordsData.words.length > 1);
    setCurrentWord(wordsData.words[newIndex]);
  }, [currentWord.id]);

  // Get current date
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;

  return (
    <div className="min-h-screen w-full bg-cream font-sans relative flex flex-col items-center justify-center px-4 py-8">

      {/* Top Right - Date */}
      <div className="fixed top-6 right-6 md:top-10 md:right-10 text-right z-10">
        <div className="text-muted text-sm tracking-wider">
          {month}月
        </div>
        <div className="text-muted text-5xl md:text-6xl font-medium">
          {day}
        </div>
        <div className="text-muted text-xs tracking-wider">
          日
        </div>
      </div>

      {/* Bottom Left - Title */}
      <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-10">
        <span className="text-muted text-sm tracking-widest">
          台語疊字聲韻
        </span>
      </div>

      {/* Bottom Right - Copyright */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-10">
        <span className="text-muted/60 text-xs tracking-wider">
          CREATED BY VIBE QUIRK LABS
        </span>
      </div>

      {/* Central Card */}
      <CentralCard word={currentWord} />

      {/* Shuffle Button - Below Card */}
      <button
        onClick={handleShuffle}
        className="mt-6 px-8 py-3 bg-gray-200/80 hover:bg-gray-300/80 text-gray-600 rounded-full text-sm font-medium tracking-wider transition-colors duration-300"
      >
        換一句
      </button>
    </div>
  );
}

export default App;
