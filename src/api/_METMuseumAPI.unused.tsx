import type { METArtwork } from "@/types/_METartworkItem.unused";

export const fetchMETArtworks = async (): Promise<{ objectIDs: number[] }> => {
  const res = (
    await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects`
    )
  ).json();
  if (!res) throw new Error("Failed to fetch artworks data");
  return res;
};

export const fetchMETArtwork = async (
  objectID: number
): Promise<METArtwork> => {
  const res = (
    await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    )
  ).json();
  if (!res) throw new Error("Failed to fetch artwork data");
  return res;
};
