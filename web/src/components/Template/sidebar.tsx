import { useState, type FC } from "react";

import cn from "classnames";
import { FaCalendar, FaUser } from "react-icons/fa";
import { LuChevronLeftSquare, LuChevronRightSquare } from "react-icons/lu";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { IconButton } from "@components/Button";

type SidebarProps = {
  user: "user";
  router: AppRouterInstance;
};
const Sidebar: FC<SidebarProps> = ({ user: _, router }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const listOfContents = [
    // {
    //   label: "ホーム",
    //   path: "/",
    //   icon: <MdHomeFilled size={24} color="gray" />,
    // },
    {
      label: "スケジュール",
      path: "/schedule",
      icon: <FaCalendar size={24} color="gray" />,
    },
    {
      label: "アカウント",
      path: "/me",
      icon: <FaUser size={24} color="gray" />,
    },
  ];
  return (
    <div
      className={cn(
        "h-[calc(100vh-64px)] sticky top-16 transition-all duration-300 border-r-2 border-gray-300 dark:border-gray-700 flex flex-col justify-between cursor-pointer",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex flex-col space-y-2 items-start p-2">
        {listOfContents.map((content) => (
          <div
            key={content.label}
            className={cn(
              "flex flex-row w-full items-center space-x-4 p-2 px-3",
              "rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700"
            )}
            onClick={() => {
              router.push(content.path);
            }}
            aria-hidden="true"
          >
            <div>{content.icon}</div>
            {isOpen && <p className="whitespace-nowrap">{content.label}</p>}
          </div>
        ))}
      </div>
      <div className="flex flex-row-reverse p-2">
        <IconButton
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          classNames="w-12 h-12"
        >
          {isOpen ? (
            <LuChevronLeftSquare size={24} color="gray" />
          ) : (
            <LuChevronRightSquare size={24} color="gray" />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default Sidebar;
