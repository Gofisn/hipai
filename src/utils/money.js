

// 金钱数量 没有小数点
export function parseMoney(str) {
  if (str) {
    str = str.toString()
    let arr = str.split('.');
    str = arr[0]
    var dian = '';
    let i = str.length
    if (i <= 3) {
      return str + dian;
    } else if (i > 3 && i <= 6) {
      return str.substring(0, i - 3) + "," + str.substring(i - 3) + dian
    } else if (i > 6 && i <= 9) {
      return str.substring(0, i - 6) + "," + str.substring(i - 6, i - 3) + "," + str.substring(i - 3) + dian
    } else if (i > 9 && i <= 12) {
      return str.substring(0, i - 9) + "," + str.substring(0, i - 6) + "," + str.substring(i - 6, i - 3) + "," + str.substring(i - 3) + dian
    } else {
      return str + dian
    }
  } else {
    return str;
  }

}
// 金钱数量 有小数点
export function parseMoneyD(str) {
  if (str) {
    str = str.toString()
    let arr = str.split('.');
    str = arr[0]
    var dian = '';
    if (arr[1]) {
      dian = '.' + arr[1];
    }
    let i = str.length
    if (i <= 3) {
      return str + dian;
    } else if (i > 3 && i <= 6) {
      return str.substring(0, i - 3) + "," + str.substring(i - 3) + dian
    } else if (i > 6 && i <= 9) {
      return str.substring(0, i - 6) + "," + str.substring(i - 6, i - 3) + "," + str.substring(i - 3) + dian
    } else if (i > 9 && i <= 12) {
      return str.substring(0, i - 9) + "," + str.substring(0, i - 6) + "," + str.substring(i - 6, i - 3) + "," + str.substring(i - 3) + dian
    } else {
      return str + dian
    }
  } else {
    return str;
  }

}

export function moneyFormatD(str) {
    str = (parseFloat(str) / 100).toFixed(2);
    return parseMoneyD(str);
}

