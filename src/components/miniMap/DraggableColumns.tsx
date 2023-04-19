import { rightColumnState, leftColumnState } from "@/recoil/sectionsAtoms";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { FiMove } from "react-icons/fi";

interface OnDragEndParams {
  result: any;
  columns: Record<string, Column>;
  setColumns: React.Dispatch<React.SetStateAction<Record<string, Column>>>;
}

interface Task {
  id: string;
  content: string;
}

interface Column {
  name: string;
  items: Task[];
  width: string;
}

const onDragEnd = ({ result, columns, setColumns }: OnDragEndParams) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const DraggableColumns: React.FC = ({ totalColumnCount }: any) => {
  const [leftColumnContent, setLeftColumnContent] =
    useRecoilState(leftColumnState);
  const [rightColumnContent, setRightColumnContent] =
    useRecoilState(rightColumnState);

  const leftColumnArray = leftColumnContent?.map((content, index) => {
    return { id: String(index + 1), content };
  });

  const rightColumnArray = rightColumnContent?.map((content, index) => {
    return { id: String(index + 1), content };
  });

  const taskStatus = {
    leftColumnContent: {
      name: "Right Column",
      items: leftColumnArray,
      width: "100%",
    },
    rightColumnContent: {
      name: "Right Column",
      items: rightColumnArray,
      width: "40%",
    },
  };

  const [columns, setColumns] = useState(taskStatus);
  setLeftColumnContent(columns.leftColumnContent.items);
  setRightColumnContent(columns.rightColumnContent.items);
  return (
    <div className="p-4">
      <div className="p-4 w-full h-full text-center bg-lime-400 mb-2">
        Header
      </div>
      <div className="flex flex-row gap-2">
        <DragDropContext
          onDragEnd={(result) => onDragEnd({ result, columns, setColumns })}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            const shouldRender =
              totalColumnCount == index + 1 ||
              index === Object.keys(columns).length - 2;

            if (shouldRender) {
              const width = column.width;
              return (
                <div key={columnId} style={{ width }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className={`p-4 w-full h-full text-center ${
                            snapshot.isDraggingOver
                              ? "bg-blue-200"
                              : "bg-gray-200"
                          }`}
                        >
                          Column {index + 1}
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`relative  select-none p-4 my-2 min-h-12 ${
                                        snapshot.isDragging
                                          ? "bg-blue-800 opacity-70"
                                          : "bg-blue-600"
                                      } text-white`}
                                      style={provided.draggableProps.style}
                                    >
                                      <div className="absolute top-2 left-2">
                                        <FiMove />
                                      </div>
                                      {capitalizeFirstLetter(item.content)}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              );
            }
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default DraggableColumns;
