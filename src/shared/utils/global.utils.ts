export const DATE_TIME_FORMAT = "dd/MM/yyyy";

export const removeAllLineBreaks = (text: string) =>
  text?.replace(/(\r\n|\n|\r)/gm, "\n");

export const getTime = (myDate: string) =>
  new Date(myDate).toLocaleTimeString("fr-FR", {
    // timeStyle: "short",
  });

export const addMonths = (date: Date, months: number) => {
  if (date) {
    date.setMonth(date.getMonth() + months);
    return date;
  }
  return new Date();
};

export const setTime = (date: Date, time: number[]) => {
  const [hours, minutes, seconds] = time;
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  return date;
};

export const byString = function <T>(path: string, obj: T): string {
  return path.split(".").reduce(function (prev, curr) {
    if (prev) {
      return prev[curr];
    }
    return "";
  }, obj || this);
};

export function getObjectsInstances<T>(elements: any[]) {
  return elements?.map((element) => element as T) ?? new Array<T>();
}
