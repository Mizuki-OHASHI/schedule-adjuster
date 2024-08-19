import cn from "classnames";
import { useRouter } from "next/navigation";

import Sidebar from "@components/Template/sidebar";

const AppTemplate = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div className="h-screen w-screen">
      <div
        className={cn(
          "fixed top-0 w-full h-16 bg-gray-100 dark:bg-gray-900 z-50 border-b-2 border-gray-300 dark:border-gray-700",
          "text-2xl flex items-center justify-between p-4 font-mono"
        )}
      >
        <p
          onClick={() => router.push("/")}
          className="cursor-pointer"
          aria-hidden="true"
        >
          Schedule Auto Adjuster
        </p>
      </div>
      <div className="w-full flex flex-row">
        <Sidebar user="user" router={router} />
        <div className="grow mt-16 w-full min-h-[calc(100vh-64px)] overflow-x-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};
export default AppTemplate;
