import Sidebar from "@components/Template/sidebar";

const AppTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen">
      <div className="sticky top-0 w-full h-16 bg-gray-100 dark:bg-gray-900 z-50 border-b-2 border-gray-300 dark:border-gray-700">
        Header
      </div>
      <div className="flex  w-full flex-row">
        <Sidebar user="user" />
        <div>{children}</div>
      </div>
    </div>
  );
};
export default AppTemplate;
