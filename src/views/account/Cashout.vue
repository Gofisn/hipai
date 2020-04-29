<template>
  <div class="Cashout">
    <div class="head_box">
      <div class="topbar">
        <div class="left" @click="backClick">
          <span></span>
        </div>
        <div class="title">Tukar dana</div>
      </div>
      <div class="cont_box">
        <div class="bean_num">
          <div>Saldo saat ini</div>
          <!-- <div class="count">{{balance}}</div>
          <div class="rp">={{account}}Rp</div>-->
          <div class="count">{{ account }}</div>
          <div class="rp">={{ account }}Rp</div>
        </div>
        <div class="btn_box">
          <div @click="goList" class="item">
            <img src="../../assets/img/cashout_list.png" alt>
            <div>Riwayat Transaksi</div>
          </div>
        </div>
      </div>
    </div>
    <div class="cashout_main_box">
      <div v-if="show">
        <div class="input_list">
          <div class="input_item">
            <img src="../../assets/img/cashout_name.png" alt>
            <input type="text" v-model.trim="username" placeholder="Nama pemilik rekening">
          </div>
          <div class="input_item" @click="showBank = true">
            <img src="../../assets/img/cashout_bank.png" alt>
            <input type="text" v-model.trim="bank_name" placeholder>
            <span class="arrow_icon"></span>
          </div>
          <div class="input_item">
            <img src="../../assets/img/cashout_card.png" alt>
            <input type="text" v-model.trim="bankcard_no" placeholder="Nomor rekening">
          </div>
          <div class="input_item">
            <img src="../../assets/img/cashout_phone.png" alt>
            <input type="text" v-model.trim="phone" placeholder="Nomor handphone">
          </div>
        </div>
        <div class="cash_tit">Penarikan</div>
        <div class="cash_not">(1 kali penarikan biaya admin : {{ sing_fee | numFormatD }})</div>
      </div>
      <div class="range_list">
        <span
          class="range_item"
          v-for="(val, key) in range"
          :class="gold == key ? 'active' : ''"
          :key="val"
          @click="chooseGold(val, key)"
        >
          <div class="rp">Rp{{ val }}</div>
          <div>(Rpc{{ key }})</div>
        </span>
      </div>
      <div class="sure_btn" :class="canSubmit ? 'active' : ''" @click="goCashout">Penarikan</div>
    </div>
    <van-popup v-model="showBank" position="bottom">
      <van-picker
        show-toolbar
        cancel-button-text=" "
        confirm-button-text="Oke"
        :columns="bank_list"
        @confirm="onConfirm"
      ></van-picker>
    </van-popup>
  </div>
</template>
<script>
import { cashoutInfo, cashoutGo } from "utils/ajax";
import { Toast, Picker, Popup, Field, Dialog } from "vant";
import Vue from "vue";
Vue.use(Picker)
  .use(Popup)
  .use(Field);
