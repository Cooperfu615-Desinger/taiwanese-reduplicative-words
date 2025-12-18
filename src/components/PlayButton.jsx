export function PlayButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-zen-accent/10 hover:bg-zen-accent/20 transition-all duration-300 hover:scale-110"
            aria-label="播放讀音"
        >
            <span className="text-zen-accent group-hover:scale-110 transition-transform duration-200">
                🔊
            </span>
        </button>
    );
}
