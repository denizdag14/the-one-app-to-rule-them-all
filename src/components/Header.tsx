import React from "react";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <div className="w-full p-4">
      <h1 className="text-4xl text-center font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 animate-shimmer">
        {title}
      </h1>
      <div className="w-full mt-4 border-b"></div>
    </div>
  );
};

export default Header;
