export function ShuffleButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-8 right-8 z-50 group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            aria-label="換一張"
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
            <span className="font-serif text-sm tracking-wider">換一張</span>
        </button>
    );
}
