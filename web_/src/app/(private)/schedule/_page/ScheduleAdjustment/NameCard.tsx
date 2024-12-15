import type { FC } from "react";

import cn from "classnames";

import { DragItem } from "@components/DnD";

type NameCardProps = {
  accountId: string;
  accountName: string;
  setDraggedItem: (id: string | null) => void;
};
const NameCard: FC<NameCardProps> = ({
  accountId,
  accountName,
  setDraggedItem,
}) => {
  return (
    <DragItem
      onDragStart={() => {
        setDraggedItem(accountId);
      }}
      onDragEnd={() => {
        setDraggedItem(null);
      }}
      classNames={cn(
        "rounded-lg flex items-center justify-center w-24 h-8 text-sm bg-gray-300 dark:bg-gray-700 border border-gray-500"
      )}
      isDraggingClassNames={cn("opacity-50")}
    >
      <div>{accountName}</div>
    </DragItem>
  );
};

export default NameCard;
