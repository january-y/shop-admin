import { ref } from 'vue'

const useScoll = (el: HTMLElement, time: number = 50) => {
  let isTop = ref<boolean>()
  let isBottom = ref<boolean>()
  let timer: any = ''

  function scollFn() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      const scollTop = el.scrollTop
      const scollHeight = el.scrollHeight
      const clientHeight = el.clientHeight
      isTop.value = scollTop <= 50 ? true : false
      isBottom.value = scollTop + clientHeight + 20 >= scollHeight
      //
      // console.log(isBottom.value)
      // console.log(scollTop, scollHeight, clientHeight)
    }, time)
  }
  scollFn()

  function offScoll() {
    el.removeEventListener('scroll', scollFn)
  }

  el.addEventListener('scroll', scollFn)

  return {
    isTop,
    isBottom,
    offScoll,
  }
}

export default useScoll
