export const getYear = (secs: number) => {
  const date = new Date();
  date.setTime(secs * 1000);
  return date.getFullYear();
};

export const getMonth = (secs: number) => {
  const date = new Date();
  date.setTime(secs * 1000);
  return date.getMonth() + 1;
};

export const getDay = (secs: number) => {
  const date = new Date();
  date.setTime(secs * 1000);
  return date.getDate();
};

export const getWeekday = (secs: number) => {
  const date = new Date();
  date.setTime(secs * 1000);
  const weekday = date.getDay();
  switch (weekday) {
    case 0:
      return 'sekmadienis';
    case 1:
      return 'pirmadienis';
    case 2:
      return 'antradienis';
    case 3:
      return 'trečiadienis';
    case 4:
      return 'ketvirtadienis';
    case 5:
      return 'penktadienis';
    case 6:
      return 'šeštadienis';
    default:
      return '';
  }
};

export const getMonthDayString = (secs: number) => {
  let m: string;
  let d: string;

  const today = new Date();

  // checks if maybe the date will be today or tomorrow
  if (
    today.getFullYear() === getYear(secs) &&
    today.getMonth() + 1 === getMonth(secs)
  ) {
    if (today.getDate() === getDay(secs)) return 'Šiandien';
    else if (today.getDate() + 1 === getDay(secs)) return 'Rytoj';
  }

  getMonth(secs) >= 10
    ? (m = getMonth(secs).toString())
    : (m = '0' + getMonth(secs));
  getDay(secs) >= 10 ? (d = getDay(secs).toString()) : (d = '0' + getDay(secs));
  return m + '-' + d + ', ' + getWeekday(secs);
};

export const getFullDate = (secs: number) => {
  const m =
    getMonth(secs) >= 10 ? getMonth(secs).toString() : '0' + getMonth(secs);
  const d = getDay(secs) >= 10 ? getDay(secs).toString() : '0' + getDay(secs);
  return getYear(secs) + '-' + m + '-' + d;
};

export const getTimeString = (secs: number) => {
  const t = new Date(secs * 1000);
  let h, m;
  t.getHours() >= 10
    ? (h = t.getHours().toString())
    : (h = '0' + t.getHours().toString());
  t.getMinutes() >= 10
    ? (m = t.getMinutes().toString())
    : (m = '0' + t.getMinutes().toString());
  return h + ':' + m;
};
