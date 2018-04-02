const ua = navigator.userAgent.toLowerCase()
let device = null
if (ua.match('android')) { device = 'android' }
else { device = 'ios' }
export default device
