import { useCountUp } from './countUp'
export const registerDirectiveFocus = (app: any) => {
  app.directive('numRoll', {
    mounted(el: HTMLElement, binding: any) {
      useCountUp(el, binding.value)
    },
  })
}
