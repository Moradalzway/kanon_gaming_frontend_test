// this is a helper function for check input if empty or null or undefined
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const isEmpty = (val: string | any[] | null | undefined) => {
  if (typeof val === "string" || val instanceof String) val = val.trim();
  return val === undefined || val == null || val.length <= 0 ? true : false;
};

export { isEmpty };
