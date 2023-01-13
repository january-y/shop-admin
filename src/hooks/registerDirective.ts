import { useCountUp } from './countUp'

export const registerDirectiveFocus = (app: any) => {
  app.directive('numRoll', {
    mounted(el: HTMLElement, binding: any) {
      useCountUp(el, binding.value)
    },
  })
  app.directive('validatetime', {
    mounted(el: HTMLElement, binding: any) {
      // 开始
      el.style.display = 'none'
      const startTime = binding.value.start_time
      const endTime = binding.value.end_time
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
      let flag = true
      // 开始时间
      el.innerHTML = '已结束'
      if (startYear > nowYear && binding.value.status == 1) {
        el.innerHTML = '未开始'
        flag = false
      }
      if (startYear == nowYear && startMonth > nowMonth && binding.value.status == 1) {
        el.innerHTML = '未开始'
        flag = false
      }
      if (
        startYear == nowYear &&
        startMonth == nowMonth &&
        startDay > nowDay &&
        binding.value.status == 1
      ) {
        el.innerHTML = '未开始'
        flag = false
      }
      if (
        startYear == nowYear &&
        startMonth == nowMonth &&
        startDay == nowDay &&
        startH > nowH &&
        binding.value.status == 1
      ) {
        el.innerHTML = '未开始'
        flag = false
      }
      if (
        startYear == nowYear &&
        startMonth == nowMonth &&
        startDay == nowDay &&
        startH == nowH &&
        startM > nowM &&
        binding.value.status == 1
      ) {
        el.innerHTML = '未开始'
        flag = false
      }
      if (
        startYear == nowYear &&
        startMonth == nowMonth &&
        startDay == nowDay &&
        startH == nowH &&
        startM == nowM &&
        startS > nowS &&
        binding.value.status == 1
      ) {
        el.innerHTML = '未开始'
        flag = false
      }
      // 结束时间
      if (endYear < nowYear) {
        el.innerHTML = '已结束'
        flag = false
      }
      if (endYear == nowYear && endMonth < nowMonth) el.innerHTML = '已结束'
      if (endYear == nowYear && endMonth == nowMonth && endDay < nowDay) {
        el.innerHTML = '已结束'
        flag = false
      }
      if (endYear == nowYear && endMonth == nowMonth && endDay == nowDay && endH < nowH) {
        el.innerHTML = '已结束'
        flag = false
      }
      if (
        endYear == nowYear &&
        endMonth == nowMonth &&
        endDay == nowDay &&
        endH == nowH &&
        endM < nowM
      ) {
        el.innerHTML = '已结束'
        flag = false
      }
      if (
        endYear == nowYear &&
        endMonth == nowMonth &&
        endDay == nowDay &&
        endH == nowH &&
        endM == nowM &&
        endS < nowS
      ) {
        el.innerHTML = '已结束'
        flag = false
      }
      // other
      if (flag && binding.value.status == 1 && binding.value.used <= binding.value.total) {
        el.innerHTML = '领取中'
      }
      if (flag && binding.value.status !== 1) {
        el.innerHTML = '已失效'
      }
      //结束
      el.style.display = 'block'
    },
  })
  app.directive('validatebgc', {
    mounted(el: HTMLElement, binding: any) {
      // 开始
      el.style.display = 'none'
      const startTime = binding.value.start_time
      const endTime = binding.value.end_time
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
      let flag = true
      // 开始时间
      if (startYear > nowYear && binding.value.status == 1) {
        flag = false
      }
      if (startYear == nowYear && startMonth > nowMonth && binding.value.status == 1) {
        flag = false
      }
      if (
        startYear == nowYear &&
        startMonth == nowMonth &&
        startDay > nowDay &&
        binding.value.status == 1
      ) {
        flag = false
      }
      if (
        startYear == nowYear &&
        startMonth == nowMonth &&
        startDay == nowDay &&
        startH > nowH &&
        binding.value.status == 1
      ) {
        flag = false
      }
      if (
        startYear == nowYear &&
        startMonth == nowMonth &&
        startDay == nowDay &&
        startH == nowH &&
        startM > nowM &&
        binding.value.status == 1
      ) {
        flag = false
      }
      if (
        startYear == nowYear &&
        startMonth == nowMonth &&
        startDay == nowDay &&
        startH == nowH &&
        startM == nowM &&
        startS > nowS &&
        binding.value.status == 1
      ) {
        flag = false
      }
      // 结束时间
      if (endYear < nowYear) {
        flag = false
      }
      if (endYear == nowYear && endMonth < nowMonth) el.innerHTML = '已结束'
      if (endYear == nowYear && endMonth == nowMonth && endDay < nowDay) {
        flag = false
      }
      if (endYear == nowYear && endMonth == nowMonth && endDay == nowDay && endH < nowH) {
        flag = false
      }
      if (
        endYear == nowYear &&
        endMonth == nowMonth &&
        endDay == nowDay &&
        endH == nowH &&
        endM < nowM
      ) {
        flag = false
      }
      if (
        endYear == nowYear &&
        endMonth == nowMonth &&
        endDay == nowDay &&
        endH == nowH &&
        endM == nowM &&
        endS < nowS
      ) {
        flag = false
      }
      // other
      if (flag && binding.value.status == 1 && binding.value.used <= binding.value.total) {
        el.style.backgroundColor = '#fff1f2'
      }
      //结束
      el.style.display = 'block'
    },
  })
}
