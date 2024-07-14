"use client";

import { Card } from "@/components/ui/card";
import { getMovies, Movies } from "@/lib/api/getData";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GiRing } from "react-icons/gi";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const moviesTMDBIds = [
  {
    name: "lotr1",
    id: 120,
    poster_path: "",
  },
  {
    name: "lotr2",
    id: 121,
    poster_path: "",
  },
  {
    name: "lotr3",
    id: 122,
    poster_path: "",
  },
  {
    name: "hobbit1",
    id: 49051,
    poster_path: "",
  },
  {
    name: "hobbit2",
    id: 57158,
    poster_path: "",
  },
  {
    name: "hobbit3",
    id: 122917,
    poster_path: "",
  },
];

const Body = () => {
  const [movies, setMovies] = useState<Movies[] | null>(null);
  const [posterPath, setPosterPath] = useState<
    | {
        name: string;
        id: number;
        poster_path: string;
      }[]
    | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await getMovies();
      if (fetchedMovies) {
        setMovies(fetchedMovies);
        const posterPath = await fetchPosterPaths(moviesTMDBIds);
        setPosterPath(posterPath);
      } else {
        setError("Failed to fetch movies.");
      }
    };

    fetchMovies();
  }, []);

  const fetchPosterPaths = async (movies: { name: string; id: number }[]) => {
    try {
      const moviesWithPosterPaths = await Promise.all(
        movies.map(async (movie) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`
          );
          const data = await response.json();
          return {
            name: movie.name,
            id: movie.id,
            poster_path: data.poster_path,
          };
        })
      );
      return moviesWithPosterPaths;
    } catch (error) {
      console.error("Failed to fetch poster paths:", error);
      return [];
    }
  };

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (!movies) {
    return <LoadingDisplay />;
  }

  return (
    <div className="mx-auto p-20 pt-8 min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-200 dark:from-gray-900 dark:to-gray-800">
      <motion.h1
        className="text-4xl mt-4 md:text-6xl font-extrabold text-center mb-8 text-yellow-800 dark:text-yellow-200"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Movie Collection
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {movies.map((movie, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/movies/${movie.id}`}>
              <Card className="p-6 w-full h-full rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="relative w-full pb-[150%] mb-4">
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${
                      posterPath && posterPath[index].poster_path
                    }`}
                    alt={`${movie.title} poster`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h2 className="text-2xl font-extrabold text-center text-yellow-800 dark:text-yellow-200">
                  {movie.title}
                </h2>
              </Card>
            </Link>
          </motion.div>
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

export default Body;
