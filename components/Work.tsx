import Draggable from "../src/svgs/draggable";
import WorkItem from "./WorkItem";
import React, { useState } from "react";

interface Item {
  column: string;
  index: number;
}

interface ItemData {
  content: string;
  date: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Record<string, ItemData[]>>({
    column1: [
      {
        content: "Number 1",
        data: { title: "My Dick" },
        date: new Date().toISOString(),
      },
      { content: "Number 2", date: new Date().toISOString() },
    ],
  });

  const [draggedItem, setDraggedItem] = useState<Item | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    column: string,
    index: number
  ) => {
    setDraggedItem({ column, index });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetColumn: string,
    targetIndex: number
  ) => {
    if (draggedItem) {
      const newItems = { ...items };

      // Swap the dragged item with the target item
      const temp = newItems[draggedItem.column][draggedItem.index];
      newItems[draggedItem.column][draggedItem.index] =
        newItems[targetColumn][targetIndex];
      newItems[targetColumn][targetIndex] = temp;

      // Update the date of the target item
      newItems[targetColumn][targetIndex].date = new Date().toISOString();

      setItems(newItems);
      setDraggedItem(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <div className="columns">
        {Object.keys(items).map((column) => (
          <div key={column} onDragOver={handleDragOver}>
            {items[column].map((item, index) => (
              <div
                key={`${column}-${index}`}
                style={{
                  position: "relative",
                  cursor: "pointer",
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, column, index)}
                onDrop={(e) => handleDrop(e, column, index)}
              >
                <div>
                  {item.content}{" "}
                  <WorkItem key={item.content} data={item.data} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
