// 姓名脱敏
export function desenName(num) {
    if (num && num.length > 1) {
        var des = num.substring(1);
        return num.substr(0, 1) + des.replace(/./g, "*")
    } else {
        return num;
    }
}