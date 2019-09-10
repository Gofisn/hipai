<template>
  <div class="notice">
    <div class="fixed"
         v-if="isFixed">
      <!-- <TopHeader title="通知"
                 @leftClick="goBack" /> -->
      <div class="head">通知</div>
      <div class="layout"></div>
      <div class="tab_switch">
        <div class="tab_navigator">
          <div class="tab_title"
               @click="handleClick(1)">
            <img src="../../assets/img/rings_tab.png"
                 class="tab_title_icon" />
            <div class="title_no_reading"
                 v-if="tabTitleRead.hasSystemNotice"></div>
            <div class="tab_title_text"
                 :class="active===1?'active_title_text':'no_active_title_text'">系统通知</div>
            <div class="tab_title_ident"
                 v-if="active===1"></div>
          </div>
          <div class="tab_title"
               @click="handleClick(2)">
            <img src="../../assets/img/comment.png"
                 class="tab_title_icon" />
            <div class="title_no_reading"
                 v-if="tabTitleRead.hasCommentNotice"></div>
            <div class="tab_title_text"
                 :class="active===2?'active_title_text':'no_active_title_text'">评论</div>
            <div class="tab_title_ident"
                 v-if="active===2"></div>
          </div>
          <div class="tab_title"
               @click="handleClick(3)">
            <img src="../../assets/img/praise.png"
                 class="tab_title_icon" />
            <div class="title_no_reading"
                 v-if="tabTitleRead.hasLikeNotice"></div>
            <div class="tab_title_text"
                 :class="active===3?'active_title_text':'no_active_title_text'">点赞</div>
            <div class="tab_title_ident"
                 v-if="active===3"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- <TopHeader title="通知"
               @leftClick="goBack" /> -->
    <div class="head">通知</div>
    <div class="layout"></div>
    <div class="tab_switch">
      <div class="tab_navigator">
        <div class="tab_title"
             @click="handleClick(1)">
          <i class="tab_title_icon" />
          <div class="tab_title_text"
               :class="active===1?'active_title_text':'no_active_title_text'"></div>
          <div class="tab_title_ident"
               v-if="!active"></div>
        </div>
        <div class="tab_title"
             @click="handleClick(2)">
          <i class="tab_title_icon" />
          <div class="tab_title_text"
               :class="active===2?'active_title_text':'no_active_title_text'"></div>
          <div class="tab_title_ident"
               v-if="!active"></div>
        </div>
        <div class="tab_title"
             @click="handleClick(3)">
          <i class="tab_title_icon" />
          <div class="tab_title_text"
               :class="active===3?'active_title_text':'no_active_title_text'"></div>
          <div class="tab_title_ident"
               v-if="!active"></div>
        </div>
      </div>
    </div>
    <div class="centent_list">
      <div v-if="isRender&&active===1&&systemNotice.length===0"
           class="no_notice">
        <img src="../../assets/img/no_notice.png"
             class="no_notice_img" />
        <div class="text">暂无消息哦～</div>
      </div>
      <div class="notice_list_item"
           v-if="active===1&&systemNotice">
        <van-pull-refresh v-model="reLoading"
                          @refresh="refresh">
          <van-list v-model="loadLoading"
                    :offset="10"
                    @load="getLoadNotice"
                    :finished="systemFinished"
                    :finished-text="systemFinishedText"
                    v-show="systemNotice.length||systemFinished"
                    class="list">
            <div v-for="(item,index) of systemNotice"
                 :key="index">
              <NoticeItem :notice="{isNoRead:parseInt(item.is_read)===0,title:item.title,content:item.content,date:item.create_time}" />
            </div>
            <!-- <div v-show="systemFinished&&active===1&&systemNotice.length!==0"
                 class="finished">没有更多了。。。</div> -->
          </van-list>
        </van-pull-refresh>
      </div>

      <div v-if="isRender&&active===2&&commentNotice.length===0"
           class="no_notice">
        <img src="../../assets/img/no_notice.png"
             class="no_notice_img" />
        <div class="text">暂无消息哦～</div>
      </div>
      <div class="prize_list notice_list_item"
           v-if="active===2&&commentNotice">
        <van-pull-refresh v-model="reLoading"
                          @refresh="refresh">
          <van-list v-model="loadLoading"
                    :offset="10"
                    @load="getLoadNotice"
                    :finished="commentFinished"
                    :finished-text="commentFinishedText"
                    v-show="commentNotice.length||commentFinished"
                    class="list">
            <div class="item"
                 v-for="(item,index) of commentNotice"
                 :key="index"
                 @click="handleCommentClick(item.post_id,item.post_comment_id,item.post_comment_pid,1)">
              <img :src="(item.avatar!==null)?item.avatar:require('../../assets/img/avart.png')"
                   class="item_icon" />
              <div class="item_centent">
                <div class="item_center">
                  <div class="item_center_text">{{item.content}}</div>
                  <div class="item_time">{{item.create_time}}</div>
                </div>
                <img :src="item.post_image"
                     class="item_img" />
              </div>
            </div>
            <!-- <div v-if="commentFinished&&active===2&&commentNotice.length!==0"
                 class="finished">没有更多了。。。</div> -->
          </van-list>
        </van-pull-refresh>
        <!-- <div class="item"
             v-for="(item,index) of commentNotice"
             :key="index"
             @click="handleCommentClick(item.post_id,item.post_comment_id,item.post_comment_pid,1)">
          <img :src="item.avatar"
               class="item_icon" />
          <div class="item_centent">
            <div class="item_center">
              <div class="item_center_text">{{item.content}}</div>
              <div class="item_time">{{item.create_time}}</div>
            </div>
            <img :src="item.post_image"
                 class="item_img" />
          </div>
        </div> -->
      </div>
      <div v-if="isRender&&active===3&&prizeNotice.length===0"
           class="no_notice">
        <img src="../../assets/img/no_notice.png"
             class="no_notice_img" />
        <div class="text">暂无消息哦～</div>
      </div>
      <div class="prize_list notice_list_item"
           v-if="active===3">
        <van-pull-refresh v-model="reLoading"
                          @refresh="refresh">
          <van-list v-model="loadLoading"
                    :offset="10"
                    @load="getLoadNotice"
                    :finished="prizeFinished"
                    :finished-text="prizeFinishedText"
                    v-show="prizeNotice.length||prizeFinished"
                    class="list">
            <div class="item"
                 v-for="(item,index) of prizeNotice"
                 :key="index"
                 @click="handlePrizeClick(item.post_id,item.post_comment_id,2)">
              <img :src="(item.avatar!==null)?item.avatar:require('../../assets/img/avart.png')"
                   class="item_icon" />
              <div class="item_centent">
                <div class="item_center">
                  <div class="item_center_text">{{item.content}}</div>
                  <div class="item_time">{{item.create_time}}</div>
                </div>
                <img :src="item.post_image"
                     class="item_img" />
              </div>
            </div>
            <!-- <div v-show="prizeFinished&&active===3&&prizeNotice.length!==0"
                 class="finished">没有更多了。。。</div> -->
          </van-list>
        </van-pull-refresh>
      </div>

    </div>
  </div>
