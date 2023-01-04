export const useCountUp = (el: HTMLElement, wait: number = 20) => {
  let counter = Number(String(el.innerText))
  let nowCount: any = 0
  let integer = true
  let timer: any = null
  let step: number = 10

  const arr = String(counter).split('')
  arr.forEach((item: string) => {
    if (item == '.') {
      integer = false
    }
  })

  // console.log(integer)

  for (let i = 0; i <= 55; i++) {
    timer = setTimeout(() => {
      if (el) {
        // console.log(i * counter * 0.02)
        nowCount = i * counter * 0.02 <= counter ? i * counter * 0.02 : counter
        if (integer) {
          nowCount = nowCount.toFixed(0)
        } else {
          nowCount = nowCount.toFixed(2)
        }

        el.innerHTML = nowCount
      }
    }, step)
    step += wait
  }
  clearTimeout(timer)
  // import setTimeout是异步，延迟时间需递增
}
