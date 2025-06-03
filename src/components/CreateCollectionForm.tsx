import { createCollection } from "@/db/db";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";

export function CreateCollections() {
  const [collectionTitle, setCollectionTitle] = useState("");
  const validTitleRgx = /^[\w\s.,'-]*$/;
  const queryClient = useQueryClient();

  const createCollectionMutation = useMutation({
    mutationFn: (title: string) => createCollection(title),
    onSuccess: () => {
      setCollectionTitle("");
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Collection created successfully!");
    },
    onError: (error) => {
      console.error("Failed to create collection:", error);
      toast.error("Failed to create collection. Please try again.");
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
      <div className="w-full max-w-md mx-auto mt-8 px-4">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={collectionTitle}
            onChange={(e) => setCollectionTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter your new collection's name here!"
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
        </div>
      </div>
    </>
  );
}
