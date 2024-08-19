import { useState, type FC, type ReactNode } from "react";

import cn from "classnames";

type DndProviderProps = {
  children: ReactNode;
};
/**
 * ドラッグ中は画面全体を黒くする
 */
const DndProvider: FC<DndProviderProps> = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);

  document.addEventListener("dragstart", () => {
    setIsDragging(true);
  });
  document.addEventListener("dragend", () => {
    setIsDragging(false);
  });

  return (
    <>
      {children}
      <div
        className={cn(
          "fixed top-0 left-0 size-full bg-black opacity-50 -z-10",
          isDragging ? "visible" : "hidden"
        )}
      />
    </>
  );
};

export default DndProvider;
