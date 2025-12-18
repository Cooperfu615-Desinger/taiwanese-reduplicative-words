import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { WordList } from './components/WordList';
import { useSearch } from './hooks/useSearch';
import wordsData from './data/data.json';

function App() {
  const { query, setQuery, filteredWords } = useSearch(wordsData.words);

  return (
    <div className="min-h-screen bg-zen-light font-serif">
      <Header />
      <SearchBar query={query} onQueryChange={setQuery} />
      <WordList words={filteredWords} />

      {/* Footer */}
      <footer className="text-center py-8 text-zen-muted/60 text-sm">
        <p>台語疊字聲韻 © 2024</p>
      </footer>
    </div>
  );
}

export default App;
