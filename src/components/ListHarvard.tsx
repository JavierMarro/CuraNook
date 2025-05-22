import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchHarvardArtworks } from "@/api/HarvardMuseumAPI";

export function ItemsListHarvard() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["HarvardArtworksData", currentPage],
    queryFn: () => fetchHarvardArtworks(currentPage, 15),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 15,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading artworks.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-5">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Harvard Art Museums Collection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {/*TODO: Placeholder for CardHarvard component */}
      </div>
      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="flex justify-center gap-4 p-5">
          <button
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-cyan-500 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-base text-black mt-2">
            Page {currentPage} of {data.info.pages}
          </span>
          <button
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={!data.info.next}
            className="px-4 py-2 bg-cyan-500 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
