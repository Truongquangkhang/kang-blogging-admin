export const ConverDateStringToTimeStamp = (date: string) =>{
    let result = Date.parse(date);
    return result
}

export const FormatTimestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

export const FormatRelativeTime = (timestamp: number): string => {
  timestamp = timestamp * 1000
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const now = Date.now();
  const elapsed = timestamp - now;

  const SECONDS = 1000;
  const MINUTES = SECONDS * 60;
  const HOURS = MINUTES * 60;
  const DAYS = HOURS * 24;
  const WEEKS = DAYS * 7;
  const MONTHS = DAYS * 30; // Rough approximation of a month
  const YEARS = DAYS * 365; // Rough approximation of a year

  if (Math.abs(elapsed) < MINUTES) {
      const seconds = Math.round(elapsed / SECONDS);
      return rtf.format(seconds, 'second');
  } else if (Math.abs(elapsed) < HOURS) {
      const minutes = Math.round(elapsed / MINUTES);
      return rtf.format(minutes, 'minute');
  } else if (Math.abs(elapsed) < DAYS) {
      const hours = Math.round(elapsed / HOURS);
      return rtf.format(hours, 'hour');
  } else if (Math.abs(elapsed) < WEEKS) {
      const days = Math.round(elapsed / DAYS);
      return rtf.format(days, 'day');
  } else if (Math.abs(elapsed) < MONTHS) {
      const weeks = Math.round(elapsed / WEEKS);
      return rtf.format(weeks, 'week');
  } else if (Math.abs(elapsed) < YEARS) {
      const months = Math.round(elapsed / MONTHS);
      return rtf.format(months, 'month');
  } else {
      const years = Math.round(elapsed / YEARS);
      return rtf.format(years, 'year');
  }
}