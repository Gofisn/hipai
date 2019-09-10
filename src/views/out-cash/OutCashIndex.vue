<template>
  <div class="out_cash">
    <TopHeader title="提现"
               rightMsg="金币明细"
               @leftClick="goBack"
               @rightClick="cashRecord" />
    <div class="layout"></div>
    <div class="out_cash_no_bank"
         v-if="!isHasBank">
      <div class="out_cash_bank_icon"></div>
      <div class="out_cash_bank_text">点击添加到账银行卡</div>
    </div>
    <div class="out_cash_bank"
         v-if="isHasBank">
      <div class="bank_title">
        <div class="bank_name">{{bankInfo.name}}</div>
        <div class="bank_user_name">{{bankInfo.username}}</div>
      </div>
      <div class="bank_card">
        <div class="bank_card_num">{{bankInfo.no}}</div>
        <div class="bank_card_text">到账银行卡</div>
      </div>
    </div>
    <div class="out_cash_container">
      <Stepper :value="outCashNum"
               @input="handleInput" />
      <div class="out_cash_tip tip1"
           v-if="!isCashTip">当前可提现{{cashNum}}金币, 每日提现限额50000金币</div>
      <div class="out_cash_tip tip2"
           v-if="isCashTip">{{outCashTip}}</div>
      <div class="out_cash_btn"
           :class="isCashNum&&isReading&&this.isHasBank ? 'onClick':'noClick'"
           @click="handleClick(0)">预计2个小时内到账，确认提现</div>
      <div class="read_out_cash">
        <div :class="isReading? 'yes_read_icon':'no_read_icon'"
             @click="handleClick(1)"></div>
        <div class="read_text">
          我已阅读并同意
          <span class="read_text_rule"
                @click="handleClick(2)">《金币提现说明》</span>
        </div>
      </div>
    </div>
    <div class="bonus_trend_tab">
      <!-- <div class="trend_tab"
           @click="handleClick(3)"
           :class="actived===1?'active':'noactive'">每日预期分红走势图</div> -->
      <div class="trend_tab"
           :class="actived===2?'active':'noactive'">每周分红走势图</div>
    </div>
    <div class="trendBox">
      <div class="trend_container"
           id="myChart"></div>
    </div>
    <!-- <van-popup v-model="bankShow"
               position="bottom">
      <div class="popo_title">
        添加到账银行卡
        <div class="pop_title_icon"
             @click="handleClick(6)"></div>
      </div>
      <div class="bank_container">
        <div class="bank_user_name">持卡姓名</div>
        <input type="text"
               v-model="bankUserName"
               class="bank_user_name_text"
               placeholder="请输入持卡姓名">
        <div class="bank_num_tip"
             v-if="isTipUserName">请输入持卡姓名</div>
        <div class="bank_user_name">银行卡号</div>
        <input type="text"
               v-model="bankUserNum"
               @input="handleBankNum"
               class="bank_user_name_text"
               placeholder="请输入银行卡号">
        <div class="bank_num_tip"
             v-if="isTipUserNum">请输入正确银行卡号</div>
        <div class="bank_user_name">银行名称</div>
        <input type="text"
               v-model="bankName"
               disabled="true"
               readOnly="true"
               class="bank_user_name_text"
               placeholder="银行名称">
        <div class="tip">注：本处绑卡仅支持绑定储蓄卡，请认真核实相关银行卡信息。</div>
        <div class="save_btn"
             :class="bankUserName!=''&&isBankAccess&&!isTipUserNum?'active':''"
             @click="handleClick(7)">保存</div>
      </div>
    </van-popup> -->
  </div>
</template>
<script>
import TopHeader from "@/components/TopHead";
import Stepper from "@/components/Stepper";
// import { getSystemInfoFromApp } from "@/assets/js/utils"
import { Dialog, Popup } from "vant";
import Vue from 'vue'
// import echarts from 'echarts';

// 加载echarts，注意引入文件的路径
import echarts from 'echarts/lib/echarts'
// 再引入你需要使用的图表类型，标题，提示信息等
import 'echarts/lib/chart/line'

