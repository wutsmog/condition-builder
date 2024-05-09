export const isString = (value: any) => {
  return typeof value === 'string';
};

export const isNumber = (value: any): value is number => {
  return typeof value === 'number';
};

export const isArray = (value: any): value is any[] => {
  return Array.isArray(value);
};
