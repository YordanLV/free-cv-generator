import { Fragment, SetStateAction, useState } from "react";
import { FiPhone, FiMail, FiLink } from "react-icons/fi";
import A4Page from "../components/a4Page/A4Page";
import MainNav from "../components/sideNav/SideNav";
import ContentEditableWithPlaceholder from "../components/contentEditableWithPlaceholder/ContentEditableWithPlaceholder";
import { uid } from "react-uid";
import { useRecoilState } from "recoil";
import {
  elements,
  leftColumnState,
  rightColumnState,
} from "@/recoil/sectionsAtoms";
import style from "../styles/index.module.css";

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
                className={style.nameStyle}
              />
              <ContentEditableWithPlaceholder
                placeholder="Occupation"
                className={style.occupationStyle}
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
                <ContentEditableWithPlaceholder
                  placeholder="xxx-xxx-xxx"
                  className={style.headerItems}
                />
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              >
                <FiMail />{" "}
                <ContentEditableWithPlaceholder
                  placeholder="joe@email.com"
                  className={style.headerItems}
                />
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              >
                <FiLink />{" "}
                <ContentEditableWithPlaceholder
                  placeholder="Website"
                  className={style.headerItems}
                />
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
