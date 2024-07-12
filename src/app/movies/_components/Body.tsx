"use client";

import { Card } from "@/components/ui/card";
import { getMovies, Movie } from "@/lib/api/getData";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {};

const Body = (props: Props) => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await getMovies();
      if (fetchedMovies) {
        setMovies(fetchedMovies);
      } else {
        setError("Failed to fetch movies.");
      }
    };

    fetchMovies();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100">
        <div className="text-2xl font-bold text-red-500">{error}</div>
      </div>
    );
  }

  if (!movies) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold animate-bounce">Loading...</div>
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
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/movies/${movie.id}`}>
              <Card className="p-6 w-full h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl rounded-lg bg-gradient-to-br from-yellow-50 via-yellow-200 to-yellow-400 dark:from-yellow-800 dark:via-yellow-600 dark:to-yellow-400">
                <h2 className="text-2xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700 dark:from-yellow-300 dark:to-yellow-500 animate-shimmer">
                  {movie.title}
                </h2>
                <div className="border-b border-yellow-400 dark:border-yellow-600 w-full mb-4"></div>
                <div className="text-center text-gray-700 dark:text-gray-200">
                  <p className="mb-2">
                    <strong>Director:</strong> {movie.director}
                  </p>
                  <p className="mb-2">
                    <strong>Producers:</strong> {movie.producer}
                  </p>
                  <p className="mb-2">
                    <strong>Release Date:</strong> {movie.release_date}
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
