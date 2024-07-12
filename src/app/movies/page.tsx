import React from "react";
import Header from "../../components/Header";
import Body from "./_components/Body";

const page = () => {
  return (
    <>
      <Header title="Movies" />
      <div className="w-full h-full flex items-center justify-center">
        <Body />
      </div>
    </>
  );
};

export default page;
