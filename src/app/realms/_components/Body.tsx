"use client";

import { Card } from "@/components/ui/card";
import { getRealms, Realm } from "@/lib/api/getData";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCrown, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { GiRing } from "react-icons/gi";

const Body = () => {
  const [realms, setRealms] = useState<Realm[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRealms = async () => {
      try {
        const fetchedRealms = await getRealms();
        setRealms(fetchedRealms);
      } catch (error) {
        setError("Failed to fetch realms.");
      }
    };

    fetchRealms();
  }, []);

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (!realms) {
    return <LoadingDisplay />;
  }

  return (
    <div className="mx-auto p-20 pt-8 min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-200 dark:from-gray-900 dark:to-gray-800">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r dark:from-yellow-200 dark:via-yellow-400 dark:to-yellow-200 from-yellow-400 via-yellow-600 to-yellow-400 animate-shimmer"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Realms of Middle-earth
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {realms.map((realm, index) => (
          <RealmCard key={realm.id} realm={realm} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center h-screen bg-red-100 dark:bg-red-900">
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

const RealmCard = ({ realm, index }: { realm: Realm; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Link href={`/realms/${realm.id}`}>
      <Card className="p-6 w-full h-full rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r dark:from-yellow-200 dark:via-yellow-400 dark:to-yellow-200 from-yellow-400 via-yellow-600 to-yellow-400 animate-shimmer">
            {realm.name}
          </h2>
          <div className="flex-grow flex flex-col justify-center space-y-4">
            <RealmInfo icon={FaCrown} label="Type" value={realm.type} />
            <RealmInfo
              icon={FaMapMarkerAlt}
              label="Location"
              value={realm.location}
            />
            <RealmInfo
              icon={FaUsers}
              label="Inhabitants"
              value={realm.inhabitants.join(", ")}
            />
          </div>
        </div>
      </Card>
    </Link>
  </motion.div>
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
  <div className="flex items-center text-gray-700 dark:text-gray-300">
    <Icon className="mr-2 text-yellow-500" />
    <span className="font-semibold mr-2">{label}:</span>
    <span>{value}</span>
  </div>
);

export default Body;
