<template>
  <div class="BusinessList">
    <top-head title="Transaksi" @leftClick="goBack"></top-head>
    <van-tabs v-model="listActive" @click="changeBusinessActive">
      <van-tab v-for="index in tabs" :title="index" :key="index">
        <div class="bs_list">
          <van-pull-refresh v-model="loading" @refresh="refresh">
            <van-list
              :offset="10"
              v-model="loading"
              :finished="finished"
              :finished-text="historyText"
              @load="getData"
              v-show="historyList.length || finished"
            >
              <div v-if="trans_type==1">
                <div class="bs_item" v-for="item in historyList" :key="item.id">
                  <div class="item">
                    <div class="type">
                      <span class="one">Beli</span>
                      Hi-Koin
                    </div>
                  </div>

                  <div class="item">
                    <div>
                      <div class="tt">Total transaksi</div>
                      <div class="aa">{{ item.total_num | numFormatD }}</div>
                    </div>
                    <div class="textcenter">
                      <div class="tt">Tersisa</div>
                      <div class="aa">{{ item.need_num | numFormatD }}</div>
                    </div>
                    <div class="textright">
                      <div class="tt">Harga</div>
                      <div class="aa">{{ item.price | numFormatD }}</div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="name"></div>
                    <div class="godetails" @click="goDetailWant(item)">Proses</div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="bs_item" v-for="item in historyList" :key="item.id">
                  <div class="item">
                    <div class="type">
                      <span class="one" v-if="item.order_tags == 0">Beli</span>
                      <span class="two" v-else>Jual</span>
                      Hi-Koin
                    </div>
                    <!-- <div class="godetail" @click="goDetail(item)">
                    {{item.status_str_cn}}
                    <span class="arrow_icon"></span>
                    </div>-->
                  </div>
                  <div class="item" v-if="item.status_str_en != 'sales_ing'">
                    <div>
                      <div class="tt">Waktu</div>
                      <div class="aa">{{ formatDate(item.create_time, "yyyy-MM-dd hh:mm") }}</div>
                    </div>
                    <div class="textcenter">
                      <div class="tt">Jumlah</div>
                      <div class="aa">{{ item.num | numFormatD }}</div>
                    </div>
                    <div class="textright">
                      <div class="tt">Sukses bertransaksi</div>
                      <div class="aa">{{ item.total_money | numFormatD }}</div>
                    </div>
                  </div>
                  <div class="item" v-else>
                    <div>
                      <div class="tt">Total transaksi</div>
                      <div class="aa">{{ item.can_sale_num | numFormatD }}</div>
                    </div>
                    <div class="textcenter">
                      <div class="tt">Tersisa</div>
                      <div class="aa">{{ item.sale_num | numFormatD }}</div>
                    </div>
                    <div class="textright">
                      <div class="tt">Harga</div>
                      <div class="aa">{{ item.price | numFormatD }}</div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="name">
                      <span v-show="item.status_str_en != 'sales_ing'">
                        {{
                        item.order_tags == 0
                        ? item.seller_name
                        : item.buyer_name
                        }}
                      </span>
                    </div>
                    <div class="godetails" @click="goDetail(item)">{{ item.status_str_cn }}</div>
                  </div>
                </div>
              </div>
            </van-list>
            <div v-show="!historyList.length && finished" class="nolist">
              <img src="../../assets/img/beans_no.png" alt>
              <div class="cont">Sementara tidak ada data</div>
            </div>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import { parseMoney, parseMoneyD } from "utils/money";
import { formatDate } from "utils/datetime";

import { businessList, getRecycleOrderList } from "utils/ajax";
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
      listActive: 0,
      historyList: [], //历史
      backTo: "/bs-home",
      page: 1,
      page_num: 30,
      finished: false,
      server_time: 0,
      showSelectBox: false,
      trans_type: 0, //交易类型 0全部 1:买 2:卖 3:出售中
      tabs: ["Total transaksi", "Beli proses", "Jual Proses"]
    };
  },
  computed: {
    historyText() {
      if (this.historyList.length < 7) {
        return "";
      } else {
        return "Tidak ada tampilan lagi";
      }
    }
  },
  created() {
    let homeActive = this.$store.state.business.homeActive;
    if (homeActive === 1) {
      this.backTo = "/sellout";
    } else {
      this.backTo = "/wantbuy";
    }
    this.listActive = this.$store.state.business.listActive;
    this.changeBusinessActive(this.listActive);
  },
  components: {
    TopHead
  },
  methods: {
    goBack() {
      this.$router.push(this.backTo);
    },
    goDetail(item) {
      this.$store.dispatch("changeAppearBack", "BusinessList");
      switch (item.status_str_en) {
        case "order_end": //已完成
          this.$router.push("/bsd-success?id=" + item.id);
          break;
        case "sales_ing": //出售中
          this.$router.push("/bsd-salein?id=" + item.id);
          break;
      }
    },
    goDetailWant(item) {
      this.$store.dispatch("changeAppearBack", "BusinessList");
      this.$router.push("/bsd-buyin?id=" + item.id);
    },
    getData() {
      if (this.trans_type == 1) {
        this.getRecycleList();
      } else {
        this.getHistoryList();
      }
    },
    getHistoryList() {
      let params = {
        page: this.page,
        page_num: this.page_num,
        trans_type: this.trans_type
      };
      this.loading = true;
      businessList(this.$resultParams(params))
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
        });
    },
    getRecycleList() {
      let params = {
        page: this.page,
        page_num: this.page_num
      };
      this.loading = true;
      getRecycleOrderList(this.$resultParams(params))
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
        });
    },
    changeBusinessActive(index) {
      this.$store.dispatch("changeBusinessListActive", index);
      switch (index) {
        case 0: //全部订单
          this.trans_type = 0;
          break;
        case 1: //求购中
          this.trans_type = 1;
          break;
        case 2: //出售中
          this.trans_type = 3;
          break;
      }
      this.refresh();
    },
    changeChoose() {
      this.showSelectBox = false;
      this.refresh();
    },
    refresh() {
      this.page = 1;
      this.finished = false;
      this.historyList = [];
      this.getData();
    },

    formatDate(date, format) {
      return formatDate(date, format);
    }
  }
};
</script>

<style lang="less" scoped src="../../assets/css/business.less"></style>
