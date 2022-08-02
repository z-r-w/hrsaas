// 负责管理所有指令
export const imageError = {
  inserted(dom, option) {
    dom.onerror = function() {
      dom.src = option.value
    }
  }
}
