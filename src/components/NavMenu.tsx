"use client";
import { useState } from "react";
import { Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useLocation } from "@tanstack/react-router";

export function NavMenu({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const location = useLocation();

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
        {location.pathname === "/browse" ? (
          <MenuItem
            setActive={setActive}
            active={active}
            activeProps={{ className: "font-bold" }}
            item="My collections"
            to="/collections"
          ></MenuItem>
        ) : (
          <MenuItem
            setActive={setActive}
            active={active}
            activeProps={{ className: "font-bold" }}
            item="Browse artworks"
            to="/browse"
          ></MenuItem>
        )}
        {/* TODO: <MenuItem
          setActive={setActive}
          active={active}
          activeProps={{ className: "font-bold" }}
          item="Log in"
          to="/login"
        ></MenuItem> */}
      </Menu>
    </div>
  );
}
