import React from "react";
import Body from "./_components/Body";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto">
        <Body />
      </div>
    </div>
  );
};

export default page;
