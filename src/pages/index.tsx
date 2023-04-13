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
          fontFamily:
            'Montserrat, Arial, Helvetica, "Noto Sans Devanagari", "Noto Sans CJK SC Thin", "Noto Sans SC", "Noto Sans Hebrew", sans-serif;',
          zIndex: "0",
          width: "21cm",
          height: "29.7cm",
          backgroundColor: "#ffffff",
          padding: "2.5rem",
          borderRadius: 8,
          boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
          backgroundImage:
            'url("https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg?w=2000&t=st=1681361795~exp=1681362395~hmac=895cef0595478fc36d06a721a3745c2f5cf70ea7d96d29d596e506e2c52825f8")',
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <div contentEditable style={{ fontSize: "2rem", fontWeight: "bold" }}>
            Your Name
          </div>
          <div
            contentEditable
            style={{ fontSize: "1.25rem", fontWeight: "bold" }}
          >
            Occupation
          </div>
        </div>
        <div
          style={{
            fontSize: "2rem",
            marginTop: "1rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <span
            style={{ display: "flex", alignItems: "center", fontSize: "1rem" }}
          >
            <FiPhone />
            <span style={{ marginLeft: "0.5rem" }}>xxx-xxx-xxx</span>
          </span>
          <span
            style={{ display: "flex", alignItems: "center", fontSize: "1rem" }}
          >
            <FiMail /> <span style={{ marginLeft: "0.5rem" }}>xxx-xxx-xxx</span>
          </span>
          <span
            style={{ display: "flex", alignItems: "center", fontSize: "1rem" }}
          >
            <FiLink /> <span style={{ marginLeft: "0.5rem" }}>xxx-xxx-xxx</span>
          </span>
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
