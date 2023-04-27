import ExperienceItem from "./ExperienceItem";
import React, { useState } from "react";
import { styles } from "./Experiencee.style";
import TitleWithBr from "../components/titleWithBr/TitleWithBr";
import ContentEditableWithPlaceholder from "@/components/contentEditableWithPlaceholder/ContentEditableWithPlaceholder";
import SectionName from "../components/titleWithBr/TitleWithBr";
import { fieldsStyles } from "@/styles/fileds.style";

interface Item {
  column: string;
  index: number;
}

interface ItemData {
  content: string;
  date: string;
}

const Experience: React.FC = () => {
  const [items, setItems] = useState<{ [key: string]: ItemData[] }>({
    column1: [
      {
        content: "Number 1",
        data: { title: "My Duck" },
        date: new Date().toISOString(),
      },
      { content: "Number 2", date: new Date().toISOString() },
    ],
  });

  const [showAddMore, setShowAddMore] = useState(false);
  const [draggedItem, setDraggedItem] = useState<Item | null>(null);
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);

  const addExperienceItem = () => {
    const newItem: ItemData = {
      content: "Number 3",
      data: { title: "Your Duck" },
      date: new Date().toISOString(),
    };
    setItems({
      ...items,
      column1: [...items.column1, newItem],
    });
  };

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

  const handleMouseEnter = (index: number) => {
    setHoveredItemIndex(index);
    setShowAddMore(items.column1.length === index + 1);
  };

  const handleMouseLeave = () => {
    setHoveredItemIndex(null);
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
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div style={styles.aboveOverlay}>
                    <div style={styles.itemTitle}>{item.content}</div>
                    {hoveredItemIndex === index && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          transform: "translateX(-50%)",
                        }}
                      >
                        <button>Damn</button>
                      </div>
                    )}
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
        {showAddMore && (
          <button
            className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold"
            onClick={addExperienceItem}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
};

const ExperienceComponent = () => {
  return (
    <>
      <TitleWithBr defaultValue="Experience" />
      <Experience />
    </>
  );
};

export default ExperienceComponent;
