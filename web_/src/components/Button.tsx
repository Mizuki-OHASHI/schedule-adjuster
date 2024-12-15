"use client";

import type { FC, ReactNode } from "react";

import cn from "classnames";

type BasicButtonProps = {
  size: "sm" | "md" | "lg";
  fill: boolean;
  border: boolean;
  onClick: () => void;
  value: string | number;
  classNames: string;
};
export const BasicButton: FC<BasicButtonProps> = ({
  size,
  fill,
  border,
  onClick,
  value,
  classNames,
}) => {
  const sizeProps = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  }[size];
  return (
    <button
      type="button"
      className={cn(
        "rounded-lg transition-colors",
        border && "border-2 border-gray-900 dark:border-gray-100",
        sizeProps,
        fill
          ? "text-gray-100 bg-gray-900 hover:bg-gray-700 active:bg-gray-500 dark:text-gray-900 dark:bg-gray-100 dark:hover:bg-gray-300 dark:active:bg-gray-500"
          : "text-gray-900 bg-gray-100 hover:bg-gray-300 active:bg-gray-500 dark:text-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 dark:active:bg-gray-500",
        classNames
      )}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

type SelectOneButtonProps<K extends string | number> = {
  size: "sm" | "md" | "lg";
  onSelect: (key: K) => void;
  selected: K;
  values: Record<K, string | number>;
  classNames: string;
};
export const SelectOneButton = <K extends string | number>({
  size,
  onSelect,
  selected,
  values,
  classNames,
}: SelectOneButtonProps<K>) => {
  const sizeProps = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  }[size];
  return (
    <div className={cn(classNames)}>
      {Object.entries<string | number>(values).map(([key, value], idx) => (
        <button
          key={key}
          type="button"
          className={cn(
            "transition-colors border-2 border-gray-900 dark:border-gray-300",
            idx === 0 && "rounded-l-lg",
            idx === Object.keys(values).length - 1 && "rounded-r-lg",
            idx !== 0 && "border-l-0",
            sizeProps,
            key === selected
              ? "text-gray-100 bg-gray-900 dark:text-gray-900 dark:bg-gray-300"
              : "text-gray-900 bg-gray-100 hover:bg-gray-300 active:bg-gray-500 dark:text-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 dark:active:bg-gray-500"
          )}
          onClick={() => onSelect(key as K)}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

type SelectManyButtonProps<K extends string | number> = {
  size: "sm" | "md" | "lg";
  onSelect: (key: K) => void;
  selected: Set<K>;
  values: Record<K, string | number>;
  classNames: string;
};
export const SelectManyButton = <K extends string | number>({
  size,
  onSelect,
  selected,
  values,
  classNames,
}: SelectManyButtonProps<K>) => {
  const sizeProps = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  }[size];
  return (
    <div className={cn(classNames)}>
      {Object.entries<string | number>(values).map(([key, value], idx) => (
        <button
          key={key}
          type="button"
          className={cn(
            "transition-colors border-2 border-gray-900 dark:border-gray-300",
            idx === 0 && "rounded-l-lg",
            idx === Object.keys(values).length - 1 && "rounded-r-lg",
            idx !== 0 && "border-l-0",
            sizeProps,
            selected.has(key as K)
              ? "text-gray-100 bg-gray-900 dark:text-gray-900 dark:bg-gray-300"
              : "text-gray-900 bg-gray-100 hover:bg-gray-300 active:bg-gray-500 dark:text-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 dark:active:bg-gray-500"
          )}
          onClick={() => onSelect(key as K)}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

type IconButtonProps = {
  onClick: () => void;
  classNames: string;
  children: ReactNode;
};
export const IconButton: FC<IconButtonProps> = ({
  onClick,
  classNames,
  children,
}) => {
  return (
    <button
      type="button"
      className={cn(
        "rounded-full transition-colors h-8 w-8 flex items-center justify-center",
        "bg-gray-100 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-700 active:bg-gray-500 dark:active:bg-gray-500",
        classNames
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
