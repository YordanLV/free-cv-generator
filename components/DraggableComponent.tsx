import { useDrag } from "react-dnd";

export default function DraggableComponent(props) {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type,
    item: { id },
  }));
  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <div ref={drag} {...collected}>
      ...
    </div>
  );
}
