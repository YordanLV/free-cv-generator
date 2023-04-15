import ExperienceItem from "./ExperienceItem";
import React, { useState } from "react";
import style from "./Experience.module.css";

interface Item {
  column: string;
  index: number;
}

interface ItemData {
  content: string;
  date: string;
}

const Experience: React.FC = () => {
  const [items, setItems] = useState({
    column1: [
      {
        content: "Number 1",
        data: { title: "My Dick" },
        date: new Date().toISOString(),
      },
      { content: "Number 2", date: new Date().toISOString() },
    ],
  });

  const addExperienceItem = () => {
    const newItem = {
      content: "Number 3",
      data: { title: "Your Dick" },
      date: new Date().toISOString(),
    };
    setItems({
      ...items,
      column1: [...items.column1, newItem],
    });
  };

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
    <div>
      <div>
        {Object.keys(items).map((column) => (
          <div key={column} onDragOver={handleDragOver}>
            {items[column].map((item, index) => {
              return (
                <div
                  key={`${column}-${index}`}
                  style={{
                    position: "relative",
                    cursor: "grab",
                    borderBottom:
                      index + 1 === items[column].length
                        ? "none"
                        : "0.25rem dashed #dedcdc",
                    marginBottom: "1rem",
                  }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, column, index)}
                  onDrop={(e) => handleDrop(e, column, index)}
                >
                  <div className={style.aboveOverlay}>
                    <div className={style.itemTitle}>{item.content}</div>
                    <ExperienceItem
                      key={item.content}
                      data={item.data}
                      style={undefined}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <button onClick={addExperienceItem}>Add Item</button>
      </div>
    </div>
  );
};

export default Experience;
