<template>
  <div class="BusinessList">
    <top-head title="交易记录" @leftClick="goBack"></top-head>
    <van-tabs sticky v-model="bsListActive" @click="changeBusinessActive">
      <van-tab title="历史交易">
        <div class="bs_list">
          <van-pull-refresh v-model="loading" @refresh="refresh">
            <van-list
              :offset="10"
              v-model="loading"
              :finished="finished"
              :finished-text="historyText"
              @load="getData"
              v-show="historyList.length||finished"
            >
              <div class="item" v-for="item in historyList" :key="item.id">
                <business-item :content="historyCont(item)" @oneClick="goAppeal(item)"></business-item>
              </div>
            </van-list>
            <div v-show="!historyList.length&&finished" class="nolist">
              <img src="../../assets/img/beans_no.png" alt>
              <div class="cont">暂无内容哦~</div>
            </div>
          </van-pull-refresh>
        </div>
      </van-tab>
      <van-tab title="待确认">
        <div class="bs_list">
          <van-pull-refresh v-model="loading" @refresh="refresh">
            <van-list
              :offset="10"
              v-model="loading"
              :finished="finished"
              :finished-text="sureText"
              @load="getData"
              v-show="waitSureList.length||finished"
            >
              <div class="item" v-for="item in waitSureList" :key="item.id">
                <business-item :content="waitSureCont(item)" @twoClick="receive(item.id)"></business-item>
              </div>
            </van-list>
            <div v-show="!waitSureList.length&&finished" class="nolist">
              <img src="../../assets/img/beans_no.png" alt>
              <div class="cont">暂无内容哦~</div>
            </div>
          </van-pull-refresh>
        </div>
      </van-tab>
      <van-tab title="出售中">
        <div class="bs_list">
          <van-pull-refresh v-model="loading" @refresh="refresh">
            <van-list
              :offset="10"
              v-model="loading"
              :finished="finished"
              :finished-text="sellText"
              @load="getData"
              v-show="sellList.length||finished"
            >
              <div class="item" v-for="item in sellList" :key="item.id">
                <business-item :content="sellCont(item)" @oneClick="withdraw(item.id)"></business-item>
              </div>
            </van-list>
            <div v-show="!sellList.length&&finished" class="nolist">
              <img src="../../assets/img/beans_no.png" alt>
              <div class="cont">暂无内容哦~</div>
            </div>
          </van-pull-refresh>
        </div>
      </van-tab>
      <van-tab title="待支付">
        <div class="bs_list">
          <van-pull-refresh v-model="loading" @refresh="refresh">
            <van-list
              :offset="10"
              v-model="loading"
              :finished="finished"
              :finished-text="payText"
              @load="getData"
              v-show="waitPayList.length||finished"
            >
              <div class="item" v-for="item in waitPayList" :key="item.id">
                <business-item :content="waitPayCont(item)" @oneClick="goPay(item.id)"></business-item>
              </div>
            </van-list>
            <div v-show="!waitPayList.length&&finished" class="nolist">
              <img src="../../assets/img/beans_no.png" alt>
              <div class="cont">暂无内容哦~</div>
            </div>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import BusinessItem from "@/components/BusinessItem";
import TopHead from "@/components/TopHead";
import { parseMoney, parseMoneyD } from "utils/money";
import { formatDate } from "utils/datetime";

import {
  businessWaitPay,
  businessSellList,
  businessWaitSure,
  businessHistoryOrder,
  businessApplyDown,
  businessGetSure,
  businessCalculatin
} from "utils/ajax";
import Vue from "vue";
import { Tab, Tabs, Dialog, Toast, List, PullRefresh } from "vant";
Vue.use(Tab)
  .use(Tabs)
  .use(Toast)
  .use(List)
  .use(PullRefresh);
