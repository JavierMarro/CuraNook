import { Footer } from "@/components/Footer";
import { ItemsListAIChicago } from "@/components/ListAIChicago";
import { ItemsListHarvard } from "@/components/ListHarvard";
import { NavMenu } from "@/components/NavMenu";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/browse")({
  component: Browse,
});

function Browse() {
  const [museum, setMuseum] = useState("aichicago");

  return (
    <>
      <div className="relative w-full flex flex-col items-center justify-center">
        <NavMenu className="top-2" />
        {/*TODO: Add filters*/}
        <div className="w-full flex justify-center mt-30">
          <select
            value={museum}
            onChange={(e) => setMuseum(e.target.value)}
            className="p-2 border rounded"
            aria-label="Select a museum"
          >
            <option value="aichicago">Art Institute of Chicago</option>
            <option value="harvard">Harvard Art Museums</option>
          </select>
        </div>
        {museum === "aichicago" ? <ItemsListAIChicago /> : <ItemsListHarvard />}
      </div>
      <Footer />
    </>
  );
}
