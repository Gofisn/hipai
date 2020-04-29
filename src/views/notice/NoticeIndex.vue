<template>
  <div class="NoticeIndex">
    <top-head title="Notifikasi" @leftClick="goBack"></top-head>
    <div class="fixed">
      <div class="tab_switch">
        <div class="tab_navigator">
          <div class="tab_title" @click="handleClick(1)">
            <img src="../../assets/img/rings_tab.png" class="tab_title_icon" />
            <div
              class="title_no_reading"
              v-if="tabTitleRead.hasSystemNotice"
            ></div>
            <div
              class="tab_title_text"
              :class="
                active === 1 ? 'active_title_text' : 'no_active_title_text'
              "
            >
              Notifikasi
            </div>
            <div class="tab_title_ident" v-if="active === 1"></div>
          </div>
          <div class="tab_title" @click="handleClick(2)">
            <img src="../../assets/img/comment.png" class="tab_title_icon" />
            <div
              class="title_no_reading"
              v-if="tabTitleRead.hasCommentNotice"
            ></div>
            <div
              class="tab_title_text"
              :class="
                active === 2 ? 'active_title_text' : 'no_active_title_text'
              "
            >
              Komen
            </div>
            <div class="tab_title_ident" v-if="active === 2"></div>
          </div>
          <div class="tab_title" @click="handleClick(3)">
            <img src="../../assets/img/praise.png" class="tab_title_icon" />
            <div
              class="title_no_reading"
              v-if="tabTitleRead.hasLikeNotice"
            ></div>
            <div
              class="tab_title_text"
              :class="
                active === 3 ? 'active_title_text' : 'no_active_title_text'
              "
            >
              Like
            </div>
            <div class="tab_title_ident" v-if="active === 3"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="centent_list">
      <div class="notice_list" v-if="active === 1">
        <van-pull-refresh v-model="reLoading" @refresh="refresh">
          <van-list
            v-model="reLoading"
            :offset="10"
            @load="getNotice"
            :finished="systemFinished"
            :finished-text="systemFinishedText"
            v-show="systemNotice.length || systemFinished"
            class="list"
          >
            <div v-for="(item, index) of systemNotice" :key="index">
              <NoticeItem
                :notice="{
                  isNoRead: parseInt(item.is_read) === 0,
                  title: item.title,
                  content: item.content,
                  date: item.create_time
                }"
              />
            </div>
          </van-list>
          <div v-if="isRender && !systemNotice.length" class="no_notice">
            <img src="../../assets/img/no_notice.png" class="no_notice_img" />
            <div class="text">Sementara tidak ada tampilan</div>
          </div>
        </van-pull-refresh>
      </div>
      <div class="notice_list" v-if="active === 2">
        <van-pull-refresh v-model="reLoading" @refresh="refresh">
          <van-list
            v-model="reLoading"
            :offset="10"
            @load="getNotice"
            :finished="commentFinished"
            :finished-text="commentFinishedText"
            v-show="commentNotice.length || commentFinished"
            class="list"
          >
            <div
              class="item"
              v-for="(item, index) of commentNotice"
              :key="index"
              @click="handleCommentClick(item, 1)"
            >
              <img
                :src="
                  item.avatar !== null
                    ? item.avatar
                    : require('../../assets/img/avart.png')
                "
                class="item_icon"
              />
              <div class="item_centent">
                <div class="item_center">
                  <div class="item_center_text">{{ item.content }}</div>
                  <div class="item_time">{{ item.create_time }}</div>
                </div>
                <!-- <img :src="item.post_image" class="item_img"> -->
              </div>
            </div>
          </van-list>
          <div v-if="isRender && !commentNotice.length" class="no_notice">
            <img src="../../assets/img/no_notice.png" class="no_notice_img" />
            <div class="text">Sementara tidak ada tampilan</div>
          </div>
        </van-pull-refresh>
      </div>

      <div class="notice_list" v-if="active === 3">
        <van-pull-refresh v-model="reLoading" @refresh="refresh">
          <van-list
            v-model="reLoading"
            :offset="10"
            @load="getNotice"
            :finished="prizeFinished"
            :finished-text="prizeFinishedText"
            v-show="prizeNotice.length || prizeFinished"
            class="list"
          >
            <div
              class="item"
              v-for="(item, index) of prizeNotice"
              :key="index"
              @click="handlePrizeClick(item, 2)"
            >
              <img
                :src="
                  item.avatar !== null
                    ? item.avatar
                    : require('../../assets/img/avart.png')
                "
                class="item_icon"
              />
              <div class="item_centent">
                <div class="item_center">
                  <div class="item_center_text">{{ item.content }}</div>
                  <div class="item_time">{{ item.create_time }}</div>
                </div>
                <!-- <img :src="item.post_image" class="item_img"> -->
              </div>
            </div>
          </van-list>
          <div v-if="isRender && !prizeNotice.length" class="no_notice">
            <img src="../../assets/img/no_notice.png" class="no_notice_img" />
            <div class="text">Sementara tidak ada tampilan</div>
          </div>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import NoticeItem from "@/components/NoticeItem";
