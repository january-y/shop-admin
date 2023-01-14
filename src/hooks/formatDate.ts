export const useFormatDate = (
  date: Date,
  firtType: string = '-',
  secondType: string = ':',
  centerSlice: string = ' ',
) => {
  const year = String(date.getFullYear())
  let month = String(date.getMonth() + 1)
  let day = String(date.getDate())
  let hour = String(date.getHours())
  let minute = String(date.getMinutes())
  let second = String(date.getSeconds())
  if (month.length == 1) month = '' + 0 + month
  if (day.length == 1) day = '' + 0 + day
  if (hour.length == 1) hour = '' + 0 + hour
  if (minute.length == 1) minute = '' + 0 + minute
  if (second.length == 1) second = '' + 0 + second
  let formatRes =
    year +
    firtType +
    month +
    firtType +
    day +
    centerSlice +
    hour +
    secondType +
    minute +
    secondType +
    second
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    formatRes,
  }
}
