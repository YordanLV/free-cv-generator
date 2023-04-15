import { SetStateAction, useState } from "react";
import dynamic from "next/dynamic";
import { FiPhone, FiMail, FiLink } from "react-icons/fi";
import Experience from "../../components/Experience";
import Pie from "../../components/Pie";
import BarChart from "../../components/BarChart";
import Block from "../../components/Block";
import BackgroundNav from "../../components/BackgroundNav";
import A4Page from "../../components/A4Page";
import TitleWithBr from "../../components/TitleWithBr";
import RichTextArea from "../../components/RichTextArea";
import ContentEditableWithPlaceholder from "../../components/ContentEditableWithPlaceholder";
import { nameStyle, occupationStyle } from "../styles/styles";

const DownloadClientSide = dynamic(
  () => import("../../components/DownloadClientSide"),
  {
    ssr: false,
  }
);

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bgImg, setBgImg] = useState("");

  const onSetBgImg = (imgUrl: SetStateAction<string>) => {
    setBgImg(imgUrl);
  };

  const downloadPdf = async () => {
    console.log(document.querySelector("#resume")?.outerHTML);
    setIsLoading(true);
    fetch("/api/html-to-pdf", {
      method: "POST",
      body: JSON.stringify({
        html: document.querySelector("#resume")?.outerHTML,
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ position: "absolute", left: 20, top: 200 }}>
        <BackgroundNav onSetBgImg={onSetBgImg} />
      </div>
      <h1>Home Page</h1>
      <DownloadClientSide />
      <button
        style={{ marginTop: "1rem" }}
        onClick={downloadPdf}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Download PDF"}
      </button>
      <div className="relative">
        <A4Page bgImg={bgImg}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <ContentEditableWithPlaceholder
              placeholder="Your Name"
              inputStyle={nameStyle}
            />
            <ContentEditableWithPlaceholder
              placeholder="Occupation"
              inputStyle={occupationStyle}
            />
          </div>
          <div
            style={{
              fontSize: "2rem",
              marginTop: "1rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "1rem",
              }}
            >
              <FiPhone />
              <span style={{ marginLeft: "0.5rem" }}>xxx-xxx-xxx</span>
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "1rem",
              }}
            >
              <FiMail />{" "}
              <span style={{ marginLeft: "0.5rem" }}>xxx-xxx-xxx</span>
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "1rem",
              }}
            >
              <FiLink />{" "}
              <span style={{ marginLeft: "0.5rem" }}>xxx-xxx-xxx</span>
            </span>
          </div>
          <TitleWithBr sectionTitle="RELEVANT EXPERIENCE">
            <Experience />
          </TitleWithBr>
          <RichTextArea />
          {/* <Block title="Skills">
            <Pie />
          </Block>
          <Block title="Skills">
            <BarChart />
          </Block> */}
        </A4Page>
      </div>
    </div>
  );
};

export default HomePage;
