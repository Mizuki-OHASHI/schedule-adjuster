export const arrayToRecord = <T, K extends keyof never>(
  arr: T[],
  getKey: (t: T) => K
): Record<K, T> =>
  arr.reduce(
    (acc, t) => {
      acc[getKey(t)] = t;
      return acc;
    },
    {} as Record<K, T>
  );

export const arrayToRecordBy = <T, K extends keyof never, V>(
  arr: T[],
  getKey: (t: T) => K,
  getVal: (t: T) => V
): Record<K, V> =>
  arr.reduce(
    (acc, t) => {
      acc[getKey(t)] = getVal(t);
      return acc;
    },
    {} as Record<K, V>
  );

export const arraysToRecord = <K extends keyof never, T>(
  keys: K[],
  arr: T[]
): Record<K, T> =>
  keys.reduce(
    (acc, key, idx) => {
      const val = arr[idx];
      if (val === undefined) {
        console.error(
          `arraysToRecord: invalid length\n\tkeys: ${keys.join()}\n\tarr: ${arr.join(",")}`
        );
        return acc;
      }
      acc[key] = val;
      return acc;
    },
    {} as Record<K, T>
  );

export const filterMap = <T, U>(arr: T[], map: (t: T) => U | null): U[] =>
  arr.reduce((acc, t) => {
    const u = map(t);
    if (u === null) return acc;
    acc.push(u);
    return acc;
  }, [] as U[]);
