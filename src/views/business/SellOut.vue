<template>
  <div class="SellOut">
    <div
      class="top_msg"
    >Jual Hi-koin Anda, dan klik tombol di bawah ini jika Anda tidak menemukan harga yang tepat</div>
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
            <div class="gobuy" @click="goBuy(item)">Jual</div>
            <div class="num">Jumlah：{{item.need_num|numFormatD}} Hi-Koin</div>
            <div class="price">Harga：Rpc{{item.price|numFormatD}}</div>
            <div class="name">
              <span>{{item.username}}</span>
            </div>
            <div class="credit">Jumlah Transaksi：{{item.trans_buy_num}}</div>
          </div>
        </van-list>
        <div v-show="!list.length&&finished" class="nolist">
          <img src="../../assets/img/no_buy.png" alt>
          <div>Untuk sementara tidak ada transaksi</div>
        </div>
      </van-pull-refresh>
    </div>
    <van-popup v-model="show_buy" position="bottom" @close="closePop">
      <div class="buyBox">
        <div class="box_title">
          <span>Setuju Hi-Koin</span>
          <span>Harga：Rpc{{buy_item.price|numFormatD}}</span>
        </div>
        <div class="input_box">
          <div class="ipt_box">
            <input
              type="number"
              v-model.number="buy_value"
              @input="valueInput"
              placeholder="Jumlah yang terjual"
              :disabled="disabled"
            >
            <span>Hi-Koin</span>
          </div>
          <div class="all_btn" @click="buyAllClick">Jual semua</div>
        </div>
        <div class="describe">
          <div>Jual minimum {{show_min}} Hi-Koin</div>
          <div>Biaya admin {{percentRate}} ,Perkiraan pemotongan {{totleNum}} buah Hi-Koin</div>
        </div>
        <div class="box_title">
          <span>Pembayaran</span>
          <span class="red">Rpc{{price_total}}</span>
        </div>
        <div class="btn_box">
          <span class="time">
            Setelah
            <span class="num">{{close_time}}</span> detik transaksi otomatis dibatalkan
          </span>
          <span class="buy_btn" @click="buySure">Setuju</span>
        </div>
      </div>
    </van-popup>
    <div class="sort_box" v-show="list.length">
      <span class="left" :class="'sort'+timeSort" @click="changeOrderTime">Waktu</span>
      <span class="right" :class="'sort'+priceSort" @click="changeOrderPrice">Harga</span>
    </div>
    <div
      class="salein_btn"
      @click="goInput"
      @mousedown="down"
      @touchstart="down"
      @mousemove="move"
      @touchmove="move"
      @mouseup="end"
      @touchend="end"
    >Jual</div>
  </div>
</template>
<script>
import { getRecycleList, goSellHiBean, getUserLevel } from "utils/ajax";
import { randomString } from "utils/tools";
import { List, PullRefresh, Toast, Popup, Dialog } from "vant";
import Vue from "vue";
import { clearTimeout } from "timers";
Vue.use(List)
  .use(PullRefresh)
  .use(Toast)
  .use(Popup)
  .use(Dialog);
