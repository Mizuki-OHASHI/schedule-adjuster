import { useEffect, type FC } from "react";

import cn from "classnames";
import { z } from "zod";

import CsvLoader from "@components/CsvLoader";
import InputTable from "@components/InputTable";
import { filterMap } from "@lib/array";

const memberProfileSchema = z.object({
  name: z.string(),
  joinPeriod: z.number().int().nonnegative(),
  gender: z.union([z.literal("FEMALE"), z.literal("MALE"), z.literal("OTHER")]),
  lastVisit: z.string(),
  driving: z.number().int().nonnegative().max(3),
  responsible: z.string(),
});
export type MemberProfileType = z.infer<typeof memberProfileSchema>;
const keyJa = {
  name: "名前",
  joinPeriod: "入会期",
  gender: "性別",
  lastVisit: "最訪問日",
  driving: "運転習熟度",
  responsible: "担当",
};

type MemberProfileProps = {
  memberProfiles: MemberProfileType[];
  setMemberProfiles: (profiles: MemberProfileType[]) => void;
};
const MemberProfile: FC<MemberProfileProps> = ({
  memberProfiles,
  setMemberProfiles,
}) => {
  const updateTableValue = (
    idx: number,
    key: string,
    value: string | number
  ) => {
    const newProfiles = memberProfiles.map((profile, i) => {
      if (i === idx) {
        return { ...profile, [key]: value };
      }
      return profile;
    });
    setMemberProfiles(newProfiles);
  };
  const onCsvLoad = (str: string) => {
    const profiles = filterMap(str.split("\n").slice(1), (line) => {
      const splitedAndTrimed = line.split(",").map((s) => s.trim());
      const parsed = memberProfileSchema.safeParse({
        name: splitedAndTrimed[0],
        joinPeriod: Number(splitedAndTrimed[1]),
        gender: splitedAndTrimed[2] === "0" ? "MALE" : "FEMALE",
        lastVisit: splitedAndTrimed[3],
        driving: Number(splitedAndTrimed[4]),
        responsible: splitedAndTrimed[5],
      });
      if (!parsed.success) {
        console.error(parsed.error, {
          name: splitedAndTrimed[0],
          joinPeriod: Number(splitedAndTrimed[1]),
          gender: splitedAndTrimed[2] === "0" ? "MALE" : "FEMALE",
          lastVisit: splitedAndTrimed[3],
          driving: Number(splitedAndTrimed[4]),
          responsible: splitedAndTrimed[5],
        });
        return null;
      }
      return parsed.data;
    });
    setMemberProfiles(profiles);
  };

  useEffect(() => {
    console.log(memberProfiles);
  }, [memberProfiles]);

  return (
    <div className={cn("flex flex-col items-center space-y-4 min-w-[80%]")}>
      <div className="text-left w-full p-4">
        <p className="text-xl">メンバー情報</p>
      </div>
      <CsvLoader onFileLoad={onCsvLoad} classNames="m-2" startRow={0} />
      {memberProfiles.length > 0 && (
        <InputTable
          keys={Object.keys(memberProfileSchema.shape)}
          keyLabels={keyJa}
          values={memberProfiles}
          setValues={updateTableValue}
          addRow={null}
          deleteRow={null}
          classNames="m-2"
        />
      )}
    </div>
  );
};

export default MemberProfile;
