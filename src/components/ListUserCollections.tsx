import { getAllCollections } from "@/db/db";
import { Loading } from "@/ui/Loading";
import { useQuery } from "@tanstack/react-query";

export function CollectionsList() {
  const {
    data: collections = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: getAllCollections,
  });

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
            <div key={collection.id} className="p-3 border rounded-lg">
              <h3 className="font-medium">{collection.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
