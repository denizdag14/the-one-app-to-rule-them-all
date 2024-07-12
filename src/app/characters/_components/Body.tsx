"use client";

import { Card } from "@/components/ui/card";
import { getCharacters, Character } from "@/lib/api/getData";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!characters) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {characters.map((character, index) => (
          <motion.div
            key={character.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/characters/${character.id}`}>
              <Card className="p-6 w-full h-full hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
                <h2 className="text-xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 animate-shimmer">
                  {character.name}
                </h2>
                <div className="border-b w-full mb-4"></div>
                <div className="text-center text-gray-600 dark:text-gray-300">
                  <p>Height: {character.height}</p>
                  <p>Gender: {character.gender}</p>
                  <p>Birth: {character.date_of_birth}</p>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Body;