export default {
  name: "BusinessList",
  data() {
    return {
      loading: false,
      bsListActive: 0,
      historyList: [], //历史
      waitPayList: [], //待支付
      sellList: [], //出售
      waitSureList: [], //带确认
      backTo: "/bs-home",
      page: 1,
      page_num: 30,
      finished: false,
      server_time: 0
    };
  },
  computed: {
    frozenTime() {
      //冻结时间 秒
      let config = this.$store.state.business.businessConfig;
      if (config && config.buyConf) {
        return parseFloat(config.buyConf.auto_draw_account_frozen_second);
      } else {
        return 24 * 60 * 60;
      }
    },
    historyText() {
      if (this.historyList.length < 8) {
        return "";
      } else {
        return "没有更多了";
      }
    },
    payText() {
      if (this.waitPayList.length < 8) {
        return "";
      } else {
        return "没有更多了";
      }
    },
    sellText() {
      if (this.sellList.length < 8) {
        return "";
      } else {
        return "没有更多了";
      }
    },
    sureText() {
      if (this.waitSureList.length < 8) {
        return "";
      } else {
        return "没有更多了";
      }
    }
  },
  mounted() {
    this.bsListActive = this.$store.state.business.listActive;
    let homeActive = this.$store.state.business.homeActive;
    if (homeActive === 1) {
      this.backTo = "/sellout";
    } else {
      this.backTo = "/wantbuy";
    }
    this.getData();
    // this.scrollList();
  },
  components: {
    TopHead,
    BusinessItem
  },
  methods: {
    goBack() {
      this.$store.dispatch("changeBusinessListActive", 0);
      this.$router.replace(this.backTo);
    },

    changeBusinessActive(index, title) {
      document.getElementsByClassName("BusinessList")[0].scrollTop = 0;
      this.$store.dispatch("changeBusinessListActive", index);
      this.refresh();
    },
    getData() {
      let params = {
        page: this.page,
        page_num: this.page_num
      };
      this.loading = true;
      if (this.bsListActive === 0) {
        businessHistoryOrder(this.$resultParams(params))
          .then(res => {
            this.loading = false;
            if (res.code === 200) {
              if (res.data.server_time) {
                this.server_time = parseInt(res.data.server_time);
              }
              if (res.data.list.length) {
                this.page = parseInt(res.data.current_page) + 1;
                this.historyList = this.historyList.concat(res.data.list);
                if (res.data.list.length < this.page_num) {
                  this.finished = true;
                }
              } else {
                this.finished = true;
              }
            } else {
              this.finished = true;
              this.loading = false;
            }
          })
          .catch(err => {
            this.finished = true;
            this.loading = false;
            console.log(err);
          });
      } else if (this.bsListActive === 1) {
        businessWaitSure(this.$resultParams(params))
          .then(res => {
            this.loading = false;
            if (res.code === 200) {
              if (res.data.list.length) {
                this.page = parseInt(res.data.current_page) + 1;
                this.waitSureList = this.waitSureList.concat(res.data.list);
                if (res.data.list.length < this.page_num) {
                  this.finished = true;
                }
              } else {
                this.finished = true;
              }
            } else {
              this.finished = true;
              this.loading = false;
            }
          })
          .catch(err => {
            this.finished = true;
            this.loading = false;
            console.log(err);
          });
      } else if (this.bsListActive === 2) {
        businessSellList(this.$resultParams(params))
          .then(res => {
            this.loading = false;
            if (res.code === 200) {
              if (res.data.list.length) {
                this.page = parseInt(res.data.current_page) + 1;
                this.sellList = this.sellList.concat(res.data.list);
                if (res.data.list.length < this.page_num) {
                  this.finished = true;
                }
              } else {
                this.finished = true;
              }
            } else {
              this.finished = true;
              this.loading = false;
            }
          })
          .catch(err => {
            this.loading = false;
            this.finished = true;
            console.log(err);
          });
      } else if (this.bsListActive === 3) {
        businessWaitPay(this.$resultParams(params))
          .then(res => {
            this.loading = false;
            if (res.code === 200) {
              if (res.data.list.length) {
                this.page = parseInt(res.data.current_page) + 1;
                this.waitPayList = this.waitPayList.concat(res.data.list);
                if (res.data.list.length < this.page_num) {
                  this.finished = true;
                }
              } else {
                this.finished = true;
              }
            } else {
              this.finished = true;
              this.loading = false;
            }
          })
          .catch(err => {
            this.finished = true;
            this.loading = false;
            console.log(err);
          });
      }
    },
    refresh() {
      this.page = 1;
      this.finished = false;
      this.historyList = [];
      this.waitPayList = [];
      this.sellList = [];
      this.waitSureList = [];
      this.getData();
    },
    goAppeal(item) {
      this.$store.dispatch("changeAppearBack", "BusinessList");
      this.$router.replace("/bs-appeal?id=" + item.id);
    },
    scrollList() {
      let sDiv = document.getElementsByClassName("BusinessList")[0];
      sDiv.onscroll = () => {
        if (
          sDiv.scrollTop &&
          !this.finished &&
          sDiv.scrollTop + sDiv.clientHeight >= sDiv.scrollHeight
        ) {
          this.getData();
        }
      };
    },
    withdraw(id) {
      let params = {
        sale_order_id: id
      };
      businessCalculatin(this.$resultParams(params))
        .then(res => {
          if (res.code === 200) {
            let bean = parseMoney(parseFloat(res.data.returnAllNum));
            Dialog.confirm({
              title: "撤回订单",
              message: `本次撤回订单只撤回剩余出售的嗨豆和部分退税所扣嗨豆(${bean}个)`,
              confirmButtonText: "好的"
            })
              .then(() => {
                this.goApplyDown(id);
              })
              .catch(() => {});
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goApplyDown(id) {
      let params = {
        sale_order_id: id
      };
      businessApplyDown(this.$resultParams(params))
        .then(res => {
          if (res.code === 200) {
            Toast(res.msg);
            this.removeArrBuyId(this.sellList, id);
          } else {
            Dialog.alert({
              title: "订单撤回失败",
              message: res.msg,
              confirmButtonText: "好的"
            }).then(() => {});
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goPay(id) {
      this.$store.dispatch("changeBusinessPayId", id);
      this.$store.dispatch("changeAppearBack", "BusinessList");
      this.$router.replace("/buysubmit");
    },
    receive(id) {
      Dialog.confirm({
        title: "确认收款",
        message: "确认收款之后嗨豆将直接到达对方账户，不可追回，是否确认收款"
      })
        .then(() => {
          let params = {
            trans_order_id: id
          };
          businessGetSure(this.$resultParams(params))
            .then(res => {
              if (res.code === 200) {
                Toast(res.msg);
                this.removeArrBuyId(this.waitSureList, id);
              } else {
                Toast.fail(res.msg);
              }
            })
            .catch(err => {});
        })
        .catch(() => {});
    },
    historyCont(item) {
      let obj = {};
      let str = (parseFloat(item.total_money) / 100).toFixed(2);
      str = parseMoneyD(str);
      obj.imgTyp = item.order_tags;
      obj.leftTit = parseMoney(item.num) + "个嗨豆";
      obj.rightSub = formatDate(item.create_time, "yyyy-MM-dd hh:mm");
      obj.rightsubcolor = "#999999";
      // 是否显示按钮及显示什么
      var fre_time = parseInt(this.server_time) - parseInt(item.sure_time);

      if (item.order_tags == 0) {
        obj.rightTit = "商家：" + item.seller_name;
        obj.leftSub = `支付：￥${str}`;
        if (fre_time <= this.frozenTime && parseInt(item.sure_time) > 0) {
          obj.oneBtn = "申诉未收到货";
        }
      } else if (item.order_tags == 1) {
        obj.rightTit = "买家：" + item.buyer_name;
        obj.leftSub = `交易金额：￥${str}`;
        if (fre_time <= this.frozenTime && parseInt(item.sure_time) > 0) {
          obj.oneBtn = "申诉未收到款";
        }
      }

      return obj;
    },
    waitSureCont(item) {
      let obj = {};
      let str = (parseFloat(item.total_money) / 100).toFixed(2);
      obj.imgTyp = item.order_tags;
      obj.leftTit = parseMoney(item.num) + "个嗨豆";
      obj.rightSub = formatDate(item.create_time, "yyyy-MM-dd hh:mm");
      obj.rightsubcolor = "#999999";
      if (item.order_tags == 0) {
        obj.rightTit = "商家：" + item.seller_name;
        obj.leftSub = `支付：￥${str}`;
      } else if (item.order_tags == 1) {
        obj.rightTit = "买家：" + item.buyer_name;
        obj.leftSub = `交易金额：￥${str}`;
        obj.twoBtn = "确认收款";
      }

      return obj;
    },
    sellCont(item) {
      let obj = {};
      let bn = parseFloat(item.num) - parseFloat(item.fee_num);
      let money = ((bn * parseFloat(item.price)) / 100).toFixed(2);
      obj.imgTyp = item.order_tags;
      obj.leftTit = parseMoney(Math.round(bn)) + "个嗨豆";
      obj.leftSub = "剩余嗨豆：" + parseMoney(item.sale_num);
      obj.rightTit = "预计收入：￥" + parseMoneyD(money);
      obj.rightSub =
        "单价：" + parseMoneyD((item.price / 100).toFixed(2)) + "元/个";
      obj.rightThr = formatDate(item.create_time, "yyyy-MM-dd hh:mm");
      obj.oneBtn = "撤回订单";
      return obj;
    },
    waitPayCont(item) {
      let obj = {};
      let str = (parseFloat(item.total_money) / 100).toFixed(2);
      obj.imgTyp = item.order_tags;
      obj.leftTit = parseMoney(item.num) + "个嗨豆";
      obj.leftSub = "商家：" + item.username;
      obj.rightTit = "待支付：￥" + parseMoneyD(str);
      obj.oneBtn = "支付订单";
      return obj;
    },
    removeArrBuyId(arr, id) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
          arr.splice(i, 1);
        }
      }
    }
  }
};
</script>

<style lang="less" src="../../assets/css/style.less">
</style>
