"use client";

import React, { useState, useEffect } from "react";
import { GiRing } from "react-icons/gi";
import { Menu, Search, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavbarItem from "./NavbarItem";
import NavbarDrawer from "./NavbarDrawer";
import { useTheme } from "next-themes";
import TopNavbarSkeleton from "./TopNavbarSkeleton";
import { useRouter } from "next/navigation";

const TopNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const menuItems = ["Characters", "Realms", "Movies", "About"];
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <TopNavbarSkeleton />;
  }

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-yellow-800 to-yellow-600 py-2 px-3 shadow-lg">
      <div className="flex items-center pr-4 pl-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden mr-2 text-white hover:bg-yellow-500/20 transition-all duration-300 ease-in-out transform hover:scale-110"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <div className="flex flex-1 justify-center mr-10 md:justify-between items-center">
          <div className="flex items-center">
            <div
              onClick={() => router.push("/")}
              className="flex cursor-pointer flex-col items-center group justify-center text-center"
            >
              <GiRing className=" text-yellow-300 text-2xl sm:text-3xl group-hover:animate-spin transition-all duration-500" />
              <h1 className="font-bold font-serif text-lg sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 animate-shimmer">
                The One Website
              </h1>
              <span className="font-sans text-yellow-200 text-xs italic">
                to rule them all
              </span>
            </div>
          </div>
          <NavbarItem />
          <div className="hidden md:flex md:justify-end relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-yellow-200 pointer-events-none" />{" "}
            <Input
              placeholder="not functional..."
              className="pl-8 bg-yellow-500/30 hover:bg-yellow-500/40 focus:bg-yellow-500/50 transition-all duration-300 border-none outline-none ring-0 focus:ring-2 ring-yellow-300 focus:ring-yellow-300 focus-visible:ring-yellow-300 placeholder:text-yellow-200/70 text-white w-40 focus:w-60"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-white hover:bg-yellow-500/20 transition-all duration-300 ease-in-out transform hover:rotate-12 ml-2"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
      <NavbarDrawer
        menuItems={menuItems}
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(false)}
      />
    </div>
  );
};

export default TopNavbar;
