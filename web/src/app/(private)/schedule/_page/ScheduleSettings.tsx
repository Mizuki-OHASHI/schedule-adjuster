import { useState, type FC } from "react";

import cn from "classnames";
import { z } from "zod";

import InputTable from "@components/InputTable";

// 作業#人数/作業#人数/... (#人数 は任意) の形式 (?:#\d+)?(?:/作業(?:#\d+)?)*/
const taskSchema = z.string().refine((s) => {
  if (s === "") return true;
  const splited = s.split("/");
  return splited.every((task) => {
    const [name, num] = task.split("#");
    return name !== "" && (num === undefined || /^\d+$/.test(num));
  });
});

const settingOnEachDateSchema = z.object({
  date: z.string(),
  group: z.string(),
  tasks: taskSchema,
});
type SettingOnEachDateType = z.infer<typeof settingOnEachDateSchema>;
const keys = Object.keys(settingOnEachDateSchema.shape);
const keyLabels = {
  date: "日付",
  group: "グループ",
  tasks: "作業",
} satisfies Record<keyof SettingOnEachDateType, string>;

const scheduleSettingsSchema = z.object({
  considerGender: z.boolean(),
  settingsOnEachDate: z.array(settingOnEachDateSchema),
});
export type ScheduleSettingsType = z.infer<typeof scheduleSettingsSchema>;

type ScheduleSettingsProps = {
  settings: ScheduleSettingsType;
  setSettings: (settings: ScheduleSettingsType) => void;
};
const ScheduleSettings: FC<ScheduleSettingsProps> = ({
  settings,
  setSettings,
}) => {
  const [parsedErrorIdx, setParsedErrorIdx] = useState<number | null>(null);
  const updateSettingsOnEachDate = (
    idx: number,
    key: string,
    value: string | number
  ) => {
    setParsedErrorIdx(null);
    const newSettingsOnEachDate: SettingOnEachDateType[] =
      settings.settingsOnEachDate.map((setting, i) => {
        if (i !== idx) return setting;
        const updated = { ...setting, [key]: value };
        const parsed = settingOnEachDateSchema.safeParse(updated);
        if (parsed.success) return updated;
        setParsedErrorIdx(i);
        if (!keys.includes(key)) console.error("Invalid key: ", key);
        return { ...setting, [key]: value };
      });
    setSettings({
      considerGender: settings.considerGender,
      settingsOnEachDate: newSettingsOnEachDate,
    });
  };
  return (
    <div className={cn("flex flex-col items-center space-y-4 min-w-[80%]")}>
      <div className="text-left w-full p-4 mb-8">
        <p className="text-xl">自動調整の設定</p>
      </div>
      {settings.settingsOnEachDate.length > 0 && (
        <>
          <InputTable
            keys={keys}
            keyLabels={keyLabels}
            values={settings.settingsOnEachDate}
            setValues={updateSettingsOnEachDate}
            addRow={null}
            deleteRow={null}
            classNames="m-2"
          />
          <div
            className={cn(
              "w-full text-sm text-center p-2",
              parsedErrorIdx === null
                ? "text-gray-500"
                : "text-red-700 dark:text-red-300"
            )}
          >
            「作業」は「作業#人数/作業#人数/...」の形式で入力してください。
            <br />
            なお、「#人数」を省略すると 1 として扱われます。
            <br />
            {parsedErrorIdx !== null &&
              `${parsedErrorIdx + 1}行目の入力に誤りがあります。`}
          </div>
        </>
      )}
    </div>
  );
};

export default ScheduleSettings;
