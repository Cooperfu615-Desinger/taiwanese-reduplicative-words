/**
 * CentralCard - 高質感通透版本 + 動態光點粒子
 * 1. 固定卡片尺寸確保視覺穩定
 * 2. 降低背景透明度讓流動光影透出
 * 3. 動態光點粒子增加氛圍感
 * 4. 主題色陰影產生發光效果
 */
import './CentralCard.css';

export function CentralCard({ word, onShuffle, onShare }) {
    // 根據字數調整字間距，確保視覺重心一致
    const charCount = [...word.hanzi].length;
    const letterSpacing = charCount === 3 ? '0.15em' : '0.05em';

    // 文字陰影樣式（增強可讀性）
    const textShadow = '0 2px 4px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.2)';
    const textShadowStrong = '0 3px 10px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.3)';

    // 從 themeColor 提取 RGB 用於陰影
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    };

    const rgb = hexToRgb(word.themeColor);
    const themeColorShadow = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`;

    return (
        <div
            className="
                relative
                rounded-3xl
                overflow-hidden
            "
            style={{
                width: '350px',
                height: '620px',
                backgroundColor: `${word.themeColor}CC`, // 80% 透明度
                backgroundBlendMode: 'overlay',
                boxShadow: `0 20px 50px ${themeColorShadow}, 0 10px 30px rgba(0,0,0,0.2)`,
            }}
        >
            {/* 動態光點粒子層 - 20顆 */}
            <div className="absolute inset-0 overflow-hidden">
                {/* 大型粒子 70px */}
                <div className="particle particle-1" />
                <div className="particle particle-2" />
                <div className="particle particle-3" />
                <div className="particle particle-4" />
                {/* 中型粒子 50px */}
                <div className="particle particle-5" />
                <div className="particle particle-6" />
                <div className="particle particle-7" />
                <div className="particle particle-8" />
                {/* 小型粒子 30px */}
                <div className="particle particle-9" />
                <div className="particle particle-10" />
                <div className="particle particle-11" />
                <div className="particle particle-12" />
                {/* 微型粒子 20px */}
                <div className="particle particle-13" />
                <div className="particle particle-14" />
                <div className="particle particle-15" />
                <div className="particle particle-16" />
                {/* 極小粒子 10px */}
                <div className="particle particle-17" />
                <div className="particle particle-18" />
                <div className="particle particle-19" />
                <div className="particle particle-20" />
            </div>

            {/* 內層微遮罩 - 模糊粒子增加朦朧感 */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.03) 100%)',
                    backdropFilter: 'blur(2px)',
                }}
            />

            {/* 內容容器 */}
            <div className="relative z-10 h-full p-6 flex flex-col">
                {/* Header Row - Type & Category (固定在頂部) */}
                <div className="flex justify-between items-start shrink-0">
                    <div className="text-white/90 text-sm" style={{ textShadow }}>
                        <span className="text-white/60 text-xs">形式</span>{' '}
                        <span className="font-medium">{word.type}</span>
                    </div>
                    <div className="text-white/90 text-sm text-right" style={{ textShadow }}>
                        <span className="text-white/60 text-xs">類別</span>{' '}
                        <span className="font-medium">{word.category || '—'}</span>
                    </div>
                </div>

                {/* Main Content Area - 漢字台羅左偏20px */}
                <div className="flex-1 flex items-start justify-center gap-2 py-6" style={{ marginLeft: '-20px' }}>
                    {/* 漢字 + 台羅 組 */}
                    <div className="flex flex-col items-center" style={{ height: '400px' }}>
                        {/* 漢字 + 台羅 橫向排列 */}
                        <div className="flex items-start gap-1 flex-1">
                            {/* Main Hanzi - Vertical */}
                            <h1
                                className="text-white font-semibold leading-[0.85] select-none"
                                style={{
                                    writingMode: 'vertical-rl',
                                    textOrientation: 'upright',
                                    fontSize: '90px',
                                    letterSpacing: letterSpacing,
                                    textShadow: textShadowStrong,
                                }}
                            >
                                {word.hanzi}
                            </h1>

                            {/* Tailo - Vertical (緊跟漢字) */}
                            <span
                                className="text-white/80 font-medium tracking-wide whitespace-nowrap"
                                style={{
                                    writingMode: 'vertical-rl',
                                    fontSize: '15px',
                                    textShadow,
                                }}
                            >
                                {word.tailo}
                            </span>
                        </div>
                    </div>

                    {/* 間隔 */}
                    <div className="w-4" />

                    {/* 釋義 - 獨立一組（粗體 + 增強陰影） */}
                    <div className="flex items-start" style={{ height: '400px' }}>
                        <span
                            className="text-white/85 font-bold leading-relaxed"
                            style={{
                                writingMode: 'vertical-rl',
                                fontSize: '18px',
                                maxHeight: '400px',
                                overflow: 'hidden',
                                textShadow: textShadowStrong,
                            }}
                        >
                            釋義・{word.meaning}
                        </span>
                    </div>
                </div>

                {/* Sentence Section + 播放按鈕 - 固定高度確保按鈕位置一致 */}
                <div className="shrink-0 mb-2 flex items-center gap-3" style={{ minHeight: '48px' }}>
                    <p
                        className="flex-1 text-white/90 text-sm font-medium leading-relaxed"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textShadow,
                        }}
                    >
                        「{word.sentence}」
                    </p>

                    {/* 播放按鈕區域 - 固定寬度 */}
                    <div className="shrink-0 w-12 h-12 flex items-center justify-center">
                        {word.audioPath && (
                            <button
                                onClick={() => {
                                    const audioUrl = import.meta.env.BASE_URL + word.audioPath.replace(/^\//, '');
                                    const audio = new Audio(audioUrl);
                                    audio.play().catch(err => console.log('Audio play error:', err));
                                }}
                                className="shrink-0 p-2 text-white/70 hover:text-white transition-colors"
                                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                                aria-label="播放發音"
                            >
                                <svg
                                    className="w-8 h-8"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                    <line x1="12" x2="12" y1="19" y2="22" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Separator Line */}
                <div className="shrink-0 w-full h-px bg-white/30 mb-4" />

                {/* Action Bar - 固定在最底部 */}
                <div className="shrink-0 flex gap-3">
                    {/* Share Button */}
                    <button
                        onClick={onShare}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/25 hover:bg-white/35 border border-white/30 rounded-full text-white text-sm font-medium transition-all duration-200"
                        style={{ textShadow }}
                    >
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                            <polyline points="16,6 12,2 8,6" />
                            <line x1="12" x2="12" y1="2" y2="15" />
                        </svg>
                        推廣台語
                    </button>

                    {/* Shuffle Button */}
                    <button
                        onClick={onShuffle}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/25 hover:bg-white/35 border border-white/30 rounded-full text-white text-sm font-medium transition-all duration-200"
                        style={{ textShadow }}
                    >
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 2v6h-6" />
                            <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                            <path d="M3 22v-6h6" />
                            <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                        </svg>
                        換一句
                    </button>
                </div>
            </div>
        </div>
    );
}
