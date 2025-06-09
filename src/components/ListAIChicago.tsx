import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAIChicagoArtworks } from "@/api/AIChicagoAPI";
import { CardAIChicago } from "./CardAIChicago";
import type {
  ValidSortByChicago,
  ValidOrder,
  AIChicagoAPIResponse,
} from "@/types/AIChicagoInterfaces";
import { Pagination } from "./Pagination";
import { Loading } from "@/ui/Loading";
import { Error } from "@/ui/Error";
import { Search, X, Loader } from "lucide-react";

export function ItemsListAIChicago() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<ValidSortByChicago>("title");
  const [order, setOrder] = useState<ValidOrder>("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading, isError } = useQuery<AIChicagoAPIResponse>({
    queryKey: [
      "AIChicagoArtworksData",
      currentPage,
      sortBy,
      order,
      searchQuery,
    ],
    queryFn: () =>
      fetchAIChicagoArtworks(currentPage, 15, sortBy, order, searchQuery),
    placeholderData: (previousData) => previousData, // Keeps previous data visible while new data loads
    staleTime: 1000 * 60 * 5,
    // The above avoids fresh requests (5mins). It controls how long before it's considered stale.
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, order, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  if (isLoading) return <Loading />;
  if (isError || !data) return <Error />;

  return (
    <div className="museum-container">
      <h2 className="museum-title">Art Institute of Chicago Collection</h2>
      <div className="museum-controls">
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
                placeholder="Search by title or artist..."
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
        <div className="controls-row">
          <div className="control-group">
            <label htmlFor="sort-by" className="control-label">
              Sort by:
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as ValidSortByChicago)}
              className="control-select"
            >
              <option value="title">Title</option>
              <option value="is_public_domain">Public Domain Status</option>
            </select>
          </div>
          <div className="control-group">
            <label htmlFor="sort-order" className="control-label">
              Order:
            </label>
            <select
              id="sort-order"
              value={order}
              onChange={(e) => setOrder(e.target.value as ValidOrder)}
              className="control-select"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
      <div className="artworks-grid">
        {data.artworks.map((artwork) => (
          <CardAIChicago
            key={artwork.id}
            artwork={{
              ...artwork,
              imageUrl: artwork.image_id
                ? `${data.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`
                : undefined,
            }}
          />
        ))}
      </div>
      <div className="pagination-container">
        <div className="pagination-wrapper">
          <Pagination
            currentPage={currentPage}
            totalPages={data.pagination.total_pages}
            onPrev={() => setCurrentPage((page) => Math.max(1, page - 1))}
            onNext={() => setCurrentPage((page) => page + 1)}
            hasNext={
              data.pagination.next_url
                ? !!data.pagination.next_url
                : currentPage < data.pagination.total_pages
            }
          />
        </div>
      </div>
    </div>
  );
}
