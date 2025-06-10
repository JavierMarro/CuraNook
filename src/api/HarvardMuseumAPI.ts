import type {
  HarvardApiResponse,
  HarvardListSummary,
  HarvardCardDetailed,
  ValidSortByHarvard,
} from "@/types/HarvardMuseumsInterfaces";
import type { ValidOrder } from "@/types/AIChicagoInterfaces"; // Reusing ValidOrder type from AIChicagoInterfaces

const HARVARD_KEY = import.meta.env.VITE_HARVARD_MUSEUMS_API_KEY;

//Following block of code for initial data fetching of small card view of artworks
const HarvardListFields = [
  "objectid",
  "primaryimageurl",
  "title",
  "dated",
  "people",
].join(",");

export const fetchHarvardArtworks = async (
  page = 1,
  size = 15,
  sortBy: ValidSortByHarvard = "rank",
  order: ValidOrder = "asc",
  searchQuery = ""
): Promise<{
  artworks: HarvardListSummary[];
  info: HarvardApiResponse<HarvardListSummary>["info"];
}> => {
  let sortingValues = "";

  if (sortBy) {
    sortingValues = `&sort=${encodeURIComponent(
      sortBy
    )}&sortorder=${encodeURIComponent(order)}`;
  }

  let searchInput = "";
  if (searchQuery.trim()) {
    searchInput = `&keyword=${encodeURIComponent(searchQuery.trim())}`;
  }

  const baseUrl = `https://api.harvardartmuseums.org/object?fields=${encodeURIComponent(
    HarvardListFields
  )}${sortingValues}${searchInput}&hasimage=1&apikey=${HARVARD_KEY}&size=${size}&page=${page}`; // make sure to display artwork with at least one image
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch artworks: ${res.status} ${res.statusText}`
    );
  }

  const data: HarvardApiResponse<HarvardListSummary> = await res.json();

  // This API contains quite a few results with no images so fallback image used in case the hasimage=1 in the URL doesn't filter as expected
  const recordsWithFallbackImage = data.records.map((record) => ({
    ...record,
    primaryimageurl: record.primaryimageurl || "/No_image_available-museum.svg",
  }));

  return {
    artworks: recordsWithFallbackImage,
    info: data.info,
  };
};

// Following block of code displays all fields I deemed interesting for artwork expanded view
const HarvardExpandedFields = [
  "objectid",
  "primaryimageurl",
  "images",
  "baseimageurl",
  "title",
  "artistDisplayName",
  "dated",
  "period",
  "culture",
  "classification",
  "medium",
  "technique",
  "dimensions",
  "department",
  "rightsAndReproduction",
  "creditLine",
].join(",");

export const fetchHarvardArtworkById = async (
  objectId: number
): Promise<HarvardCardDetailed> => {
  const res = await fetch(
    `https://api.harvardartmuseums.org/object/${objectId}?apikey=${HARVARD_KEY}&fields=${encodeURIComponent(
      HarvardExpandedFields
    )}`
  );
  if (!res.ok) throw new Error("Failed to fetch artwork data");
  return res.json();
};
