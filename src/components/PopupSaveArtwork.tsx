"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllCollections, addChicagoArtwork, db } from "@/db/db";
import { toast } from "react-hot-toast";
import type { AIChicagoArtwork } from "@/types/AIChicagoInterfaces";

interface CollectionsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  artwork: AIChicagoArtwork & { imageUrl?: string };
}

export function CollectionsPopup({
  isOpen,
  onClose,
  artwork,
}: CollectionsPopupProps) {
  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);
  const queryClient = useQueryClient();

  const { data: collections = [], isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: getAllCollections,
    enabled: isOpen,
  });

  const { data: existingCollections = [] } = useQuery({
    queryKey: ["existing-collections", artwork.id],
    queryFn: async () => {
      const existingItems = await db.collectionItems
        .where({ artworkId: artwork.id, source: "chicago" })
        .toArray();
      return existingItems.map((item) => item.collectionId);
    },
    enabled: isOpen,
  });

  const saveArtworkMutation = useMutation({
    mutationFn: async (collectionIds: number[]) => {
      const promises = collectionIds.map((collectionId) =>
        addChicagoArtwork(collectionId, artwork)
      );
      return Promise.all(promises);
    },
    onSuccess: () => {
      toast.success("Artwork saved to collections!");
      setSelectedCollections([]);
      onClose();
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
    onError: (error) => {
      console.error("Failed to save artwork:", error);
      toast.error("Failed to save artwork. Please try again.");
    },
  });

  const handleCollectionToggle = (collectionId: number) => {
    if (existingCollections.includes(collectionId)) {
      return;
    }

    setSelectedCollections((prev) =>
      prev.includes(collectionId)
        ? prev.filter((id) => id !== collectionId)
        : [...prev, collectionId]
    );
  };

  const handleSave = () => {
    if (selectedCollections.length === 0) {
      toast.error("Please select at least one collection");
      return;
    }
    saveArtworkMutation.mutate(selectedCollections);
  };

  const availableCollections = collections.filter(
    (collection) => !existingCollections.includes(collection.id!)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[300]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-xl font-semibold mb-4">Save to collection</h2>

        {isLoading ? (
          <div className="text-center py-4">Loading collections...</div>
        ) : collections.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-600 mb-4">No collections found :(</p>
            <p className="text-sm text-gray-500">
              Create a collection to start saving artworks!
            </p>
          </div>
        ) : availableCollections.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-600 mb-4">
              This artwork is already saved in all your collections.
            </p>
            <p className="text-sm text-gray-500">Create a new collection!</p>
          </div>
        ) : (
          <div className="space-y-2 mb-6">
            {collections.map((collection) => {
              const isAlreadySaved = existingCollections.includes(
                collection.id!
              );

              return (
                <label
                  key={collection.id}
                  className={`flex items-center space-x-3 p-2 rounded ${
                    isAlreadySaved
                      ? "opacity-50 cursor-not-allowed bg-gray-100"
                      : "hover:bg-gray-50 cursor-pointer"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={
                      selectedCollections.includes(collection.id!) ||
                      isAlreadySaved
                    }
                    onChange={() => handleCollectionToggle(collection.id!)}
                    disabled={isAlreadySaved}
                    className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {collection.title}
                    {isAlreadySaved && (
                      <span className="text-xs ml-2">(saved)</span>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={handleSave}
            disabled={
              selectedCollections.length === 0 ||
              saveArtworkMutation.isPending ||
              collections.length === 0
            }
            className="flex-1 px-4 py-2 bg-cyan-200 text-black rounded-full font-medium hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saveArtworkMutation.isPending ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-full font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
