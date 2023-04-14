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
        backgroundImage: bgImg
          ? `url(${bgImg})`
          : "url(https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg?w=2000&t=st=1681361795~exp=1681362395~hmac=895cef0595478fc36d06a721a3745c2f5cf70ea7d96d29d596e506e2c52825f8)",
      }}
    >
      {children}
    </div>
  );
};

export default A4Page;
