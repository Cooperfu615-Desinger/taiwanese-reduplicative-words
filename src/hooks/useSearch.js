import { useState, useMemo } from 'react';

export function useSearch(words) {
    const [query, setQuery] = useState('');

    const filteredWords = useMemo(() => {
        if (!query.trim()) return words;

        const lowerQuery = query.toLowerCase().trim();

        return words.filter(word =>
            word.hanzi.includes(query) ||
            word.tailo.toLowerCase().includes(lowerQuery) ||
            word.meaning.includes(query)
        );
    }, [words, query]);

    return { query, setQuery, filteredWords };
}
