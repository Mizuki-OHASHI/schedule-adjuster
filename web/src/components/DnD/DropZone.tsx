import { useState, type DragEventHandler, type ReactNode } from "react";

import cn from "classnames";

import newId from "@lib/id";

type DropZoneProps = {
  children: ReactNode;
  onDropped: () => void;
  classNames: string;
  isDraggableClassNames: string;
};
const DropZone = ({
  children,
  onDropped,
  classNames,
  isDraggableClassNames,
}: DropZoneProps) => {
  const [isDroppable, setIsDroppable] = useState(false);

  const componentId = newId();

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    if (event.currentTarget.id === componentId) onDropped();
  };
  const handleDragEnter: DragEventHandler<HTMLDivElement> = (event) => {
    if (event.currentTarget.id === componentId) setIsDroppable(true);
  };
  const handleDragLeave: DragEventHandler<HTMLDivElement> = (event) => {
    if (event.currentTarget.id === componentId) setIsDroppable(false);
  };

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
