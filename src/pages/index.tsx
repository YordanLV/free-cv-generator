import { useState } from "react";
import useCurrentUrl from "../../hooks/useCurrentUrl";

const HomePage = () => {
  const currentUrl = useCurrentUrl();
  const [isLoading, setIsLoading] = useState(false);

  const downloadPdf = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/generate-pdf?url=${encodeURIComponent(currentUrl)}`
      );
      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "file.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={downloadPdf} disabled={isLoading}>
        {isLoading ? "Loading..." : "Download PDF"}
      </button>
    </div>
  );
};

export default HomePage;
