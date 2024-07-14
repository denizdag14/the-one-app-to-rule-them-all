import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">
              About This App
            </h1>
            <p className="mb-4">
              Welcome to our Lord of the Rings (LOTR) app! This application is
              designed to provide fans with a convenient way to explore various
              aspects of the LOTR universe, including characters, realms, and
              more.
            </p>
            <p className="mb-4">
              The information presented in this app is sourced from a publicly
              available LOTR API. Due to the limitations of the API, we can only
              offer the data that it provides. As such, some details and aspects
              of the extensive lore of J.R.R. Tolkien&apos;s world may not be
              covered.
            </p>
            <p className="mb-4">
              We strive to offer accurate and interesting information, but
              please understand that the app&apos;s content is dependent on the
              available API data. We appreciate your understanding and support
              as we continue to develop and enhance the features and content of
              the app.
            </p>
            <p className="text-center font-semibold">
              Thank you for using our app, and may your journey through
              Middle-earth be an enjoyable one!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
