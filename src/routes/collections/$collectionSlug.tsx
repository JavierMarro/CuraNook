import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCollectionBySlug,
  getCollectionArtworks,
  deleteSavedArtwork,
} from "@/db/db";
import { Loading } from "@/ui/Loading";
import { Link } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { ToasterComponent } from "@/ui/ToasterComponent";

export const Route = createFileRoute("/collections/$collectionSlug")({
  component: CollectionDetailed,
});

function CollectionDetailed() {
  const { collectionSlug } = Route.useParams();
  const queryClient = useQueryClient();

  const {
    data: collection,
    isLoading: collectionLoading,
    error: collectionError,
  } = useQuery({
    queryKey: ["collection", collectionSlug],
    queryFn: () => getCollectionBySlug(collectionSlug),
  });

  const {
    data: artworks = [],
    isLoading: artworksLoading,
    error: artworksError,
  } = useQuery({
    queryKey: ["collectionArtworks", collection?.id],
    queryFn: () => getCollectionArtworks(collection!.id!),
    enabled: !!collection?.id,
  });

  const deleteArtworkMutation = useMutation({
    mutationFn: (artworkId: number) => deleteSavedArtwork(artworkId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collectionArtworks", collection?.id],
      });
      toast.success("Artwork removed from collection!");
    },
    onError: (error) => {
      console.error("Failed to delete artwork:", error);
      toast.error("Failed to remove artwork. Please try again.");
    },
  });

  const handleDeleteArtwork = (artworkId: number, artworkTitle: string) => {
    if (
      window.confirm(
        `Are you sure you want to remove "${artworkTitle}" from this collection?`
      )
    ) {
      deleteArtworkMutation.mutate(artworkId);
    }
  };

  if (collectionLoading) return <Loading />;
  if (collectionError || !collection) {
    return (
      <div className="museum-container mt-20  ">
        <div className="text-center">
          <h1 className="text-2xl font-bold error-fallback mb-4">
            Collection Not Found
          </h1>
          <p className="text-slate-800 text-xl mb-4">
            Ah, no! The collection you're looking for doesn't exist...
          </p>
          <Link
            to="/collections"
            className="text-slate-800 hover:text-black text-xl font-medium hover:font-bold"
          >
            ← Back to your collections
          </Link>
        </div>
      </div>
    );
  }

  if (artworksLoading) return <Loading />;
  if (artworksError) {
    return <div className="error-fallback">Error loading artworks :(</div>;
  }

  return (
    <>
      <ToasterComponent />
      <div className="museum-container mt-20">
        <div className="mb-8">
          <Link
            to="/collections"
            className="text-slate-800 hover:text-black font-medium hover:font-bold  mb-4 inline-block"
          >
            ← Back to your collections
          </Link>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            {collection.title}
          </h1>
          <p className="text-slate-700">
            Number of items in this collection: {artworks.length}{" "}
            {artworks.length === 1 ? "artwork" : "artworks"}
          </p>
        </div>

        {artworks.length === 0 ? (
          <div className="text-center py-25">
            <p className="text-slate-800 text-xl mb-4">
              It's looking a bit empty...
            </p>
            <Link
              to="/browse"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Browse some artworks and add them to your collection →
            </Link>
          </div>
        ) : (
          <div className="artworks-grid mb-5">
            {artworks.map((artwork) => (
              <div
                key={artwork.id}
                className="relative border rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow"
              >
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                  <img
                    src={artwork.imageUrl || "/No_image_available-museum.svg"}
                    alt={artwork.title || "Artwork image"}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/No_image_available-museum.svg";
                    }}
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                    {artwork.title || "Untitled art piece"}
                  </h3>
                  <p className="text-sm text-slate-700 mb-1">
                    {artwork.artist || "Unknown Artist"}
                  </p>
                  <p className="text-xs text-slate-600">
                    {artwork.date || "Date Unknown"}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                        artwork.source === "chicago"
                          ? "bg-orange-100 text-black"
                          : "bg-purple-100 text-black"
                      }`}
                    >
                      {artwork.source === "chicago"
                        ? "Art Institute of Chicago"
                        : "Harvard Art Museums"}
                    </span>
                    <button
                      onClick={() =>
                        handleDeleteArtwork(
                          artwork.id!,
                          artwork.title || "Artwork"
                        )
                      }
                      disabled={deleteArtworkMutation.isPending}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove from collection"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
