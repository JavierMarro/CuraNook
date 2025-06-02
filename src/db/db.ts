import Dexie, { type Table } from "dexie";
import type { Collection, SavedArtwork } from "./dbInterfaces";
import type { AIChicagoArtwork } from "@/types/AIChicagoInterfaces";
import type { HarvardCardDetailed } from "@/types/HarvardMuseumsInterfaces";

// Following https://stackblitz.com/edit/dexie-todo-list?file=models%2Fdb.ts for DB schema
export class CuraNookDB extends Dexie {
  userCollections!: Table<Collection, number>;
  collectionItems!: Table<SavedArtwork, number>;

  constructor() {
    super("CuraNookDB");
    this.version(2).stores({
      userCollections: "++id, title, slug",
      collectionItems:
        "++id, collectionId, artworkId, source, title, artist, date, imageUrl",
    });
  }
}

export const db = new CuraNookDB();

// Helper function to create a slug (inspiration from src: https://gist.github.com/max10rogerio/c67c5d2d7a3ce714c4bc0c114a3ddc6e)
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Transaction functions to interact with DB (basically a CRUD)
export async function createCollection(title: string) {
  try {
    const slug = createSlug(title);
    const collection: Omit<Collection, "id"> = {
      title,
      slug,
    };
    return db.userCollections.add(collection);
  } catch (error) {
    console.error("Error creating collection:", error);
    throw error;
  }
}

export async function getAllCollections(): Promise<Collection[]> {
  try {
    return await db.userCollections.toArray();
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
}

export async function getCollectionById(
  id: number
): Promise<Collection | undefined> {
  try {
    return await db.userCollections.get(id);
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw error;
  }
}

export async function getCollectionBySlug(
  slug: string
): Promise<Collection | undefined> {
  try {
    return await db.userCollections.where({ slug }).first();
  } catch (error) {
    console.error("Error fetching collection by slug:", error);
    throw error;
  }
}

export async function getCollectionArtworks(
  collectionId: number
): Promise<SavedArtwork[]> {
  try {
    return await db.collectionItems.where({ collectionId }).toArray();
  } catch (error) {
    console.error("Error fetching collection artworks:", error);
    throw error;
  }
}

export async function addChicagoArtwork(
  collectionId: number,
  artwork: AIChicagoArtwork & { imageUrl?: string }
) {
  try {
    const itemChicago: Omit<SavedArtwork, "id"> = {
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
    const itemHarvard: Omit<SavedArtwork, "id"> = {
      collectionId,
      artworkId: artwork.objectid,
      source: "harvard",
      imageUrl: artwork.images?.[0]?.baseimageurl || artwork.primaryimageurl,
      title: artwork.title,
      artist: artwork.artistDisplayName,
      date: artwork.dated,
    };
    // console.log(`Harvard artwork added with id: ${artwork.objectid}`);
    return db.collectionItems.add(itemHarvard);
  } catch (error) {
    console.error("Error adding Harvard artwork:", error);
    throw error;
  }
}

export async function deleteSavedArtwork(id: number) {
  try {
    return await db.transaction("rw", db.collectionItems, async () => {
      await db.collectionItems.delete(id);
    });
  } catch (error) {
    console.error("Error deleting saved artwork:", error);
    throw error;
  }
}

export async function deleteCollection(collectionId: number) {
  try {
    return await db.transaction(
      "rw",
      db.collectionItems,
      db.userCollections,
      async () => {
        await db.collectionItems.where({ collectionId }).delete();
        await db.userCollections.delete(collectionId);
      }
    );
  } catch (error) {
    console.error("Error deleting collection:", error);
    throw error;
  }
}

// Code below from Dexie docs extra resources: Resetting the database
// This function would clear all tables in the database, might implement so user has de option to clear all collections.
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
