import React, { useState } from "react";

interface Item {
  column: string;
  index: number;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Record<string, string[]>>({
    column1: ["Item 1", "Item 2", "Item 3"],
    column2: ["Item 4", "Item 5", "Item 6"],
    column3: ["Item 7", "Item 8", "Item 9"],
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
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
