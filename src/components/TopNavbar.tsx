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

const TopNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuItems = ["Characters", "Places", "Books"];
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) {
    return <TopNavbarSkeleton />;
  }

  return (
    <div className="bg-gradient-to-r from-yellow-800 to-yellow-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden mr-2 text-white hover:bg-yellow-500/20 transition-all duration-300 ease-in-out transform hover:scale-110"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center group">
            <GiRing className="mr-3 text-yellow-300 text-4xl group-hover:animate-spin transition-all duration-500" />
            <div className="flex flex-col">
              <h1 className="font-bold font-serif text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 animate-shimmer">
                The One App
              </h1>
              <span className="font-sans text-yellow-200 text-sm italic mt-1">
                to rule them all
              </span>
            </div>
          </div>
        </div>

        <NavbarItem />

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-yellow-200 pointer-events-none" />
            <Input
              placeholder="Search…"
              className="pl-8 bg-yellow-500/30 hover:bg-yellow-500/40 focus:bg-yellow-500/50 transition-all duration-300
               border-none outline-none ring-0 focus:ring-2 ring-yellow-300 focus:ring-yellow-300 focus-visible:ring-yellow-300
               placeholder:text-yellow-200/70 text-white w-40 focus:w-60"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-white hover:bg-yellow-500/20 transition-all duration-300 ease-in-out transform hover:rotate-12"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
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
