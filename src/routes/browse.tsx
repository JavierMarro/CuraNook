import { NavMenu } from "@/components/NavMenu";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/browse")({
  component: Browse,
});

function Browse() {
  return (
    <>
      <div className="relative w-full flex items-center justify-center">
        <NavMenu className="top-2" />
      </div>
    </>
  );
}
