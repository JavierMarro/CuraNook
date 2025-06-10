import type {
  AIChicagoArtwork,
  AIChicagoSearchResponse,
  ValidSortByChicago,
  ValidOrder,
  AIChicagoAPIResponse,
} from "@/types/AIChicagoInterfaces";

// Defining fields to fetch as per API docs best practice (limits the amount of data returned)
// https://api.artic.edu/docs/#fields
// https://api.artic.edu/docs/#best-practices

const AIChicagoFields = [
  "id",
  "image_id",
  "title",
  "date_display",
  "artist_title",
  "place_of_origin",
  "artwork_type_title",
  "style_title",
  "classification_title",
  "medium_display",
  "dimensions",
  "description",
  "department_title",
  "is_public_domain",
  "credit_line",
].join(",");

// From API docs the following object will work as an interpreter between user selection and API accessing fields (.keyword)
export const apiSortAIChicagoFields: Record<ValidSortByChicago, string> = {
  title: "title.keyword",
  is_public_domain: "is_public_domain",
};

export const fetchAIChicagoArtworks = async (
  page = 1,
  limit = 15,
  sortBy: ValidSortByChicago = "title",
  order: ValidOrder = "asc",
  searchQuery = ""
): Promise<AIChicagoAPIResponse> => {
  let sortingValues = "";

  if (sortBy && apiSortAIChicagoFields[sortBy]) {
    const apiSortField = apiSortAIChicagoFields[sortBy];
    sortingValues = `&sort[${encodeURIComponent(
      apiSortField
    )}]=${encodeURIComponent(order)}`;
  }

  // I thought the wildcard search was * but that kept returning no results, an empty string was the answer!
  const query = searchQuery.trim() ? encodeURIComponent(searchQuery) : "";

  // Use search endpoint for both browsing and searching to ensure consistent sorting
  const baseUrl = `https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=${encodeURIComponent(
    AIChicagoFields
  )}${sortingValues}&page=${page}&limit=${limit}`;

  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch artworks: ${res.status} ${res.statusText}`
    );
  }

  const data = (await res.json()) as AIChicagoSearchResponse<AIChicagoArtwork>;

  return {
    artworks: data.data,
    iiif_url: data.config.iiif_url,
    pagination: data.pagination,
  };
};