Vue.use(Popup);
// Vue.use(echarts);
import { outCashData, userInfoData, isOcrInfo, userInfo, bankCard, addBankCard, bankName, outCashDetail, outCashNumber } from 'utils/ajax'
export default {
  name: "",
  components: {
    TopHeader,
    Stepper,
  },
  data () {
    return {
      // 是否有银行卡
      isHasBank: false,
      // 是否展示添加银行卡弹窗
      bankShow: false,
      bankInfo: {},
      // 版本号
      appVersion: '1.0.0',
      // 持卡人姓名
      bankUserName: '',
      isTipUserName: false,
      // 是否可点击
      isBankAccess: false,
      // 银行卡号
      bankUserNum: '',
      isTipUserNum: false,
      // 银行名称
      bankName: '',
      // 本人金额
      cashNum: 2000,
      // 提现金额
      outCashNum: 0,
      // 输入金额提示
      outCashTip: "",
      // 金额是否满足
      isCashNum: false,
      // 提现是否返回
      isNoCall: true,
      // 是否是提示
      isCashTip: false,
      // 按钮是否可点
      isClick: true,
      // 说明是否阅读
      isReading: false,
      // 走势图位置
      actived: 2,
      // 走势图最小值
      minData: 0,
      // 走势图最大值
      maxData: 0,
      // 走势图数据
      // trendData: {
      //   dayData: [
      //     ["6.17", "6.18", "6.19", "6.20", "6.21", "6.22", "6.23"],
      //     [200, 500, 300, 900, 700, 200, 900]
      //   ],
      //   weekData: [["8.17", "8.18", "8.19", "8.20"], [400, 600, 200, 1000]]
      // },
      // 展示数据
      activeData: [[], []]
    };
  },
  methods: {
    goBack () {
      this.$getSystemInfoFromApp("closeWebPage");
    },
    cashRecord () {
      this.$router.push("/cash-record");
    },
    handleClick (idx) {
      switch (idx) {
        case 0:
          // 确认提现按钮
          if (this.isCashNum && this.isReading && this.isHasBank && this.isNoCall) {
            this.getCashCount()
          }
          break;
        case 1:
          // 是否阅读图标
          this.isReading = !this.isReading;
          break;
        case 2:
          // 跳转提现说明
          this.$router.push("/cash-rule");
          break;
        case 3:
          // 趋势图table切换
          this.actived = 1;
          this.activeData = this.trendData.dayData;
          this.getTrend();
          break;
        case 4:
          // 趋势图table切换
          this.actived = 2;
          this.activeData = this.trendData.weekData;
          this.getTrend();
          break;
        case 5:
          // 添加银行卡btn
          this.bankShow = true;
          break;
        case 6:
          // 添加bankcard关闭按钮
          this.bankShow = false;
          break;
        case 7:
          // 保存银行卡btn
          if (this.bankUserName !== '' && this.isBankAccess) {
            this.toAddBankCard()
          }
        default:
          return;
      }
    },
    handleInput (cashVal) {
      if (cashVal < 100) {
        this.outCashTip = "每次最低提现100金币";
        this.isCashNum = false;
        this.isCashTip = true;
      } else {
        this.outCashTip = "";
        if (cashVal > 50000) {
          this.isCashNum = false;
          this.isCashTip = true;
          this.outCashTip = "每日最高50000金币";
        } else {
          this.outCashTip = "";
          if (cashVal > this.cashNum) {
            this.isCashNum = false;
            this.isCashTip = true;
            this.outCashTip = "当前可提现" + this.cashNum + "金币";
          } else {
            this.outCashTip = "";
            this.isCashNum = true;
            this.isCashTip = false;
            this.outCashNum = cashVal;
          }
        }
      }
    },
    getTrend () {
      let that = this;
      // let myChart = this.$echarts.init(document.getElementById("myChart"));
      let myChart = echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        title: "",
        grid: [{ x: "10%", y: "10%", width: "80%", height: "75%" }],
        xAxis: {
          gridIndex: 0,
          name: "日期",
          nameTextStyle: {
            color: "rgba(197, 197, 197, 1)",
            fontSize: "13"
          },
          nameGap: 3,
          boundaryGap: true,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "rgba(229, 229, 229, 1)"
            }
          },
          axisLabel: {
            margin: 15,
            color: "rgba(171, 171, 171, 1)"
          },
          data: this.activeData[0]
        },
        yAxis: {
          gridIndex: 0,
          name: "分红",
          min: this.minData,
          max: this.maxData,
          nameTextStyle: {
            color: "rgba(197, 197, 197, 1)",
            fontSize: "13"
          },
          // scale:true,
          nameGap: 10,
          triggerEvent: false,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "rgba(229, 229, 229, 1)"
            }
          },
          axisLabel: {
            margin: 5,
            color: "rgba(171, 171, 171, 1)"
          },
          splitLine: {
            lineStyle: {
              color: "rgba(240, 240, 240, 1)",
              type: "dotted"
            }
          }
        },
        series: [
          {
            type: "line",
            symbol: "circle",
            symbolSize: 5,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                label: {
                  show: true
                },
                color: "rgba(254, 141, 170, 1)",
                borderColor: "rgba(247, 23, 80, 1)",
                borderWidth: 1,
                backgroundColor: "transparent"
              }
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(254, 220, 225, 1)" // 0% 处的颜色
                  },
                  {
                    offset: 0.8,
                    color: "rgba(255, 255, 255, 1)" // 100% 处的颜色
                  }
                ]
              }
            },
            data: this.activeData[1]
          }
        ]
      });
    },
    // 添加银行卡
    toAddBankCard () {
      let timestamp = parseInt(new Date().getTime() / 1000);
      addBankCard(this.$resultParams({ name: this.bankUserName, bank_name: this.bankName, bankcard_no: this.bankUserNum, requested_at: timestamp, version: this.appVersion })).then(res => {
        if (res.code === 200) {
          this.getBankCard()
          this.bankShow = false;
        } else {
          this.$toast(res.msg)
        }

      })
    },
    // 处理开户行
    handleBankNum () {
      if (/^([1-9]{1})(\d{14}|\d{15}|\d{16}|\d{17}|\d{18})$/.test(this.bankUserNum)) {
        bankName(this.$resultParams({ bankcard_no: this.bankUserNum })).then(res => {
          if (res.code === 200) {
            this.bankName = res.data.bank_name
            this.isBankAccess = true;
            this.isTipUserNum = false;
          } else {
            this.isBankAccess = false;
            this.isTipUserNum = true;
            this.bankName = ""
            this.$toast(res.msg)
          }
        })
      } else {
        this.isTipUserNum = true;
      }
    },
    // 排序
    sortArray () {
      this.minData = Math.max(...this.activeData[1])
      this.maxData = Math.min(...this.activeData[1])
    },
    // 获取银行卡
    // getBankCard () {
    //   let timestamp = parseInt(new Date().getTime() / 1000);
    //   let params = {
    //     requested_at: timestamp,
    //     version: this.appVersion
    //   }
    //   bankCard(this.$resultParams(params)).then(res => {
    //     if (res.code === 200) {
    //       if (res.data) {
    //         this.bankInfo = res.data;
    //         this.isHasBank = true;
    //       } else {
    //         this.isHasBank = false;
    //       }
    //     } else {
    //       // this.$toast(res.msg)
    //     }
    //   })
    // },
    // 获取用户信息
    // getUserInfo () {
    //   userInfo().then(res => {
    //     if (res.code === 200) {
    //       this.cashNum = res.data.gold_amount
    //     } else {
    //       this.$toast(res.msg)
    //     }
    //   })
    // },
    // 提现接口
    toOutCash () {
      let that = this
      let timestamp = parseInt(new Date().getTime() / 1000);
      that.isNoCall = false
      outCashData(this.$resultParams({ requested_at: timestamp, version: this.appVersion, gold: this.outCashNum })).then(res => {
        console.log(res)
        that.isNoCall = true
        if (res.code === 200) {
          if (res.data.cash_result === 'PROCESSING' || res.data.cash_result === 'SUCCESS') {
            that.$router.push({
              path: '/cash-detail',
              query: {
                data: res.data.cash_result
              }
            })
          } else {
            Dialog.alert({
              title: '确认失败',
              message: '未知原因导致本次确认失败，您可以继续确认提现。'
            }).then(() => {

            });
          }
        } else {
          this.isNoCall = true
          this.$toast(res.msg)
        }
      }).catch(err => {
        that.isNoCall = true
      })
    },
    // 获取提现次数
    getCashCount () {
      outCashNumber().then(res => {
        console.log(res)
        if (res.code === 200) {
          if (res.data.is_first) {
            Dialog.setDefaultOptions({
              confirmButtonText: '继续提现',
              confirmButtonColor: 'rgba(51, 123, 208, 1)',
              cancelButtonText: '暂不提现',
              cancelButtonColor: 'rgba(34, 34, 34, 1)',
            })
            Dialog.confirm({
              title: "金币抵扣",
              message: "为验证用户有效性，人脸识别认证所产生的鉴别费用抵扣100金币。"
            }).then(() => {
              this.toOutCash()
            }).catch(err => {
              // this.$toast(err)
            })
          } else {
            this.toOutCash()
          }
        } else {
          this.$toast(res.msg)
        }
      }).catch(err => {

      })
    },
    // 获取实名认证信息
    getIsOcrInfo () {
      let timestamp = parseInt(new Date().getTime() / 1000);
      isOcrInfo(this.$resultParams({ requested_at: timestamp, version: this.appVersion })).then(res => {
        console.log(res)
        var u = navigator.userAgent;
        if (res.code === 200) {
          if (res.data.personal_info && res.data.cert_image && res.data.hand_image && res.data.alipay_no && res.data.bankcard && res.data.auth_name) {
            // this.getUserInfoData();
          } else {
            Dialog.setDefaultOptions({
              confirmButtonText: '去认证',
              confirmButtonColor: 'rgba(51, 123, 208, 1)',
              cancelButtonText: '暂不认证',
              cancelButtonColor: 'rgba(34, 34, 34, 1)',
              className: "reload"
            })
            Dialog.confirm({
              message: '&nbsp;<br/>提现需完成实名认证。<br/>&nbsp;'
            }).then(() => {
              if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                if (window.android && window.android.startVerifiedPage) {
                  window.android.closeWebPage()
                  window.android.startVerifiedPage()
                }
              }
              if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                if (window.webkit) {
                  //调用IOS的jumpjumpNext（）方法     
                  let params = null
                  // window.webkit.messageHandlers.closeWebPage.postMessage(params);
                  window.webkit.messageHandlers.startVerifiedPage.postMessage(params);
                }
              }
            }).catch(() => {
              if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                if (window.android && window.android.closeWebPage) {
                  window.android.closeWebPage()
                }
              }
              if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                if (window.webkit) {
                  //调用IOS的jumpjumpNext（）方法     
                  let params = null
                  window.webkit.messageHandlers.closeWebPage.postMessage(params);
                }
              }
            })
          }
        } else {
          this.$toast(res.msg)
        }
      })
    },
    getUserInfoData () {
      let timestamp = parseInt(new Date().getTime() / 1000);
      userInfoData(this.$resultParams({ requested_at: timestamp, version: this.appVersion })).then(res => {
        console.log(res)
        if (res.code === 200) {
          if (res.data.week_gold) {
            this.activeData[0] = res.data.week_gold.keys
            this.activeData[1] = res.data.week_gold.values
          }
          this.sortArray()
          this.cashNum = res.data.gold_amount
          this.isCashTip = false
          if (JSON.stringify(res.data.bank_info) !== "{}" && res.data.bank_info !== null) {
            this.bankInfo = res.data.bank_info
            this.isHasBank = true;
          } else {
            this.isHasBank = false;
          }
          this.getTrend();
        } else {
          this.$toast(res.msg)
        }
      })
    }
  },
  mounted () {
    this.getIsOcrInfo();
    this.getUserInfoData()
  }
};
</script>
<style lang="less" scoped>
.out_cash {
  width: 750px;
  background: rgba(255, 255, 255, 1);
  .layout {
    height: 90px;
  }
  .out_cash_no_bank {
    margin: 20px 30px;
    height: 100px;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    border: 1px dashed rgba(197, 197, 197, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .out_cash_bank_icon {
      width: 80px;
      height: 80px;
      margin-top: 10px 20px;
      background: url(../../assets/img/add_btn.png) no-repeat center;
      background-size: 50% 50%;
    }
    .out_cash_bank_text {
      flex: 1;
      text-align: left;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(33, 33, 33, 1);
      line-height: 80px;
    }
  }
  .out_cash_bank {
    margin: 20px 30px;
    height: 82px;
    background: linear-gradient(
      225deg,
      rgba(243, 200, 129, 1) 0%,
      rgba(208, 160, 93, 1) 100%
    );
    border-radius: 20px;
    padding: 9px 24px 9px 20px;
    .bank_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
      text-align: left;
      padding-bottom: 2px;
    }
    .bank_card {
      height: 40px;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .bank_card_num {
        flex: 1;
      }
      .bank_card_text {
        height: 30px;
        font-size: 22px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 30px;
      }
    }
  }
  .out_cash_container {
    margin: 0 auto;
    width: 460px;
    text-align: center;
    padding: 20px 0 77px;

    .out_cash_tip {
      text-align: center;
      margin: 10px auto 53px;
      height: 30px;
      font-size: 22px;
      font-family: PingFangSC;
      font-weight: 400;
      line-height: 30px;
    }
    .tip1 {
      color: rgba(153, 153, 153, 1);
    }
    .tip2 {
      color: rgba(248, 23, 80, 1);
    }
    .out_cash_btn {
      width: 460px;
      height: 80px;
      border-radius: 20px;
      line-height: 80px;
      font-size: 32px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      &.onClick {
        background: linear-gradient(
          85deg,
          rgba(247, 23, 80, 1) 0%,
          rgba(248, 23, 80, 1) 100%
        );
        box-shadow: 0px 6px 16px 0px rgba(175, 0, 0, 0.25);
      }
      &.noClick {
        background: rgba(197, 197, 197, 1);
      }
    }
    .read_out_cash {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 30px auto 0;
      height: 30px;
      .yes_read_icon {
        width: 30px;
        height: 30px;
        background: url(../../assets/img/yes_btn.png) no-repeat center;
        background-size: 100%;
      }
      .no_read_icon {
        width: 30px;
        height: 30px;
        background: url(../../assets/img/no_agree.png) no-repeat center;
        background-size: 100%;
      }
      .read_text {
        margin-left: 10px;
        height: 30px;
        font-size: 22px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        .read_text_rule {
          color: rgba(51, 123, 208, 1);
        }
      }
    }
  }
  .bonus_trend_tab {
    margin: 0 30px;
    height: 60px;
    // border-top: 2px solid rgba(255, 0, 74, 1);
    // border-bottom: 2px solid rgba(255, 0, 74, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .trend_tab {
      flex: 1;
      height: 60px;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      line-height: 60px;
      border-radius: 4px;
      // border-left: 2px solid rgba(255, 0, 74, 1);
      // border-right: 2px solid rgba(255, 0, 74, 1);
    }
    .active {
      background: rgba(247, 23, 80, 1);
      color: rgba(255, 255, 255, 1);
    }
    .noactive {
      background: rgba(255, 255, 255, 1);
      color: rgba(89, 89, 89, 1);
    }
  }
  .trendBox {
    position: relative;
    .trend_container {
      margin: 0 auto;
      margin: 26px 30px 90px;
      height: 476px;
      width: 690px;
    }
    .alert {
      position: absolute;
      top: 10px;
      left: 50%;
      width: 200px;
      margin-left: -100px;
      height: 45px;
      text-align: center;
      // background: #aaa;
    }
  }
}
</style>

