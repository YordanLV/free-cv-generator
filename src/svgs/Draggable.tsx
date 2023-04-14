import React from "react";

const Draggable: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "25px" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 123 193"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx="21.5" cy="21.5" r="21.5" fill="#A8A8A8" />
        <circle cx="101.5" cy="21.5" r="21.5" fill="#A8A8A8" />
        <circle cx="21.5" cy="96.5" r="21.5" fill="#A8A8A8" />
        <circle cx="101.5" cy="96.5" r="21.5" fill="#A8A8A8" />
        <circle cx="21.5" cy="171.5" r="21.5" fill="#A8A8A8" />
        <circle cx="101.5" cy="171.5" r="21.5" fill="#A8A8A8" />
        <circle
          cx="21.5"
          cy="171.5"
          r="21.5"
          transform="rotate(-180 21.5 171.5)"
          fill="#A8A8A8"
        />
        <circle
          cx="101.5"
          cy="171.5"
          r="21.5"
          transform="rotate(-180 101.5 171.5)"
          fill="#A8A8A8"
        />
        <circle cx="101.5" cy="21.5" r="21.5" fill="#A8A8A8" />
      </svg>
    </div>
  );
};

export default Draggable;
