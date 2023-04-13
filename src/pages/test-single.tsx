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
    targetColumn: string
  ) => {
    if (draggedItem) {
      const newItems = { ...items };
      const item = newItems[draggedItem.column].splice(draggedItem.index, 1)[0];
      newItems[targetColumn].push(item);
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
          <div
            key={column}
            onDrop={(e) => handleDrop(e, column)}
            onDragOver={handleDragOver}
          >
            <h2>{column}</h2>
            {items[column].map((item, index) => (
              <div
                key={`${column}-${index}`}
                draggable
                onDragStart={(e) => handleDragStart(e, column, index)}
              >
                <div>{item}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
