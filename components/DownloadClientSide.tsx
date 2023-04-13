import html2pdf from "html2pdf.js";

const DownloadClientSide = () => {
  const downloadClientSIde = () => {
    const element = document.getElementById("resume");
    html2pdf(element);
  };

  return <button onClick={downloadClientSIde}>Client Side</button>;
};

export default DownloadClientSide;
