import { useEffect, useState } from "react";
import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import convertImageToBase64 from "../utils/imageToBase64";

const bgFiles = ["1.jpg", "2.jpg", "3.jpg", "5.jpg", "6.jpg"];

const SideNav = () => (
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
          <Nav.Menu eventKey="3" title="Advanced" icon={<MagicIcon />}>
            <Nav.Item eventKey="3-1">Geo</Nav.Item>
            <Nav.Item eventKey="3-2">Devices</Nav.Item>
            <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
            <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
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

function SideNavOld({ onSetBgImg }) {
  const [isBgOpen, setIsBgOpen] = useState(false);
  const openBgDropdown = () => {
    if (isBgOpen) {
      setIsBgOpen(false);
      return;
    }
    setIsBgOpen(true);
  };
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
          height: isBgOpen ? "300px" : "40px",
          fontSize: "2rem",
          overflow: "scroll",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "1s",
        }}
      >
        <div style={{ position: "sticky", top: 0 }}>Backgrounds</div>
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
                    onClick={async () => {
                      const imgSrc = `background/${bg}`;
                      const base64Img = await convertImageToBase64(imgSrc);
                      onSetBgImg(base64Img);
                    }}
                    style={{
                      objectFit: "cover",
                    }}
                    height={250}
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

export default SideNav;
