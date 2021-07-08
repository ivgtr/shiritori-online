import React from "react";

export const Container: React.FC = ({ children }) => {
  return <div className="App container flex flex-col h-full mx-auto pt-4 px-4">{children}</div>;
};
