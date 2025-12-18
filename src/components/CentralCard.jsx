export function CentralCard({ word }) {
    return (
        <div
            className="w-full max-w-[360px] h-[600px] rounded-3xl p-6 flex flex-col relative overflow-hidden"
            style={{ backgroundColor: word.themeColor }}
        >
            {/* Top Left - Category & Type Labels */}
            <div className="flex flex-col gap-1">
                <span className="text-white/70 text-sm font-medium tracking-wider">
                    {word.category}
                </span>
                <span className="text-white/50 text-xs tracking-wider">
                    {word.type}
                </span>
            </div>

            {/* Main Content Area - Top aligned with grouped elements */}
            <div className="flex-1 flex items-start justify-center gap-8 py-6">
                {/* Group 1: Hanzi + Tailo (closely spaced) */}
                <div className="flex items-start gap-2">
                    {/* Main Hanzi - Vertical */}
                    <h1
                        className="text-white font-bold leading-[0.9] select-none"
                        style={{
                            writingMode: 'vertical-rl',
                            textOrientation: 'upright',
                            fontSize: 'clamp(5rem, 18vw, 7rem)',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {word.hanzi}
                    </h1>

                    {/* Tailo + Mic - Vertical */}
                    <div className="flex flex-col items-center gap-2">
                        <span
                            className="text-white/60 text-sm font-medium tracking-wide whitespace-nowrap"
                            style={{
                                writingMode: 'vertical-rl',
                            }}
                        >
                            {word.tailo}
                        </span>
                        {/* Small Mic Icon */}
                        <svg
                            className="w-4 h-4 text-white/40"
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
                    </div>
                </div>

                {/* Group 2: Meaning - Independent, larger font */}
                <span
                    className="text-white/50 text-base font-medium leading-relaxed max-h-48"
                    style={{
                        writingMode: 'vertical-rl',
                    }}
                >
                    {word.meaning}
                </span>
            </div>

            {/* Bottom Section - Sentence */}
            <div className="mt-auto flex flex-col items-center gap-3 pt-4 border-t border-white/10">
                <p className="text-white/80 text-sm font-bold text-center leading-relaxed">
                    {word.sentence}
                </p>
                {/* Large Mic Icon */}
                <svg
                    className="w-6 h-6 text-white/40"
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
            </div>
        </div>
    );
}
