<template>
  <div class="InviteAward">
    <div class="topbar">
      <div class="left" @click="backClick">
        <span></span>
      </div>
      <div class="title">Detail Penghasilan</div>
    </div>
    <div class="award_main">
      <div class="award_last">Penghasilan dari anggota team untuk Anda sebanyak</div>
      <div class="award_koin">
        <span class="num">{{info.total_hi_coin|numFormatD}}</span>
        <span>Hi-koin</span>
      </div>
      <div class="award_rpc">≈Rpc {{info.total_rpc|numFormatD}}</div>
      <div class="award_list">
        <div class="award_item">
          <div class="li_num">01</div>
          <div class="li_main">
            <div class="t_name">
              Skor standar
              <span>{{info.base_activity.activity_num|numFormatD}}</span>
            </div>
            <div
              class="sub_t"
            >penghasilan dari anggota {{info.base_activity.hi_coin|numFormatD}} Hi-koin, jumlah {{info.base_activity.text}}</div>
            <div class="red_t">*Ajak teman untuk membeli lebih banyak tugas, dapat menambah skor ini</div>
          </div>
        </div>
        <div class="award_item">
          <div class="li_num">02</div>
          <div class="li_main">
            <div class="t_name">
              Skor Team
              <span>{{info.invite_contribute.activity_num|numFormatD}}</span>
            </div>
            <div class="sub_t">penghasilan dari anggota {{info.invite_contribute.hi_coin|numFormatD}} Hi-koin</div>
            <div class="red_t">*Ajak teman untuk membeli lebih banyak tugas, dapat menambah skor ini</div>
          </div>
        </div>
        <div class="award_item">
          <div class="li_num">03</div>
          <div class="li_main">
            <div class="t_name">
              Undang teman dapat bonus skor
              <span>{{info.invite_reward|numFormatD}}</span>
            </div>
            <div class="sub_t">penghasilan dari anggota {{info.invite_text}} Hi-koin</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { teamAwardInfo } from "utils/ajax";
import { randomString } from "utils/tools";
import { Toast } from "vant";
import Vue from "vue";
Vue.use(Toast);
export default {
  name: "InviteAward",
  data() {
    return {
      user_id: "",
      info: {}
    };
  },

  created() {
    this.user_id = this.$route.query.id;
    this.getInfo();
  },
  methods: {
    backClick() {
      this.$router.push("/invite");
    },
    getInfo() {
      let param = {
        user_id: this.user_id,
        key: randomString()
      };
      teamAwardInfo(this.$resultParams(param))
        .then(res => {
          if (res.code === 200) {
            this.info = res.data;
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="less"  src="../../assets/css/team.less" scoped>
</style>

