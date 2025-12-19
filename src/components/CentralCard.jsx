/**
 * CentralCard - 高質感通透版本
 * 1. 固定卡片尺寸確保視覺穩定
 * 2. 降低背景透明度讓流動光影透出
 * 3. 混合模式增加層次感
 * 4. 主題色陰影產生發光效果
 */
export function CentralCard({ word, onShuffle, onShare }) {
    // 根據字數調整字間距，確保視覺重心一致
    const charCount = [...word.hanzi].length;
    const letterSpacing = charCount === 3 ? '0.15em' : '0.05em';

    // 文字陰影樣式
    const textShadow = '0 2px 4px rgba(0,0,0,0.3)';
    const textShadowStrong = '0 2px 8px rgba(0,0,0,0.5)';

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
                w-full max-w-[360px] 
                min-h-[580px] max-h-[85vh]
                aspect-[9/16]
                rounded-3xl
                overflow-hidden
                backdrop-blur-md
            "
            style={{
                backgroundColor: `${word.themeColor}CC`, // 80% 透明度
                backgroundBlendMode: 'overlay',
                boxShadow: `0 20px 50px ${themeColorShadow}, 0 10px 30px rgba(0,0,0,0.2)`,
            }}
        >
            {/* 內層微遮罩 - 輕微增強對比但保持通透 */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.05) 100%)',
                    backdropFilter: 'blur(1px)',
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

                {/* Main Content Area - 所有元素置頂對齊 */}
                <div className="flex-1 flex items-start justify-center gap-2 py-6">
                    {/* 漢字 + 台羅 組（靠近） */}
                    <div className="flex items-start gap-1" style={{ height: '320px' }}>
                        {/* Main Hanzi - Vertical */}
                        <h1
                            className="text-white font-semibold leading-[0.9] select-none"
                            style={{
                                writingMode: 'vertical-rl',
                                textOrientation: 'upright',
                                fontSize: 'clamp(4rem, 14vw, 5.5rem)',
                                letterSpacing: letterSpacing,
                                textShadow: textShadowStrong,
                            }}
                        >
                            {word.hanzi}
                        </h1>

                        {/* Tailo - Vertical (緊跟漢字) */}
                        <span
                            className="text-white/80 text-sm font-medium tracking-wide whitespace-nowrap"
                            style={{
                                writingMode: 'vertical-rl',
                                textShadow,
                            }}
                        >
                            {word.tailo}
                        </span>
                    </div>

                    {/* 間隔 */}
                    <div className="w-4" />

                    {/* 釋義 - 獨立一組（粗體） */}
                    <div className="flex items-start" style={{ height: '320px' }}>
                        <span
                            className="text-white/80 text-sm font-bold leading-relaxed"
                            style={{
                                writingMode: 'vertical-rl',
                                maxHeight: '320px',
                                overflow: 'hidden',
                                textShadow,
                            }}
                        >
                            釋義・{word.meaning}
                        </span>
                    </div>
                </div>

                {/* Sentence Section (固定在底部區域) */}
                <div className="shrink-0 border-t border-white/30 pt-4">
                    <div className="flex items-center justify-between gap-3">
                        <p
                            className="text-white/90 text-sm font-medium leading-relaxed flex-1"
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
                        {/* Mic Icon */}
                        <button className="p-2 text-white/60 hover:text-white/90 transition-colors shrink-0">
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
                            >
                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                <line x1="12" x2="12" y1="19" y2="22" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Action Bar - 固定在最底部 */}
                <div className="shrink-0 flex gap-3 mt-4">
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
