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
