import { useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
import colorSchemes from "../../theme/colorSchemes";
import convertImageToBase64 from "../../../utils/imageToBase64";
import { colorCirclesStyle } from "../../styles/styles";
import { uid } from "react-uid";
import MiniMap from "../miniMap/MiniMap";

const bgFiles = ["1.jpg", "2.jpg", "3.jpg", "5.jpg", "6.jpg"];

type SideNav = {
  onSetBgImg: any;
};

export default function TitleWithBr({ onSetBgImg }: SideNav) {
  const { collapseSidebar } = useProSidebar();

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

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar>
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
          <SubMenu label="Arrangement">
            <MiniMap />
          </SubMenu>
          <MenuItem> Examples</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
