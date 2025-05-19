"use client";
import React, { useState } from "react";
import { Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavMenu({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem
          setActive={setActive}
          active={active}
          activeProps={{ className: "font-bold" }}
          item="CuraNook"
          to="/"
        ></MenuItem>
        <MenuItem
          setActive={setActive}
          active={active}
          activeProps={{ className: "font-bold" }}
          item="Your Collections"
          to="/collections"
        ></MenuItem>
        <MenuItem
          setActive={setActive}
          active={active}
          activeProps={{ className: "font-bold" }}
          item="Log in"
          to="/login"
        ></MenuItem>
      </Menu>
    </div>
  );
}
