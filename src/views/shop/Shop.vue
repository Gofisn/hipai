<template>
  <div class="Shop">
    <div class="TopHeader">
      PickMall
      <span class="golist" @click="goList">Riwayat Penukaran</span>
    </div>
    <van-pull-refresh v-model="loading" @refresh="refresh">
      <van-list
        :offset="10"
        v-model="loading"
        :finished="finished"
        :finished-text="historyText"
        @load="getData"
        v-show="historyList.length"
        class="list_box"
      >
        <div class="showItem" v-for="item in historyList" :key="item.id">
          <img :src="item.image_path" alt="pic" />
          <div class="tt">
            <span>{{ item.name }}</span>
            <span v-show="item.is_show_bean"
              >Hi-Koin：{{ item.bean_exchange }}</span
            >
          </div>
          <div class="td">
            <span>Sisa: {{ item.num }}</span>
            <span v-if="item.single_user_limit==1">Setiap pengguna dibatasi 1x</span>
            <span
              class="btn"
              :class="item.num > 0 && item.action ? '' : 'disable'"
              @click="exchange(item)"
              >Tukar</span
            >
          </div>
        </div>
      </van-list>
      <div v-show="!historyList.length && finished" class="nolist">
        <img src="../../assets/img/beans_no.png" alt />
        <div class="cont">Sementara tidak ada data</div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import { shopGoods, getRechargeCode } from "utils/ajax";
import { randomString } from "utils/tools";

import Vue from "vue";
import { Toast, List, PullRefresh, Dialog } from "vant";
Vue.use(Toast)
  .use(List)
  .use(PullRefresh);
export default {
  name: "shop",
  data() {
    return {
      page: 1,
      historyList: [],
      loading: false,
      finished: false
    };
  },
  created() {
    this.getData();
  },
  computed: {
    historyText() {
      if (this.historyList.length < 4) {
        return "";
      } else {
        return "Tidak ada tampilan lagi";
      }
    }
  },
  methods: {
    goList() {
      this.$router.push("shop-li");
    },
    getData() {
      let params = {
        page: this.page,
        key: "shop-goods-" + randomString()
      };
      this.loading = true;
      shopGoods(this.$resultParams(params))
        .then(res => {
          this.loading = false;
          console.log(res.data.list);
          if (res.code === 200) {
            if (res.data.list.length) {
              this.historyList = this.historyList.concat(res.data.list);
              if (res.data.total <= this.historyList.length) {
                this.finished = true;
              }
              this.page = this.page + 1;
            } else {
              this.finished = true;
            }
          } else {
            this.finished = true;
            Toast(res.msg);
          }
        })
        .catch(err => {
          this.loading = false;
          this.finished = true;
          console.log(err);
        });
    },
    refresh() {
      this.page = 1;
      this.finished = false;
      this.historyList = [];
      this.getData();
    },
    exchange(item) {
      if ( item.num > 0 && item.action) {
        this.$store.dispatch("changeShopInfo", item);
        // 话费
        if (item.type == "3") {
          this.$router.push("/phone-bill");
        } else if (item.type == "2") {
          // 其他
          Dialog.confirm({
            // title: "Anda ingin menurkarkan 8000 Hi-Koin?",
            message: `Anda ingin menurkarkan ${item.bean_exchange} Hi-Koin?`,
            confirmButtonText: "Tukar",
            cancelButtonText: "Cancle "
          })
            .then(() => {
              this.$router.push("/shop-address");
            })
            .catch(() => {});
        }
      }
    }
  }
};
</script>
<style lang="less" src="../../assets/css/shop.less"></style>
