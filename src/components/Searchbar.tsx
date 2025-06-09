import { useState } from "react";
import { Search, X, Loader } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  placeholder = "Search by title or artist...",
  isLoading = false,
}: SearchBarProps) {
  const [searchInput, setSearchInput] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchInput);
  };

  const clearSearch = () => {
    setSearchInput("");
    onSearchChange("");
  };

  return (
    <div className="control-group search-group">
      <label htmlFor="search" className="control-label">
        Search:
      </label>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-container">
          <Search className="search-icon" size={16} />
          <input
            id="search"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={placeholder}
            className="search-input"
          />
          {isLoading && <Loader className="search-loader" size={16} />}
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="clear-button"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
