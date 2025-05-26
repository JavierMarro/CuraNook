import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchHarvardArtworks } from "@/api/HarvardMuseumAPI";
import { CardHarvard } from "./CardHarvard";
import type {
  HarvardListSummary,
  ValidSortByHarvard,
} from "@/types/HarvardMuseumsInterfaces";
import { Pagination } from "./Pagination";
import { Loading } from "@/ui/Loading";
import { Error } from "@/ui/Error";
import type { ValidOrder } from "@/types/AIChicagoInterfaces";

export function ItemsListHarvard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<ValidSortByHarvard>("rank");
  const [order, setOrder] = useState<ValidOrder>("asc");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["HarvardArtworksData", currentPage, sortBy, order],
    queryFn: () => fetchHarvardArtworks(currentPage, 15, sortBy, order),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 15,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, order]);

  if (isLoading) return <Loading />;
  if (isError) {
    console.error("Harvard API Error:", error);
    return <Error />;
  }

  // Due to having a fixed filter of hasimage=1 in API's function, the block below is necessary for mapping artwork and checking that there's no data. If this is not implemented a console error will block /browse
  if (!data || !data.artworks || data.artworks.length === 0) {
    return (
      <>
        <h2 className="error-title">Harvard Art Museums Collection</h2>
        <p className="error-fallback">
          No artworks found. Please try different filters.
        </p>
        <Error />
      </>
    );
  }

  return (
    <div className="museum-container">
      <h2 className="museum-title">Harvard Art Museums Collection</h2>
      <div className="museum-controls">
        <div className="control-group">
          <label htmlFor="sort-by" className="control-label">
            Sort by:
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as ValidSortByHarvard)}
            className="control-select"
          >
            <option value="rank">Popularity</option>
            <option value="accessionyear">Accession Year</option>
            <option value="lastupdate">Recently Updated</option>
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
      <div className="artworks-grid-harvard">
        {data.artworks.map((artwork: HarvardListSummary) => (
          <CardHarvard key={artwork.objectid} artwork={artwork} />
        ))}
      </div>
      <div className="pagination-container">
        <div className="pagination-wrapper">
          <Pagination
            currentPage={currentPage}
            totalPages={data.info.pages}
            onPrev={() => setCurrentPage((page) => Math.max(1, page - 1))}
            onNext={() => setCurrentPage((page) => page + 1)}
            hasNext={!!data.info.next}
          />
        </div>
      </div>
    </div>
  );
}
