import { useState, useCallback } from 'react';
import { CentralCard } from './components/CentralCard';
import { AmbientBackground } from './components/AmbientBackground';
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

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '台語疊字聲韻',
          text: `${currentWord.hanzi} (${currentWord.tailo}) - ${currentWord.meaning}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(
        `${currentWord.hanzi} (${currentWord.tailo}) - ${currentWord.meaning}\n${currentWord.sentence}`
      );
      alert('已複製到剪貼簿！');
    }
  }, [currentWord]);

  return (
    <>
      {/* Animated Mesh Gradient Background */}
      <AmbientBackground />

      {/* Main Content */}
      <div className="min-h-screen w-full font-sans relative flex flex-col items-center justify-center px-4 py-8">
        {/* Title at top center */}
        <h1 className="fixed top-6 left-0 right-0 text-center text-text text-lg font-semibold tracking-[0.3em]">
          台語疊字聲韻
        </h1>

        {/* Central Card */}
        <CentralCard
          word={currentWord}
          onShuffle={handleShuffle}
          onShare={handleShare}
        />

        {/* Footer at bottom */}
        <footer className="fixed bottom-4 left-0 right-0 text-center">
          <p className="text-black text-[10px] tracking-wider mb-1">
            資料來源：教育部臺灣台語常用詞辭典
          </p>
          <span className="text-gray-500 text-[10px] tracking-wider">
            CREATED BY VIBE QUIRK LABS
          </span>
        </footer>
      </div>
    </>
  );
}

export default App;
