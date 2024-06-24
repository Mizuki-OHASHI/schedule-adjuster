"use client";

import type { FC } from "react";

import { BasicButton } from "@components/Button";
import AppTemplate from "@components/Template";

const MePage: FC = () => {
  return (
    <AppTemplate>
      <div className="size-full flex items-center justify-center">
        <BasicButton
          size="lg"
          fill
          border
          onClick={() => {}}
          value="ログアウト"
          classNames=""
        />
      </div>
    </AppTemplate>
  );
};

export default MePage;
