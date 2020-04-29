<template>
  <div class="ScrollList">
    <div class="TopHeader">
      <div v-if="choose_id" class="back" @click="backClick">
        <span></span>
      </div>Tugas
    </div>
    <div class="like_num">Saya sudah baca {{ user_like_num }} berita</div>
    <!-- <div
      v-show="user_like_num"
      class="like_num"
    >Telah menonton iklan {{user_like_num}} kali hari ini</div>
    <div class="ad_box">
      <div class="show_ad_btn" @click="goShowAd">Tonton</div>
    </div>-->
    <van-tabs v-model="listActive" @click="changeBusinessActive">
      <van-tab title="Tugas">
        <div class="bs_list">
          <van-pull-refresh v-model="loading" @refresh="refresh" :disabled="disabled">
            <van-list
              :offset="10"
              v-model="loading"
              :finished="finished"
              :finished-text="one"
              @load="getData"
              v-if="taskList.length"
              class="tugas_list"
            >
              <div
                v-for="(item, index) in taskList"
                :key="item.scroll_id"
                class="task_item"
                :class="item.level == 0 ? 'leveN' : 'leve' + ((index % 5) + 1)"
                :id="choose_id==item.scroll_id?'choosed':''"
              >
                <div class="level_logo">{{ item.level | zeo }}</div>
                <div class="level_title">{{ item.title }}</div>
                <div class="need_like item_cnt">Harus baca {{ item.like_num }} berita lagi</div>
                <div class="task_num item_cnt">
                  Jumlah Tugas：{{ item.exchange_num }}/{{
                  item.max_change_num
                  }}
                </div>
                <div class="need_num">Syarat Tukar：{{ item.exchange_bean }} HI-Koin</div>
                <div class="skor_box">
                  <span class="icon"></span>
                  Skor: {{ item.base_activity_level }}
                </div>

                <div class="reward_box">
                  <div>
                    <span class="can_get">{{ item.reward_bean }}</span> Hi-Koin
                  </div>
                  <div>Total bonus Hi-Koin</div>
                  <div class="exchange_btn" @click="goExchange(item)">Tukar</div>
                </div>
              </div>
            </van-list>
            <div v-else-if="!taskList.length && finished" class="nolist">
              <img src="../../assets/img/beans_no.png" alt>
              <div class="cont">Sementara tidak ada tampilan</div>
            </div>
          </van-pull-refresh>
        </div>
      </van-tab>
      <van-tab title="Dalam Proses">
        <div class="bs_list">
          <van-pull-refresh v-model="loading" @refresh="refresh" :disabled="disabled">
            <van-list
              :offset="10"
              v-model="loading"
              :finished="finished"
              :finished-text="two"
              @load="getData"
              v-if="progressList.length"
              class="tugas_list"
            >
              <div
                v-for="(item, index) in progressList"
                :key="item.task_id"
                class="task_item"
                :class="item.level == 0 ? 'leveN' : 'leve' + ((index % 5) + 1)"
              >
                <div class="level_logo">{{ item.level | zeo }}</div>

                <div class="level_title">{{ item.title }}</div>
                <div class="need_like item_cnt">Harus baca {{ item.like_num }} berita lagi</div>
                <div class="task_num item_cnt">Jumlah Tugas：{{ item.exchange_num }}</div>
                <div class="need_num">Sisa waktu tugas: {{ item.end_day }} hari</div>
                <div class="skor_box">
                  <span class="icon"></span>
                  Skor: {{ item.base_activity_level }}
                </div>

                <div class="reward_box">
                  <div>
                    <span class="can_get">{{ item.reward_bean }}</span> Hi-Koin
                  </div>
                  <div>Total bonus Hi-Koin</div>
                </div>
              </div>
            </van-list>
            <div v-else-if="!progressList.length && finished" class="nolist">
              <img src="../../assets/img/beans_no.png" alt>
              <div class="cont">Sementara tidak ada tampilan</div>
            </div>
          </van-pull-refresh>
        </div>
      </van-tab>
      <van-tab title="Tugas Selesai">
        <div class="bs_list">
          <van-pull-refresh v-model="loading" @refresh="refresh" :disabled="disabled">
            <van-list
              :offset="10"
              v-model="loading"
              :finished="finished"
              :finished-text="three"
              @load="getData"
              v-if="finishList.length"
              class="tugas_list"
            >
              <div
                v-for="(item, index) in finishList"
                :key="item.task_id"
                class="task_item"
                :class="item.level == 0 ? 'leveN' : 'leve' + ((index % 5) + 1)"
              >
                <div class="level_logo">{{ item.level | zeo }}</div>

                <div class="level_title">{{ item.title }}</div>
                <div class="need_like item_cnt">Harus baca {{ item.like_num }} berita lagi</div>
                <div class="task_num item_cnt">Jumlah Tugas：{{ item.exchange_num }}</div>
                <div class="need_num">Tanggal Selesai ：{{ item.expire_date }}</div>
                <div class="skor_box">
                  <span class="icon"></span>
                  Skor: {{ item.base_activity_level }}
                </div>
                <div class="reward_box">
                  <div>
                    <span class="can_get">{{ item.reward_bean }}</span> Hi-Koin
                  </div>
                  <div>Total bonus Hi-Koin</div>
                </div>
              </div>
            </van-list>
            <div v-else-if="!finishList.length && finished" class="nolist">
              <img src="../../assets/img/beans_no.png" alt>
              <div class="cont">Sementara tidak ada tampilan</div>
            </div>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
    <div class="scroll_success_mask" v-show="show_success_mask">
      <div class="main_box">
        <img src="../../assets/img/scroll_success_icon.png" alt>
        <div class="msg">
          Tugas
          <span class="title">{{exchange_item.title}}</span> berhasil di beli, yuk baca berita & hasilkan uang.
        </div>
        <div class="btn" @click="goNewsIndex">Baca Berita</div>
      </div>
      <div class="close_btn" @click="show_success_mask=false"></div>˝
    </div>
  </div>
