"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full rounded-md z-0",
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center ">
        <div className="relative w-[85%] h-[80%] rounded-2xl overflow-hidden">
          <video
            className="w-full h-full object-cover opacity-15 pointer-events-none"
            src="/exhibition-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* <div className="absolute inset-0 bg-grey/50" aria-hidden="true" /> */}
        </div>
      </div>
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-400 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-400 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[38rem] -translate-y-20 sm:-translate-y-[0rem] md:-translate-y-[0rem] lg:-translate-y-[0rem] xl:-translate-y-[2rem] rounded-full bg-cyan-500 opacity-70 blur-3xl"></div>
        <motion.div
          initial={{ width: "14rem" }}
          whileInView={{ width: "26rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[3rem] sm:-translate-y-[-3rem] md:-translate-y-[-2rem] lg:-translate-y-[0rem] xl:-translate-y-[-1rem] 2xl:-translate-y-[-2rem] rounded-full bg-cyan-200 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "24rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className=" absolute inset-auto z-50 h-0.5 w-3/4 sm:w-[24rem] md:w-[30rem] -translate-y-[8rem] sm:-translate-y-[2rem] md:-translate-y-[5rem] lg:-translate-y-[3rem] xl:-translate-y-[4rem] 2xl:-translate-y-[5rem] bg-cyan-500
  "
        ></motion.div>

        <div className="absolute inset-auto z-40 h-60 w-full -translate-y-[19.5rem] "></div>
      </div>

      <div className="relative z-50 flex -translate-y-32 sm:-translate-y-20 md:-translate-y-20 lg:-translate-y-20 xl:-translate-y-25 2xl:-translate-y-45 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
