import { createFileRoute } from "@tanstack/react-router";
import { CreateCollections } from "@/components/CreateCollectionForm";
import { CollectionsList } from "@/components/ListUserCollections";
import { ToasterComponent } from "@/ui/ToasterComponent";

export const Route = createFileRoute("/collections/")({
  component: Collections,
});

function Collections() {
  return (
    <>
      <ToasterComponent />
      <div className="relative w-full flex flex-col items-center justify-center">
        <div className="w-full flex justify-center mt-30">
          <h1 className="text-2xl font-bold">My Collections</h1>
        </div>
        <CreateCollections />
        <CollectionsList />
      </div>
    </>
  );
}
