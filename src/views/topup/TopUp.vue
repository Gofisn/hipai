<template>
  <div class="TopUp">
    <div class="TopHeader">
      <div class="back" @click="backClick">
        <span></span>
      </div>
      <span>TopUp</span>
    </div>
    <div class="title_notice">THIS IS A SECURE TRANSACTION</div>
    <div class="topup_main">
      <div class="card_box">
        <div class="one">
          <div class="t">Total Pembayaran</div>
          <div class="num">IDR {{topupInfo.price|numFormatD}}</div>
        </div>
        <!-- 去掉订单号 -->
        <!-- <div class="two">
          <div class="item">
            <div class="l">Nomor Pesanan：</div>
            <div class="r">20202020332344404</div>
          </div>
          <div class="item">
            <div class="l">Pedagang：</div>
            <div class="r">washmashine</div>
          </div>
        </div>-->
      </div>
      <div class="topup_title">Pilih cara pembayaran</div>
      <div class="topup_type" v-show="bank.length" :class="chooseType=='bank'?'active':''">
        <div class="type_name" @click="chooseType!='bank'?chooseType='bank':chooseType=null">
          <img src="../../assets/img/topup/topup_type0.png" alt>
          <span>Bank Transfer</span>
          <i></i>
        </div>

          <transition-group name="fade" tag="ul">
            <li
              v-show="chooseType=='bank'"
              v-for="item in bank"
              :key="item.key"
              @click="goSure(item)"
            >
              <img :src="item.logo" alt>
              <span>{{item.bankCode}}</span>
              <i></i>
            </li>
          </transition-group>
      </div>
      <div class="topup_type" v-show="wallet.length" :class="chooseType=='wallet'?'active':''">
        <div class="type_name" @click="chooseType!='wallet'?chooseType='wallet':chooseType=null">
          <img src="../../assets/img/topup/topup_type1.png" alt>
          <span>E-wallet</span>
          <i></i>
        </div>

        <ul>
          <transition-group name="fade" tag="ul">
            <li
              v-show="chooseType=='wallet'"
              v-for="item in wallet"
              :key="item.key"
              @click="goSure(item)"
            >
              <img :src="item.logo" alt>
              <span>{{item.bankCode}}</span>
              <i></i>
            </li>
          </transition-group>
        </ul>
      </div>
      <div
        class="topup_type"
        v-show="convenlence.length"
        :class="chooseType=='convenlence'?'active':''"
      >
        <div
          class="type_name"
          @click="chooseType!='convenlence'?chooseType='convenlence':chooseType=null"
        >
          <img src="../../assets/img/topup/topup_type2.png" alt>
          <span>Convenience Store</span>
          <i></i>
        </div>

        <ul>
          <transition-group name="fade" tag="ul">
            <li
              v-show="chooseType=='convenlence'"
              v-for="item in convenlence"
              :key="item.key"
              @click="goSure(item)"
            >
              <img :src="item.logo" alt>
              <span>{{item.bankCode}}</span>
              <i></i>
            </li>
          </transition-group>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getPayType, getRechargeCode } from "utils/ajax";
import { Toast, Dialog } from "vant";
export default {
  name: "TopUp",
  data() {
    return {
      chooseType: null,
      method: 1,
      bank: [],
      wallet: [],
      convenlence: []
    };
  },
  created() {
    this.getType();
  },
  computed: {
    topupInfo() {
      return this.$store.state.rechargeInfo;
    }
  },
  methods: {
    getType() {
      let param = {
        time: Date.now()
      };

      getPayType(this.$resultParams(param))
        .then(res => {
          if (res.code == 200) {
            if (res.data.BANK && res.data.BANK.length) {
              this.bank = res.data.BANK;
              this.chooseType='bank'
            }
            if (res.data.WALLET && res.data.WALLET.length) {
              this.wallet = res.data.WALLET;
            }
            if (res.data.Convenience && res.data.Convenience.length) {
              this.convenlence = res.data.Convenience;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    backClick() {
      this.$router.push("/account");
    },
    goSure(item) {
      if (item.key == "12") {
        this.$store.dispatch("changeRechargeInfo", {
          price: this.topupInfo.price,
          method: item.key
        });
        this.$router.push("/ovo");
      } else {
        let params = {
          price: this.topupInfo.price,
          method: item.key
        };
        getRechargeCode(this.$resultParams(params))
          .then(res => {
            if (res.code === 200) {
              this.$store.dispatch("changeRechargeInfo", {
                price: this.topupInfo.price,
                method: item.key,
                code: res.data.code
              });
              if (item.key == "11") {
                this.$router.push("/dana");
              } else {
                this.$router.push("/recharge");
              }
            } else {
              Toast(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
<style lang="less" scoped src="../../assets/css/topup.less"></style>
