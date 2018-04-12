const os = require('os')
// 判断本机IP
const ifaces = os.networkInterfaces()
const ips = []
let IP = 'localhost'
for (const key in ifaces) {
  if (ifaces.hasOwnProperty(key)) {
    const arr = ifaces[key]
    arr.map((item, index) => {
      if (item.address !== '127.0.0.1' && item.family === 'IPv4' && item.mac !== '00:00:00:00:00:00') {
        ips.push(item.address)
      }
    })
  }
}
if (ips.length >= 1) { IP = ips[0] }
module.exports = IP
