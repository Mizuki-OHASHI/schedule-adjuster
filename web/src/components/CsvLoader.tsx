"use client";

import { useState, type ChangeEvent, type FC } from "react";

import cn from "classnames";
import { PiFileCsvDuotone } from "react-icons/pi";
import { z } from "zod";

const csvSchema = (_startRow: number) =>
  z.string().refine((_value) => {
    return true;
    // const rows = value.split("\n");
    // if (rows.length < startRow) return false;
    // const columns = rows[startRow]?.split(",");
    // if (!columns) return false;
    // if (columns.length === 0) return false;
    // return rows.every(
    //   (row, idx) => idx <= startRow || row.split(",").length === columns.length
    // );
  });

type LoadingStatus = "WAITING" | "SUCCESS" | "PARSE_ERROR";

type CsvLoaderProps = {
  startRow: number;
  onFileLoad: (data: string) => boolean;
  classNames: string;
};
const CsvLoader: FC<CsvLoaderProps> = ({
  startRow,
  onFileLoad,
  classNames,
}) => {
  const [status, setStatus] = useState<LoadingStatus>("WAITING");
  const handleFileLoad = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (!file) {
      setStatus("WAITING");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const parsed = csvSchema(startRow).safeParse(reader.result);
      if (!parsed.success) {
        console.error(parsed.error);
        setStatus("PARSE_ERROR");
        return;
      }
      const { data } = parsed;
      if (onFileLoad(data)) setStatus("SUCCESS");
      else setStatus("PARSE_ERROR");
    };
    reader.readAsText(file);
  };

  const placeholder = {
    WAITING: "クリックしてファイルを選択",
    PARSE_ERROR: "ファイルの形式が正しくありません",
    SUCCESS: "読み込み成功",
  } satisfies Record<LoadingStatus, string>;
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className={cn(
          "flex flex-col items-center justify-center w-full h-32 rounded-lg cursor-pointer",
          "border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 hover:bg-gray-300 hover:dark:bg-gray-700",
          status === "PARSE_ERROR" && "border-red-700 dark:border-red-300",
          status === "SUCCESS" && "border-blue-700 dark:border-blue-300",
          classNames
        )}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <PiFileCsvDuotone color="gray" size={64} />
          <p className="m-2 text-sm text-gray-700 dark:text-gray-300">
            {placeholder[status]}
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept=".csv"
          onChange={handleFileLoad}
        />
      </label>
    </div>
  );
};

export default CsvLoader;
