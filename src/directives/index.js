// 负责管理所有指令
export const imageError = {
  inserted(dom, option) {
    dom.src = dom.src || option.value
    dom.onerror = function() {
      dom.src = option.value
    }
  },
  componentUpdated(dom, option) {
    dom.src = dom.src || option.value
  }
}
