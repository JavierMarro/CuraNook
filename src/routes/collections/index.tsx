import { createFileRoute } from "@tanstack/react-router";
import { CreateCollections } from "@/components/CreateCollectionForm";
import { CollectionsList } from "@/components/ListUserCollections";
import { Toaster } from "react-hot-toast";

export const Route = createFileRoute("/collections/")({
  component: Collections,
});

function Collections() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
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
