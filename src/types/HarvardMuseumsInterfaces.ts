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
// Unfortunately Harvard's API does not support title or artist name so within whats available these three sorting queries where chosen
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

/* ABOUT IMAGES from https://github.com/harvardartmuseums/api-docs?tab=readme-ov-file#images
Images
Some of the datasets include image URLs as part of a block of image information in each record. Our images are served to you by an image server that supports a number of interfaces including IIIF.

Default service
The default service is accessed through the URLs found in the fields baseimageurl and primaryimageurl. This service is capable of resizing images on the fly. Append height and width parameters to image URLs to get an image sized to fit to the supplied dimensions. For example, if you want an image scaled to 150 pixels on the longest side construct the URL as follows.

https://nrs.harvard.edu/urn-3:HUAM:OCP16703_dynmc?height=150&width=150

IIIF
Some of the museums' data is accessible through IIIF image and presentation services.

The IIIF image service is accessed through the data found in the field iiifbaseuri. Read more about the capabilities of the IIIF Image API at http://iiif.io/api/image/2.1/. The service we provide adheres to version 2.1 of the API. A typical base URI for an image looks like this:

https://ids.lib.harvard.edu/ids/iiif/18483392
A fully formed IIIF request for a full resolution JPEG version of that same image looks like this:

https://ids.lib.harvard.edu/ids/iiif/18483392/full/full/0/default.jpg
Please note that URLs for images of objects that have rights restrictions are excluded for most API users. This means images for many 20th and 21st century works of art will not be available to you at the present time. We are working on a solution to this.

The IIIF presentation service is accessed through a separate service. Read more about the capabilities of the IIIF Presentation API at http://iiif.io/api/presentation/2.1/.

The top level collection is at:

https://iiif.harvardartmuseums.org/collections/top
The base URL for all presentation manifests begins with:

https://iiif.harvardartmuseums.org/manifests
You can request a manifest for any object by appending /object/OBJECT_ID to the base URL. For example the primary manifest for the object Self-Portrait Dedicated to Paul Gauguin is at:

https://iiif.harvardartmuseums.org/manifests/object/299843
At the present a manifest for an object contains one sequence and each image of that object is contained in its own canvas within that sequence.

Please note that our IIIF presentation service is very much a work in progress. The code for the server is available at https://github.com/harvardartmuseums/iiif-manifest-server and is based on work that was done at HarvardX. If you have any comments, suggestions, or questions about this service feel free to submit them through the feedback links listed below.

More technical documentation and use cases are described in the IIIF section.
*/
