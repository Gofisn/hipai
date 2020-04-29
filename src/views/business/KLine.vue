<template>
  <div class="KLine">
    <!-- <top-head title="K line" @leftClick="goBack"></top-head> -->
    <div class="head_box">
      <div class="left" @click="goBack">
        <span></span>
      </div>
      <div class="title">K Grafik</div>
    </div>
    <div class="number_box">
      <div class="left">
        <div class="money">Rpc {{trans_info.rpc|numFormatD}}</div>
        <div class="dou">
          ≈Rp {{trans_info.rp|numFormatD}}
          <span :class="cls">{{trans_info.percent}}</span>
        </div>
      </div>
      <div class="right">
        <div class="itm">
          <span>Tinggi:</span>
          <span class="num">{{trans_hd.highest|numFormatD}}</span>
        </div>
        <div class="itm">
          <span>Rendah:</span>
          <span class="num">{{trans_hd.lowest|numFormatD}}</span>
        </div>
        <div class="itm">
          <span>24H：</span>
          <span class="num">{{trans_hd.total|numFormatD}}</span>
        </div>
      </div>
    </div>
    <div class="sourceType">
      <div class="type" :class="search==0?'active':''" @click="changeSearch(0)">1mins</div>
      <div class="type" :class="search==1?'active':''" @click="changeSearch(1)">15mins</div>
      <div class="type" :class="search==2?'active':''" @click="changeSearch(2)">4h</div>
      <div class="type" :class="search==3?'active':''" @click="changeSearch(3)">1day</div>
      <div class="type" :class="search==4?'active':''" @click="changeSearch(4)">7day</div>
      <div class="type" :class="search==5?'active':''" @click="changeSearch(5)">30day</div>
    </div>

    <div id="myChart" ref="myChart"></div>
    <div class="trans_contener">
      <div class="title">Transaksi</div>
      <div class="trans_list" v-show="transList.length">
        <table>
          <thead>
            <tr>
              <th>Waktu</th>
              <th>Jenis</th>
              <th>Harga</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in transList" :key="index">
              <th class="c1">{{item.create_time}}</th>
              <th :class="'color'+item.transaction_type">{{item.trans_text}}</th>
              <th>{{item.price|numFormatD}}</th>
              <th>{{item.num|numFormatD}}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="btn_contener">
      <div class="btn r" @click="goBuy">Beli</div>
      <div class="btn g" @click="goSell">Jual</div>
    </div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import {
  getLineDate,
  getLineHour,
  getLineMinute,
  getTransList
} from "utils/ajax";
import { Toast } from "vant";

// 加载echarts，注意引入文件的路径
import echarts from "echarts";
import { clearTimeout, clearInterval } from "timers";
import { stat } from 'fs';

// var echarts = require("echarts/lib/echarts");
// // 引入柱状图等
// require("echarts/lib/chart/line");
// require("echarts/lib/chart/candlestick");

// require("echarts/lib/component/tooltip"); // 提示组件

