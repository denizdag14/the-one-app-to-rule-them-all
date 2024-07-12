import React from "react";
import {
  Menubar,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "./ui/menubar";
import { GiSwordClash, GiCastle, GiBookCover } from "react-icons/gi";

const NavbarItem = () => {
  return (
    <Menubar className="hidden bg-inherit border-none md:flex space-x-4">
      <MenubarMenu>
        <MenubarTrigger className="bg-inherit text-white hover:text-yellow-200 transition-colors duration-300 flex items-center">
          <GiSwordClash className="mr-2" />
          Characters
        </MenubarTrigger>
        <MenubarContent className="bg-yellow-600 border-none">
          <MenubarItem className="text-white hover:bg-yellow-500 transition-colors duration-200">
            Mans
          </MenubarItem>
          <MenubarItem className="text-white hover:bg-yellow-500 transition-colors duration-200">
            Hobbits
          </MenubarItem>
          <MenubarItem className="text-white hover:bg-yellow-500 transition-colors duration-200">
            Elves
          </MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger className="text-white hover:bg-yellow-500 transition-colors duration-200">
              Movies
            </MenubarSubTrigger>
            <MenubarSubContent className="bg-yellow-600 border-none">
              <MenubarItem className="text-white hover:bg-yellow-500 transition-colors duration-200">
                The Hobbit
              </MenubarItem>
              <MenubarItem className="text-white hover:bg-yellow-500 transition-colors duration-200">
                The Lord of the Rings
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="bg-inherit text-white hover:text-yellow-200 transition-colors duration-300 flex items-center">
          <GiCastle className="mr-2" />
          Places
        </MenubarTrigger>
        <MenubarContent className="bg-yellow-600 border-none">
          <MenubarItem className="text-white hover:bg-yellow-500 transition-colors duration-200">
            Gondor
          </MenubarItem>
          <MenubarItem className="text-white hover:bg-yellow-500 transition-colors duration-200">
            Mordor
          </MenubarItem>
          <MenubarItem className="text-white hover:bg-yellow-500 transition-colors duration-200">
            Rohan
          </MenubarItem>
          <MenubarItem className="text-white hover:bg-yellow-500 transition-colors duration-200">
            Other Places
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="bg-inherit text-white hover:text-yellow-200 transition-colors duration-300 flex items-center">
          <GiBookCover className="mr-2" />
          Movies & Books
        </MenubarTrigger>
        <MenubarContent className="bg-yellow-600 border-none">
          <MenubarItem className="text-white hover:bg-yellow-500 transition-colors duration-200">
            Books
          </MenubarItem>
          <MenubarItem className="text-white hover:bg-yellow-500 transition-colors duration-200">
            Movies
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default NavbarItem;
