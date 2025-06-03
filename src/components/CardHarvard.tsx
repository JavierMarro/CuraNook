"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchHarvardArtworkById } from "@/api/HarvardMuseumAPI";
import type { HarvardListSummary } from "@/types/HarvardMuseumsInterfaces";
import { AnimatePresence, motion } from "motion/react";
import { Lens } from "@/ui/lens";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CardHarvardProps {
  artwork: HarvardListSummary;
}

// Aceternity expandable card component
export function CardHarvard({ artwork }: CardHarvardProps) {
  const [active, setActive] = useState<HarvardListSummary | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  {
    /* Only way to fetch individual object data is by using the API's function that fetches the object by Id */
  }
  const { data: details } = useQuery({
    queryKey: ["HarvardArtworkDetails", artwork.objectid],
    queryFn: () => fetchHarvardArtworkById(artwork.objectid),
    enabled: !!(active && typeof active === "object"),
    staleTime: 1000 * 60 * 15,
  });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const imageUrl = artwork.primaryimageurl || "/No_image_available-museum.svg";
  const artistName =
    (artwork.people && artwork.people[0]?.name) || "Unknown Artist";

  // Use details if they are available, otherwise jsut show basic artwork data
  const displayData = details || active;

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${artwork.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6 z-[200]"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${artwork.title}-${id}`}
              ref={ref}
              className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${artwork.title}-${id}`}>
                <div className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <Lens hovering={hovering} setHovering={setHovering}>
                      <img
                        src={imageUrl}
                        alt={
                          displayData &&
                          typeof displayData === "object" &&
                          "title" in displayData
                            ? displayData.title || "Artwork image"
                            : artwork.title || "Artwork image"
                        }
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "/No_image_available-museum.svg";
                        }}
                      />
                    </Lens>
                  </div>
                  <motion.div
                    animate={{
                      filter: hovering ? "blur(2px)" : "blur(0px)",
                    }}
                    className="py-4 relative z-20"
                  ></motion.div>
                </div>
              </motion.div>

              <div className="flex flex-col flex-1 min-h-0">
                <div className="flex justify-between items-start p-4 flex-shrink-0">
                  <div className="flex-1 min-w-0 pr-4">
                    <motion.h3
                      layoutId={`title-${artwork.title}-${id}`}
                      className="font-semibold text-black text-lg mb-2 break-words"
                    >
                      {displayData &&
                      typeof displayData === "object" &&
                      "title" in displayData
                        ? displayData.title ||
                          artwork.title ||
                          "Untitled art piece"
                        : artwork.title || "Untitled art piece"}
                    </motion.h3>
                    <motion.p
                      layoutId={`artist-${artistName}-${id}`}
                      className="text-black text-base mb-1 break-words"
                    >
                      {displayData &&
                      typeof displayData === "object" &&
                      "artistDisplayName" in displayData
                        ? displayData.artistDisplayName || artistName
                        : artistName}
                    </motion.p>
                    <p className="text-gray-700 text-sm">
                      {displayData &&
                      typeof displayData === "object" &&
                      "dated" in displayData
                        ? displayData.dated || artwork.dated || "Date Unknown"
                        : artwork.dated || "Date Unknown"}
                    </p>
                  </div>

                  <motion.button
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-cyan-200 text-black hover:bg-cyan-500 transition-colors flex-shrink-0"
                  >
                    Save to <br></br> collection
                  </motion.button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 pb-4 min-h-0">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-black text-sm space-y-4"
                  >
                    <div className="space-y-3">
                      {displayData &&
                        typeof displayData === "object" &&
                        "culture" in displayData &&
                        displayData.culture && (
                          <div>
                            <strong className="text-black block mb-1">
                              Culture:
                            </strong>
                            <p className="text-gray-700">
                              {displayData.culture}
                            </p>
                          </div>
                        )}
                      {displayData &&
                        typeof displayData === "object" &&
                        "period" in displayData &&
                        displayData.period && (
                          <div>
                            <strong className="text-black block mb-1">
                              Period:
                            </strong>
                            <p className="text-gray-700">
                              {displayData.period}
                            </p>
                          </div>
                        )}
                      {displayData &&
                        typeof displayData === "object" &&
                        "classification" in displayData &&
                        displayData.classification && (
                          <div>
                            <strong className="text-black block mb-1">
                              Classification:
                            </strong>
                            <p className="text-gray-700">
                              {displayData.classification}
                            </p>
                          </div>
                        )}
                      {displayData &&
                        typeof displayData === "object" &&
                        "medium" in displayData &&
                        displayData.medium && (
                          <div>
                            <strong className="text-black block mb-1">
                              Medium:
                            </strong>
                            <p className="text-gray-700">
                              {displayData.medium}
                            </p>
                          </div>
                        )}
                      {displayData &&
                        typeof displayData === "object" &&
                        "technique" in displayData &&
                        displayData.technique && (
                          <div>
                            <strong className="text-black block mb-1">
                              Technique:
                            </strong>
                            <p className="text-gray-700">
                              {displayData.technique}
                            </p>
                          </div>
                        )}
                      {displayData &&
                        typeof displayData === "object" &&
                        "dimensions" in displayData &&
                        displayData.dimensions && (
                          <div>
                            <strong className="text-black block mb-1">
                              Dimensions:
                            </strong>
                            <p className="text-gray-700">
                              {displayData.dimensions}
                            </p>
                          </div>
                        )}
                      {displayData &&
                        typeof displayData === "object" &&
                        "department" in displayData &&
                        displayData.department && (
                          <div>
                            <strong className="text-black block mb-1">
                              Department:
                            </strong>
                            <p className="text-gray-700">
                              {displayData.department}
                            </p>
                          </div>
                        )}
                      {displayData &&
                        typeof displayData === "object" &&
                        "creditLine" in displayData &&
                        displayData.creditLine && (
                          <div>
                            <strong className="text-black block mb-1">
                              Credit Line:
                            </strong>
                            <p className="text-gray-700">
                              {displayData.creditLine}
                            </p>
                          </div>
                        )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <motion.div
        layoutId={`card-${artwork.title}-${id}`}
        onClick={() => setActive(artwork)}
        className="border rounded-lg shadow-lg overflow-hidden bg-white hover:bg-neutral-50 cursor-pointer transition-colors"
      >
        <motion.div layoutId={`image-${artwork.title}-${id}`}>
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
            <img
              src={imageUrl}
              alt={artwork.title || "Artwork image"}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/No_image_available-museum.svg";
              }}
            />
          </div>
        </motion.div>
        <div className="p-4">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <motion.h3
                layoutId={`title-${artwork.title}-${id}`}
                className="text-lg font-semibold text-gray-900 break-words leading-tight mb-1"
                title={artwork.title}
              >
                {artwork.title || "Untitled art piece"}
              </motion.h3>
              <motion.p
                layoutId={`artist-${artistName}-${id}`}
                className="text-sm text-gray-700 break-words leading-tight"
                title={artistName}
              >
                {artistName}
              </motion.p>
              <p className="text-xs text-gray-600 mt-1">
                {artwork.dated || "Date Unknown"}
              </p>
            </div>
            <button
              className="flex-shrink-0 px-3 py-1 text-xs rounded-full font-medium bg-cyan-200 text-black hover:bg-cyan-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card expansion when clicking the button
              }}
            >
              Save to <br></br> collection
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
