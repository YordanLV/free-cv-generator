import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import convertImageToBase64 from "../utils/imageToBase64";
import "rsuite/dist/rsuite.css";
import colorSchemes from "../src/theme/colorSchemes";
import { colorCirclesStyle } from "../src/styles/styles";

const bgFiles = ["1.jpg", "2.jpg", "3.jpg", "5.jpg", "6.jpg"];

type SideNav = {
  onSetBgImg: any;
};

const MainNav = ({ onSetBgImg }: SideNav) => (
  <div style={{ width: 240 }}>
    <Sidenav defaultOpenKeys={["3", "4"]}>
      <Sidenav.Body>
        <Nav activeKey="1">
          <Nav.Item eventKey="1" icon={<DashboardIcon />}>
            Dashboard
          </Nav.Item>
          <Nav.Item eventKey="2" icon={<GroupIcon />}>
            User Group
          </Nav.Item>
          <Nav.Menu eventKey="3" title="Background" icon={<MagicIcon />}>
            <div className="grid content-center">
              {bgFiles.map((bg, index) => {
                return (
                  <Nav.Item key={index} eventKey={`3-${index}`}>
                    <img
                      onClick={async () => {
                        const imgSrc = `background/${bg}`;
                        const base64Img = await convertImageToBase64(imgSrc);
                        onSetBgImg(base64Img);
                      }}
                      style={{
                        objectFit: "cover",
                        border: "2px solid black",
                        width: "50%",
                        marginBottom: "1rem",
                      }}
                      height={100}
                      src={`background/${bg}`}
                    />{" "}
                  </Nav.Item>
                );
              })}
            </div>
          </Nav.Menu>
          <Nav.Menu eventKey="5" title="Colors" icon={<GearCircleIcon />}>
            {colorSchemes.map((colors) => {
              return (
                <Nav.Item eventKey="5-1" key={colors.name}>
                  <div style={{ padding: "0 1rem", marginBottom: "1rem" }}>
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
                </Nav.Item>
              );
            })}
          </Nav.Menu>
          <Nav.Menu eventKey="4" title="Settings" icon={<GearCircleIcon />}>
            <Nav.Item eventKey="4-1">Applications</Nav.Item>
            <Nav.Item eventKey="4-2">Channels</Nav.Item>
            <Nav.Item eventKey="4-3">Versions</Nav.Item>
            <Nav.Menu eventKey="4-5" title="Custom Action">
              <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
              <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
            </Nav.Menu>
          </Nav.Menu>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  </div>
);

export default MainNav;
