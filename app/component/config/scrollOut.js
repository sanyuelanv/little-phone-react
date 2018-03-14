const touchEvent = function (event) {
  // 判断默认行为是否可以被禁用
  if (event.cancelable) {
    // 判断默认行为是否已经被禁用
    if (!event.defaultPrevented) {
      event.preventDefault()
    }
  }
}
export default function scrollSetting () {
  // document.addEventListener('touchstart', touchEvent, false)
  document.addEventListener('touchmove', touchEvent, false)
  // document.addEventListener('touchend', touchEvent, false)
}
