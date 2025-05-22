import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchHarvardArtworkById } from "@/api/HarvardMuseumAPI";
import type { HarvardListSummary } from "@/types/HarvardMuseumsInterfaces";

interface CardHarvardProps {
  artwork: HarvardListSummary;
}

export function CardHarvard({ artwork }: CardHarvardProps) {
  const [expanded, setExpanded] = useState(false);

  const { data: details, isLoading } = useQuery({
    queryKey: ["HarvardArtworkDetails", artwork.objectid],
    queryFn: () => fetchHarvardArtworkById(artwork.objectid),
    enabled: expanded,
    staleTime: 1000 * 60 * 15,
  });

  return (
    <div
      className="border rounded-lg shadow-lg overflow-hidden bg-white cursor-pointer"
      onClick={() => setExpanded((prev) => !prev)}
    >
      {artwork.primaryimageurl ? (
        <img
          src={artwork.primaryimageurl}
          alt={artwork.title || "Artwork image"}
          className="w-full h-64 object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/No_image_available-museum.svg";
          }}
        />
      ) : (
        <img
          src="/No_image_available-museum.svg"
          alt="No image available"
          className="w-full h-64 object-contain bg-gray-200"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate" title={artwork.title}>
          {artwork.title || "Untitled art piece"}
        </h3>
        <p className="text-sm text-gray-600 truncate">
          {(artwork.people && artwork.people[0]?.name) || "Unknown Artist"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {artwork.dated || "Date Unknown"}
        </p>
        {expanded && (
          <div className="mt-2 text-xs text-gray-700">
            {isLoading && <div>Loading details...</div>}
            {details && (
              <>
                <div>
                  <strong>Medium:</strong> {details.medium || "N/A"}
                </div>
                <div>
                  <strong>Dimensions:</strong> {details.dimensions || "N/A"}
                </div>
                <div>
                  <strong>Department:</strong> {details.department || "N/A"}
                </div>
                {/* TODO: After trying Aceternity Expandable card, add more fields */}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
