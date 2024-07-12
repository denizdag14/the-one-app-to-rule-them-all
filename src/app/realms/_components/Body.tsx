"use client";

import { Card } from "@/components/ui/card";
import { getRealms, Realm } from "@/lib/api/getData";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {};

const Body = (props: Props) => {
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
    return (
      <div className="flex items-center justify-center h-screen bg-red-100">
        <div className="text-2xl font-bold text-red-500">{error}</div>
      </div>
    );
  }

  if (!realms) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {realms.map((realm, index) => (
          <motion.div
            key={realm.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/realms/${realm.id}`}>
              <Card className="p-6 w-full h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl rounded-lg bg-gradient-to-br from-yellow-50 via-yellow-200 to-yellow-400 dark:from-yellow-800 dark:via-yellow-600 dark:to-yellow-400">
                <h2 className="text-2xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700 dark:from-yellow-300 dark:to-yellow-500 animate-shimmer">
                  {realm.name}
                </h2>
                <div className="border-b border-yellow-400 dark:border-yellow-600 w-full mb-4"></div>
                <div className="text-center text-gray-700 dark:text-gray-200">
                  <p className="mb-2">
                    <strong>Location:</strong> {realm.location}
                  </p>
                  <p className="mb-2">
                    <strong>Type:</strong> {realm.type}
                  </p>
                  <p className="mb-2">
                    <strong>Founded Date:</strong> {realm.founded_date}
                  </p>
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
