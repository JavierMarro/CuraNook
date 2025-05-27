// This interface is used for the response of the AIChicago artworks endpoint (used initially when started to fetch data for this project)
export interface AIChicagoAPIResponse {
  artworks: AIChicagoArtwork[];
  iiif_url: string;
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string | null;
  };
}
// This interface is used for the response of the AIChicago search endpoint, which is more efficient for sorting and filtering queries
export interface AIChicagoSearchResponse<T> {
  preference: string | null;
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
  data: (T & { _score: number })[];
  info: {
    license_text: string;
    license_links: string[];
    version: string;
  };
  config: {
    iiif_url: string;
    website_url: string;
  };
}

// types for sortBy and Order to increase sanitation of queries
export type ValidSortByChicago = "title" | "artist_title" | "is_public_domain";
// Decided to reuse the type below for order validation for Harvard's API too
export type ValidOrder = "asc" | "desc";

export interface AIChicagoArtwork {
  id: number;
  image_id: string | null;
  imageUrl?: string;
  title: string;
  date_display: string;
  artist_title: string;
  place_of_origin?: string;
  artwork_type_title?: string;
  style_title?: string;
  classification_title?: string;
  medium_display?: string;
  dimensions?: string;
  description?: string;
  department_title?: string;
  is_public_domain?: boolean;
  credit_line?: string;
}

/* ABOUT IMAGES for this API: https://api.artic.edu/docs/#images
 */
