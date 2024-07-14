"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { GiSwordClash, GiCastle, GiFilmStrip, GiInfo } from "react-icons/gi";

const NavbarItem = () => {
  const router = useRouter();
  return (
    <div className="hidden items-center bg-inherit border-none md:flex md:flex-1 md:justify-center space-x-4">
      <Button
        onClick={() => router.push(`/characters`)}
        className="hover:bg-inherit bg-inherit text-white hover:text-yellow-200 transition-colors duration-300 flex items-center"
      >
        <GiSwordClash className="mr-2" />
        Characters
      </Button>
      <Button
        onClick={() => router.push(`/realms`)}
        className="hover:bg-inherit bg-inherit text-white hover:text-yellow-200 transition-colors duration-300 flex items-center"
      >
        <GiCastle className="mr-2" />
        Realms
      </Button>
      <Button
        onClick={() => router.push(`/movies`)}
        className="hover:bg-inherit bg-inherit text-white hover:text-yellow-200 transition-colors duration-300 flex items-center"
      >
        <GiFilmStrip className="mr-2" />
        Movies
      </Button>
      <Button
        onClick={() => router.push(`/about`)}
        className="hover:bg-inherit bg-inherit text-white hover:text-yellow-200 transition-colors duration-300 flex items-center"
      >
        <GiInfo className="mr-2" />
        About
      </Button>
    </div>
  );
};

export default NavbarItem;
