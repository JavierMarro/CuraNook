import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { LampContainer } from "@/ui/lamp-container";
import { TypewriterEffectSmooth } from "@/ui/typewriter-effect";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const words = [
    {
      text: "Welcome",
      className: "text-black dark:text-black ",
    },
    {
      text: "to",
      className: "text-black dark:text-black ",
    },
    {
      text: "CuraNook",
      className: "text-cyan-900 dark:text-cyan-900 ",
    },
  ];

  return (
    <>
      <div className="relative w-full flex flex-col items-center justify-center min-h-screen">
        <LampContainer>
          <TypewriterEffectSmooth words={words} />
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-4 md:mt-8 max-w-2xl px-5 md:px-0 bg-gradient-to-br from-slate-500 to-black py-2 md:py-4 bg-clip-text text-center text-base sm:text-lg md:text-2xl font-medium tracking-tight text-transparent"
          >
            CuraNook is a platform where you can explore combined collections of
            antiquities and fine art from The Metropolitan Museum and Harvard
            Art Museums. Whether you are a researcher, student, or art
            enthusiast, click down below and start creating your own
            exhibitions.
          </motion.h1>
          <Link
            to="/browse"
            preload="intent"
            className="relative px-6 py-3 bg-cyan-900 text-white rounded-lg shadow-lg hover:bg-cyan-800 transition mt-6 inline-block group"
          >
            Browse Artwork here
          </Link>
        </LampContainer>
      </div>
    </>
  );
}
