// Link to API docs accessing API data: https://api-toolkit.herokuapp.com/6

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
  order: ValidOrder = "asc"
): Promise<{
  artworks: HarvardListSummary[];
  info: HarvardApiResponse<HarvardListSummary>["info"];
}> => {
  let queryValues = "";
  if (sortBy) {
    queryValues = `&sort=${sortBy}&sortorder=${order}`;
  }
  const baseUrl = `https://api.harvardartmuseums.org/object?fields=${HarvardListFields}${queryValues}&hasimage=1&apikey=${HARVARD_KEY}&size=${size}&page=${page}`; // make sure to display artwork with at least one image
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch artworks: ${res.status} ${res.statusText}`
    );
  }

  const data: HarvardApiResponse<HarvardListSummary> = await res.json();

  // Filter out items without primary images as a safeguard
  const filteredRecords = data.records.filter(
    (record) => record.primaryimageurl
  );

  return {
    artworks: filteredRecords,
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
    `https://api.harvardartmuseums.org/object/${objectId}?apikey=${HARVARD_KEY}&fields=${HarvardExpandedFields}`
  );
  if (!res.ok) throw new Error("Failed to fetch artwork data");
  return res.json();
};
