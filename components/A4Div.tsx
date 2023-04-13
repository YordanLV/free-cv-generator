import React from "react";

const A4Div = ({ children }) => {
  return (
    <div
      id="resume"
      style={{
        zIndex: "0",
        width: "21cm",
        height: "29.7cm",
        backgroundColor: "#ffffff",
        padding: "1rem",
        borderRadius: 8,
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      {children}
    </div>
  );
};

export default A4Div;
