// From Harvard API docs:
// The structure of a query follows a pattern. The four basic components are:

// Harvard Art Museums URL + Resource + Filter (optional) + API key
// All of the objects made in the year 2000:
// https://api.harvardartmuseums.org/	object	?	yearmade=2002	&	apikey=KEY_GOES_HERE
// URL	                              Resource		Filter		     API

// By default there is a default of 10 items per page (max would be 50). In order to choose a custom amount:
// In order to increase the size of records in each page to 50, append "&size=50" to the end of your query.
// https://api.harvardartmuseums.org/	object	?	apikey=0000-0000-0000-0000	&	size=50
// URL                              	Resource		API		                      Filter

// Link to API docs manipulating data: https://api-toolkit.herokuapp.com/6

import type {
  HarvardArtwork,
  HarvardApiResponse,
} from "@/types/HarvardArtworkItem";

const HARVARD_KEY = import.meta.env.VITE_HARVARD_MUSEUMS_API_KEY;

export const fetchHarvardArtworks = async (
  page = 1,
  size = 15
): Promise<{
  artworks: HarvardArtwork[];
  info: HarvardApiResponse<HarvardArtwork>["info"];
}> => {
  const baseUrl = `https://api.harvardartmuseums.org/object?apikey=${HARVARD_KEY}&size=${size}&page=${page}`;
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch artworks: ${res.status} ${res.statusText}`
    );
  }
  // Check if the response is valid and parse it (sames as AIChicago)
  const data: HarvardApiResponse<HarvardArtwork> = await res.json();

  return {
    artworks: data.records,
    info: data.info,
  };
};
