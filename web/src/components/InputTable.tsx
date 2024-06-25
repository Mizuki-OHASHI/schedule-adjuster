import type { FC } from "react";

import cn from "classnames";
import { FaTrash } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

import { IconButton } from "@components/Button";

type CellProps = {
  value: string | number;
  onChange: (value: string | number) => void;
};
const Cell: FC<CellProps> = ({ value, onChange }) => {
  return (
    <td>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "focus:outline-none focus:bg-gray-100 focus:dark:bg-gray-900 rounded-lg w-full",
          "text-gray-700 bg-gray-300 dark:bg-gray-700 dark:text-gray-300",
          "p-1"
        )}
      />
    </td>
  );
};

type InputTableProps = {
  keys: string[];
  keyLabels: Record<string, string> | null;
  values: Record<string, string | number>[];
  setValues: (idx: number, key: string, value: string | number) => void;
  addRow: (() => void) | null;
  deleteRow: ((idx: number) => void) | null;
  classNames: string;
};
const InputTable: FC<InputTableProps> = ({
  keys,
  keyLabels,
  values,
  setValues,
  addRow,
  deleteRow,
  classNames,
}) => {
  return (
    <div className={cn(classNames)}>
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>
                <div
                  className={cn(
                    "text-gray-100 bg-gray-500 dark:text-gray-900 dark:bg-gray-500 p-1 rounded-lg"
                  )}
                >
                  {keyLabels ? keyLabels[key] : key}
                </div>
              </th>
            ))}
            {addRow !== null || (deleteRow !== null && <th />)}
          </tr>
        </thead>
        <tbody>
          {values.map((row, idx) => (
            <tr key={idx}>
              {keys.map((key) => (
                <Cell
                  key={key}
                  value={row[key] ?? ""}
                  onChange={(value) => setValues(idx, key, value)}
                />
              ))}
              {deleteRow !== null && (
                <td>
                  <IconButton onClick={() => deleteRow(idx)} classNames="">
                    <FaTrash size={16} color="gray" />
                  </IconButton>
                </td>
              )}
            </tr>
          ))}
        </tbody>
        {addRow !== null && (
          <tfoot>
            <tr>
              {Array.from({ length: keys.length }).map((_, idx) => (
                <td key={idx} />
              ))}
              <td colSpan={keys.length}>
                <IconButton onClick={addRow} classNames="">
                  <IoIosAddCircle size={24} color="gray" />
                </IconButton>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default InputTable;
