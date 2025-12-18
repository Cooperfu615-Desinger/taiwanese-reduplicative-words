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
    <div
      className="min-h-screen w-full bg-cream font-sans relative flex flex-col items-center justify-center px-4 py-8"
      style={{
        backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.08) 5px, transparent 5px)`,
        backgroundSize: '10px 10px',
      }}
    >

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

      {/* Shuffle Button - Glassmorphic with Icon */}
      <button
        onClick={handleShuffle}
        className="mt-6 group flex items-center gap-3 px-6 py-3 bg-gray-500/10 backdrop-blur-md border border-gray-400/20 rounded-full text-gray-600 hover:bg-gray-500/20 hover:text-gray-700 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="換一句"
      >
        <svg
          className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <span className="text-sm font-medium tracking-wider">換一句</span>
      </button>
    </div>
  );
}

export default App;
