export interface HarvardArtwork {
  objectid: number;
  primaryimageurl?: string;
  images?: { baseimageurl: string }[];
  title: string;
  dated?: string;
  period?: string;
  culture?: string;
  url?: string;
  artistDisplayName?: string;
  classification?: string;
  medium?: string;
  technique?: string;
  dimensions?: string;
  department?: string;
  rightsAndReproduction?: string;
  creditLine?: string;
  provenance?: string;
}
