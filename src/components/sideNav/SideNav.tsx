import { useEffect, useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import colorSchemes from "../../theme/colorSchemes";
import convertImageToBase64 from "../../../utils/imageToBase64";
import { colorCirclesStyle } from "../../styles/styles";
import { AiOutlineAppstore } from "react-icons/ai";
import { uid } from "react-uid";
import dynamic from "next/dynamic";
import { BsDownload } from "react-icons/bs";

const MiniMap = dynamic(import("../miniMap/MiniMap"), {
  ssr: false,
});

const bgFiles = ["1.jpg", "2.jpg", "3.jpg", "5.jpg", "6.jpg"];

type SideNav = {
  onSetBgImg: any;
};

export default function TitleWithBr({ onSetBgImg }: SideNav) {
  const { collapseSidebar } = useProSidebar();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
      if (window.innerWidth <= 800) {
        collapseSidebar();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [collapseSidebar]);

  const downloadPdf = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/html-to-pdf", {
        method: "POST",
        body: JSON.stringify({
          html: document.querySelector("#resume")?.outerHTML,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document.pdf";
      a.click();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Sidebar width="500px">
        <Menu renderExpandIcon={({ open }) => <span>{open ? "-" : "+"}</span>}>
          <SubMenu label="Backgrounds">
            <ul className="flex flex-col gap-2 py-2 ">
              {bgFiles.map((bg, index) => (
                <li key={index} className="flex w-full">
                  <img
                    onClick={async () => {
                      const imgSrc = `background/${bg}`;
                      const base64Img = await convertImageToBase64(imgSrc);
                      onSetBgImg(base64Img);
                    }}
                    className="cursor-pointer object-cover border-2 border-black w-full h-24"
                    src={`background/${bg}`}
                  />
                </li>
              ))}
            </ul>
          </SubMenu>
          <SubMenu label="Colors">
            {colorSchemes.map((colors) => {
              return (
                <div
                  key={uid(colors)}
                  style={{ padding: "0 1rem", marginBottom: "1rem" }}
                >
                  <div
                    style={{
                      margin: "0.5rem 0",
                      fontWeight: "bold",
                      borderBottom: "1px solid black",
                    }}
                  >
                    {colors.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: colors.primary,
                        ...colorCirclesStyle,
                      }}
                    />
                    <div
                      style={{
                        backgroundColor: colors.secondary,
                        ...colorCirclesStyle,
                      }}
                    />
                    <div
                      style={{
                        backgroundColor: colors.alternative,
                        ...colorCirclesStyle,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </SubMenu>
          <SubMenu label="Arrangement" icon={<AiOutlineAppstore />}>
            <MiniMap />
          </SubMenu>
          <MenuItem
            disabled={isLoading}
            icon={<BsDownload />}
            onClick={() => downloadPdf()}
          >
            Download PDF {isLoading}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
