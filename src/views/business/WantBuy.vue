<template>
  <div class="WantBuy">
    <div class="haslist">
      <div class="title"  v-show="list.length">
        <span class="left">商家</span>
        <span class="item">数量</span>
        <span class="item">单价</span>
        <span class="right">操作</span>
      </div>
      <div class="buylist">
        <van-pull-refresh v-model="loading" @refresh="refresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="finishedText"
            @load="getData"
            v-show="list.length||finished"
          >
            <div v-for="item in list" v-show="list.length" class="list_item" :key="item.id">
              <span class="left">{{item.username}}</span>
              <span class="item">{{item.sale_num|numFormat}}</span>
              <span class="item">{{item.price|moneyFormatD}}元/个</span>
              <span class="right" @click="goBuy(item)">
                <span>买入</span>
              </span>
            </div>
          </van-list>
          <div v-show="!list.length&&finished" class="nolist">
            <img src="../../assets/img/no_buy.png" alt>
            <div>暂时无人出售哦～</div>
          </div>
        </van-pull-refresh>
      </div>
      <div class="sort_box" v-show="list.length">
        <span class="left" :class="timeSort" @click="changeOrderTime">按时间</span>
        <span class="right" :class="priceSort" @click="changeOrderPrice">按价格</span>
      </div>
    </div>
  </div>
</template>
<script>
import img from "@/assets/img/loading.gif";
import { getBusinessBuyList } from "utils/ajax";
import { List, PullRefresh, Toast } from "vant";
import Vue from "vue";
Vue.use(List)
  .use(PullRefresh)
  .use(Toast);
export default {
  name: "WantBuy",
  data() {
    return {
      loading: false,
      page: 1,
      page_num: 60,
      list: [],
      time: "",
      order_by: "time_desc",
      finished: false,
      priceSort: "",
      timeSort: "down"
    };
  },
  created() {
    this.getData();
  },
  computed: {
    finishedText() {
      if (this.list.length < 10) {
        return "";
      } else {
        return "没有更多了";
      }
    }
  },
  methods: {
    goBuy(item) {
      this.$store.dispatch("buyBusinessMsg", item);
      this.$router.push("/gobuy");
    },
    getData() {
      var params = {
        page: this.page,
        page_num: this.page_num,
        order_by: this.order_by,
        first_timestamp: this.time
      };
      this.loading = true;
      getBusinessBuyList(this.$resultParams(params))
        .then(res => {
          this.loading = false;
          if (res.code === 200) {
            if (res.data.first_timestamp) {
              this.time = res.data.first_timestamp;
            }
            if (res.data.list.length) {
              this.page = parseInt(res.data.current_page) + 1;
              this.list = this.list.concat(res.data.list);
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
    },
    refresh() {
      this.page = 1;
      this.finished = false;
      this.list = [];
      this.getData();
    },
    changeOrderTime() {
      this.page = 1;
      this.finished = false;
      if (this.order_by === "time_desc") {
        this.order_by = "time_asc";
        this.timeSort = "up";
      } else {
        this.order_by = "time_desc";
        this.timeSort = "down";
      }
      this.priceSort = "";
      this.list = [];
      document.getElementsByClassName("buylist")[0].scrollTop = 0;
      this.getData();
    },

    changeOrderPrice() {
      this.page = 1;
      this.finished = false;
      if (this.order_by === "price_desc") {
        this.order_by = "price_asc";
        this.priceSort = "up";
      } else {
        this.order_by = "price_desc";
        this.priceSort = "down";
      }
      this.timeSort = "";
      this.list = [];
      document.getElementsByClassName("buylist")[0].scrollTop = 0;
      this.getData();
    }
  }
};
</script>
<style lang="less" scoped src="../../assets/css/style.less">
</style>
