import { useState, useCallback } from 'react';
import { ImmersiveCard } from './components/ImmersiveCard';
import { ShuffleButton } from './components/ShuffleButton';
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
    <div className="relative min-h-screen w-full overflow-hidden">
      <ImmersiveCard word={currentWord} day={day} month={month} />
      <ShuffleButton onClick={handleShuffle} />
    </div>
  );
}

export default App;
