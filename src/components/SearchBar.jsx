export function SearchBar({ query, onQueryChange }) {
    return (
        <div className="max-w-xl mx-auto px-4 mb-12">
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zen-muted text-xl">
                    🔍
                </span>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder="搜尋漢字或拼音..."
                    className="w-full pl-12 pr-4 py-4 text-lg bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-zen-accent/30 focus:border-zen-accent transition-all duration-300 placeholder:text-zen-muted/50"
                />
            </div>
        </div>
    );
}
