import type { HarvardArtwork } from "@/types/HarvardArtworkItem";

const HARVARD_KEY = import.meta.env.VITE_HARVARD_MUSEUMS_API_KEY;

export const fetchHarvardArtworks = async (): Promise<HarvardArtwork> => {
  const res = (
    await fetch(
      `https://api.harvardartmuseums.org/object?apikey=${HARVARD_KEY}`
    )
  ).json();
  if (!res) throw new Error("Failed to fetch artworks data");
  return res;
};
