let passiveSupported = false

try {
  const options = Object.defineProperty({}, 'passive', {
    get: function () {
      passiveSupported = true
    }
  })
  window.addEventListener('test', null, options)
}
catch (err) { }
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
  document.addEventListener('touchmove', touchEvent, passiveSupported
    ? { passive: false } : false)
}
