// 判断是修改是否显示
export const validateEndTime = (itemInfo: any) => {
  // 开始
  const startTime = itemInfo.start_time
  const endTime = itemInfo.end_time
  //
  const startYear = startTime.slice(0, 4) * 1
  const startMonth = startTime.slice(5).slice(0, 2) * 1
  const startDay = startTime.slice(8).slice(0, 2) * 1
  const startH = startTime.slice(11).slice(0, 2) * 1
  const startM = startTime.slice(14).slice(0, 2) * 1
  const startS = startTime.slice(17).slice(0, 2) * 1
  //
  const endYear = endTime.slice(0, 4) * 1
  const endMonth = endTime.slice(5).slice(0, 2) * 1
  const endDay = endTime.slice(8).slice(0, 2) * 1
  const endH = endTime.slice(11).slice(0, 2) * 1
  const endM = endTime.slice(14).slice(0, 2) * 1
  const endS = endTime.slice(17).slice(0, 2) * 1
  //
  const date = new Date()
  const nowYear = date.getFullYear()
  const nowMonth = date.getMonth() + 1
  const nowDay = date.getDate()
  const nowH = date.getHours()
  const nowM = date.getMinutes()
  const nowS = date.getSeconds()
  //
  let flag = false
  let status = '已失效'
  // 开始时间
  if (startYear > nowYear && itemInfo.status == 1) {
    flag = true
    status = '未开始'
  }
  if (startYear == nowYear && startMonth > nowMonth && itemInfo.status == 1) {
    flag = true
    status = '未开始'
  }
  if (startYear == nowYear && startMonth == nowMonth && startDay > nowDay && itemInfo.status == 1) {
    flag = true
    status = '未开始'
  }
  if (
    startYear == nowYear &&
    startMonth == nowMonth &&
    startDay == nowDay &&
    startH > nowH &&
    itemInfo.status == 1
  ) {
    flag = true
    status = '未开始'
  }
  if (
    startYear == nowYear &&
    startMonth == nowMonth &&
    startDay == nowDay &&
    startH == nowH &&
    startM > nowM &&
    itemInfo.status == 1
  ) {
    flag = true
    status = '未开始'
  }
  if (
    startYear == nowYear &&
    startMonth == nowMonth &&
    startDay == nowDay &&
    startH == nowH &&
    startM == nowM &&
    startS > nowS &&
    itemInfo.status == 1
  ) {
    flag = true
    status = '未开始'
  }
  // 结束时间
  if (endYear < nowYear) {
    flag = true
    status = '已结束'
  }
  if (endYear == nowYear && endMonth < nowMonth) {
    flag = true
    status = '已结束'
  }
  if (endYear == nowYear && endMonth == nowMonth && endDay < nowDay) {
    flag = true
    status = '已结束'
  }
  if (endYear == nowYear && endMonth == nowMonth && endDay == nowDay && endH < nowH) {
    flag = true
    status = '已结束'
  }
  if (
    endYear == nowYear &&
    endMonth == nowMonth &&
    endDay == nowDay &&
    endH == nowH &&
    endM < nowM
  ) {
    flag = true
    status = '已结束'
  }
  if (
    endYear == nowYear &&
    endMonth == nowMonth &&
    endDay == nowDay &&
    endH == nowH &&
    endM == nowM &&
    endS < nowS
  ) {
    flag = true
    status = '已结束'
  }
  if (!flag && itemInfo.status == 1) {
    status = '领取中'
  }
  //结束
  return status
}
// app.directive('validatebgc', {
//   mounted(el: HTMLElement, binding: any) {
//     // 开始
//     el.style.display = 'none'
//     const startTime = itemInfo.start_time
//     const endTime = itemInfo.end_time
//     //
//     const startYear = startTime.slice(0, 4) * 1
//     const startMonth = startTime.slice(5).slice(0, 2) * 1
//     const startDay = startTime.slice(8).slice(0, 2) * 1
//     const startH = startTime.slice(11).slice(0, 2) * 1
//     const startM = startTime.slice(14).slice(0, 2) * 1
//     const startS = startTime.slice(17).slice(0, 2) * 1
//     //
//     const endYear = endTime.slice(0, 4) * 1
//     const endMonth = endTime.slice(5).slice(0, 2) * 1
//     const endDay = endTime.slice(8).slice(0, 2) * 1
//     const endH = endTime.slice(11).slice(0, 2) * 1
//     const endM = endTime.slice(14).slice(0, 2) * 1
//     const endS = endTime.slice(17).slice(0, 2) * 1
//     //
//     const date = new Date()
//     const nowYear = date.getFullYear()
//     const nowMonth = date.getMonth() + 1
//     const nowDay = date.getDate()
//     const nowH = date.getHours()
//     const nowM = date.getMinutes()
//     const nowS = date.getSeconds()
//     //
//     let flag = true
//     // 开始时间
//     if (startYear > nowYear && itemInfo.status == 1) {
//       flag = false
//     }
//     if (startYear == nowYear && startMonth > nowMonth && itemInfo.status == 1) {
//       flag = false
//     }
//     if (
//       startYear == nowYear &&
//       startMonth == nowMonth &&
//       startDay > nowDay &&
//       itemInfo.status == 1
//     ) {
//       flag = false
//     }
//     if (
//       startYear == nowYear &&
//       startMonth == nowMonth &&
//       startDay == nowDay &&
//       startH > nowH &&
//       itemInfo.status == 1
//     ) {
//       flag = false
//     }
//     if (
//       startYear == nowYear &&
//       startMonth == nowMonth &&
//       startDay == nowDay &&
//       startH == nowH &&
//       startM > nowM &&
//       itemInfo.status == 1
//     ) {
//       flag = false
//     }
//     if (
//       startYear == nowYear &&
//       startMonth == nowMonth &&
//       startDay == nowDay &&
//       startH == nowH &&
//       startM == nowM &&
//       startS > nowS &&
//       itemInfo.status == 1
//     ) {
//       flag = false
//     }
//     // 结束时间
//     if (endYear < nowYear) {
//       flag = false
//     }
//     if (endYear == nowYear && endMonth < nowMonth) el.innerHTML = '已结束'
//     if (endYear == nowYear && endMonth == nowMonth && endDay < nowDay) {
//       flag = false
//     }
//     if (endYear == nowYear && endMonth == nowMonth && endDay == nowDay && endH < nowH) {
//       flag = false
//     }
//     if (
//       endYear == nowYear &&
//       endMonth == nowMonth &&
//       endDay == nowDay &&
//       endH == nowH &&
//       endM < nowM
//     ) {
//       flag = false
//     }
//     if (
//       endYear == nowYear &&
//       endMonth == nowMonth &&
//       endDay == nowDay &&
//       endH == nowH &&
//       endM == nowM &&
//       endS < nowS
//     ) {
//       flag = false
//     }
//     // other
//     if (flag && itemInfo.status == 1 && itemInfo.used <= itemInfo.total) {
//       el.style.backgroundColor = '#FFF1F2'
//       el.style.color = '#F87171'
//       el.style.fontWeight = '900'
//     }
//     //结束
//     el.style.display = 'block'
//   },
// })
