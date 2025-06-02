import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/collections/collectionSlug")({
  component: CollectionDetailed,
});

function CollectionDetailed() {
  return <div>Hello "/collections/collectionSlug"!</div>;
}
