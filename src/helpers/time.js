// @flow

export const formatTimeToHHMM = (timestamp: ?number): string => {
  const date = timestamp ? new Date(timestamp * 1000) : new Date();
  let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const amPm = date.getHours() >= 12 ? 'PM' : 'AM';
  hours = hours < 10 ? `0${hours}` : hours;
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const time = `${hours}:${minutes} ${amPm}`;
  return time;
};
