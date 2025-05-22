import type { AIChicagoArtwork } from "@/types/AIChicagoItem";

interface ArtworkCardProps {
  artwork: AIChicagoArtwork & { imageUrl?: string };
} // Self-note: Getting imageUrl as a workaround to avoid modifying the original object

export function CardAIChicago({ artwork }: ArtworkCardProps) {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden bg-white">
      {artwork.imageUrl ? (
        <img
          src={artwork.imageUrl}
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
        <p
          className="text-sm text-gray-600 truncate"
          title={artwork.artist_title}
        >
          {artwork.artist_title || "Unknown Artist"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {artwork.date_display || "Date Unknown"}
        </p>
        {/* 
          TODO: Check if Expandable card from Aceternity can be implemented
          - place_of_origin
          - artwork_type_title
          - medium_display
          - dimensions
          - description 
        */}
      </div>
    </div>
  );
}
