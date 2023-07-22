import * as dayjs from 'dayjs';

export const caculateDday = (today: Date, targetDay: Date) => {
  const _today = dayjs(today);
  const _targetDay = dayjs(targetDay);

  const result = _targetDay.diff(_today, 'day');

  return result;
};
