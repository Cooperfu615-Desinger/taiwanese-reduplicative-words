export function ImmersiveCard({ word, day, month }) {
    return (
        <div
            className="min-h-screen w-full flex items-center justify-center transition-colors duration-700 ease-out"
            style={{ backgroundColor: word.themeColor }}
        >
            {/* Main Container */}
            <div className="relative w-full h-screen flex items-center px-8 md:px-16 lg:px-24">

                {/* Date Display - Top Right */}
                <div className="absolute top-8 right-8 md:top-12 md:right-12 text-right">
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
                <div className="absolute top-8 left-8 md:top-12 md:left-12">
                    <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/70 text-xs font-serif tracking-widest border border-white/10">
                        {word.category}
                    </span>
                    <div className="mt-3 text-white/30 text-xs tracking-wider">
                        {word.type}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-16 w-full max-w-6xl mx-auto mt-16 lg:mt-0">

                    {/* Left: Vertical Hanzi */}
                    <div className="flex items-center gap-6">
                        {/* Main Hanzi - Vertical */}
                        <h1
                            className="text-white text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-serif font-medium leading-none tracking-wider"
                            style={{
                                writingMode: 'vertical-rl',
                                textOrientation: 'upright',
                                letterSpacing: '0.1em',
                            }}
                        >
                            {word.hanzi}
                        </h1>

                        {/* Tailo - Vertical alongside */}
                        <div
                            className="text-white/50 text-lg md:text-xl font-serif tracking-wider"
                            style={{
                                writingMode: 'vertical-rl',
                            }}
                        >
                            {word.tailo}
                        </div>
                    </div>

                    {/* Right: Meaning and Sentence */}
                    <div className="flex flex-col items-center lg:items-start gap-8 lg:gap-12 max-w-md lg:pt-12">
                        {/* Meaning */}
                        <p className="text-white/80 text-lg md:text-xl font-serif leading-relaxed text-center lg:text-left">
                            {word.meaning}
                        </p>

                        {/* Divider */}
                        <div className="w-16 h-px bg-white/20" />

                        {/* Sentence with quotes */}
                        <blockquote className="relative">
                            <span className="absolute -left-4 -top-4 text-white/20 text-5xl font-serif">
                                「
                            </span>
                            <p
                                className="text-white/60 text-base md:text-lg font-serif leading-loose pl-4 lg:pl-0"
                                style={{
                                    writingMode: window.innerWidth >= 1024 ? 'vertical-rl' : 'horizontal-tb',
                                }}
                            >
                                {word.sentence}
                            </p>
                            <span className="absolute -right-4 -bottom-4 text-white/20 text-5xl font-serif">
                                」
                            </span>
                        </blockquote>
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
