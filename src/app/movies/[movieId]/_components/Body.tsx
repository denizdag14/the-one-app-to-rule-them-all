"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilm, FaCalendarAlt, FaUser, FaUsers } from "react-icons/fa";
import Link from "next/link";
import { getMovie, Movie, Character } from "@/lib/api/getData";
import { GiRing } from "react-icons/gi";
import Image from "next/image";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface TMDBDetails {
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  overview: string;
}

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const Body = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [movie, setMovie] = useState<Movie | null>(null);
  const [tmdbDetails, setTMDBDetails] = useState<TMDBDetails | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (typeof id === "string") {
          const fetchedMovie = await getMovie(id);
          if (!fetchedMovie) return null;
          setMovie(fetchedMovie);
          await fetchCharacters(fetchedMovie.characters);
          await fetchTMDBDetails(fetchedMovie.title);
        }
      } catch (error) {
        console.error("Failed to fetch movie:", error);
        setError("Failed to fetch movie data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
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

  const fetchTMDBDetails = async (title: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          title
        )}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setTMDBDetails(data.results[0]);
      }
    } catch (error) {
      console.error("Failed to fetch TMDB details:", error);
    }
  };

  const parseJsonString = (jsonString: string) => {
    try {
      return Object.values(JSON.parse(jsonString));
    } catch (error) {
      console.error("Failed to parse JSON string:", error);
      return [jsonString];
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return <ErrorMessage message="No movie data available." />;

  const directors = parseJsonString(movie.director);
  const producers = parseJsonString(movie.producer);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: tmdbDetails
            ? `url(https://image.tmdb.org/t/p/original/${tmdbDetails.backdrop_path})`
            : "none",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="bg-gray-200 bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 shadow-2xl rounded-2xl overflow-hidden backdrop-filter backdrop-blur-0">
            <div className="p-8">
              <MovieHeader title={movie.title} />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center p-4 mb-2"
              >
                <Image
                  src={
                    tmdbDetails?.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${tmdbDetails.poster_path}`
                      : "/placeholder-poster.jpg"
                  }
                  alt="movie-poster"
                  width={300}
                  height={450}
                  className="rounded-md shadow-2xl"
                />
              </motion.div>

              {tmdbDetails && (
                <div className="mt-4 flex justify-center">
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar
                      value={tmdbDetails.vote_average * 10}
                      text={`${tmdbDetails.vote_average.toFixed(1)}`}
                      styles={buildStyles({
                        textSize: "24px",
                        pathColor: `rgba(255, 215, 0, ${
                          tmdbDetails.vote_average / 10
                        })`,
                        textColor: "#FFD700",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                  </div>
                </div>
              )}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <MovieInfo
                  icon={FaFilm}
                  label="Director"
                  value={directors.join(", ")}
                />
                <MovieInfo
                  icon={FaUsers}
                  label="Producers"
                  value={producers.join(", ")}
                />
                <MovieInfo
                  icon={FaCalendarAlt}
                  label="Release Date"
                  value={movie.release_date}
                />
              </div>
              {tmdbDetails && tmdbDetails.overview && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Overview
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {tmdbDetails.overview}
                  </p>
                </div>
              )}
              <MovieCharacters characters={characters} />
            </div>
          </div>
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
  <div className="flex items-center justify-center h-screen w-full bg-gray-900">
    <div className="text-2xl font-bold text-red-500 bg-white p-8 rounded-lg shadow-2xl">
      {message}
    </div>
  </div>
);

const MovieHeader = ({ title }: { title: string }) => (
  <motion.h1
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="text-4xl font-extrabold text-center mb-6 text-gray-900 dark:text-white"
  >
    {title}
  </motion.h1>
);

const MovieInfo = ({
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
    whileTap={{ scale: 0.95 }}
    className="bg-white bg-opacity-60 dark:bg-gray-800 dark:bg-opacity-60 p-6 rounded-lg shadow-lg flex items-center transform transition-all duration-300 ease-in-out hover:shadow-2xl backdrop-filter backdrop-blur-sm"
  >
    <Icon className="text-blue-500 mr-4 text-3xl flex-shrink-0" />
    <div>
      <p className="text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wide">
        {label}
      </p>
      <p className="text-gray-900 dark:text-white font-bold text-lg mt-1">
        {value}
      </p>
    </div>
  </motion.div>
);

const MovieCharacters = ({ characters }: { characters: Character[] }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="mt-12"
  >
    <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white text-center">
      Featured Characters
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {characters.map((character, index) => (
        <motion.div
          key={character.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white bg-opacity-60 dark:bg-gray-800 dark:bg-opacity-60 p-4 rounded-lg text-center shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-filter backdrop-blur-sm"
        >
          <Link href={`/characters/${character.id}`}>
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg hover:underline">
              {character.name}
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default Body;
