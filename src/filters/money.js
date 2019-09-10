
import { parseMoney, parseMoneyD } from "utils/money";

// 金钱数量 没有小数点
export function numFormat(str) {
  return parseMoney(str)
}
// 金钱数量 有小数点
export function numFormatD(str) {
  return parseMoneyD(str)
}

export function moneyFormatD(str) {
    str = (parseFloat(str) / 100).toFixed(2);
    return parseMoneyD(str);
}

