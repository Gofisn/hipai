<template>
  <div class="Skor">
    <div class="head_box">
      <div class="topbar">
        <div class="left" @click="backClick">
          <span></span>
        </div>
        <div class="title">Skor</div>
      </div>
      <div class="cont_box">
        <div>Total skor</div>
        <div class="total_num">{{ total | numFormatD }}</div>
        <div>Total skor=Skor pemula + Skor grup + Skor team</div>
        <div class="act">
          <div class="it">
            <div>Skor Pemula</div>
            <div class="b">{{ info.scroll | numFormatD }}</div>
          </div>
          <div class="it">
            <div>Skor Grup</div>
            <div class="b">{{ info.club | numFormatD }}</div>
          </div>
          <div class="it">
            <div>Skor Team</div>
            <div class="b">{{ info.team | numFormatD }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tip_box">
      <div class="tip">Tips:</div>
      <ul>
        <li>
          1.Pembelian voucher tugas makin banyak, maka skor yang didapatkan
          makin tinggi
        </li>
        <li>2.Undang lebih banyak teman, skor team juga akan semakin tinggi</li>
        <li>
          3.Dalam 1 grup makin banyak membernya, maka skor grup juga akan
          semakin tinggi
        </li>
        <li>
          4.Jumlah total skor makin tinggi maka akan mendapatkan Hi-Koin lebih
          banyak
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { activityInfo } from "utils/ajax";
import { Toast } from "vant";
export default {
  name: "Skor",
  data() {
    return {
      info: {},
      total: ""
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    backClick() {
       let from=this.$store.state.routeFrom
      if (from) {
        this.$store.dispatch("changeRouteFrom", "");
        this.$router.replace(from);
      } else {
        this.$getSystemInfoFromApp("closeWebPage");
      }
    },

    getInfo() {
      activityInfo()
        .then(res => {
          if (res.code === 200) {
            this.total = res.data.activity_sum;
            this.info = res.data.activity_num;
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
      if (
        this.username &&
        this.bank_name &&
        this.bankcard_no &&
        this.phone &&
        this.gold
      ) {
        let param = {
          bank_name: this.bank_name,
          bankcard_no: this.bankcard_no,
          bankcard_holder: this.username,
          phone: this.phone,
          gold: this.gold
        };
        cashoutGo(this.$resultParams(param))
          .then(res => {
            Toast(res.msg);
            if (res.code == 200) {
              this.getInfo();
            } else if (res.code == 41015) {
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
    }
  }
};
</script>
<style lang="less" src="../../assets/css/account.less"></style>
