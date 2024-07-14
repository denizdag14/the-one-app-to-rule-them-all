"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        src="/middle-earth-landscape.jpg"
        layout="fill"
        objectFit="cover"
        alt="Middle-earth landscape"
        className="brightness-50"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-transparent bg-clip-text bg-gradient-to-r dark:from-yellow-200 dark:via-yellow-400 dark:to-yellow-200 from-yellow-400 via-yellow-600 to-yellow-400 animate-shimmer z-10">
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Middle-earth
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-12 text-center max-w-2xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Embark on an epic journey through the realms of J.R.R. Tolkien&apos;s
          legendary universe
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link
            href="/movies"
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
          >
            Explore Movies
          </Link>
          <Link
            href="/characters"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
          >
            Meet Characters
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute top-4 left-4">
        <Image src="/one-ring.png" width={50} height={50} alt="The One Ring" />
      </div>
    </div>
  );
};

export default HomePage;