<style lang="less">
.out_cash {
  .popo_title {
    z-index: 100;
    position: relative;
    height: 73px;
    border: 1px solid rgba(242, 242, 242, 1);
    font-size: 36px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 73px;
    letter-spacing: 1px;
    text-align: center;
    .pop_title_icon {
      position: absolute;
      width: 68px;
      height: 68px;
      background: url(../../assets/img/close_btn.png) no-repeat center;
      background-size: 50% 50%;
      top: 2.5px;
      right: 15px;
    }
  }
  .bank_container {
    margin: 10px 30px 86px;
    .bank_user_name {
      margin-top: 20px;
      width: 100%;
      height: 42px;
      margin-bottom: 20px;
      font-size: 32px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(34, 34, 34, 1);
      line-height: 42px;
    }
    .bank_user_name_text {
      outline: 0;
      -webkit-appearance: none;
      padding-left: 20px;
      width: 650px;
      padding: 0 20px;
      font-size: 32px;
      height: 80px;
      border-radius: 12px;
      border: 1px solid rgba(197, 197, 197, 1);
      font-family: PingFangSC-Light;
      font-weight: 300;
      line-height: 80px;
      color: #666;
      &::placeholder {
        font-size: 32px;
        font-family: PingFangSC-Light;
        font-weight: 300;
        color: rgba(197, 197, 197, 1);
        line-height: 80px;
      }
    }
    .bank_num_tip {
      color: rgba(248, 23, 80, 1);
    }
    .tip {
      margin: 10px 9px 0;
      font-size: 24px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(197, 197, 197, 1);
      line-height: 33px;
    }
    .save_btn {
      height: 90px;
      margin-top: 86px;
      text-align: center;
      font-size: 36px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 90px;
      background: rgba(197, 197, 197, 1);

      border-radius: 20px;
      &.active {
        background: linear-gradient(
          85deg,
          rgba(247, 23, 80, 1) 0%,
          rgba(248, 23, 80, 1) 100%
        );
        color: rgba(255, 255, 255, 1);
        box-shadow: 0px 6px 16px 0px rgba(175, 0, 0, 0.25);
      }
    }
  }
}
.reload {
  .van-dialog__message {
    font-size: 36px;
  }
}
</style>
