import Dexie, { type Table } from "dexie";

import type { Collection, SavedItem } from "./dbInterfaces";

export class CuraNookDB extends Dexie {
  userCollections!: Table<Collection, number>;
  collectionItems!: Table<SavedItem, number>;
  constructor() {
    super("CuraNookDB");
    this.version(1).stores({
      userCollections: "++id, title",
      collectionItems: "++savedItemId, artworkId, collectionId, source",
    });
  }
}
export const db = new CuraNookDB();

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
