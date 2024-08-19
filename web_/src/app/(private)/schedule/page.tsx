"use client";

import { useEffect, useState, type FC } from "react";

import type { MemberProfileType } from "@app/(private)/schedule/_page/MemberProfile";
import type { MemberScheduleType } from "@app/(private)/schedule/_page/MemberSchedule";
import type { ScheduleSettingsType } from "@app/(private)/schedule/_page/ScheduleSettings";

import MemberProfile from "@app/(private)/schedule/_page/MemberProfile";
import MemberSchedule from "@app/(private)/schedule/_page/MemberSchedule";
import ScheduleAdjustment from "@app/(private)/schedule/_page/ScheduleAdjustment";
import ScheduleSettings from "@app/(private)/schedule/_page/ScheduleSettings";
import { SelectOneButton } from "@components/Button";
import AppTemplate from "@components/Template";
import dateLib from "@lib/date";

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
  const [scheduledDates, setScheduledDates] = useState<Date[]>([]);
  const [scheduleSetteings, setScheduleSettings] =
    useState<ScheduleSettingsType>({
      considerGender: false,
      settingsOnEachDate: [],
    });

  useEffect(() => {
    const newSettingsOnEachDate = scheduledDates.map((date) => {
      return {
        date: dateLib.formatDate(date),
        group:
          scheduleSetteings.settingsOnEachDate.find(
            (s) => s.date === dateLib.formatDate(date)
          )?.group ?? "",
        tasks:
          scheduleSetteings.settingsOnEachDate.find(
            (s) => s.date === dateLib.formatDate(date)
          )?.tasks ?? "",
      };
    });
    setScheduleSettings({
      considerGender: scheduleSetteings.considerGender,
      settingsOnEachDate: newSettingsOnEachDate,
    });
  }, [scheduledDates]);

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
        dates={scheduledDates}
        setDates={(ds: Date[]) => {
          setScheduledDates(ds);
        }}
      />
    ),
    SCHEDULE_SETTINGS: (
      <ScheduleSettings
        settings={scheduleSetteings}
        setSettings={(ss: ScheduleSettingsType) => {
          setScheduleSettings(ss);
        }}
      />
    ),
    SCHEDULE_ADJUSTMET: <ScheduleAdjustment />,
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
