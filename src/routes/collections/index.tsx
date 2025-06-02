import { createCollection } from "@/db/db";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { NavMenu } from "@/components/NavMenu";

export const Route = createFileRoute("/collections/")({
  component: Collections,
});

function Collections() {
  const [collectionTitle, setCollectionTitle] = useState("");
  const validTitleRgx = /^[\w\s.,'-]*$/;

  const createCollectionMutation = useMutation({
    mutationFn: (title: string) => createCollection(title),
    onSuccess: () => {
      setCollectionTitle("");
    },
    onError: (error) => {
      console.error("Failed to create collection:", error);
    },
  });

  const handleCreateCollection = async () => {
    const trimmedTitle = collectionTitle.trim();
    if (!trimmedTitle) return;

    if (!validTitleRgx.test(trimmedTitle)) {
      console.error(
        "Invalid characters in collection title, use letters, spaces, and basic punctuation only."
      );
      return;
    }
    createCollectionMutation.mutate(trimmedTitle);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreateCollection();
    }
  };

  return (
    <>
      <div className="relative w-full flex flex-col items-center justify-center">
        <NavMenu className="top-2" />
        <div className="w-full flex justify-center mt-30">
          <h1 className="text-2xl font-bold">My Collections</h1>
        </div>

        <div className="w-full max-w-md mx-auto mt-8 px-4">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={collectionTitle}
              onChange={(e) => setCollectionTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter your collection's name here!"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-cyan-500 focus:border-transparent"
              disabled={createCollectionMutation.isPending}
            />
            <button
              onClick={handleCreateCollection}
              disabled={
                createCollectionMutation.isPending || !collectionTitle.trim()
              }
              className="px-12 py-3 rounded-full bg-slate-700 font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-slate-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {createCollectionMutation.isPending
                ? "Creating..."
                : "Create Collection"}
            </button>

            {createCollectionMutation.isError && (
              <div className="text-red-800 text-sm">
                Failed to create collection. Please try again.
              </div>
            )}

            {createCollectionMutation.isSuccess && (
              <div className="text-cyan-700 text-sm">
                Collection created successfully!
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
