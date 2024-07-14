"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getCharacter, Character } from "@/lib/api/getData";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserAlt,
  FaBirthdayCake,
  FaSkull,
  FaRulerVertical,
} from "react-icons/fa";
import { GiCrossedSwords, GiEyeTarget, GiRing } from "react-icons/gi";
import { MdColorLens } from "react-icons/md";

const CharacterProfile = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        if (typeof id === "string") {
          const fetchedCharacter = await getCharacter(id);
          setCharacter(fetchedCharacter);
        }
      } catch (error) {
        console.error("Failed to fetch character:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (isLoading) return <LoadingScreen />;
  if (!character) return <ErrorScreen />;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br w-full bg-gray-100 dark:bg-gray-900 text-white p-4 sm:p-8"
      >
        <div className="max-w-7xl mx-auto">
          <Header name={character.name} />
          <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <CharacterImage name={character.name} />
            <CharacterInfo character={character} />
          </main>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen w-full">
    <GiRing className="w-16 h-16 text-yellow-500 border-solid rounded-full animate-spin border-t-transparent" />
  </div>
);

const ErrorScreen = () => (
  <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
    <h1 className="text-3xl font-bold">Character not found</h1>
  </div>
);

const Header = ({ name }: { name: string }) => (
  <motion.header
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="text-center"
  >
    <h1 className="text-5xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 animate-shimmer p-2">
      {name}
    </h1>
  </motion.header>
);

const CharacterImage = ({ name }: { name: string }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="relative w-96 h-96 lg:h-auto lg:col-span-1"
  >
    <Image
      src={`/${name.split(" ")[0]}.webp`}
      alt={name}
      layout="fill"
      objectFit="cover"
      className="rounded-lg shadow-2xl"
    />
  </motion.div>
);

const CharacterInfo = ({ character }: { character: Character }) => (
  <div className="lg:col-span-2 space-y-6">
    <InfoSection
      title="Personal Details"
      items={[
        { icon: FaUserAlt, label: "Gender", value: character.gender },
        {
          icon: FaBirthdayCake,
          label: "Date of Birth",
          value: character.date_of_birth,
        },
        {
          icon: FaSkull,
          label: "Date of Death",
          value: character.date_of_death,
        },
        { icon: FaRulerVertical, label: "Height", value: character.height },
      ]}
    />
    <InfoSection
      title="Appearance"
      items={[
        { icon: MdColorLens, label: "Hair Color", value: character.hair_color },
        { icon: GiEyeTarget, label: "Eye Color", value: character.eye_color },
      ]}
    />
    <InfoSection
      title="Combat"
      items={[
        {
          icon: GiCrossedSwords,
          label: "Weapons",
          value: character.weapons.join(", "),
        },
      ]}
    />
  </div>
);

const InfoSection = ({
  title,
  items,
}: {
  title: string;
  items: { icon: React.ElementType; label: string; value: string }[];
}) => (
  <motion.section
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="dark:bg-gray-800 bg-gray-200 rounded-lg p-6 shadow-lg"
  >
    <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-400">
      {title}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, index) => (
        <InfoItem
          key={index}
          icon={item.icon}
          label={item.label}
          value={item.value}
        />
      ))}
    </div>
  </motion.section>
);

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex items-center space-x-3">
    <Icon className="text-purple-500 text-xl" />
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-black dark:text-white font-medium">{value}</p>
    </div>
  </div>
);

export default CharacterProfile;
