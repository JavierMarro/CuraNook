// import type { AIChicagoArtwork } from "@/types/AIChicagoInterfaces";
// import type { HarvardCardDetailed } from "@/types/HarvardMuseumsInterfaces";

// export interface ArtworkChicagoProps {
//   artwork: AIChicagoArtwork & { imageUrl?: string };
// }

// export interface ArtworkHarvardProps {
//   artwork: HarvardCardDetailed;
// }
// Might need the above when adding artworks to collections

export interface Collection {
  id?: number;
  title: string;
  slug: string;
}

export interface SavedArtwork {
  id?: number;
  collectionId: number;
  artworkId: string | number;
  source: "chicago" | "harvard";
  imageUrl?: string;
  title: string;
  artist?: string;
  date?: string;
}
