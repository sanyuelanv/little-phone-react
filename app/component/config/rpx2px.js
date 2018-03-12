const defaultConfig = {
  baseDpr: 2, // Dpr (default: 2)
  remUnit: 75, // 设计稿 750px
  remPrecision: 6 // rem计算精确度
}
const RPX_REG = /\b(\d+(\.\d+)?)rpx\b/
const RPX_GLOBAL_REG = new RegExp(RPX_REG.source, 'g')
function getValue (val, curType = 'px') {
  val = parseFloat(val.toFixed(defaultConfig.remPrecision))
  return val === 0 ? val : val + curType
}
function rpx2px ($1, value, isHairline = false) {
  $1 = Number($1)
  const { baseDpr, remUnit } = defaultConfig
  return value.replace(RPX_GLOBAL_REG, $1 / baseDpr > 0.5 ? getValue($1 / remUnit)
    : !isHairline && $1 / baseDpr < 1 ? getValue($1, 'px')
      : getValue($1 / baseDpr > 0.5 ? $1 / baseDpr : 0.5, 'px'))
}
export default function changeRpx (object) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const element = object[key]
      console.log(element)
    }
  }
}
