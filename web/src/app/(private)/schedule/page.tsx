"use client";

import { useState, type FC } from "react";

import type { MemberProfileType } from "@app/(private)/schedule/_page/MemberProfile";
import type { MemberScheduleType } from "@app/(private)/schedule/_page/MemberSchedule";

import MemberProfile from "@app/(private)/schedule/_page/MemberProfile";
import MemberSchedule from "@app/(private)/schedule/_page/MemberSchedule";
import { SelectOneButton } from "@components/Button";
import AppTemplate from "@components/Template";

type PageEnum =
  | "MEMBER_PROFILE"
  | "MEMBER_SCHEDULE"
  | "SCHEDULE_SETTINGS"
  | "SCHEDULE_ADJUSTMET";
const SchedulePage: FC = () => {
  const [activePage, setActivePage] = useState<PageEnum>("MEMBER_PROFILE");

  const [memberProfiles, setMemberProfiles] = useState<MemberProfileType[]>([]);
  const [memberSchedules, setMemberSchedules] = useState<MemberScheduleType[]>(
    []
  );
  const [scheduleKeys, setScheduleKeys] = useState<string[]>([]);

  const pages = {
    MEMBER_PROFILE: (
      <MemberProfile
        memberProfiles={memberProfiles}
        setMemberProfiles={(mps: MemberProfileType[]) => {
          setMemberProfiles(mps);
        }}
      />
    ),
    MEMBER_SCHEDULE: (
      <MemberSchedule
        memberSchedules={memberSchedules}
        setMemberSchedules={(mss: MemberScheduleType[]) => {
          setMemberSchedules(mss);
        }}
        keys={scheduleKeys}
        setKeys={(ks: string[]) => {
          setScheduleKeys(ks);
        }}
      />
    ),
    SCHEDULE_SETTINGS: <p>schedule settings</p>,
    SCHEDULE_ADJUSTMET: <p>schedule adjustment</p>,
  } satisfies Record<PageEnum, JSX.Element>;

  return (
    <AppTemplate>
      <div className="flex flex-col items-center space-y-2">
        <SelectOneButton
          size="md"
          onSelect={setActivePage}
          selected={activePage}
          values={{
            MEMBER_PROFILE: "メンバー",
            MEMBER_SCHEDULE: "スケジュール",
            SCHEDULE_SETTINGS: "設定",
            SCHEDULE_ADJUSTMET: "調整",
          }}
          classNames="m-2 fixed top-20 right-16"
        />
        {pages[activePage]}
      </div>
    </AppTemplate>
  );
};

export default SchedulePage;
