import { rightColumnState, leftColumnState } from "@/recoil/sectionsState";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";

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

const DraggableColumns: React.FC = () => {
  const [leftColumnContent, setLeftColumnContent] =
    useRecoilState(leftColumnState);
  const [rightColumnContent, setRightColumnContent] =
    useRecoilState(rightColumnState);

  const leftColumnArray = leftColumnContent.map((content, index) => {
    return { id: String(index + 1), content };
  });

  const rightColumnArray = rightColumnContent.map((content, index) => {
    return { id: String(index + 1), content };
  });

  const taskStatus: any = {
    leftColumnContent: {
      name: "Right Column",
      items: leftColumnArray,
      width: "60%",
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
    <div className="flex flex-row">
      <DragDropContext
        onDragEnd={(result) => onDragEnd({ result, columns, setColumns })}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          const width = column.width;
          return (
            <div key={columnId} style={{ width }}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`p-4 w-full ${
                        snapshot.isDraggingOver ? "bg-blue-200" : "bg-gray-200"
                      }`}
                    >
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
                                  className={`select-none p-4 my-2 min-h-12 ${
                                    snapshot.isDragging
                                      ? "bg-blue-800"
                                      : "bg-blue-600"
                                  } text-white`}
                                  style={provided.draggableProps.style}
                                >
                                  {item.content}
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
        })}
      </DragDropContext>
    </div>
  );
};

export default DraggableColumns;
