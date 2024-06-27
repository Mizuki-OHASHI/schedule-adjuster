import { useState, type FC, type ReactNode } from "react";

import cn from "classnames";

type DragItemProps = {
  children: ReactNode;
  onDragStart: () => void;
  onDragEnd: () => void;
  classNames: string;
  isDraggingClassNames: string;
};
const DragItem: FC<DragItemProps> = ({
  children,
  onDragStart,
  onDragEnd,
  classNames,
  isDraggingClassNames,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
    onDragStart();
  };
  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd();
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn(
        "cursor-pointer",
        classNames,
        isDragging && isDraggingClassNames
      )}
    >
      {children}
    </div>
  );
};

export default DragItem;
