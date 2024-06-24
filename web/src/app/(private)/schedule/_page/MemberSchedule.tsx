import { type FC } from "react";

import cn from "classnames";
import { z } from "zod";

import CsvLoader from "@components/CsvLoader";
import InputTable from "@components/InputTable";
import { arraysToRecord, filterMap } from "@lib/array";

const memberScheduleSchema = z.record(z.string().or(z.number()));
export type MemberScheduleType = z.infer<typeof memberScheduleSchema>;

type MemberScheduleProps = {
  memberSchedules: MemberScheduleType[];
  setMemberSchedules: (schedules: MemberScheduleType[]) => void;
  keys: string[];
  setKeys: (keys: string[]) => void;
};
const MemberSchedule: FC<MemberScheduleProps> = ({
  memberSchedules,
  setMemberSchedules,
  keys,
  setKeys,
}) => {
  const updateTableValue = (
    idx: number,
    key: string,
    value: string | number
  ) => {
    const newSchedules = memberSchedules.map((schedule, i) => {
      if (i === idx) {
        return { ...schedule, [key]: value };
      }
      return schedule;
    });
    setMemberSchedules(newSchedules);
  };
  const onCsvLoad = (str: string) => {
    const colmns = str
      .split("\n")?.[2]
      ?.split(",")
      .map((s) => s.trim());
    if (!colmns) {
      console.error("Invalid csv format");
      return;
    }
    setKeys(colmns);
    const schedules = filterMap(str.split("\n").slice(3), (line) => {
      const splitedAndTrimed = line.split(",").map((s) => s.trim());
      if (splitedAndTrimed.length !== colmns.length) {
        console.error("Invalid csv format", {
          colmns,
          splitedAndTrimed,
        });
        return null;
      }
      const parsed = memberScheduleSchema.safeParse(
        arraysToRecord(colmns, splitedAndTrimed)
      );
      if (!parsed.success) {
        console.error(parsed.error, {
          colmns,
          splitedAndTrimed,
        });
        return null;
      }
      return parsed.data;
    });
    setMemberSchedules(schedules);
  };

  return (
    <div className={cn("flex flex-col items-center space-y-4 min-w-[80%]")}>
      <div className="text-left w-full p-4">
        <p className="text-xl">メンバーのスケジュール</p>
      </div>
      <CsvLoader onFileLoad={onCsvLoad} classNames="m-2" startRow={2} />
      {memberSchedules.length > 0 && (
        <InputTable
          keys={keys}
          keyLabels={null}
          values={memberSchedules}
          setValues={updateTableValue}
          addRow={null}
          deleteRow={null}
          classNames="m-2"
        />
      )}
    </div>
  );
};

export default MemberSchedule;