export default {
  name: "Cashout",
  data() {
    return {
      username: "",
      bank_name: "",
      bankcard_no: "",
      phone: "",
      gold: "",
      bank_list: [],
      account: 0, //可兑换印尼盾总量
      // balance: 0, //用户账户余额
      // exchange: 1, //一个金币值多少印尼盾
      sing_fee: 0, //手续费
      range: [], //提现范围
      showBank: false,
      name: "",
      show: false // 是否展示中间部分
    };
  },
  created() {
    this.getInfo();
  },
  computed: {
    canSubmit() {
      if (
        this.username &&
        this.bank_name &&
        this.bankcard_no &&
        this.phone &&
        this.gold
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    backClick() {
      let from = this.$store.state.routeFrom;
      if (from) {
        this.$store.dispatch("changeRouteFrom", "");
        this.$router.replace(from);
      } else {
        this.$getSystemInfoFromApp("closeWebPage");
      }
    },

    getInfo() {
      let param = {
        name: Math.random()
      };
      cashoutInfo(this.$resultParams(param))
        .then(res => {
          if (res.code === 200) {
            this.bank_list = res.data.bank_list;
            // this.exchange = parseFloat(res.data.exchange);
            this.account = res.data.account;
            // this.balance = res.data.balance;
            this.range = res.data.redeem_range;
            this.sing_fee = res.data.single_service_fee;
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goBuy() {
      if (this.choose_product.price) {
        this.bank_show = true;
      }
    },
    onConfirm(value, index) {
      this.bank_name = value;
      this.showBank = false;
    },
    onCancel() {
      this.showBank = false;
    },
    goCashout() {
      if (this.canSubmit) {
        let param = {
          bank_name: this.bank_name,
          bankcard_no: this.bankcard_no,
          bankcard_holder: this.username,
          phone: this.phone,
          gold: this.gold
        };
        cashoutGo(this.$resultParams(param))
          .then(res => {
            if (res.code == 200) {
              Dialog.alert({
                message: `Tarik dana berhasil. Proses kurang lebih 3 hari kerja untuk masuk ke akun Anda`,
                confirmButtonText: "OK"
              }).then(() => {
                this.getInfo();
                this.gold = "";
                this.show = false;
              });
            } else if (res.code == 41015) {
              // 必须先邀请3个人才能提现
              Dialog.confirm({
                // title: "Anda ingin menurkarkan 8000 Hi-Koin?",
                message: `Anda harus mengundang 3 teman untuk melakukan penarikan`,
                confirmButtonText: "Undang",
                cancelButtonText: "Cancle "
              })
                .then(() => {
                  this.$store.dispatch("changeRouteFrom", "/cashout");
                  this.$router.push("/invite");
                })
                .catch(() => {});
            } else if (res.code == 41108) {
              // rpc余额不足
              Dialog.confirm({
                // title: "Anda ingin menurkarkan 8000 Hi-Koin?",
                message: `Saldo RPC Anda tidak cukup`,
                confirmButtonText: "Isi ulang",
                cancelButtonText: "Batalkan "
              })
                .then(() => {
                  this.$store.dispatch("changeRouteFrom", "/cashout");
                  this.$router.push("/account");
                })
                .catch(() => {});
            } else if (res.code === 20009) {
              // 活跃度不足
              Dialog.confirm({
                cancelButtonText: "Batalkan",
                confirmButtonText: "Niakkan Skor",
                message: `Skor Anda kurang dari ${
                  res.data.activity_limit
                }, tidak bisa melakukan penarikan dana`
              })
                .then(() => {
                  this.$store.dispatch("changeRouteFrom", "/cashout");
                  this.$store.dispatch("changeSkorNeedInfo", res.data);
                  this.$router.push("/skornone");
                })
                .catch(() => {
                  // on cancel
                });
            } else if (res.code === 41025) {
              // 必须购买卷轴才能提现
              Dialog.confirm({
                cancelButtonText: "Batalkan",
                confirmButtonText: "Beli",
                message: `Anda wajib membeli tugas Lv.1 atau level lebih tinggi untuk melakukan penarikan dana. `
              })
                .then(() => {
                  this.$store.dispatch("changeRouteFrom", "/cashout");
                  this.$router.push(
                    "/scroll-li?active=0&id=" + res.data.scrollId
                  );
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
          });
      }
    },
    goList() {
      // 提现记录
      this.$router.push("/cash-list");
    },
    chooseGold(val, key) {
      let a = this.account.replace(/,/g, "");
      let b = key.replace(/,/g, "");
      if (parseFloat(a) < parseFloat(b)) {
        this.gold = "";
        this.show = false;
        // Rpc不足，无法提现
        // Toast("Tidak bisa melakukan penarikan karena RPC tidak cukup");
        Dialog.confirm({
          message: `Saldo RPC Anda tidak cukup`,
          confirmButtonText: "Isi ulang",
          cancelButtonText: "Batalkan "
        })
          .then(() => {
            this.$store.dispatch("changeRouteFrom", "/cashout");
            this.$router.push("/account");
          })
          .catch(() => {});
      } else {
        this.gold = key;
        this.show = true;
      }
    }
  }
};
</script>
<style lang="less" src="../../assets/css/account.less"></style>
