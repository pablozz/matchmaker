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
  const today = new Date();
  const month = getMonth(secs);
  const day = getDay(secs);

  // checks if maybe the date will be today or tomorrow
  if (today.getFullYear() === getYear(secs) && today.getMonth() + 1 === month) {
    if (today.getDate() === day) return 'Šiandien';
    else if (today.getDate() + 1 === day) return 'Rytoj';
  }

  const m = month >= 10 ? month.toString() : '0' + month;
  const d = day >= 10 ? day.toString() : '0' + day;

  return m + '-' + d + ', ' + getWeekday(secs);
};

export const getFullDate = (secs: number) => {
  const month = getMonth(secs);
  const day = getDay(secs);

  const m = month >= 10 ? month.toString() : '0' + month;
  const d = day >= 10 ? day.toString() : '0' + day;

  return getYear(secs) + '-' + m + '-' + d;
};

export const getTimeString = (secs: number) => {
  const t = new Date(secs * 1000);
  const tHours = t.getHours();
  const tMinutes = t.getMinutes();

  const h = tHours >= 10 ? tHours.toString() : '0' + tHours.toString();
  const m = tMinutes >= 10 ? tMinutes.toString() : '0' + tMinutes.toString();

  return h + ':' + m;
};
