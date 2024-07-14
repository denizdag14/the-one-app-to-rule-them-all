"use client";

import { Card } from "@/components/ui/card";
import { getCharacters, Character } from "@/lib/api/getData";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GiRing } from "react-icons/gi";

const Body = () => {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      const fetchedCharacters = await getCharacters();
      if (fetchedCharacters) {
        setCharacters(fetchedCharacters);
      } else {
        setError("Failed to fetch characters.");
      }
    };

    fetchCharacters();
  }, []);

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (!characters) {
    return <LoadingDisplay />;
  }

  return (
    <div className="mx-auto p-20 pt-8 min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-200 dark:from-gray-900 dark:to-gray-800">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-center mb-8 text-yellow-800 dark:text-yellow-200 mt-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Lord of the Rings Characters
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {characters.map((character, index) => (
          <CharacterCard
            key={character.id}
            character={character}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center h-screen w-screen bg-red-100 dark:bg-red-900">
    <div className="text-3xl font-bold text-red-600 dark:text-red-300 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl">
      {message}
    </div>
  </div>
);

const LoadingDisplay = () => (
  <div className="flex items-center justify-center h-screen w-full">
    <GiRing className="w-16 h-16 text-yellow-500 border-solid rounded-full animate-spin border-t-transparent" />
  </div>
);

const CharacterCard = ({
  character,
  index,
}: {
  character: Character;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Link href={`/characters/${character.id}`}>
      <Card className="p-6 w-full h-full rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <div className="relative w-full pb-[100%] mb-4">
          <Image
            src={`/${character.name.split(" ")[0]}.webp`}
            alt={`${character.name} photo`}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <h2 className="text-2xl font-extrabold text-center text-yellow-800 dark:text-yellow-200">
          {character.name}
        </h2>
      </Card>
    </Link>
  </motion.div>
);

export default Body;
