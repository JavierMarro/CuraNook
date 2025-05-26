export interface HarvardApiResponse<T> {
  info: {
    totalrecordsperquery: number;
    totalrecords: number;
    pages: number;
    page: number;
    next?: string;
  };
  records: T[];
}

// types for sortBy and Order to increase sanitation of queries
// Unfortunately Harvard's API does not support title or artist name for sorting so these three sorting queries where chosen from whats available
export type ValidSortByHarvard = "rank" | "accessionyear" | "lastupdate";

export interface HarvardListSummary {
  objectid: number;
  primaryimageurl?: string;
  title?: string;
  dated?: string;
  people?: { name?: string; displayname?: string }[];
}

export interface HarvardCardDetailed {
  objectid: number;
  primaryimageurl: string;
  images?: { baseimageurl: string }[];
  title: string;
  artistDisplayName: string;
  dated?: string;
  period?: string;
  culture?: string;
  classification?: string;
  medium?: string;
  technique?: string;
  dimensions?: string;
  department?: string;
  rightsAndReproduction?: string;
  creditLine?: string;
}

/* ABOUT IMAGES for this API: https://github.com/harvardartmuseums/api-docs?tab=readme-ov-file#images
 */
