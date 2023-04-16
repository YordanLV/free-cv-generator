import Experience from "@/sections/Experience";
import Skills from "@/sections/Skills";
import { atom } from "recoil";

const sections: Record<string, JSX.Element> = {
  experience: <Experience />,
  skills: <Skills />,
};

export const sectionsStateAtom = atom({
  key: "sectionsState", // unique ID (with respect to other atoms/selectors)
  default: new Map<string, JSX.Element>([
    ["experience", sections.experience],
    ["skills", sections.skills],
  ]),
});
