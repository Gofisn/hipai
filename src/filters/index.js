import Vue from 'vue'

import * as money from './money'
import * as datetime from './datetime'


Object.keys(money).forEach(k => Vue.filter(k, money[k]))
Object.keys(datetime).forEach(k => Vue.filter(k, datetime[k]))
