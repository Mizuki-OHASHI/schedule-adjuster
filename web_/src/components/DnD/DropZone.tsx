import {
  useState,
  type DragEventHandler,
  type FC,
  type ReactNode,
} from "react";

import cn from "classnames";

import newId from "@lib/id";

type DropZoneProps = {
  children: ReactNode;
  onDropped: () => void;
  classNames: string;
  isDraggableClassNames: string;
};
const DropZone: FC<DropZoneProps> = ({
  children,
  onDropped,
  classNames,
  isDraggableClassNames,
}) => {
  const [isDroppable, setIsDroppable] = useState(false);

  const componentId = newId();

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    if (event.currentTarget.id === componentId) onDropped();
  };
  const handleDragEnter: DragEventHandler<HTMLDivElement> = (event) => {
    if (event.currentTarget.id === componentId) setIsDroppable(true);
  };
  const handleDragLeave: DragEventHandler<HTMLDivElement> = (event) => {
    const { relatedTarget } = event;
    if (
      event.currentTarget.id === componentId &&
      (relatedTarget === null ||
        !(relatedTarget instanceof Element) ||
        !event.currentTarget.contains(relatedTarget))
    )
      setIsDroppable(false);
  };

  document.addEventListener("dragend", () => {
    setIsDroppable(false);
  });

  return (
    <div
      id={componentId}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(event) => {
        event.preventDefault(); // これがないとdropイベントが発火しない
      }}
      className={cn(classNames, isDroppable && isDraggableClassNames)}
    >
      {children}
    </div>
  );
};

export default DropZone;
