import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { LampContainer } from "@/ui/lamp";
import { TypewriterEffectSmooth } from "@/ui/typewriter-effect";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const words = [
    {
      text: "Welcome",
      className: "text-black dark:text-black",
    },
    {
      text: "to",
      className: "text-black dark:text-black",
    },
    {
      text: "CuraNook.",
      className: "text-cyan-900 dark:text-cyan-900",
    },
  ];
  return (
    <>
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
          className="mt-8 bg-gradient-to-br from-slate-500 to-black py-4 bg-clip-text text-center text-xl font-medium tracking-tight text-transparent  md:text-2xl"
        >
          CuraNook is a platform where users can explore virtual exhibitions
          from combined
          <br /> collections of antiquities and fine art from The Metropolitan
          Museum and Harvard Art Museums. <br /> Whether you are a researcher,
          student, or art enthusiast, click down below <br />
          and start creating your own exhibitions.
        </motion.h1>
        <button type="button">Browse Artwork here</button>
      </LampContainer>
    </>
  );
}
