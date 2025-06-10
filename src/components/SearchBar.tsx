import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onClearSearch: () => void;
  placeholder?: string;
  hasActiveSearch: boolean;
}

export function SearchComponent({
  searchInput,
  onSearchInputChange,
  onSearch,
  onClearSearch,
  placeholder = "Search by title or artist...",
  hasActiveSearch,
}: SearchBarProps) {
  return (
    <div className="control-group search-group">
      <label htmlFor="search" className="control-label">
        Search:
      </label>
      <form onSubmit={onSearch} className="search-form">
        <div className="search-container">
          <Search className="search-icon" size={16} />
          <input
            id="search"
            type="text"
            value={searchInput}
            onChange={(e) => onSearchInputChange(e.target.value)}
            placeholder={placeholder}
            className="search-input"
          />
          {hasActiveSearch && (
            <button
              type="button"
              onClick={onClearSearch}
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
