import type { AIChicagoArtwork } from "@/types/AIChicagoItem";

export const fetchAICArtworks = async (
  page = 1,
  limit = 15
): Promise<AIChicagoArtwork[]> => {
  const res = (
    await fetch(
      `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`
    )
  ).json();
  if (!res) throw new Error("Failed to fetch artworks");
  return res;
};
