export function CentralCard({ word, onShuffle, onShare }) {
    return (
        <div
            className="w-full max-w-[360px] rounded-3xl p-6 flex flex-col backdrop-blur-md"
            style={{
                backgroundColor: `${word.themeColor}80`,
            }}
        >
            {/* Header Row - Type & Category */}
            <div className="flex justify-between items-start mb-6">
                <div className="text-white/80 text-sm">
                    <span className="text-white/50 text-xs">形式</span>{' '}
                    <span className="font-medium">{word.type}</span>
                </div>
                <div className="text-white/80 text-sm text-right">
                    <span className="text-white/50 text-xs">類別</span>{' '}
                    <span className="font-medium">{word.category}</span>
                </div>
            </div>

            {/* Main Content Area - Vertical Text */}
            <div className="flex items-start justify-center gap-4 py-8 min-h-[320px]">
                {/* Main Hanzi - Vertical */}
                <h1
                    className="text-white font-bold leading-[0.9] select-none"
                    style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'upright',
                        fontSize: 'clamp(4.5rem, 16vw, 6rem)',
                        letterSpacing: '-0.02em',
                    }}
                >
                    {word.hanzi}
                </h1>

                {/* Tailo - Vertical */}
                <span
                    className="text-white/70 text-sm font-medium tracking-wide whitespace-nowrap"
                    style={{
                        writingMode: 'vertical-rl',
                    }}
                >
                    {word.tailo}
                </span>

                {/* Meaning - Vertical with prefix */}
                <span
                    className="text-white/60 text-sm font-medium leading-relaxed"
                    style={{
                        writingMode: 'vertical-rl',
                    }}
                >
                    釋義・{word.meaning}
                </span>
            </div>

            {/* Sentence Section */}
            <div className="border-t border-white/20 pt-4 mt-2">
                <div className="flex items-center justify-between gap-3">
                    <p className="text-white/80 text-sm font-medium leading-relaxed flex-1">
                        「{word.sentence}」
                    </p>
                    {/* Mic Icon */}
                    <button className="p-2 text-white/50 hover:text-white/80 transition-colors shrink-0">
                        <svg
                            className="w-5 h-5"
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
                </div>
            </div>

            {/* Action Bar - Two Buttons */}
            <div className="flex gap-3 mt-6">
                {/* Share Button */}
                <button
                    onClick={onShare}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/20 hover:bg-white/30 border border-white/20 rounded-full text-white/90 text-sm font-medium transition-all duration-200"
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
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/20 hover:bg-white/30 border border-white/20 rounded-full text-white/90 text-sm font-medium transition-all duration-200"
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
    );
}