import {
  noticeTabIsRead,
  noticeSystem,
  noticeComment,
  noticePrize
} from "utils/ajax";
import { List, PullRefresh } from "vant";
import Vue from "vue";
Vue.use(List).use(PullRefresh);
export default {
  name: "NoticeIndex",
  data() {
    return {
      active: 1,
      reLoading: false,
      // tabTitle是否存在未读
      tabTitleRead: {},
      // 是否渲染
      isRender: false,
      page_size: 30,
      // 当前页
      currentPage: {
        systemPage: 1,
        commentPage: 1,
        prizePage: 1
      },
      systemFinished: false,
      commentFinished: false,
      prizeFinished: false,
      // 系统通知数据
      systemNotice: [],
      // 评论数据
      commentNotice: [],
      // 点赞数据
      prizeNotice: []
    };
  },
  components: {
    TopHead,
    NoticeItem
  },
  computed: {
    systemFinishedText() {
      if (this.systemNotice.length < 8) {
        return "";
      } else {
        return "Tidak ada tampilan lagi";
      }
    },
    commentFinishedText() {
      if (this.commentNotice.length < 10) {
        return "";
      } else {
        return "Tidak ada tampilan lagi";
      }
    },
    prizeFinishedText() {
      if (this.prizeNotice.length < 10) {
        return "";
      } else {
        return "Tidak ada tampilan lagi";
      }
    }
  },
  methods: {
    goBack() {
      this.$getSystemInfoFromApp("closeWebPage");
    },
    refresh() {
      if (this.active === 1) {
        this.systemNotice = [];
        this.currentPage.systemPage = 1;
      } else if (this.active === 2) {
        this.commentNotice = [];
        this.currentPage.commentPage = 1;
      } else if (this.active === 3) {
        this.prizeNotice = [];
        this.currentPage.prizePage = 1;
      }
      this.reLoading = true;
      this.getNotice();
    },
    handleClick(idx) {
      switch (idx) {
        case 1:
          this.active = 1;
          this.tabTitleRead.hasSystemNotice = false;
          this.getNoticeTitleRead();
          this.refresh();
          break;
        case 2:
          this.active = 2;
          this.tabTitleRead.hasCommentNotice = false;
          this.getNoticeTitleRead();
          this.refresh();
          break;
        case 3:
          this.active = 3;
          this.tabTitleRead.hasLikeNotice = false;
          this.getNoticeTitleRead();
          this.refresh();
          break;
      }
    },
    // 获取通知title中是否未读
    getNoticeTitleRead() {
      noticeTabIsRead().then(res => {
        if (res.code === 200) {
          this.tabTitleRead = res.data;
        } else {
          this.$toast(res.msg);
        }
      });
    },
    // 请求页面数据
    getNotice() {
      this.isRender = false;
      if (this.active === 1) {
        let params = {
          page: this.currentPage.systemPage,
          page_size: this.page_size
        };
        this.systemFinished = false;
        noticeSystem(this.$resultParams(params))
          .then(res => {
            if (res.code === 200) {
              this.reLoading = false;
              this.isRender = true;
              if (this.currentPage.systemPage < res.data.page_total) {
                this.currentPage.systemPage = this.currentPage.systemPage + 1;
                this.systemNotice = this.systemNotice.concat(res.data.data);
                this.systemFinished = false;
              } else if (this.currentPage.systemPage == res.data.page_total) {
                this.systemNotice = this.systemNotice.concat(res.data.data);
                this.systemFinished = true;
              } else {
                this.systemNotice = [];
              }
            } else {
              this.reLoading = false;
              this.systemFinished = true;
              this.$toast(res.msg);
            }
          })
          .catch(err => {
            this.reLoading = false;
            this.systemFinished = true;
            console.log(err);
          });
      } else if (this.active === 2) {
        let params = {
          page: this.currentPage.commentPage,
          page_size: this.page_size
        };
        this.commentFinished = false;
        noticeComment(this.$resultParams(params))
          .then(res => {
            if (res.code === 200) {
              this.reLoading = false;
              this.isRender = true;
              if (this.currentPage.commentPage < res.data.page_total) {
                this.currentPage.commentPage = this.currentPage.commentPage + 1;
                this.commentNotice = this.commentNotice.concat(res.data.data);
                this.commentFinished = false;
              } else if (this.currentPage.commentPage == res.data.page_total) {
                this.commentNotice = this.commentNotice.concat(res.data.data);
                this.commentFinished = true;
              } else {
                this.commentNotice = [];
              }
            } else {
              this.reLoading = false;
              this.commentFinished = true;
              this.$toast(res.msg);
            }
          })
          .catch(err => {
            this.reLoading = false;
            this.commentFinished = true;
            console.log(err);
          });
      } else if (this.active === 3) {
        let params = {
          page: this.currentPage.prizePage,
          page_size: this.page_size
        };
        this.prizeFinished = false;
        noticePrize(this.$resultParams(params))
          .then(res => {
            if (res.code === 200) {
              this.reLoading = false;
              this.isRender = true;
              if (res.data.page_total > this.currentPage.prizePage) {
                this.currentPage.prizePage = this.currentPage.prizePage + 1;
                this.prizeNotice = this.prizeNotice.concat(res.data.data);
                this.prizeFinished = false;
              } else if (res.data.page_total == this.currentPage.prizePage) {
                this.prizeNotice = this.prizeNotice.concat(res.data.data);
                this.prizeFinished = true;
              } else {
                this.prizeNotice = [];
              }
            } else {
              this.reLoading = false;
              this.prizeFinished = true;
              this.$toast(res.msg);
            }
          })
          .catch(err => {
            this.reLoading = false;
            this.prizeFinished = true;
            console.log(err);
          });
      }
    },

    // 处理评论点击 post_id 帖子ID, post_comment_id 评论ID, post_comment_pid 评论父级ID, data 路径标识
    handleCommentClick(item, data) {
      if (item.type == "1") {
        let params = {
          post_id: item.post_id,
          post_comment_id: item.post_comment_id,
          post_comment_pid: item.post_comment_pid,
          data: data
        };
        var u = navigator.userAgent;
        if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
          if (window.android && window.android.startDetailsPage) {
            window.android.startDetailsPage(
              params.post_id,
              parseInt(params.post_comment_id),
              parseInt(params.post_comment_pid),
              params.data
            );
          }
        } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
          if (window.webkit) {
            //调用IOS的jumpjumpNext（）方法
            console.log("ios");
            window.webkit.messageHandlers.startDetailsPage.postMessage(params);
          }
        }
      } else if (item.type == "2") {
        window.location.href = item.jump_url;
      }
    },
    // 处理点赞点击  post_id 帖子ID, post_comment_id 评论ID, data 路径标识
    handlePrizeClick(item, data) {
      if (item.type == "1") {
        let params = {
          post_id: item.post_id,
          post_comment_id: item.post_comment_id,
          data: data
        };
        var u = navigator.userAgent;
        if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
          if (window.android && window.android.startDetailsPage) {
            window.android.startDetailsPage(
              params.post_id,
              parseInt(params.post_comment_id),
              parseInt(0),
              params.data
            );
          }
        }
        if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
          if (window.webkit) {
            //调用IOS的jumpjumpNext（）方法
            window.webkit.messageHandlers.startDetailsPage.postMessage(params);
          }
        }
      } else if (item.type == "2") {
        window.location.href = item.jump_url;
      }
    },
    // 处理未读
    handleNoRead(data) {
      if (data && data.length > 0) {
        data.forEach(item => {
          item.is_read = 1;
        });
      }
    }
  },
  mounted() {
    if (this.$route.query.active) {
      this.active = parseInt(this.$route.query.active);
      if (this.active > 3) {
        this.active = 1;
      }
    }
    this.handleClick(this.active);
    // this.getNoticeTitleRead();
    // this.getNotice();
  }
};
</script>
<style lang="less" scoped src="../../assets/css/style.less"></style>

<style lang="less">
.finished {
  padding-bottom: 20px;
  line-height: 60px;
  text-align: center;
  color: #bbb;
}
</style>
