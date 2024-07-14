"use client";

import React from "react";
import {
  GiCastle,
  GiFilmStrip,
  GiInfo,
  GiRing,
  GiWarlockEye,
} from "react-icons/gi";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  sidebarOpen: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  menuItems: string[];
};

const NavbarDrawer = ({ sidebarOpen, toggleSidebar, menuItems }: Props) => {
  const router = useRouter();
  return (
    <Sheet open={sidebarOpen} onOpenChange={toggleSidebar}>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] bg-gradient-to-r from-yellow-800 to-yellow-600 text-white p-6 border-none"
      >
        <SheetHeader className="flex flex-col items-start mb-8">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center group">
              <GiRing className="mr-3 text-yellow-300 text-4xl group-hover:animate-spin transition-all duration-500" />
              <div className="flex flex-col">
                <SheetTitle className="font-bold font-serif text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 animate-shimmer">
                  The One Website
                </SheetTitle>
                <span className="font-sans text-yellow-200 text-sm italic mt-1">
                  to rule them all
                </span>
              </div>
            </div>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-yellow-500/20 transition-all duration-300 ease-in-out transform hover:rotate-90"
              >
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item}
              variant="ghost"
              className="justify-start rounded-lg text-lg font-medium text-white hover:bg-yellow-500/30 hover:text-yellow-100 transition-all duration-300 ease-in-out transform hover:translate-x-2"
              onClick={() => {
                toggleSidebar(false);
                router.push(`/${item.toLocaleLowerCase()}`);
              }}
            >
              {item === "Characters" ? (
                <GiWarlockEye className="mr-2" />
              ) : item === "Movies" ? (
                <GiFilmStrip className="mr-2" />
              ) : item === "About" ? (
                <GiInfo className="mr-2" />
              ) : (
                <GiCastle className="mr-2" />
              )}
              {item}
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarDrawer;