</template>
<script>
import {
  scrollList,
  scrollIn,
  scrollComplete,
  scrollExchange,
  adResult,
  checkHasScroll
} from "utils/ajax";
import Vue from "vue";
import { Tab, Tabs, Toast, List, PullRefresh, Dialog } from "vant";
import { clearTimeout } from "timers";
Vue.use(Tab)
  .use(Tabs)
  .use(Toast)
  .use(List)
  .use(PullRefresh)
  .use(Dialog);
export default {
  name: "ScrollList",
  data() {
    return {
      loading: false,
      listActive: 0,
      taskList: [], //任务列表
      progressList: [], //进行中
      finishList: [], //已完成
      page: 1,
      page_num: 50,
      finished: false,
      server_time: 0,
      user_like_num: "",
      disabled: false,
      choose_id: null,
      show_success_mask: false,
      exchange_item: {},
      show_mask_time: null
    };
  },
  filters: {
    zeo(str) {
      if (str < 10) {
        return 0 + str;
      } else {
        return str;
      }
    }
  },
  computed: {
    one() {
      if (this.taskList.length < 5) {
        return "";
      } else {
        return "Tidak ada tampilan lagi";
      }
    },
    two() {
      if (this.progressList.length < 5) {
        return "";
      } else {
        return "Tidak ada tampilan lagi";
      }
    },
    three() {
      if (this.finishList.length < 5) {
        return "";
      } else {
        return "Tidak ada tampilan lagi";
      }
    }
  },
  created() {
    window.changeAd = this.changeAd;
    if (this.$route.query.id) {
      this.choose_id = this.$route.query.id;
    }
    if (this.$route.query.active) {
      this.listActive = parseFloat(this.$route.query.active);
      this.getData();
    } else {
      // 判断是否有正在进行中的卷轴
      this.checkScrollProgress();
    }
  },
  mounted() {
    // this.scrollList();
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
    // 跳新闻首页
    goNewsIndex() {
      this.show_success_mask = false;
      this.$getSystemInfoFromApp("goIntentNews");
    },
    scrollList() {
      let headH = document.getElementsByClassName("TopHeader")[0].clientHeight;
      let likeH = document.getElementsByClassName("like_num")[0].clientHeight;
      let adH = document.getElementsByClassName("ad_box")[0].clientHeight;

      // console.log(headH, likeH, adH, navH);

      let sDiv = document.getElementsByClassName("ScrollList")[0];
      sDiv.onscroll = () => {
        let navH = document.getElementsByClassName("van-tab")[0].clientHeight;

        if (sDiv.scrollTop > 0) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        if (document.getElementsByClassName("tugas_list").length) {
          if (likeH + adH <= sDiv.scrollTop) {
            document.getElementsByClassName("tugas_list")[0].style.height =
              sDiv.clientHeight - headH - navH + 2 + "px";
          } else {
            document.getElementsByClassName("tugas_list")[0].style.height =
              "auto";
          }
        }
      };
    },

    changeBusinessActive(index, title) {
      // document.getElementsByClassName("ScrollList")[0].scrollTop = 0;
      let oRefresh = document.getElementsByClassName("van-pull-refresh");
      for (let i = 0; i < oRefresh.length; i++) {
        oRefresh[i].scrollTop = 0;
      }
      this.refresh();
    },
    getData() {
      let params = {
        page: this.page,
        page_size: this.page_num
      };
      this.loading = true;
      this.finished = false;
      if (this.listActive == 0) {
        scrollList(this.$resultParams(params))
          .then(res => {
            this.loading = false;
            if (res.code === 200) {
              if (res.data.server_time) {
                this.server_time = parseInt(res.data.server_time);
              }
              this.user_like_num = res.data.user_like_num;
              if (res.data.data.length) {
                this.page = parseInt(res.data.current_page) + 1;
                this.taskList = this.taskList.concat(res.data.data);
                if (res.data.page_total < this.page) {
                  this.finished = true;
                }
                this.scrollToItem();
              } else {
                this.finished = true;
              }
            } else {
              Toast(res.msg);
              this.taskList = [];
              this.finished = true;
              this.loading = false;
            }
          })
          .catch(err => {
            this.taskList = [];
            this.finished = true;
            this.loading = false;
          });
      } else if (this.listActive == 1) {
        scrollIn(this.$resultParams(params))
          .then(res => {
            this.loading = false;
            if (res.code === 200) {
              this.user_like_num = res.data.user_like_num;
              if (res.data.data.length) {
                this.page = parseInt(res.data.current_page) + 1;
                this.progressList = this.progressList.concat(res.data.data);
                if (res.data.page_total < this.page) {
                  this.finished = true;
                }
              } else {
                this.finished = true;
              }
            } else {
              Toast(res.msg);
              this.progressList = [];
              this.finished = true;
              this.loading = false;
            }
          })
          .catch(err => {
            Toast(res.msg);
            this.progressList = [];
            this.finished = true;
            this.loading = false;
          });
      } else if (this.listActive == 2) {
        scrollComplete(this.$resultParams(params))
          .then(res => {
            this.loading = false;
            if (res.code === 200) {
              this.user_like_num = res.data.user_like_num;
              if (res.data.data.length) {
                this.page = parseInt(res.data.current_page) + 1;
                this.finishList = this.finishList.concat(res.data.data);
                if (res.data.page_total < this.page) {
                  this.finished = true;
                }
              } else {
                this.finished = true;
              }
            } else {
              Toast(res.msg);
              this.finishList = [];
              this.finished = true;
              this.loading = false;
            }
          })
          .catch(err => {
            Toast(res.msg);
            this.finishList = [];
            this.loading = false;
            this.finished = true;
          });
      }
    },
    // 跳到对应的卷轴
    scrollToItem() {
      this.$nextTick(() => {
        if (document.getElementById("choosed")) {
          document.getElementById("choosed").scrollIntoView({
            behavior: "smooth", // 平滑过渡
            block: "center" // 上边框与视窗顶部平齐。默认值
          });
        }
      });
    },
    // 判断是否有正在进行中的卷轴
    checkScrollProgress() {
      let param = {
        timestamp: Date.now()
      };
      checkHasScroll(this.$resultParams(param))
        .then(res => {
          if (res.code == 200) {
            if (res.data.isHasScroll) {
              this.listActive = 1;
            }
            this.getData();
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {});
    },
    goExchange(item) {
      this.exchange_item = item;
      let params = {
        scroll_id: item.scroll_id
      };
      scrollExchange(this.$resultParams(params))
        .then(res => {
          if (res.code === 200) {
            item.exchange_num = parseFloat(item.exchange_num) + 1;
            this.show_success_mask = true;
            this.show_mask_time = Date.now();
            this.hideSuccessMask();
            //刷新新闻列表
            this.$getSystemInfoFromApp("goRefreshNews");
          } else if (res.code == 60000) {
            // 嗨豆不足 跳到交易所购买嗨豆
            Dialog.confirm({
              cancelButtonText: "Batalkan",
              confirmButtonText: "Beli Hi-Koin",
              message: "Saldo Hi-Koin Anda tidak cukup"
            })
              .then(() => {
                this.$getSystemInfoFromApp("h5Business", "", true);
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
    },
    hideSuccessMask() {
      var _this = this;
      setTimeout(() => {
        let now = Date.now();
        if (now - _this.show_mask_time >= 30 * 1000) {
          _this.show_mask_time = now;
          _this.show_success_mask = false;
        }
        if (_this.show_success_mask) {
          _this.hideSuccessMask();
        }
      }, 1000);
    },
    refresh() {
      this.page = 1;
      this.taskList = [];
      this.finishList = [];
      this.progressList = [];
      this.getData();
    },
    goShowAd() {
      let ad = this.$getSystemInfoFromApp("showAd");
      if (ad == 0) {
        // 广告还没准备好
        Toast("Iklan masih belum tersedia");
      }
    },
    changeAd(ad) {
      let params = {
        adv_id: ad,
        time: parseInt(Date.now() / 1000),
        watch_res: 1
      };
      adResult(this.$resultParams(params))
        .then(res => {
          Toast(res.msg);
          if (res.code === 200) {
            this.user_like_num = res.data.today_watch_num;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped src="../../assets/css/style.less"></style>