export default {
  name: "KLine",
  data() {
    return {
      backTo: "/bs-home",
      search: 5,
      myChart: null,
      // 查询条件  type 0:mins 1:hour 2:day
      typeList: [
        {
          type: 0,
          space: 1,
          num: 300
        },
        {
          type: 0,
          space: 15,
          num: 96
        },
        {
          type: 1,
          space: 4,
          num: 60
        },
        {
          type: 2,
          space: 1,
          num: 45
        },
        {
          type: 2,
          space: 7,
          num: 48
        },
        {
          type: 2,
          space: 30,
          num: 24
        }
      ],
      data0: [],
      source: [],
      num: 20, //交易最新列表数量
      transList: [],
      trans_hd: {},
      trans_info: {},
      cls: "",
      timer: null
    };
  },
  created() {
    Toast.clear();
    let homeActive = this.$store.state.business.homeActive;
    if (homeActive === 1) {
      this.backTo = "/sellout";
    } else {
      this.backTo = "/wantbuy";
    }
    this.getData();
    this.getTransInfo();
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.myChart);
  },
  components: {
    TopHead
  },
  beforeDestroy() {
    window.clearTimeout(this.timer);
  },
  methods: {
    goBack() {
      this.$router.push(this.backTo);
    },
    transInfo() {
      this.getTransInfo();
      this.timer = window.setTimeout(() => {
        window.clearTimeout(this.timer);
        this.transInfo();
      }, 10 * 1000);
    },
    getTransInfo() {
      let param = {
        num: this.num,
        hideloading: true
      };
      getTransList(this.$resultParams(param))
        .then(res => {
          if (res.code == 200) {
            this.transList = res.data.trans_list;
            this.trans_info = res.data.last_trans;
            this.trans_hd = res.data.trans_detailed;
            if (this.trans_info.percent.substr(0, 1) == "+") {
              this.cls = "plus";
            } else {
              this.cls = "reduce";
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getData() {
      let choose = this.typeList[this.search];
      if (choose.type == 0) {
        this.getMins(choose);
      } else if (choose.type == 1) {
        this.getHour(choose);
      } else if (choose.type == 2) {
        this.getDay(choose);
      }
    },
    changeSearch(ind) {
      this.search = ind;
      this.getData();
    },
    getDay(choose) {
      let param = {
        num: choose.num,
        sub: choose.space
      };
      getLineDate(this.$resultParams(param))
        .then(res => {
          if (res.code == 200) {
            this.source = res.data.source;
            this.setOption();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getHour(choose) {
      let param = {
        num: choose.num,
        sub: choose.space
      };
      getLineHour(this.$resultParams(param))
        .then(res => {
          if (res.code == 200) {
            this.source = res.data.source;
            this.setOption();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMins(choose) {
      let param = {
        num: choose.num,
        sub: choose.space
      };
      getLineMinute(this.$resultParams(param))
        .then(res => {
          if (res.code == 200) {
            this.source = res.data.source;
            this.setOption();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    sortSource(rawData) {
      var categoryData = [];
      var values = [];
      var y = [];
      let choose = this.typeList[this.search];
      for (var i = 0; i < rawData.length; i++) {
        if (choose.type == 2) {//天
          categoryData.push(rawData[i].date.substr(5));
        } else if (choose.type == 1) {//小时
          categoryData.push(rawData[i].date.substr(5)+" "+rawData[i].hour);
        } else if (choose.type == 0) {//分钟
          categoryData.push(rawData[i].minute);
        }

        values.push([
          rawData[i].open,
          rawData[i].close,
          rawData[i].lowest,
          rawData[i].highest
        ]);
        y.push(rawData[i].highest);
      }
      return {
        categoryData: categoryData,
        values: values,
        y: y
      };
    },
    goBuy() {
      this.$router.push("/wantbuy");
    },
    goSell() {
      this.$router.push("/sellout");
    },
    setOption() {
      this.data0 = this.sortSource(this.source);
      // 根据数据不同 找开始位置
      let len = this.typeList[this.search].num;
      let d = 20;
      if (len > 300) {
        d = 30;
      } else if (len > 500) {
        d = 50;
      }
      let start = 100 - parseInt((100 * d) / len);
      if (start < 0) {
        start = 0;
      } else if (start >= 100) {
        start = 98;
      }
      let option = {
        title: "",
        grid: {
          show: false,
          containLabel: true,
          left: "0%",
          top: "10%",
          width: "100%",
          height: "80%"
        },

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line"
          }
        },

        xAxis: {
          // name: this.xText,
          // nameTextStyle: {
          //   color: "#999",
          //   fontSize: "10",
          //   fontFamily: "PingFangSC-Regular",
          //   padding: [0, 0, 15, -50]
          // },
          // boundaryGap: true, //两边是否留白
          axisTick: {
            //坐标轴刻度相关设置。
            show: false //不显示坐标轴刻度
          },
          type: "category",
          data: this.data0.categoryData,
          axisLine: {
            show: false, //不显示轴线
            lineStyle: {
              color: "#ccc"
            }
          },
          axisLabel: {
            // show:false,
            margin: 15,
            // rotate: -90,
            color: "#999"
          },
          min: "dataMin",
          max: "dataMax"
        },
        yAxis: {
          gridIndex: 0,
          // name: "Harga/Hi-Koin",
          min: "dataMin",
          max: "dataMax",
          // nameTextStyle: {
          //   color: "#999",
          //   fontSize: "10",
          //   fontFamily: "PingFangSC-Regular",
          //   padding: [0, 0, 0, 50]
          // },
          // nameGap: 10,
          axisTick: {
            //坐标轴刻度
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#ccc"
            }
          },
          axisLabel: {
            margin: 10,
            color: "#ccc",
            inside: true,
            verticalAlign: "bottom"
          },
          splitLine: {
            //分割线
            lineStyle: {
              color: "#eee",
              type: "dotted"
            }
          }
        },
        // 缩放
        dataZoom: [
          {
            type: "inside",
            start: start,
            end: 100
          },
          {
            show: true,
            type: "slider",
            top: "90%",
            start: start,
            end: 100,
            // 数据阴影的样式
            dataBackground: {
              lineStyle: {
                color: "#FF9912"
              },
              areaStyle: {
                color: "#FF9912"
              }
            },
            // 选中范围的填充颜色
            fillerColor: "transparent",
            // 边框颜色
            borderColor: "transparent",
            // 手柄样式
            handleStyle: {
              color: "rgba(100,100,100,0.1)"
            }
          }
        ],
        series: [
          {
            name: "",
            type: "candlestick",
            data: this.data0.values,
            itemStyle: {
              color: "#E3170D",
              color0: "#00C957",
              borderColor: "#E3170D",
              borderColor0: "#00C957"
            }
          },
          {
            type: "line",
            symbol: "circle",
            symbolSize: 4,
            hoverAnimation: false,
            itemStyle: {
              opacity: 0.5,
              normal: {
                color: "#FF9912",
                borderColor: "#FF9912",
                borderWidth: 1,
                backgroundColor: "transparent"
              }
            },
            data: this.data0.y
          }
        ]
      };

      if (option && typeof option === "object") {
        this.myChart.setOption(option, true);
      }
    }
  }
};
</script>

<style lang="less" scoped src="../../assets/css/business.less"></style>
