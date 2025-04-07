export function numberToCurrencyNo(value) {
    if (!value) return 0
    // 取得整數部分
    const intPart = Math.trunc(value)
    // 整数部分加上,
    const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    // 預定義小數部分
    let floatPart = ''
    // 將數值擷取為小數部分跟整數部分
    const valueArray = value.toString().split('.')
    if (valueArray.length === 2) { // 有小數部分
      floatPart = valueArray[1].toString() // 取得小數部分
      return intPartFormat + '.' + floatPart
    }
    return intPartFormat + floatPart
  }