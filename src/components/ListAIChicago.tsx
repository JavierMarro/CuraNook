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

export function ItemsListAIChicago() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<ValidSortByChicago>("title");
  const [order, setOrder] = useState<ValidOrder>("asc");

  const { data, isLoading, isError } = useQuery<AIChicagoAPIResponse>({
    queryKey: ["AIChicagoArtworksData", currentPage, sortBy, order],
    queryFn: () => fetchAIChicagoArtworks(currentPage, 15, sortBy, order),
    placeholderData: (previousData) => previousData, // Keeps previous data visible while new data loads
    staleTime: 1000 * 60 * 15, // From tutorial (https://www.youtube.com/watch?v=w9r55wd2CAk), this avoids fresh requests (15mins). It controls how long before it's considered stale.
    //If my understanding is correct, this is the TanStack alternative to useEffect
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, order]);

  if (isLoading) return <Loading />;
  if (isError || !data) return <Error />;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-5">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Art Institute of Chicago Collection
      </h2>
      <div className="flex gap-4 mb-4 justify-center">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="sort-by"
            className="text-sm font-medium text-gray-700"
          >
            Sort by:
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as ValidSortByChicago)}
            className="p-2 border rounded bg-white"
          >
            <option value="title">Title</option>
            <option value="artist_title">Artist</option>
            <option value="date_end">Date</option>
            <option value="place_of_origin">Place of Origin</option>
            <option value="is_public_domain">Public Domain Status</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="sort-order"
            className="text-sm font-medium text-gray-700"
          >
            Order:
          </label>
          <select
            id="sort-order"
            value={order}
            onChange={(e) => setOrder(e.target.value as ValidOrder)}
            className="p-2 border rounded bg-white"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.artworks.map((artwork) => (
          <CardAIChicago
            key={artwork.id}
            artwork={{
              ...artwork, // Self-note: Spread operator makes shallow copy of object and adds imageUrl. This is a workaround to avoid modifying the original object
              imageUrl: artwork.image_id
                ? `${data.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`
                : undefined,
            }}
          />
        ))}
      </div>
      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="flex justify-center gap-4 p-5">
          <Pagination
            currentPage={currentPage}
            totalPages={data.pagination.total_pages}
            onPrev={() => setCurrentPage((page) => Math.max(1, page - 1))}
            onNext={() => setCurrentPage((page) => page + 1)}
            hasNext={!!data.pagination.next_url}
          />
        </div>
      </div>
    </div>
  );
}
