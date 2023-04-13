import { useState } from "react";
import useCurrentUrl from "../../hooks/useCurrentUrl";
import dynamic from "next/dynamic";
import A4Div from "../../components/A4Div";
import A4container from "../../components/A4Div";
import Columns from "../../components/Column";
import { FiPhone, FiMail, FiLink } from "react-icons/fi";

const DownloadClientSide = dynamic(
  () => import("../../components/DownloadClientSide"),
  {
    ssr: false,
  }
);

const HomePage = () => {
  //   const currentUrl = useCurrentUrl();
  //   const [isLoading, setIsLoading] = useState(false);

  //   const downloadPdf = async () => {
  //     setIsLoading(true);

  //     try {
  //       const response = await fetch(
  //         `/api/generate-pdf?url=${encodeURIComponent(currentUrl)}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to generate PDF");
  //       }
  //       const blob = await response.blob();
  //       const url = URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.download = "file.pdf";
  //       link.click();
  //       URL.revokeObjectURL(url);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  return (
    <div>
      <h1>Home Page</h1>
      <A4Div>
        <div className="flex justify-center">
          <div
            contentEditable
            className="text-black text-[2rem] tracking-wider"
          >
            Your Name
          </div>
        </div>
        <div className="flex flex-row justify-around items-center mt-2">
          <div className="flex flex-row gap-1 align-middle">
            <span className="text-[1.5rem]">
              <FiPhone />
            </span>
            <span contentEditable>xxx-xxx-xxx</span>
          </div>
          <div className="flex flex-row gap-1 align-middle">
            <span className="text-[1.5rem]">
              <FiMail />
            </span>
            <span contentEditable>joe@example.com</span>
          </div>
          <div className="flex flex-row gap-1 align-middle">
            <span className="text-[1.5rem]">
              <FiLink />
            </span>
            <span contentEditable>joe@doe.com</span>
          </div>
        </div>
        <Columns />
      </A4Div>
      <DownloadClientSide />
      {/* <button onClick={downloadPdf} disabled={isLoading}>
        {isLoading ? "Loading..." : "Download PDF"}
      </button> */}
    </div>
  );
};

export default HomePage;
