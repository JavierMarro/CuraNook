// Created this file to fetch and display MET artworks using TanStack Query
// however this API does not support server-side pagination so, for the time being, it won't be used.

import { fetchMETArtworks, fetchMETArtwork } from "@/api/_METMuseumAPI.unused";
import { useQuery, useQueries } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import type { METArtwork } from "@/types/_METartworkItem.unused";

const articlesPerPage = 10;

export function ItemsListMET() {
  // The following fetches all object IDs
  const { isPending, error, data } = useQuery({
    queryKey: ["MET-object-ids"],
    queryFn: fetchMETArtworks,
  });

  // Pagination client-side (there was no server-side pagination in the API)
  const [currentPage, setCurrentPage] = useState(0);

  const pagedData = useMemo(() => {
    if (!data?.objectIDs) return [];
    const start = currentPage * articlesPerPage;
    return data.objectIDs.slice(start, start + articlesPerPage);
  }, [data, currentPage]);

  // Now fetching details of artworks on current page
  const artworkQueries = useQueries({
    queries: pagedData.map((objectID) => ({
      queryKey: ["MET-artwork", objectID],
      queryFn: () => fetchMETArtwork(objectID),
      enabled: !!data?.objectIDs,
    })),
  });

  // TanStack Query handling loading and error states
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading artworks.</div>;

  // Pagination controls
  const totalPages = data
    ? Math.ceil(data.objectIDs.length / articlesPerPage)
    : 0;

  return (
    <div>
      <h1>MET Museum Artwork</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworkQueries.map((query, index) => {
          if (query.isLoading) return <div key={index}>Loading...</div>;
          if (query.error) return <div key={index}>Error loading artwork.</div>;
          const artwork = query.data as METArtwork;
          return (
            <div
              key={artwork.objectID}
              className="p-4 border rounded shadow bg-white"
            >
              <img
                src={artwork.primaryImageSmall}
                alt={artwork.title}
                className="w-full h-48 object-cover mb-2"
                loading="lazy"
              />
              <h2 className="font-bold">{artwork.title}</h2>
              <p className="text-sm text-gray-600">
                {artwork.artistDisplayName}
              </p>
              <p className="text-xs">{artwork.objectDate}</p>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 mt-6">
        <button
          className="px-3 py-1 bg-cyan-900 text-white rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span className="px-2 py-1">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-cyan-900 text-white rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
          disabled={currentPage >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
