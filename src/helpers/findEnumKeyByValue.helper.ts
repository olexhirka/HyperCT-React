type DataType = Record<string, number>;

export const findEnumKeyByValue = (docs: DataType, value: number): string => (
  Object.keys(docs).find((d) => docs[d] === value) || 'NA'
);
