

// 时间转为毫秒
export function timeToSec(time) {
    var hour = time.split(':')[0]
    var min = time.split(':')[1]
    var sec = time.split(':')[2]
    var s = Number(hour * 3600) + Number(min * 60) + Number(sec)
    return s * 1000
}

// 将秒转化成时分秒
export function sec2time(s) {
    var t
    if (s > -1) {
        var hour = Math.floor(s / 3600)
        var min = Math.floor(s / 60) % 60
        var sec = s % 60
        if (hour < 10) {
            t = '0' + hour + ":"
        } else {
            t = hour + ":"
        }
        if (min < 10) {
            t += "0"
        }
        t += min + ":"
        if (sec < 10) {
            t += "0"
        }
        t += sec
        //   t += sec.toFixed(2)
    }
    return t
}


// 时间格式化
export function formatDate(date, fmt) {
    date = date.split('.')[0];
    date = new Date(date.replace(/-/g, "/"))
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
    }
    return fmt
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}

// 返回2020-03-26-62-30-0202
export function getTodayStr() {
    const now = new Date();
    const year = now.getFullYear(); //得到年份
    let month = now.getMonth() + 1;//得到月份
    if (month < 10) {
        month = "0" + month;
    }
    const date = now.getDate();//得到日期
    let today = year + "-" + month + "-" + date
    today = today + '-' + today.split("").reverse().join("")
    return today
}
