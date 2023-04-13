import { useState } from "react";
import {
  SortableList,
  SortableItem,
  SortableItemProps,
} from "@thaddeusjiang/react-sortable-list";

const ChildrenExample: React.VFC = () => {
  const [items, setItems] = useState<SortableItemProps[]>([
    { id: "1", name: <div>Kor</div> },
    { id: "2", name: <div>Potka</div> },
  ]);

  const [items2, setItems2] = useState<SortableItemProps[]>([
    { id: "1", name: <div>Kor</div> },
    { id: "2", name: <div>Potka</div> },
  ]);

  return (
    <SortableList
      items={items}
      setItems={() => {
        setItems;
        setItems2;
      }}
    >
      {({ items }: { items: SortableItemProps[] }) => (
        <>
          {items.map((item: SortableItemProps) => (
            <SortableItem key={item.id} id={item.id}>
              {item.name}
            </SortableItem>
          ))}
        </>
      )}
    </SortableList>
  );
};

export default ChildrenExample;
