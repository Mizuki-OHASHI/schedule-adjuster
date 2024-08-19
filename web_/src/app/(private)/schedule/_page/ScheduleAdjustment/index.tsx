import { useState, type FC } from "react";

import cn from "classnames";
import { RiNumber1, RiNumber2 } from "react-icons/ri";

import ActivateMembersBox from "@app/(private)/schedule/_page/ScheduleAdjustment/ActivateMembersBox";
import { BasicButton } from "@components/Button";
import { DndProvider } from "@components/DnD";

const ScheduleAdjustment: FC = () => {
  const [done, setDone] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const onChangeDraggedItem = (id: string | null) => {
    console.log(id);
    setDraggedItem(id);
  };

  return (
    <DndProvider>
      <div className={cn("flex flex-col items-center space-y-4 min-w-[80%]")}>
        <div className="text-left w-full p-4">
          <p className="text-xl">スケジュール調整</p>
        </div>
        <div
          className={cn("w-full flex flex-col justify-start items-center p-4")}
        >
          <div className={cn("w-full flex items-end justify-start space-x-2")}>
            <RiNumber1 size={32} />
            <p className="text-lg">まずは最適化アルゴリズムを使って自動調整</p>
          </div>
          <BasicButton
            size="lg"
            fill
            border
            onClick={() => {
              setDone(true);
            }}
            value="自動調整を実行"
            classNames="m-8"
          />
          <div className="w-full flex flex-row justify-center items-center space-x-4">
            <ActivateMembersBox
              activateMembers={{
                "1": { accountId: "1", accountName: "山田太郎" },
                "2": { accountId: "2", accountName: "田中花子" },
              }}
              deactivate={() => {}}
              activate={() => {}}
            />
            <ActivateMembersBox
              activateMembers={{
                "1": { accountId: "1", accountName: "山田太郎" },
                "2": { accountId: "2", accountName: "田中花子" },
              }}
              deactivate={() => {}}
              activate={() => {}}
            />
          </div>
        </div>
        <div
          className={cn(
            "w-full flex flex-col justify-start items-center p-4",
            done ? "visible" : "hidden"
          )}
        >
          <div className={cn("w-full flex items-end justify-start space-x-2")}>
            <RiNumber2 size={32} />
            <p className="text-lg">その後、手動で調整</p>
          </div>
          <div>ドラッグ&ドロップで！！！</div>
        </div>
      </div>
    </DndProvider>
  );
};

export default ScheduleAdjustment;
