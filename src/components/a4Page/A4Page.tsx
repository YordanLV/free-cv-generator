// A4Page.tsx
import React, { useRef, useState, useEffect, ReactNode } from "react";

interface A4PageProps {
  bgImg: string;
  children: ReactNode;
}

const A4Page: React.FC<A4PageProps> = ({ bgImg, children }) => {
  return (
    <div
      id="resume"
      style={{
        fontFamily: "Verdana,Geneva,sans-serif;",
        zIndex: "0",
        width: "21cm",
        height: "29.7cm",
        backgroundColor: "#ffffff",
        padding: "2.5rem",
        borderRadius: 8,
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
        backgroundSize: "cover",
        backgroundRepeat: "none",
        backgroundImage: bgImg ? `url(${bgImg})` : "none",
      }}
    >
      {children}
    </div>
  );
};

export default A4Page;
