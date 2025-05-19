export const fetchArtworks = async () => {
  const res = (
    await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects`
    )
  ).json();
  if (!res) throw new Error("Failed to fetch artworks data");
  return res;
};

export const fetchArtwork = async (objectID: number) => {
  const res = (
    await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    )
  ).json();
  if (!res) throw new Error("Failed to fetch artwork data");
  return res;
};

// import { useQuery } from "@tanstack/react-query";

// function METData() {
//   const { isPending, error, data } = useQuery({
//     queryKey: ['METMuseumData'],
//     queryFn: () =>
//       fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects').then((res) =>
//         res.json(),
//       ),
//   })

//   if (isPending) return 'Loading...'

//   if (error) return 'An error has occurred: ' + error.message

//   return (
//     <div>
//       <h1>MET Museum Artwork</h1>

//       <strong> {data.primaryImageSmall}</strong>
//       <strong>{data.title}</strong>
//       <strong>✨ {data.artistDisplayName}</strong>
//       <strong>🍴 {data.objectDate}</strong>
//     </div>
//   )
// }
