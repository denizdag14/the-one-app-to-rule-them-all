"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getCharacter, Character } from "@/lib/api/getData";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineCake,
  HiOutlineEye,
  HiOutlineStar,
} from "react-icons/hi";
import { GiSwordClash, GiDeathSkull, GiBodyHeight } from "react-icons/gi";
import { IoMdColorFill } from "react-icons/io";

const Body = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        if (typeof id === "string") {
          const fetchedCharacter = await getCharacter(id);
          if (fetchedCharacter) {
            setCharacter(fetchedCharacter);
          } else {
            setError("Character not found.");
          }
        }
      } catch (error) {
        setError("Failed to fetch character.");
      }
    };

    fetchCharacter();
  }, [id]);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center h-screen"
      >
        <div className="text-3xl font-bold text-red-500 animate-bounce">
          {error}
        </div>
      </motion.div>
    );
  }

  if (!character) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-3xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-8">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 animate-shimmer"
          >
            {character.name}
          </motion.h1>
          <div className="border-b-2 border-yellow-400 dark:border-yellow-600 w-full mb-6"></div>
          <div className="flex flex-col lg:flex-row items-start justify-between">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-1/2 mb-6 lg:mb-0 flex justify-center lg:justify-start"
            >
              <Image
                src={`/${character.name.split(" ")[0]}.webp`}
                alt={"character_photo"}
                height={500}
                width={500}
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </motion.div>
            <div className="w-full lg:w-1/2 lg:pl-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CharacterInfo
                  label="Weapons"
                  value={character.weapons.join(", ")}
                />
                <CharacterInfo label="Height" value={character.height} />
                <CharacterInfo
                  label="Hair Color"
                  value={character.hair_color}
                />
                <CharacterInfo label="Eye Color" value={character.eye_color} />
                <CharacterInfo
                  label="Date of Birth"
                  value={character.date_of_birth}
                />
                <CharacterInfo
                  label="Date of Death"
                  value={character.date_of_death}
                />
                <CharacterInfo label="Gender" value={character.gender} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

type IconMapKey =
  | "Weapons"
  | "Height"
  | "Hair Color"
  | "Eye Color"
  | "Date of Birth"
  | "Date of Death"
  | "Gender";

const iconMap: Record<
  IconMapKey,
  React.ComponentType<{ className?: string }>
> = {
  Weapons: GiSwordClash,
  Height: GiBodyHeight,
  "Hair Color": IoMdColorFill,
  "Eye Color": HiOutlineEye,
  "Date of Birth": HiOutlineCake,
  "Date of Death": GiDeathSkull,
  Gender: HiOutlineUser,
};

const CharacterInfo = ({
  label,
  value,
}: {
  label: IconMapKey;
  value: string;
}) => {
  const Icon = iconMap[label] || HiOutlineStar;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md flex items-center"
    >
      <Icon className="text-yellow-500 mr-3 text-xl flex-shrink-0" />
      <div>
        <p className="text-gray-800 dark:text-gray-200">
          <span className="font-semibold">{label}:</span> {value}
        </p>
      </div>
    </motion.div>
  );
};

export default Body;
