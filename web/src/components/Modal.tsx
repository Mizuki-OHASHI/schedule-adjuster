import {
  useCallback,
  useEffect,
  useState,
  type FC,
  type MouseEventHandler,
  type ReactNode,
} from "react";

import cn from "classnames";
import { FaTimes } from "react-icons/fa";
import { LuCommand } from "react-icons/lu";

import { BasicButton, IconButton } from "@components/Button";

type ModalProps = {
  title: string;
  size: "sm" | "md" | "lg";
  children: ReactNode;
  classNames: string;
  isOpen: boolean;
} & (
  | {
      type: "readonly";
      onClose: () => void;
    }
  | {
      type: "editable";
      onSubmit: () => void;
      onCancel: () => void;
      onSubmitLabel: string;
      onCancelLabel: string;
    }
);
const Modal: FC<ModalProps> = ({
  title,
  size,
  children,
  classNames,
  isOpen,
  ...rest
}) => {
  const onClose = useCallback(() => {
    if (rest.type === "readonly") rest.onClose();
    else rest.onCancel();
  }, [rest]);

  const onClickOutside: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  // キーボード操作に対応 (Esc: 閉じる, Enter: 確定)
  // FIXME: Enter でモーダルを開くボタンが押されてしまい再び開いてしまう
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (rest.type === "editable" && event.key === "Enter" && event.metaKey)
        rest.onSubmit();
    };
    if (isOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center",
        !isOpen && "hidden"
      )}
      onClick={onClickOutside}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex flex-col space-y-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg p-4",
          size === "sm" && "w-64",
          size === "md" && "w-96",
          size === "lg" && "w-full sm:w-1/2 2xl:w-[720px]",
          classNames
        )}
      >
        <div className="flex flex-row justify-between">
          <p className="font-semibold">{title}</p>
          {rest.type === "readonly" && (
            <IconButton onClick={rest.onClose} classNames="">
              <FaTimes size={24} color="gray" />
            </IconButton>
          )}
        </div>
        <div>{children}</div>
        {rest.type === "editable" && (
          <div className={cn("flex flex-col")}>
            <div className="flex flex-row space-x-4 justify-evenly">
              <BasicButton
                size="md"
                fill={false}
                border={false}
                onClick={() => {
                  rest.onSubmit();
                }}
                value={rest.onSubmitLabel}
                classNames="text-blue-700 dark:text-red-300"
              />
              <BasicButton
                size="md"
                fill={false}
                border={false}
                onClick={rest.onCancel}
                value={rest.onCancelLabel}
                classNames="text-red-700 dark:text-blue-300"
              />
            </div>
            <div
              className={cn(
                "flex flex-row items-center justify-center space-x-1 text-gray-500"
              )}
            >
              <LuCommand size={16} />
              <p className="text-sm">+ Enter で確定, Esc でキャンセル</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const useModalState = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  return { isOpen, setIsOpen, isConfirmed, setIsConfirmed };
};

export default Modal;
