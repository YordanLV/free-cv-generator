import WorkItem from "./WorkItem";
import React, { useState } from "react";

interface Item {
  column: string;
  index: number;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Record<string, string[]>>({
    column1: [
      "Number 1",
      "Number 2",
      "Number 3",
      "Number 4",
      "Number 5",
      "Number 6",
      "Number 7",
      "Number 8",
      "Number 9",
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
            <h2>{column}</h2>
            {items[column].map((item, index) => (
              <div
                key={`${column}-${index}`}
                draggable
                onDragStart={(e) => handleDragStart(e, column, index)}
                onDrop={(e) => handleDrop(e, column, index)}
              >
                <div>
                  {item} <WorkItem />
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
