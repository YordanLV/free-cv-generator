import { sectionsStateAtom } from "@/recoil/sectionsState";
import React from "react";
import { uid } from "react-uid";
import { useRecoilState } from "recoil";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";

export default function BarChart(): JSX.Element {
  const [sectionsState, setSectionsState] = useRecoilState(sectionsStateAtom);

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData("text/plain", event.currentTarget.id);
    event.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData("text/plain");
    const targetId = event.currentTarget.id;
    if (sourceId !== targetId) {
      const newOrder = Array.from(sectionsState.keys());
      const sourceIndex = newOrder.indexOf(sourceId);
      const targetIndex = newOrder.indexOf(targetId);
      newOrder.splice(sourceIndex, 1);
      newOrder.splice(targetIndex, 0, sourceId);
      const newSectionsState = new Map(
        newOrder.map((key) => [key, sectionsState.get(key)])
      );
      setSectionsState(newSectionsState);
    }
  }

  const mappedElements = Array.from(sectionsState.keys()).map((key, value) => {
    console.log(value);
    return (
      <div className="p-1 w-full text-center" key={uid(key)}>
        <div
          id={key}
          draggable={true}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="p-2.5 bg-sky-500 text-color text-white font-bold border-black cursor-move"
        >
          {capitalizeFirstLetter(key)}
        </div>
      </div>
    );
  });

  return (
    <div className="w-full border border-black p-2.5">{mappedElements}</div>
  );
}
