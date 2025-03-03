export const removeFalsyValues = <T>(arr: T[]): NonNullable<T>[] => {
  return arr.filter(Boolean) as NonNullable<T>[];
};
