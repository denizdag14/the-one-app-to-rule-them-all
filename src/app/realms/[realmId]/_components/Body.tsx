"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { GiCastle, GiRing } from "react-icons/gi";
import Link from "next/link";
import { getRealm, Realm, Character } from "@/lib/api/getData";

const Body = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [realm, setRealm] = useState<Realm | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRealm = async () => {
      try {
        const response = await fetch(`https://lotrapi.co/api/v1/realms/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch realm data");
        }
        const data = await response.json();
        setRealm(data);
        await fetchCharacters(data.characters);
      } catch (error) {
        setError("Failed to fetch realm data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRealm();
  }, [id]);

  const fetchCharacters = async (characterUrls: string[]) => {
    try {
      const characterPromises = characterUrls.map((url) =>
        fetch(url).then((res) => res.json())
      );
      const characterData = await Promise.all(characterPromises);
      setCharacters(characterData);
    } catch (error) {
      console.error("Failed to fetch character data:", error);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!realm) return <ErrorMessage message="No realm data available." />;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="p-8">
          <RealmHeader name={realm.name} />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <RealmInfo icon={GiCastle} label="Type" value={realm.type} />
            <RealmInfo
              icon={FaMapMarkerAlt}
              label="Location"
              value={realm.location}
            />
            <RealmInfo
              icon={FaCalendarAlt}
              label="Founded"
              value={realm.founded_date}
            />
            <RealmInfo
              icon={FaUsers}
              label="Inhabitants"
              value={realm.inhabitants.join(", ")}
            />
          </div>
          <RealmCharacters characters={characters} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen w-full">
    <GiRing className="w-16 h-16 text-yellow-500 border-solid rounded-full animate-spin border-t-transparent" />
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center h-64">
    <div className="text-2xl font-bold text-red-500">{message}</div>
  </div>
);

const RealmHeader = ({ name }: { name: string }) => (
  <motion.h1
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
  >
    {name}
  </motion.h1>
);

const RealmInfo = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md flex items-center"
  >
    <Icon className="text-blue-500 mr-3 text-2xl flex-shrink-0" />
    <div>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{label}</p>
      <p className="text-gray-900 dark:text-white font-semibold">{value}</p>
    </div>
  </motion.div>
);

const RealmCharacters = ({ characters }: { characters: Character[] }) => (
  <div className="mt-8">
    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
      Notable Characters
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {characters.map((character) => (
        <motion.div
          key={character.id}
          whileHover={{ scale: 1.05 }}
          className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg text-center shadow-md"
        >
          <Link href={`/characters/${character.id}`}>
            <p className="text-blue-800 dark:text-blue-200 font-medium hover:underline">
              {character.name}
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Body;
