import { useState, type FC } from "react";

import cn from "classnames";
import { RiNumber1, RiNumber2 } from "react-icons/ri";

import { BasicButton } from "@components/Button";

const ScheduleAdjustment: FC = () => {
  const [done, setDone] = useState(false);

  return (
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
  );
};

export default ScheduleAdjustment;
