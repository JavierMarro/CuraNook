import Dexie, { type Table } from "dexie";
import type { Collection, SavedItem } from "./dbInterfaces";
import type { AIChicagoArtwork } from "@/types/AIChicagoInterfaces";
import type { HarvardCardDetailed } from "@/types/HarvardMuseumsInterfaces";

// Following https://stackblitz.com/edit/dexie-todo-list?file=models%2Fdb.ts
export class CuraNookDB extends Dexie {
  userCollections!: Table<Collection, number>;
  collectionItems!: Table<SavedItem, number>;

  constructor() {
    super("CuraNookDB");
    this.version(1).stores({
      userCollections: "++id, title",
      collectionItems: "++id, artworkId, collectionId, source",
    });
  }
}
export const db = new CuraNookDB();

export async function createCollection(title: string) {
  try {
    const collection: Omit<Collection, "id"> = {
      title,
    };
    return db.userCollections.add(collection);
  } catch (error) {
    console.error("Error creating collection:", error);
    throw error;
  }
}

export async function addChicagoArtwork(
  collectionId: number,
  artwork: AIChicagoArtwork & { imageUrl?: string }
) {
  try {
    const itemChicago: Omit<SavedItem, "id"> = {
      collectionId,
      artworkId: artwork.id,
      source: "chicago",
      imageUrl: artwork.imageUrl,
      title: artwork.title,
      artist: artwork.artist_title,
      date: artwork.date_display,
    };
    return db.collectionItems.add(itemChicago);
  } catch (error) {
    console.error("Error adding Chicago artwork:", error);
    throw error;
  }
}

export async function addHarvardArtwork(
  collectionId: number,
  artwork: HarvardCardDetailed
) {
  try {
    const itemHarvard: Omit<SavedItem, "id"> = {
      collectionId,
      artworkId: artwork.objectid,
      source: "harvard",
      imageUrl: artwork.images?.[0]?.baseimageurl || artwork.primaryimageurl,
      title: artwork.title,
      artist: artwork.artistDisplayName,
      date: artwork.dated,
    };
    return db.collectionItems.add(itemHarvard);
  } catch (error) {
    console.error("Error adding Harvard artwork:", error);
    throw error;
  }
}

// Code below from Dexie docs extra resources
// export function deleteList(collectionListId: number) {
//   return db.transaction("rw", db.collectionItems, db.userCollections, () => {
//     db.collectionItems.where({ collectionId: collectionListId }).delete();
//     db.userCollections.delete(collectionListId);
//   });
// }

// export function resetDatabase() {
//   return db.transaction(
//     "rw",
//     db.userCollections,
//     db.collectionItems,
//     async () => {
//       await Promise.all(db.tables.map((table) => table.clear()));
//     }
//   );
// }
