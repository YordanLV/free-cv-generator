import { useState } from "react";
import useCurrentUrl from "../../hooks/useCurrentUrl";
import dynamic from "next/dynamic";
import { FiPhone, FiMail, FiLink } from "react-icons/fi";
import Column from "../../components/Column";
import Pie from "../../components/Pie";
import BarChart from "../../components/BarChart";
import Block from "../../components/Block";

const DownloadClientSide = dynamic(
  () => import("../../components/DownloadClientSide"),
  {
    ssr: false,
  }
);

const HomePage = () => {
  const currentUrl = useCurrentUrl();
  const [isLoading, setIsLoading] = useState(false);

  const downloadPdf = async () => {
    console.log(document.querySelector("#resume")?.outerHTML);
    setIsLoading(true);
    fetch("/api/html-to-pdf", {
      method: "POST",
      body: JSON.stringify({
        html: document.querySelector("#resume")?.innerHTML,
      }), // Send the stringified HTML document in the request body
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // Get the PDF as a blob from the response
        return response.blob();
      })
      .then((blob) => {
        // Create a URL for the PDF blob and download it
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "document.pdf";
        a.click();
      })
      .catch((error) => {
        console.error(error);
      });
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Home Page</h1>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>Your Name</div>
        </div>
        <div
          style={{
            marginTop: "1rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}
        >
          <span style={{ fontSize: "1rem" }}>Phone: xxx-xxx-xxx</span>
          <span style={{ fontSize: "1rem" }}>Email: xxx-xxx-xxx</span>
          <span style={{ fontSize: "1rem" }}>Website: xxx-xxx-xxx</span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
          <div style={{ width: "100%" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              Experience
            </h2>
            <hr style={{ width: "100%" }} />
            <Column />
          </div>
        </div>
        <Block title="Skills">
          <Pie />
        </Block>
        <Block title="Skills">
          <BarChart />
        </Block>
      </div>
      <DownloadClientSide />
      <button
        style={{ marginTop: "1rem" }}
        onClick={downloadPdf}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Download PDF"}
      </button>
    </div>
  );
};

export default HomePage;
