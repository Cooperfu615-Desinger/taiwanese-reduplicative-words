import { useState, useCallback } from 'react';
import { CentralCard } from './components/CentralCard';
import { AmbientBackground } from './components/AmbientBackground';
import { LicensePage } from './components/LicensePage';
import wordsData from './data/data.json';

function App() {
  const [currentWord, setCurrentWord] = useState(() => {
    const randomIndex = Math.floor(Math.random() * wordsData.words.length);
    return wordsData.words[randomIndex];
  });

  // 頁面切換狀態
  const [showLicense, setShowLicense] = useState(false);

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

      {/* Main Content - 所有模式都隨頁面滾動 */}
      <div className="min-h-screen w-full font-sans relative flex flex-col items-center px-4 py-6">

        {/* 標題 - 非固定定位，隨頁面滾動 */}
        <h1 className="text-center text-text text-lg font-semibold tracking-[0.3em] pt-2 pb-4">
          台語疊字聲韻
        </h1>

        {/* 條件渲染：卡片模式 vs 版權頁面模式 */}
        {showLicense ? (
          // ===== 版權宣告頁面模式 =====
          <div className="w-full flex-1 animate-fadeIn">
            <LicensePage onClose={() => setShowLicense(false)} />
          </div>
        ) : (
          // ===== 卡片模式 =====
          <div className="flex-1 flex items-center justify-center animate-fadeIn">
            <CentralCard
              word={currentWord}
              onShuffle={handleShuffle}
              onShare={handleShare}
            />
          </div>
        )}

        {/* 底部 - 非固定定位，隨頁面滾動 */}
        <footer className="text-center pt-6 pb-2">
          {!showLicense && (
            <>
              <button
                onClick={() => setShowLicense(true)}
                className="text-black/80 text-xs tracking-wider mb-1 hover:text-black transition-colors cursor-pointer bg-transparent border-none underline-offset-2 hover:underline"
              >
                版權宣告頁
              </button>
              <br />
            </>
          )}
          <span className="text-gray-500 text-[10px] tracking-wider">
            CREATED BY VIBE QUIRK LABS
          </span>
        </footer>
      </div>

      {/* 全局動畫樣式 */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export default App;
