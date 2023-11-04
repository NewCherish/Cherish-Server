export function getCurrentSeoulTime(): Date {
  const seoulTimeZone = 'Asia/Seoul';
  const currentTime: Date = new Date();

  const seoulTime: Date = new Date(
    currentTime.toLocaleString('en-US', { timeZone: seoulTimeZone }),
  );

  seoulTime.setHours(seoulTime.getHours() + 9);
  return seoulTime;
}
