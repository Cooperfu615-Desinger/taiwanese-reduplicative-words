import { WordCard } from './WordCard';

export function WordList({ words }) {
    if (words.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-zen-muted text-lg">找不到符合的詞彙 😔</p>
                <p className="text-zen-muted/60 text-sm mt-2">請試試其他搜尋關鍵字</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 pb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {words.map((word) => (
                    <WordCard key={word.id} word={word} />
                ))}
            </div>
        </div>
    );
}
