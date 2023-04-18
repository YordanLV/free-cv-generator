import { selector } from "recoil";
import { leftColumnState, rightColumnState } from "./sectionsAtoms";

export const combinedAtomsSelector = selector({
  key: "combinedAtoms",
  get: ({ get }) => {
    return {
      atom1: get(leftColumnState),
      atom2: get(rightColumnState),
      // Include any other atoms you want to export
    };
  },
});

console.log(combinedAtomsSelector);
