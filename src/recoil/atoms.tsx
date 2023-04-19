import { useRecoilValue } from "recoil";
import { combinedAtomsSelector } from "./combinedAtomsSelector";

function useExportAtomsAsJson() {
  const combinedAtoms = useRecoilValue(combinedAtomsSelector);
  return JSON.stringify(combinedAtoms);
}
