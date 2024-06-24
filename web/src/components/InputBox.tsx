import type { FC } from "react";

import cn from "classnames";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  classNames: string;
};

const InputBox: FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  classNames,
}) => {
  return (
    <input
      id="input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "border-2 border-gray-500 rounded-lg p-2 focus:outline-none bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
        classNames
      )}
      placeholder={placeholder}
    />
  );
};

export default InputBox;
