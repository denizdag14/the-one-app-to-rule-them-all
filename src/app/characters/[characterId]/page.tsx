import Header from "@/components/Header";
import React from "react";
import Body from "./_components/Body";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Body />
    </div>
  );
};

export default page;
