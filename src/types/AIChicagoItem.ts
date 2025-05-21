export interface AIChicagoApiResponse<T> {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string | null;
  };
  data: T[];
  config: {
    iiif_url: string;
    website_url: string;
  };
}

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

/* ABOUT IMAGES, from https://api.artic.edu/docs/#images
This API does not contain image files. However, it does contain all of the data you need to access our images. Our institution serves images via a separate API that is compliant with the IIIF Image API 2.0 (opens new window)specification. Using metadata from this API, you can craft URLs that will allow you to access images of artworks from our collection.

The International Image Interoperability Framework (IIIF) (opens new window)stewards a set of open standards that enables rich access to digital media from libraries, archives, museums, and other cultural institutions around the world. In practical terms, they define several API specifications that enable interoperability. When a tool is built to be IIIF-compliant, it's easier to adapt it to consume images from any number of institutions that offer IIIF-compliant APIs.

#IIIF Image API
We deliver our images via the IIIF Image API 2.0 (opens new window). Our IIIF URLs have the following structure:

https://www.artic.edu/iiif/2/{identifier}/{region}/{size}/{rotation}/{quality}.{format}
We recommend the following URL structure for most use-cases:

https://www.artic.edu/iiif/2/{identifier}/full/843,/0/default.jpg
Let's jump right into an example. Here's how you can construct IIIF URLs:

Retrieve one or more artworks with image_id fields. Here are a few ways of doing so:

# La Grande Jatte
https://api.artic.edu/api/v1/artworks/27992?fields=id,title,image_id

# La Grande Jatte and The Bedroom
https://api.artic.edu/api/v1/artworks?ids=27992,28560&fields=id,title,image_id

# Top two public domain artworks
https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&limit=2&fields=id,title,image_id
Let's go with the first one, La Grande Jatte (opens new window). Your response will look something like this:

{
    "data": {
        "id": 27992,
        "title": "A Sunday on La Grande Jatte — 1884",
        "image_id": "2d484387-2509-5e8e-2c43-22f9981972eb"
    },
    "config": {
        "iiif_url": "https://www.artic.edu/iiif/2",
    }
}
Find the base IIIF Image API endpoint in the config.iiif_url field:

https://www.artic.edu/iiif/2
We recommend that you avoid hardcoding this value into your applications.

Append the image_id of the artwork as a segment to this URL:

https://www.artic.edu/iiif/2/2d484387-2509-5e8e-2c43-22f9981972eb
Append /full/843,/0/default.jpg to the URL:

https://www.artic.edu/iiif/2/2d484387-2509-5e8e-2c43-22f9981972eb/full/843,/0/default.jpg
That's it!
*/
