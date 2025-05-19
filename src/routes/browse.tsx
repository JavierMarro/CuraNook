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
        {/*TODO: Add fetching data*/}
        {/* SUSPENSE is used to handle loading states for components that are lazy-loaded, this can be used to show a loading spinner or a placeholder while the component is being loaded. It's part of the loader TanStack router and TanStack Query is more useful for data fetching.
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              Loading...
            </div>
          }
        >
           <ArtworkGrid /> 
        </Suspense> */}
      </div>
    </>
  );
}
