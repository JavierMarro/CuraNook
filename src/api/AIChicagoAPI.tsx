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
  "date_end",
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

// From API docs the following is a translator of sorts between user selection and API needs
export const apiSortAIChicagoFields: Record<ValidSortByChicago, string> = {
  title: "title.keyword",
  artist_title: "artist_title.keyword",
  date_end: "date_end",
  place_of_origin: "place_of_origin.keyword",
  is_public_domain: "is_public_domain",
};

export const fetchAIChicagoArtworks = async (
  page = 1,
  limit = 15,
  sortBy: ValidSortByChicago = "title",
  order: ValidOrder = "asc"
): Promise<AIChicagoAPIResponse> => {
  let queryValues = "";
  if (sortBy && apiSortAIChicagoFields[sortBy]) {
    const apiSortField = apiSortAIChicagoFields[sortBy];
    queryValues = `&sort[${apiSortField}]=${order}`;
  }
  // According to the Art Institute of Chicago API docs, sorting only works with search endpoints
  const baseUrl = `https://api.artic.edu/api/v1/artworks/search?query=*&page=${page}&limit=${limit}&fields=${AIChicagoFields}${queryValues}`;
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch artworks: ${res.status} ${res.statusText}`
    );
  }
  // Check if the response is valid and parse it
  const data: AIChicagoSearchResponse<AIChicagoArtwork> = await res.json();

  return {
    artworks: data.data, // This data does not have imageURL, because of the nature of the data structure from this API the imageUrl will be added in component
    iiif_url: data.config.iiif_url,
    pagination: {
      ...data.pagination,
      next_url:
        data.pagination.current_page < data.pagination.total_pages
          ? `page=${data.pagination.current_page + 1}`
          : null,
    },
  };
};
