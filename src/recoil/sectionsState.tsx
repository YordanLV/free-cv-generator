import Experience from "@/sections/Experience";
import Skills from "@/sections/Skills";
import { atom } from "recoil";

export const elements: Record<string, JSX.Element> = {
  experience: <Experience />,
  skills: <Skills />,
};

export const leftColumnState = atom({
  key: "rightColumnState", // unique ID (with respect to other atoms/selectors)
  default: ["experience"],
});

export const rightColumnState = atom({
  key: "leftColumnState", // unique ID (with respect to other atoms/selectors)
  default: [],
});
