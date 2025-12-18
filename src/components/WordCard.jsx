import { PlayButton } from './PlayButton';

const typeColors = {
    ABB: 'bg-amber-50 border-amber-200',
    AAB: 'bg-emerald-50 border-emerald-200',
    AABB: 'bg-violet-50 border-violet-200',
};

const typeBadgeColors = {
    ABB: 'bg-amber-100 text-amber-700',
    AAB: 'bg-emerald-100 text-emerald-700',
    AABB: 'bg-violet-100 text-violet-700',
};

export function WordCard({ word }) {
    const handlePlay = () => {
        // TODO: Implement audio playback
        console.log(`Play audio for: ${word.hanzi}`);
    };

    return (
        <div
            className={`group relative p-6 rounded-2xl border ${typeColors[word.type] || 'bg-white border-gray-200'} shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
        >
            {/* Type Badge */}
            <span
                className={`absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded-full ${typeBadgeColors[word.type] || 'bg-gray-100 text-gray-600'}`}
            >
                {word.type}
            </span>

            {/* Hanzi */}
            <h2 className="font-serif text-3xl text-zen-ink font-medium mb-2">
                {word.hanzi}
            </h2>

            {/* Tailo */}
            <p className="text-zen-accent font-medium text-lg mb-4 tracking-wide">
                {word.tailo}
            </p>

            {/* Divider */}
            <div className="w-12 h-px bg-gray-200 mb-4" />

            {/* Meaning */}
            <p className="text-zen-muted text-sm leading-relaxed mb-4">
                {word.meaning}
            </p>

            {/* Play Button */}
            <div className="flex justify-center">
                <PlayButton onClick={handlePlay} />
            </div>
        </div>
    );
}
