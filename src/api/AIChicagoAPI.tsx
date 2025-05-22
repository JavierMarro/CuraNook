import type {
  AIChicagoArtwork,
  AIChicagoApiResponse,
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

export const fetchAIChicagoArtworks = async (
  page = 1,
  limit = 15
): Promise<{
  artworks: AIChicagoArtwork[];
  iiif_url: string;
  pagination: AIChicagoApiResponse<AIChicagoArtwork>["pagination"];
}> => {
  const baseUrl = `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}&fields=${AIChicagoFields}`;
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch artworks: ${res.status} ${res.statusText}`
    );
  }
  // Check if the response is valid and parse it
  const data: AIChicagoApiResponse<AIChicagoArtwork> = await res.json();

  return {
    artworks: data.data, // This data does not have imageURL, because of the nature of the data structure from this API the imageUrl will be added in component
    iiif_url: data.config.iiif_url,
    pagination: data.pagination,
  };
};
