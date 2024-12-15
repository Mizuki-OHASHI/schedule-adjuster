import { useEffect, useState, type FC } from "react";

import cn from "classnames";

import CsvLoader from "@components/CsvLoader";
import InputTable from "@components/InputTable";
import { filterMap } from "@lib/array";
import dateLib from "@lib/date";

export type MemberScheduleType = {
  member: string;
  comment: string;
} & Record<string, number>;

/** 参加者,...,コメント なる行を見つける */
const isHeader = (line: string) => {
  const trimmed = line.trim();
  return trimmed.startsWith("参加者,") && trimmed.endsWith(",コメント");
};

const formatRow =
  (dates: Date[]) =>
  (line: string): MemberScheduleType | null => {
    const splited = line.split(",");
    if (splited.length !== dates.length + 2) {
      console.error("Invalid csv format", {
        dates,
        splited,
      });
      return null;
    }
    const member = splited[0]!;
    const comment = splited[splited.length - 1]!;
    const schedules = splited.slice(1, -1).reduce(
      (acc, value, idx) => {
        if (acc === null) return null;
        const valInt = {
          "×": 0,
          "△": 1,
          "◯": 2,
        }[value];
        if (valInt === undefined) {
          console.error("Invalid csv format", { value });
          return null;
        }
        acc[dates[idx]!.toISOString()] = valInt;
        return acc;
      },
      {} as Record<string, number> | null
    );
    if (schedules === null) return null;
    const row = { member, comment, ...schedules } as MemberScheduleType;
    return row;
  };

type MemberScheduleProps = {
  memberSchedules: MemberScheduleType[];
  setMemberSchedules: (schedules: MemberScheduleType[]) => void;
  dates: Date[];
  setDates: (dates: Date[]) => void;
};
const MemberSchedule: FC<MemberScheduleProps> = ({
  memberSchedules,
  setMemberSchedules,
  dates,
  setDates,
}) => {
  const updateTableValue = (
    idx: number,
    key: string,
    value: string | number
  ) => {
    if (key === "member" || key === "comment") {
      const newSchedules = memberSchedules.map((schedule, i) => {
        if (i === idx) {
          return { ...schedule, [key]: value } as MemberScheduleType;
        }
        return schedule;
      });
      setMemberSchedules(newSchedules);
      return;
    }
    const newSchedules = memberSchedules.map((schedule, i) => {
      if (i === idx) {
        return {
          ...schedule,
          [key]: Number(value),
        } as MemberScheduleType;
      }
      return schedule;
    });
    setMemberSchedules(newSchedules);
  };

  const [keys, setKeys] = useState<string[]>([]);
  const [keyLabels, setKeyLabels] = useState<Record<string, string>>({
    member: "参加者",
    comment: "コメント",
  });
  useEffect(() => {
    setKeys(["member", ...dates.map((d) => d.toISOString()), "comment"]);
    setKeyLabels({
      member: "参加者",
      comment: "コメント",
      ...Object.fromEntries(
        dates.map((d) => [d.toISOString(), dateLib.formatDate(d)])
      ),
    });
  }, [dates]);

  const onCsvLoad = (str: string): boolean => {
    const lines = str.split("\n");

    // 日付のバリデーションとセット
    const headerIdx = lines.findIndex(isHeader);
    if (headerIdx === -1) {
      console.error("Invalid csv format", { lines });
      return false;
    }
    const dates = dateLib.extractDates(lines[headerIdx]!);
    if (!dates) {
      console.error("Invalid csv format", { header: lines[headerIdx] });
      return false;
    }
    setDates(dates);
    setKeys(["member", ...dates.map((d) => d.toISOString()), "comment"]);

    // 中身のバリデーションとセット
    const values = filterMap(lines.slice(headerIdx + 1), formatRow(dates));
    setMemberSchedules(values);
    return true;
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
          keyLabels={keyLabels}
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
