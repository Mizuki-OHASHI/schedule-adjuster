/**
 * 様々な形式の日付をDateに変換
 *
 * @example 対応可能な入力例
 * - `MM/dd`
 * - `MM/dd(ddd)`
 * - `MM/dd（ddd）`
 * - `YYYY/MM/dd`
 * - `YYYY/MM/dd(ddd)`
 * - `YYYY/MM/dd（ddd）`
 *
 * @remarks `MM/dd`の場合、年は M > 1 のとき現在の年, M = 1 のとき来年とする
 */
const toDate = (str: string): Date | null => {
  // (ddd), （ddd）を中身も含めて削除
  const removed = str.replace(/\(.*\)|（.*）/g, "").trim();
  const splitted = removed.split("/");
  if (splitted.length === 2) {
    const [month, day] = splitted.map(Number);
    if (!month || !day) return null;
    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;
    const now = new Date();
    const year = month > 1 ? now.getFullYear() : now.getFullYear() + 1;
    return new Date(year, month - 1, day);
  }
  if (splitted.length === 3) {
    const [year, month, day] = splitted.map(Number);
    if (!year || !month || !day) return null;
    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;
    return new Date(year, month - 1, day);
  }
  return null;
};

const formatDate = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
};

/** isHeaderで見つけた行を元に日付を抽出 */
const extractDates = (line: string): Date[] | null => {
  const splited = line.split(",");
  const datesStr = splited.slice(1, -1);
  const nullishDates = datesStr.map(toDate);
  console.log({ datesStr, nullishDates });
  if (nullishDates.some((d) => d === null)) return null;
  return nullishDates as Date[];
};

const dateLib = {
  toDate,
  formatDate,
  extractDates,
};

export default dateLib;
