export function ImmersiveCard({ word, day, month }) {
    return (
        <div
            className="min-h-screen w-full flex items-center justify-center transition-colors duration-700 ease-out"
            style={{ backgroundColor: word.themeColor }}
        >
            {/* Main Container */}
            <div className="relative w-full h-screen flex items-center px-6 md:px-16 lg:px-24 overflow-hidden">

                {/* Date Display - Top Right */}
                <div className="absolute top-8 right-8 md:top-12 md:right-12 text-right z-10">
                    <div className="text-white/40 text-sm font-serif tracking-widest mb-1">
                        {month}月
                    </div>
                    <div className="text-white text-6xl md:text-7xl font-serif font-light">
                        {day}
                    </div>
                    <div className="text-white/40 text-xs tracking-widest mt-2">
                        日
                    </div>
                </div>

                {/* Category Badge - Top Left */}
                <div className="absolute top-8 left-8 md:top-12 md:left-12 z-10">
                    <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/70 text-xs font-serif tracking-widest border border-white/10">
                        {word.category}
                    </span>
                    <div className="mt-3 text-white/30 text-xs tracking-wider">
                        {word.type}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center gap-6 lg:gap-20 w-full mx-auto">

                    {/* Left: Massive Vertical Hanzi */}
                    <div className="flex items-end gap-4 lg:gap-6">
                        {/* Main Hanzi - MASSIVE Vertical */}
                        <h1
                            className="text-white font-serif font-semibold leading-[0.85] select-none"
                            style={{
                                writingMode: 'vertical-rl',
                                textOrientation: 'upright',
                                fontSize: 'clamp(8rem, 25vw, 20rem)',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            {word.hanzi}
                        </h1>

                        {/* Tailo + Mic Icon - Vertical alongside */}
                        <div className="flex flex-col items-center gap-4">
                            <div
                                className="text-white/50 text-base md:text-lg font-serif tracking-wider"
                                style={{
                                    writingMode: 'vertical-rl',
                                }}
                            >
                                {word.tailo}
                            </div>

                            {/* Microphone Icon */}
                            <button
                                className="p-2 text-white/40 hover:text-white/70 transition-colors duration-300"
                                aria-label="播放發音"
                            >
                                <svg
                                    width="20"
                                    height="20"
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

                    {/* Right: Meaning and Sentence */}
                    <div className="flex flex-col items-center lg:items-start gap-6 lg:gap-10 max-w-sm lg:max-w-md">
                        {/* Meaning */}
                        <p className="text-white/80 text-lg md:text-xl font-serif leading-relaxed text-center lg:text-left">
                            {word.meaning}
                        </p>

                        {/* Divider */}
                        <div className="w-12 h-px bg-white/20" />

                        {/* Sentence with CSS Corner Quotes */}
                        <div className="relative px-6 py-4">
                            {/* Top-left corner */}
                            <span
                                className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/30"
                                aria-hidden="true"
                            />
                            {/* Top-right corner */}
                            <span
                                className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/30"
                                aria-hidden="true"
                            />
                            {/* Bottom-left corner */}
                            <span
                                className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/30"
                                aria-hidden="true"
                            />
                            {/* Bottom-right corner */}
                            <span
                                className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/30"
                                aria-hidden="true"
                            />

                            <p className="text-white/70 text-base md:text-lg font-serif font-bold leading-relaxed text-center lg:text-left">
                                {word.sentence}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white/30 text-xs font-serif tracking-widest">
                    台語疊字聲韻
                </div>
            </div>
        </div>
    );
}
