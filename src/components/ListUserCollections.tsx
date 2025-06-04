import { deleteCollection, getAllCollections } from "@/db/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loading } from "@/ui/Loading";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

export function CollectionsList() {
  const queryClient = useQueryClient();

  const {
    data: collections = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: getAllCollections,
  });

  // Extra understanding from https://github.com/gatinhap/plant-app-ver_0/blob/main/src/pages/removePlantPage/RemovePlant.tsx
  const deleteCollectionMutation = useMutation({
    mutationFn: (collectionId: number) => deleteCollection(collectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Collection deleted successfully!");
    },
    onError: (error) => {
      console.error("Failed to delete collection:", error);
      toast.error("Failed to delete collection. Please try again.");
    },
  });

  const handleDeleteCollection = (
    collectionId: number,
    collectionTitle: string
  ) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${collectionTitle}"? This will also delete all artworks in the collection.`
      )
    ) {
      deleteCollectionMutation.mutate(collectionId);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading collections</div>;

  return (
    <div className="w-full max-w-md mx-auto mt-8 px-4 mb-10">
      <h2 className="text-xl font-semibold mb-4">Your current collections:</h2>
      {collections.length === 0 ? (
        <p className="text-slate-900">
          No collections to see here yet. Create your first one above!
        </p>
      ) : (
        <div className="space-y-2">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="p-3 border rounded-lg flex items-center justify-between"
            >
              <h3 className="font-bold">{collection.title}</h3>
              {/* TODO: p tag to include artworks count perhaps? */}
              <button
                onClick={() =>
                  handleDeleteCollection(collection.id!, collection.title)
                }
                disabled={deleteCollectionMutation.isPending}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete collection"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
