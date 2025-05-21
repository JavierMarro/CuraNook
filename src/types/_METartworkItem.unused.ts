export interface METArtwork {
  objectID: number;
  isPublicDomain?: boolean;
  primaryImageSmall: string;
  additionalImages?: string[];
  title: string;
  objectDate?: string;
  period?: string;
  culture?: string;
  objectURL?: string;
  objectWikidata_URL?: string;
  artistDisplayName: string;
  artistWikidata_URL?: string;
  classification?: string;
  medium?: string;
  dimensions?: string;
  department?: string;
  rightsAndReproduction?: string;
  creditLine?: string;
}
