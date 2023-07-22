export const renameObjectKey = <T, U>(
  obj: U,
  key: string,
  newKey: string,
): T => {
  obj[newKey] = obj[key];
  delete obj[key];

  return obj as unknown as T;
};
