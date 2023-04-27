import { useRecoilValue } from "recoil";
import { combinedAtomsSelector } from "./combinedAtomsSelector";

export default function useExportAtomsAsJson() {
  const combinedAtoms = useRecoilValue(combinedAtomsSelector);
  return combinedAtoms;
}
