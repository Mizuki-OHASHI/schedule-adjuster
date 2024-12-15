import { useState, type FC } from "react";

import cn from "classnames";

import NameCard from "@app/(private)/schedule/_page/ScheduleAdjustment/NameCard";
import { DropZone } from "@components/DnD";

type ActivateMember = {
  accountId: string;
  accountName: string;
};
type ActivateMembersBoxProps = {
  activateMembers: Record<string, ActivateMember>;
  deactivate: (accountId: string) => void;
  activate: (accountId: string) => void;
};
const ActivateMembersBox: FC<ActivateMembersBoxProps> = ({
  activateMembers,
  deactivate,
  activate,
}) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const onChangeDraggedItem = (id: string | null) => {
    console.log(id);
    setDraggedItem(id);
  };
  return (
    <DropZone
      onDropped={() => {}}
      classNames={cn(
        "flex flex-col p-2 space-y-1 border border-gray-500 rounded-lg"
      )}
      isDraggableClassNames={cn(
        "bg-gray-300 dark:bg-gray-700 border border-gray-700 dark:border-gray-300"
      )}
    >
      {Object.entries(activateMembers).map(([accountId, { accountName }]) => (
        <NameCard
          key={accountId}
          accountId={accountId}
          accountName={accountName}
          setDraggedItem={onChangeDraggedItem}
        />
      ))}
    </DropZone>
  );
};

export default ActivateMembersBox;
