import { useEffect, useState } from "react";

const bgFiles = ["1.jpg", "2.jpg", "3.jpg", "5.jpg", "6.jpg"];

export default function SideNav({ onSetBgImg }) {
  const [isBgOpen, setIsBgOpen] = useState(false);
  const openBgDropdown = () => {
    if (isBgOpen) {
      setIsBgOpen(false);
      return;
    }
    setIsBgOpen(true);
  };

  useEffect(() => {});
  return (
    <>
      <div
        style={{
          fontSize: "2rem",
          textDecoration: "underline",
          marginBottom: "0.5rem",
        }}
      >
        Settings
      </div>
      <div
        onClick={openBgDropdown}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          alignItems: isBgOpen ? "top" : "centre",
          background: "orange",
          padding: "2px 5px",
          width: isBgOpen ? "200px" : "140px",
          borderRadius: "5px",
          height: isBgOpen ? "auto" : "40px",
          fontSize: "2rem",
          overflow: "hidden",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "1s",
        }}
      >
        <div>Backgrounds</div>
        {isBgOpen && (
          <div
            style={{
              marginTop: "3rem",
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
            }}
          >
            {bgFiles.map((bg) => {
              console.log(`background/${bg}`);
              return (
                <div style={{ border: "4px solid black" }} key={bg}>
                  <img
                    onClick={() => onSetBgImg(`background/${bg}`)}
                    style={{
                      objectFit: "cover",
                    }}
                    width={180}
                    src={`background/${bg}`}
                  />{" "}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
