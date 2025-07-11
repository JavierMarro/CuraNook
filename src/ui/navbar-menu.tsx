"use client";
import React from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  to,
  children,
  activeProps,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  to?: string;
  href?: string;
  children?: React.ReactNode;
  activeProps?: React.HTMLAttributes<HTMLElement>;
}) => {
  const isActive = active === item;
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-lg md:text-xl xl:text-2xl hover:opacity-[0.9] text-white"
      >
        {to ? (
          <Link to={to} {...(isActive ? activeProps : {})}>
            {item}
          </Link>
        ) : (
          item
        )}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-cyan-900 backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2]  shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-3"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full border border-transparent bg-cyan-900 shadow-input flex justify-center space-x-10 md:space-x-15 xl:space-x-15 px-8 py-5 -mt-2 opacity-99"
    >
      {children}
    </nav>
  );
};
