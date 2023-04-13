import { Fragment, useRef, useState } from "react";
import {
  SortableList,
  SortableItem,
  SortableItemProps,
} from "@thaddeusjiang/react-sortable-list";
import { FiMove } from "react-icons/fi";
import InvisInput from "./InvisInput";

const Column: React.FC = () => {
  const ref = useRef(null);

  const [text, setText] = useState({});

  const [items, setItems] = useState<SortableItemProps[]>([
    { id: "1", name: <div contentEditable>Kor</div> },
    { id: "2", name: <div contentEditable>Potka</div> },
  ]);
  return (
    <SortableList items={items} setItems={setItems}>
      {({ items }: { items: SortableItemProps[] }) => (
        <div>
          {items.map((item: SortableItemProps) => {
            const { id } = item;
            return (
              <div style={{ position: "relative" }} key={item.id}>
                <div style={{ zIndex: 5, position: "absolute", bottom: 0 }}>
                  <InvisInput
                    style={{ zIndex: 20, opacity: 0.5 }}
                    onChange={(e: { target: { value: any } }) =>
                      setText({ [id]: { text: e.target.value } })
                    }
                    placeholder="Text here"
                  />
                </div>
                <SortableItem key={item.id} id={item.id}>
                  <div className="flex flex-row z-0">
                    <InvisInput
                      style={{ zIndex: 30, opacity: 0.5 }}
                      onChange={(e: { target: { value: any } }) =>
                        setText({ [item.id]: { text: e.target.value } })
                      }
                      value={text[id]?.text}
                      placeholder="Text here"
                    />
                    <FiMove />
                  </div>
                </SortableItem>
              </div>
            );
          })}
        </div>
      )}
    </SortableList>
  );
};

export default Column;
