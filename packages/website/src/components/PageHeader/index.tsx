import React, { CSSProperties } from "react";

const titleStyle: CSSProperties = {
  fontFamily: "'Otomanopee One', sans-serif",
};

export const PageHeader = () => {
  return (
    <header>
      <h1>
        <span className="font-black text-4xl" style={titleStyle}>
          しりとりオンライン
        </span>
      </h1>
    </header>
  );
};
