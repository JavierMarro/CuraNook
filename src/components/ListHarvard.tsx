import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchHarvardArtworks } from "@/api/HarvardMuseumAPI";
import { CardHarvard } from "./CardHarvard";
import type { HarvardListSummary } from "@/types/HarvardMuseumsInterfaces";
import { Pagination } from "./Pagination";
import { Loading } from "@/ui/Loading";
import { Error } from "@/ui/Error";

export function ItemsListHarvard() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["HarvardArtworksData", currentPage],
    queryFn: () => fetchHarvardArtworks(currentPage, 15),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 15,
  });

  if (isLoading) return <Loading />;
  if (isError || !data) return <Error />;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-5">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Harvard Art Museums Collection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {data.artworks.map((artwork: HarvardListSummary) => (
          <CardHarvard key={artwork.objectid} artwork={artwork} />
        ))}
      </div>
      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="flex justify-center gap-4 p-5">
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
