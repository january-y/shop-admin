import { ref } from 'vue'

const useInClient = (el: HTMLElement, imgEl: HTMLImageElement, time: number = 50) => {
  let isIn = ref<boolean>(false)
  let timer: any = ''

  function scollFn() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      const scollTop = el.scrollTop
      const offset = imgEl.offsetTop
      const clientHeight = el.clientHeight
      //
      isIn.value = scollTop + clientHeight >= offset - 50 ? true : false
      if (isIn.value == true) {
        imgEl.src = imgEl.getAttribute('data-url') as string
      }
      console.log(isIn.value)
    }, time)
  }
  scollFn()

  function offScoll() {
    el.removeEventListener('scroll', scollFn)
  }

  el.addEventListener('scroll', scollFn)

  return {
    isIn,
    offScoll,
  }
}

export default useInClient
