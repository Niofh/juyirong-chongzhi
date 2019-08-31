import dayjs from 'dayjs'

/* console.log(dayjs().add(3, 'months').format('YYYY-MM-DD'))
console.log(dayjs().add(0, 'months').format('YYYY-MM-DD'))*/
// 时间控件需要加入value-format
// 开始时间限制
/**
 * 默认相加0个月
 * @param endTimePick
 * @param time
 * @param num
 * @param dateType
 * @returns {*|boolean}
 */
const dateTime = (24 * 60 * 60 - 1) * 1000 // 当天时间

export function startPickerOptions(endTimePick, time, num = 0, dateType = 'months') {
  return endTimePick && time.getTime() > dayjs(endTimePick).valueOf() || time.getTime() > dayjs().add(num, dateType)
}

// 结束时间限制
export function endTimePickerOptions(startTimePick, time, num = 0, dateType = 'months') {
  return startTimePick && time.getTime() + dateTime < dayjs(startTimePick).valueOf() || time.getTime() > dayjs().add(num, dateType)
}

