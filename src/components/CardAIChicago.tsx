"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { AIChicagoArtwork } from "@/types/AIChicagoInterfaces";
import { AnimatePresence, motion } from "motion/react";
import { Lens } from "@/ui/lens";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface ArtworkCardProps {
  artwork: AIChicagoArtwork & { imageUrl?: string };
} // Getting imageUrl as a workaround to avoid modifying the original object

// Aceternity expandable card component
export function CardAIChicago({ artwork }: ArtworkCardProps) {
  const [active, setActive] = useState<AIChicagoArtwork | boolean | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

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

  const imageUrl = artwork.imageUrl || "/No_image_available-museum.svg";

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
              key={`button-${active.title}-${id}`}
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
                        alt={active.title || "Artwork image"}
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
                      {active.title || "Untitled art piece"}
                    </motion.h3>
                    <motion.p
                      layoutId={`artist-${artwork.artist_title}-${id}`}
                      className="text-black text-base mb-1 break-words"
                    >
                      {active.artist_title || "Unknown Artist"}
                    </motion.p>
                    <p className="text-gray-700 text-sm">
                      {active.date_display || "Date Unknown"}
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
                      {active.place_of_origin && (
                        <div>
                          <strong className="text-black block mb-1">
                            Place of Origin:
                          </strong>
                          <p className="text-gray-700">
                            {active.place_of_origin}
                          </p>
                        </div>
                      )}
                      {active.artwork_type_title && (
                        <div>
                          <strong className="text-black block mb-1">
                            Artwork Type:
                          </strong>
                          <p className="text-gray-700">
                            {active.artwork_type_title}
                          </p>
                        </div>
                      )}
                      {active.medium_display && (
                        <div>
                          <strong className="text-black block mb-1">
                            Medium:
                          </strong>
                          <p className="text-gray-700">
                            {active.medium_display}
                          </p>
                        </div>
                      )}
                      {active.dimensions && (
                        <div>
                          <strong className="text-black block mb-1">
                            Dimensions:
                          </strong>
                          <p className="text-gray-700">{active.dimensions}</p>
                        </div>
                      )}
                      {active.style_title && (
                        <div>
                          <strong className="text-black block mb-1">
                            Style:
                          </strong>
                          <p className="text-gray-700">{active.style_title}</p>
                        </div>
                      )}
                      {active.classification_title && (
                        <div>
                          <strong className="text-black block mb-1">
                            Classification:
                          </strong>
                          <p className="text-gray-700">
                            {active.classification_title}
                          </p>
                        </div>
                      )}
                      {active.department_title && (
                        <div>
                          <strong className="text-black block mb-1">
                            Department:
                          </strong>
                          <p className="text-gray-700">
                            {active.department_title}
                          </p>
                        </div>
                      )}
                      {active.is_public_domain !== undefined && (
                        <div>
                          <strong className="text-black block mb-1">
                            Public Domain:
                          </strong>
                          <p className="text-gray-700">
                            {active.is_public_domain ? "Yes" : "No"}
                          </p>
                        </div>
                      )}
                      {active.description && (
                        <div>
                          <strong className="text-black block mb-1">
                            Description:
                          </strong>
                          <div
                            className="text-gray-700 prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: active.description,
                            }}
                          />
                        </div>
                      )}
                      {active.credit_line && (
                        <div>
                          <strong className="text-black block mb-1">
                            Credit:
                          </strong>
                          <p className="text-gray-700">{active.credit_line}</p>
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
                layoutId={`artist-${artwork.artist_title}-${id}`}
                className="text-sm text-gray-700 break-words leading-tight"
                title={artwork.artist_title}
              >
                {artwork.artist_title || "Unknown Artist"}
              </motion.p>
              <p className="text-xs text-gray-600 mt-1">
                {artwork.date_display || "Date Unknown"}
              </p>
            </div>
            <button
              className="flex-shrink-0 px-3 py-1 text-xs rounded-full font-medium bg-cyan-200 text-black hover:bg-cyan-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card expansion when clicking the button
              }}
            >
              Save to<br></br> collection
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