</template>
<script>
import TopHeader from "@/components/TopHead";
import NoticeItem from "@/components/NoticeItem";
import { noticeTabIsRead, noticeSystem, noticeComment, noticePrize } from 'utils/ajax'
import { List, PullRefresh } from "vant";
import Vue from "vue";
Vue.use(List).use(PullRefresh);
export default {
  name: "",
  components: {
    TopHeader,
    NoticeItem
  },
  data () {
    return {
      active: 1,
      reLoading: false,
      loadLoading: false,
      isFixed: true,
      // tabTitle是否存在未读
      tabTitleRead: {},
      // 是否渲染
      isRender: false,
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
      prizeNotice: [],
    };
  },
  computed: {
    systemFinishedText () {
      if (this.systemNotice.length < 8) {
        return "";
      } else {
        return "没有更多了";
      }
    },
    commentFinishedText () {
      if (this.commentNotice.length < 10) {
        return "";
      } else {
        return "没有更多了";
      }
    },
    prizeFinishedText () {
      if (this.prizeNotice.length < 10) {
        return "";
      } else {
        return "没有更多了";
      }
    }
  },
  methods: {
    goBack () {
      this.$getSystemInfoFromApp('closeWebPage')
    },
    refresh () {
      if (this.active === 1) {
        this.systemNotice = [];
        this.currentPage.systemPage = 1;
      } else if (this.active === 2) {
        this.commentNotice = []
        this.currentPage.commentPage = 1;
      } else if (this.active === 3) {
        this.prizeNotice = []
        this.currentPage.prizePage = 1;
      }
      this.reLoading = true;
      this.getNotice()
    },
    handleClick (idx) {
      switch (idx) {
        case 1:
          this.active = 1;
          this.tabTitleRead.hasSystemNotice = false
          this.getNoticeTitleRead();
          this.refresh()
          break;
        case 2:
          this.active = 2;
          this.tabTitleRead.hasCommentNotice = false
          this.getNoticeTitleRead();
          this.refresh()
          break;
        case 3:
          this.active = 3;
          this.tabTitleRead.hasLikeNotice = false
          this.getNoticeTitleRead();
          this.refresh()
          break;
      }
    },
    // 获取通知title中是否未读
    getNoticeTitleRead () {
      noticeTabIsRead().then(res => {
        if (res.code === 200) {
          this.tabTitleRead = res.data
        } else {
          this.$toast(res.msg)
        }
      })
    },
    // 请求页面数据
    getNotice () {
      this.isRender = false
      if (this.active === 1) {
        let params = { page: this.currentPage.systemPage, page_size: 10 }
        noticeSystem(this.$resultParams(params)).then(res => {
          if (res.code === 200) {
            console.log(res)
            this.reLoading = false
            this.isRender = true
            if (this.currentPage.systemPage < res.data.page_total) {
              this.currentPage.systemPage = this.currentPage.systemPage + 1;
              this.systemNotice = this.systemNotice.concat(res.data.data);
              this.systemFinished = false
            } else if (this.currentPage.systemPage == res.data.page_total) {
              this.systemNotice = this.systemNotice.concat(res.data.data);
              this.systemFinished = true
            } else {
              this.systemNotice = [];
            }
          } else {
            this.reLoading = false
            this.systemFinished = true
            this.$toast(res.msg)
          }
        }).catch(err => {
          this.reLoading = false
          this.systemFinished = true
          console.log(err);
        });
      } else if (this.active === 2) {
        let params = { page: this.currentPage.commentPage, page_size: 10 }
        noticeComment(this.$resultParams(params)).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.reLoading = false
            this.isRender = true
            if (this.currentPage.commentPage < res.data.page_total) {
              this.currentPage.commentPage = this.currentPage.commentPage + 1;
              this.commentNotice = this.commentNotice.concat(res.data.data);
              this.commentFinished = false
            } else if (this.currentPage.commentPage == res.data.page_total) {
              this.commentNotice = this.commentNotice.concat(res.data.data);
              this.commentFinished = true
            } else {
              this.commentNotice = [];
            }
          } else {
            this.reLoading = false
            this.commentFinished = true
            this.$toast(res.msg)
          }
        }).catch(err => {
          this.reLoading = false
          this.commentFinished = true
          console.log(err);
        });
      } else if (this.active === 3) {
        let params = { page: this.currentPage.prizePage, page_size: 10 }
        noticePrize(this.$resultParams(params)).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.reLoading = false
            this.isRender = true
            if (res.data.page_total > this.currentPage.prizePage) {
              this.currentPage.prizePage = this.currentPage.prizePage + 1;
              this.prizeNotice = this.prizeNotice.concat(res.data.data);
              this.prizeFinished = false
            } else if (res.data.page_total == this.currentPage.prizePage) {
              this.prizeNotice = this.prizeNotice.concat(res.data.data);
              this.prizeFinished = true
            } else {
              this.prizeNotice = []
            }
          } else {
            this.reLoading = false
            this.prizeFinished = true
            this.$toast(res.msg)
          }
        }).catch(err => {
          this.reLoading = false
          this.prizeFinished = true
          console.log(err);
        });
      }
    },
    getLoadNotice () {
      this.isRender = false
      if (this.active === 1 && !this.systemFinished) {
        this.loadLoading = true
        let params = { page: this.currentPage.systemPage, page_size: 10 }
        noticeSystem(this.$resultParams(params)).then(res => {
          if (res.code === 200) {
            console.log(res)
            this.loadLoading = false
            this.isRender = true
            if (this.currentPage.systemPage < res.data.page_total) {
              this.currentPage.systemPage = this.currentPage.systemPage + 1;
              this.systemNotice = this.systemNotice.concat(res.data.data);
              this.systemFinished = false
            } else if (this.currentPage.systemPage == res.data.page_total) {
              this.systemNotice = this.systemNotice.concat(res.data.data);
              this.systemFinished = true
            } else {
              this.systemNotice = [];
            }
          } else {
            this.loadLoading = false
            this.systemFinished = true
            this.$toast(res.msg)
          }
        }).catch(err => {
          this.loadLoading = false
          this.systemFinished = true
          console.log(err);
        });
      } else if (this.active === 2 && !this.commentFinished) {
        let params = { page: this.currentPage.commentPage, page_size: 10 }
        noticeComment(this.$resultParams(params)).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.loadLoading = false
            this.isRender = true
            if (this.currentPage.commentPage < res.data.page_total) {
              this.currentPage.commentPage = this.currentPage.commentPage + 1;
              this.commentNotice = this.commentNotice.concat(res.data.data);
              this.commentFinished = false
            } else if (this.currentPage.commentPage == res.data.page_total) {
              this.commentNotice = this.commentNotice.concat(res.data.data);
              this.commentFinished = true
            } else {
              this.commentNotice = [];
            }
          } else {
            this.loadLoading = false
            this.commentFinished = true
            this.$toast(res.msg)
          }
        }).catch(err => {
          this.loadLoading = false
          this.commentFinished = true
          console.log(err);
        });
      } else if (this.active === 3 && !this.prizeFinished) {
        let params = { page: this.currentPage.prizePage, page_size: 10 }
        noticePrize(this.$resultParams(params)).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.loadLoading = false
            this.isRender = true
            if (res.data.page_total > this.currentPage.prizePage) {
              this.currentPage.prizePage = this.currentPage.prizePage + 1;
              this.prizeNotice = this.prizeNotice.concat(res.data.data);
              this.prizeFinished = false
            } else if (res.data.page_total == this.currentPage.prizePage) {
              this.prizeNotice = this.prizeNotice.concat(res.data.data);
              this.prizeFinished = true
            } else {
              this.prizeNotice = []
            }
          } else {
            this.loadLoading = false
            this.prizeFinished = true
            this.$toast(res.msg)
          }
        }).catch(err => {
          this.loadLoading = false
          this.prizeFinished = true
          console.log(err);
        });
      }
    },
    // 处理评论点击 post_id 帖子ID, post_comment_id 评论ID, post_comment_pid 评论父级ID, data 路径标识
    handleCommentClick (post_id, post_comment_id, post_comment_pid, data) {
      let params = {
        post_id: post_id,
        post_comment_id: post_comment_id,
        post_comment_pid: post_comment_pid,
        data: data
      }
      var u = navigator.userAgent;
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        if (window.android && window.android.startDetailsPage) {
          window.android.startDetailsPage(params.post_id, parseInt(params.post_comment_id), parseInt(params.post_comment_pid), params.data)
        }
      } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        if (window.webkit) {
          //调用IOS的jumpjumpNext（）方法     
          console.log('ios')
          window.webkit.messageHandlers.startDetailsPage.postMessage(params);
        }
      }
    },
    // 处理点赞点击  post_id 帖子ID, post_comment_id 评论ID, data 路径标识
    handlePrizeClick (post_id, post_comment_id, data) {
      let params = {
        post_id: post_id,
        post_comment_id: post_comment_id,
        data: data
      }
      var u = navigator.userAgent;
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        if (window.android && window.android.startDetailsPage) {
          window.android.startDetailsPage(params.post_id, parseInt(params.post_comment_id), parseInt(0), params.data)
        }
      }
      if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        if (window.webkit) {
          //调用IOS的jumpjumpNext（）方法     
          window.webkit.messageHandlers.startDetailsPage.postMessage(params);
        }
      }
    },
    // 处理未读
    handleNoRead (data) {
      if (data && data.length > 0) {
        data.forEach(item => {
          item.is_read = 1
        });
      }
    }
  },
  mounted () {
    this.getNoticeTitleRead();
    this.getNotice()
  }
};
</script>
<style lang="less" scoped>
.notice {
  width: 100%;
  overflow: hidden;
  .layout {
    height: 90px;
    margin-bottom: 58px;
  }
  .head {
    color: #222;
    position: fixed;
    width: 100vw;
    height: 100px;
    top: 0;
    left: 0;
    font-weight: 600;
    text-align: center;
    line-height: 100px;
    font-size: 32px;
    background: #fff;
    z-index: 999;
  }
  .fixed {
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 100;
    width: 100%;
    .tab_switch {
      width: 100%;
      .tab_navigator {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .split {
          height: 60px;
          width: 1px;
          background: rgba(229, 229, 229, 1);
        }
        .tab_title {
          position: relative;
          flex: 1;
          height: 140px;
          text-align: center;
          padding-bottom: 20px;
          .title_no_reading {
            position: absolute;
            top: 3px;
            right: 50%;
            margin-right: -45px;
            width: 16px;
            height: 16px;
            background: rgba(247, 23, 80, 1);
            border-radius: 50%;
          }
          .tab_title_icon {
            flex: 1;
            width: 90px;
            height: 90px;
          }
          .tab_title_text {
            height: 40px;
            font-size: 28px;

            line-height: 40px;
            letter-spacing: 1px;
          }
          .tab_title_ident {
            margin: 6px auto 0;
            width: 50px;
            height: 6px;
            background: rgba(247, 23, 80, 1);
            border-radius: 2px;
          }
        }
        .active_title_text {
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(33, 33, 33, 1);
        }
        .no_active_title_text {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(89, 89, 89, 1);
        }
      }
    }
  }
  .tab_switch {
    width: 100%;
    .tab_navigator {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .tab_title {
        position: relative;
        flex: 1;
        height: 140px;
        text-align: center;
        .title_no_reading {
          position: absolute;
          top: 3px;
          right: 50%;
          margin-right: -45px;
          width: 16px;
          height: 16px;
          background: rgba(247, 23, 80, 1);
          border-radius: 50%;
        }
        .tab_title_icon {
          flex: 1;
          width: 90px;
          height: 90px;
        }
        .tab_title_text {
          height: 40px;
          font-size: 28px;

          line-height: 40px;
          letter-spacing: 1px;
        }
        .tab_title_ident {
          margin: 6px auto 0;
          width: 50px;
          height: 6px;
          background: rgba(247, 23, 80, 1);
          border-radius: 2px;
        }
      }
      .active_title_text {
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(33, 33, 33, 1);
      }
      .no_active_title_text {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(89, 89, 89, 1);
      }
    }
  }
  .centent_list {
    margin-top: 38px;
    height: calc(100vh - 306px);
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .rings_list {
      margin: 0px 29px 0px 24px;
    }
    .prize_list {
      margin: 46px 30px 0;
      .item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20px;
        .item_icon {
          margin: 4px 20px 0 0;
          width: 50px;
          height: 50px;
          border-radius: 25px;
        }
        .item_centent {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-bottom: 30px;
          border-bottom: rgba(229, 229, 229, 1) solid 1px;
          .item_center {
            position: relative;
            flex: 1;
            .item_center_text {
              // height: 40px;
              font-size: 28px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 40px;
              letter-spacing: 1px;
            }
            .item_time {
              margin-top: 7px;
              height: 30px;
              font-size: 22px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 30px;
              letter-spacing: 1px;
            }
          }
          .item_img {
            width: 80px;
            height: 80px;
          }
        }
      }
    }
    .no_notice {
      margin: 215px auto 500px;
      width: 100%;
      position: fixed;
      height: calc(100vh - 215px);
      text-align: center;
      .no_notice_img {
        width: 254px;
        height: 270px;
      }
      .text {
        margin-top: 20px;
        height: 40px;
        font-size: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 40px;
        letter-spacing: 1px;
      }
    }
    .list {
      min-height: calc(100vh - 306px);
    }
  }
}
</style>
<style lang="less">
.finished {
  padding-bottom: 20px;
  line-height: 60px;
  text-align: center;
  color: #bbb;
}
</style>
