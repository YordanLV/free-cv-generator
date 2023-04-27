import { selector } from "recoil";
import { leftColumnState, rightColumnState } from "./sectionsAtoms";

export const combinedAtomsSelector = selector({
  key: "combinedAtoms",
  get: ({ get }) => {
    return {
      leftColumnState: get(leftColumnState),
      rightColumnState: get(rightColumnState),
      // Include any other atoms you want to export
    };
  },
});
