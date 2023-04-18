import { Fragment, SetStateAction, useState } from "react";
import { FiPhone, FiMail, FiLink } from "react-icons/fi";
import A4Page from "../components/a4Page/A4Page";
import { nameStyle, occupationStyle } from "../styles/styles";
import MainNav from "../components/sideNav/SideNav";
import ContentEditableWithPlaceholder from "../components/contentEditableWithPlaceholder/ContentEditableWithPlaceholder";
import { uid } from "react-uid";
import { useRecoilState } from "recoil";
import {
  elements,
  leftColumnState,
  rightColumnState,
} from "@/recoil/sectionsAtoms";

const HomePage = () => {
  const [bgImg, setBgImg] = useState("");
  const [rightColumnContent] = useRecoilState(rightColumnState);
  const [leftColumnContent] = useRecoilState(leftColumnState);

  const onSetBgImg = (imgUrl: SetStateAction<string>) => {
    setBgImg(imgUrl);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 50,
        }}
      >
        <MainNav onSetBgImg={onSetBgImg} />
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
            <div style={{ display: "flex", flexDirection: "row", gap: "24px" }}>
              <div style={{ width: "60%" }}>
                {leftColumnContent.map((content) => {
                  return (
                    <Fragment key={uid(content)}>
                      {elements[content.content]}
                    </Fragment>
                  );
                })}
              </div>
              <div style={{ width: "40%" }}>
                {rightColumnContent.map((content) => {
                  return (
                    <Fragment key={uid(content)}>
                      {elements[content.content]}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </A4Page>
        </div>
      </div>
    </>
  );
};

export default HomePage;
