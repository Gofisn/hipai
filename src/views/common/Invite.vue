<template>
  <div class="Invite">
    <div class="topbar">
      <div class="left" @click="backClick">
        <span></span>
      </div>
      <div class="title">邀请好友</div>
    </div>
    <div class="main_cont">
      <div class="cont_box">
        <div class="circle_progress">
          <circle-progress
            v-if="isShow"
            :isAnimation="true"
            :width="width"
            strokeW="16"
            :progress="progress"
            barColor="#F71750"
            :duration="1000"
            backgroundColor="#f1f1f1"
            :text="text"
            :subText="'当前进度'"
          ></circle-progress>
        </div>
        <div class="say_title">进度每到100%即可获得一颗嗨豆</div>
        <div class="invit_btn" @click="goInvit">邀请好友加速</div>
        <div class="invit_num">已成功邀请{{invite_num}}人</div>
        <div class="table_box">
          <div class="tb_title">成功邀请好友注册并进行一次创作或进行以下行为都可以增长进度条哦～</div>
          <div class="table">
            <div class="item head">
              <span>用户行为</span>
              <span>奖励活跃度</span>
            </div>

            <div class="item">
              <span>邀请好友</span>
              <span>10%</span>
            </div>
            <div class="item">
              <span class="radius4">好友每购买一次嗨豆</span>
              <span class="radius3">10%</span>
            </div>
          </div>
        </div>
        <div class="invit_list">
          <div>
            <span class="list_title">邀请的好友</span>
          </div>
          <div class="list">
            <div class="item" v-for="item in invite_list" :key="item.user_id">
              <img :src="item.avatar?item.avatar: head_img" alt>
              <div class="cnt">
                <div>{{item.username}}</div>
                <div>购买嗨豆(个)</div>
              </div>
              <div class="cnt">
                <div
                  class="idt"
                  :class="item.is_authentication?'active':''"
                >{{item.is_authentication?'已认证':'未认证'}}</div>
                <div class="num">{{item.buy_num|numFormat}}</div>
              </div>
            </div>
          </div>
          <div class="loadMore" @click="loadMore" v-show="!finished&&invite_list.length">
            <span>查看更多</span>
            <van-icon name="arrow"/>
          </div>
          <div class="noMore" v-show="finished">～没有更多好友了～</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import default_header from "@/assets/img/share_header.png";
import { getSystemInfoFromApp } from "utils/native";
import { inviteInfo, inviteList } from "utils/ajax";
import CircleProgress from "@/components/CircleProgress.vue";
import { Circle, Icon } from "vant";
import Vue from "vue";
Vue.use(Circle).use(Icon);
export default {
  name: "Invite",
  data() {
    return {
      finished: false,
      isShow: false,
      width: 140,
      progress: 0,
      invite_num: 0,
      head_img: default_header,
      invite_list: [],
      page: 1,
      page_size: 10
    };
  },
  created() {
    this.getInfo();
    this.getList();
  },
  mounted() {
    this.width = document.getElementsByClassName(
      "circle_progress"
    )[0].clientWidth;
    var mh = document.getElementsByClassName("main_cont")[0].scrollHeight;
    var ch = document.getElementsByClassName("cont_box")[0].clientHeight;
    var mt = (mh - ch) / 2 - 20;
    if (mt < 0) {
      mt = 0;
    }
    document.getElementsByClassName("cont_box")[0].style.marginTop = mt + "px";
  },
  computed: {
    text() {
      return this.progress.toFixed(0) + "%";
    }
  },
  components: {
    CircleProgress
  },
  methods: {
    getList() {
      let param = {
        page: this.page,
        page_size: this.page_size
      };
      inviteList(this.$resultParams(param))
        .then(res => {
          this.isShow = true;
          if (res.code === 200) {
            if (res.data && res.data.length) {
              this.invite_list = this.invite_list.concat(res.data);
              if (res.data.length < this.page_size) {
                this.finished = true;
              }
            } else {
              this.finished = true;
            }
          }
        })
        .catch(err => {});
    },
    getInfo() {
      inviteInfo()
        .then(res => {
          this.isShow = true;
          if (res.code === 200) {
            this.progress = res.data.progress;
            this.invite_num = res.data.invite_num;
          }
        })
        .catch(err => {});
    },
    backClick() {
      this.$getSystemInfoFromApp("closeWebPage");
    },
    goInvit() {
      this.$router.push({ name: "Share" });
    },
    loadMore() {
      this.page = this.page + 1;
      this.getList();
    }
  }
};
</script>
<style lang="less"  src="../../assets/css/style.less">
</style>