export default {
  name: "SellOut",
  data() {
    return {
      show_buy: false,
      loading: false,
      page: 1,
      page_num: 60,
      list: [],
      time: "",
      finished: false,
      buy_item: {},
      close_time: 0,
      timer: null,
      buy_value: null,
      priceSort: "1", //价格排序 -1 降序 1升序
      timeSort: "", //时间排序 -1降序 1升序
      show_min: 0,
      disabled: false, //是否可选择购买数量
      level: {},
      // 上下移动按钮
      flags: false,
      position: {
        x: 0,
        y: 0
      },
      dx: "",
      dy: ""
    };
  },
  created() {
    this.getData();
    this.getLevel();
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    finishedText() {
      if (this.list.length < 8) {
        return "";
      } else {
        return "Tidak ada tampilan lagi";
      }
    },
    price_total() {
      return (
        (this.buy_value * 10000 * 1000000 * parseFloat(this.buy_item.price)) /
          1000000 /
          10000 || 0
      ).toFixed(6);
    },
    min_num() {
      var config = this.$store.state.business.businessConfig;
      if (config && config.recycleConf) {
        return parseFloat(config.recycleConf.recycle_min_sell_num);
      } else {
        return 0.1;
      }
    },
    percentRate() {
      if (this.level.fee_rate === 0) {
        return 0;
      } else {
        let str = Number(this.level.fee_rate * 100).toFixed();
        str += "%";
        return str;
      }
    },
    totleNum() {
      let num =
        (this.buy_value *
          10000 *
          1000000 *
          (parseFloat(this.level.fee_rate) + 1)) /
          1000000 /
          10000 || 0;
      return num.toFixed(6);
    }
  },
  methods: {
    goBuy(item) {
      this.buy_item = item;
      this.show_buy = true;
      this.close_time = 45;
      this.buy_value = null;
      this.lastTime = new Date() - 0;
      // 当剩余嗨豆数量小于 最低购买数量时 购买剩余嗨豆数量切不可改变
      if (parseFloat(item.need_num) < parseFloat(this.min_num)) {
        this.buy_value = parseFloat(item.need_num);
        this.show_min = parseFloat(item.need_num);
        this.disabled = true;
      } else {
        this.show_min = this.min_num;
        this.disabled = false;
      }
      this.timeRuning();
    },
    valueInput(e) {
      let num = parseFloat(e.target.value);
      if (num >= 0) {
        this.buy_value = num.toFixed(4);
      } else {
        this.buy_value = NaN;
      }
    },
    timeRuning() {
      if (this.timer) {
        window.clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        // 时间间隔 防止后台运行时，时间出现问题
        let dt = new Date() - 0 - this.lastTime;
        this.lastTime = new Date() - 0;
        if (dt > 1500) {
          this.close_time = this.close_time - parseInt(dt / 1000);
        } else {
          this.close_time -= 1;
        }
        if (this.close_time > 0) {
          this.timeRuning();
        } else {
          window.clearTimeout(this.timer);
          this.show_buy = false;
        }
      }, 1000);
    },

    buyAllClick() {
      if (!this.disabled) {
        this.buy_value = parseFloat(this.buy_item.need_num);
        let can_num =
          (this.userInfo.effective_bean * 10000 * 1000000) /
          (parseFloat(this.level.fee_rate) + 1) /
          10000 /
          1000000;
        if (this.buy_value > can_num) {
          this.buy_value = can_num.toFixed(6);
        }
        if (this.buy_value < parseFloat(this.min_num)) {
          this.buy_value = NaN;
          Toast('Koin Hi-Koin tak mencukupi')
        }
      }
    },
    buySure() {
      if (!this.buy_value) {
        //未输入数量
        Toast("Silahkan masukan jumlah Hi-Koin");
      } else if (this.buy_value < parseFloat(this.min_num) && !this.disabled) {
        // 嗨豆数量不得小于0.0001
        Toast("Jumlah Hi-Koin tidak boleh kurang dari " + this.min_num);
      } else if (this.buy_value > parseFloat(this.buy_item.need_num)) {
        // 购买数量大于挂单数量
        Toast("Jumlah Hi-Koin tidak boleh melebihi jumlah jual");
      } else {
        let param = {
          recycle_order_id: this.buy_item.id,
          sell_num: this.buy_value
        };
        goSellHiBean(this.$resultParams(param))
          .then(res => {
            if (res.code === 200) {
              this.$store.dispatch("changeRouteFrom", "/sellout");
              this.$router.push("/paysuc");
            } else if (res.code === 21004) {
              // 金币不足
              Dialog.confirm({
                cancelButtonText: "Batalkan",
                confirmButtonText: "Beli Rp coin",
                title: "Rp coin tidak mencukupi",
                message: "Rp coin tidak cukup, silahkan top up dulu"
              })
                .then(() => {
                  // 充值页面
                  this.$store.dispatch("changeRouteFrom", "/sellout");
                  this.$router.push("/account");
                })
                .catch(() => {
                  // on cancel
                });
            } else if (res.code === 47011) {
              Dialog.confirm({
                cancelButtonText: "batal",
                confirmButtonText: "mulai",
                message:
                  "Anda harus selesaikan verifikasi wajah untuk melanjutkan"
              })
                .then(() => {
                  Vue.prototype.$getSystemInfoFromApp("goVerifiedYn");
                })
                .catch(() => {
                  // on cancel
                });
            } else {
              Toast(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
            Toast(res.msg);
          });
      }
    },
    getData() {
      var params = {
        page: this.page,
        page_num: this.page_num,
        first_timestamp: this.time,
        time_sort: this.timeSort,
        price_sort: this.priceSort
      };
      this.loading = true;
      getRecycleList(this.$resultParams(params))
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
    closePop() {
      this.show_buy = false;
      if (this.timer) window.clearTimeout(this.timer);
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
      if (this.timeSort === "-1") {
        this.timeSort = "1";
      } else {
        this.timeSort = "-1";
      }
      this.priceSort = "";
      this.list = [];
      document.getElementsByClassName("buylist")[0].scrollTop = 0;
      this.getData();
    },

    changeOrderPrice() {
      this.page = 1;
      this.finished = false;
      if (this.priceSort === "-1") {
        this.priceSort = "1";
      } else {
        this.priceSort = "-1";
      }
      this.timeSort = "";
      this.list = [];
      document.getElementsByClassName("buylist")[0].scrollTop = 0;
      this.getData();
    },
    goInput() {
      this.$router.push("/sell-input");
    },

    getLevel() {
      let param = {
        key: randomString()
      };
      getUserLevel(this.$resultParams(param))
        .then(res => {
          if (res.code == 200) {
            this.level = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 实现移动端拖拽
    down(event) {
      event = event || window.event;
      this.flags = true;
      let touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      this.dx = event.target.offsetLeft;
      this.dy = event.target.offsetTop;
    },
    move(event) {
      event = event || window.event;
      if (this.flags) {
        let touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        let nx = touch.clientX - this.position.x;
        let ny = touch.clientY - this.position.y;
        let xPum = this.dx + nx;
        let yPum = this.dy + ny;
        //添加限制：只允许在屏幕内拖动
        const maxWidth = document.body.clientWidth - 54; //屏幕宽度减去悬浮框宽高
        const maxHeight = document.body.clientHeight - 54;
        if (xPum < 0) {
          //屏幕x限制
          xPum = 0;
        } else if (xPum > maxWidth) {
          xPum = maxWidth;
        }
        if (yPum < 200) {
          //屏幕y限制
          yPum = 200;
        } else if (yPum > maxHeight) {
          yPum = maxHeight;
        }
        // event.target.style.left = xPum + "px";
        event.target.style.top = yPum + "px";
        //阻止页面的滑动默认事件
        document.addEventListener(
          "touchmove",
          function(event) {
            // 1.2 如果碰到滑动问题，请注意是否获取到 touchmove
            event.stopPropagation(); // 如果没有引入jq 就用 stopPropagation()
          },
          false
        );
      }
    },
    //鼠标释放时候的函数
    end(event) {
      this.flags = false;
    }
  }
};
</script>
<style lang="less" scoped src="../../assets/css/business.less">
</style>
