<template>
  <div class="cash_record">
    <TopHeader title="金币明细"
               @leftClick="goBack" />
    <div class="layout"></div>
    <div class="container">
      <div class="record_list">
        <van-pull-refresh v-model="reLoading"
                          @refresh="getOutCashDetail">
          <van-list v-model="loadLoading"
                    :offset="10"
                    :finished="isFinshed"
                    :finished-text="finishedText"
                    @load="getLoadOutCashDetail"
                    class="list"
                    v-show="cashList.length||isFinshed">
            <div class="item"
                 v-for="(item,index) of cashList"
                 :key="index">
              <div class="item_cash">
                <div class="item_cash_text">{{item.type}}</div>
                <div class="item_cash_num">{{item.gold}}</div>
              </div>
              <div class="item_date">{{item.create_time}}</div>
            </div>
          </van-list>
          <div class="record_list"
               v-show="!cashList.length&&isFinshed">
            <div class="no_record">
              <img src="../../assets/img/beans_no.png"
                   class="no_record_icon">
              <div class="no_record_text">暂无内容哦~</div>
            </div>
          </div>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script>
import TopHeader from "@/components/TopHead";
import { outCashData, outCashDetail, outCashNumber } from 'utils/ajax'
import { List, PullRefresh } from "vant";
import Vue from "vue";
Vue.use(List).use(PullRefresh);
export default {
  name: "cash-record",
  components: {
    TopHeader
  },
  data () {
    return {
      // 当前页
      currentPage: 1,
      // 是否加载完成
      isFinshed: false,
      cashList: [],
      reLoading: false,
      loadLoading: false
    };
  },
  computed: {
    finishedText () {
      if (this.cashList.length < 11) {
        return "";
      } else {
        return "没有更多了";
      }
    }
  },
  methods: {
    goBack () {
      this.$router.replace("/cash-idx")
    },
    getOutCashDetail () {
      this.reLoading = true;
      this.currentPage = 1;
      this.cashList = []
      outCashDetail({ page: this.currentPage }).then(res => {
        this.reLoading = false;
        if (res.code === 200) {
          if (res.data.list.length < 20) {
            this.isFinshed = true;
          } else {
            this.currentPage = this.currentPage + 1
            this.isFinshed = false
          }
          this.cashList = this.cashList.concat(res.data.list)
        } else {
          this.$toast(res.msg)
        }
      }).catch(err => {
        this.reLoading = false;
      })
    },
    getLoadOutCashDetail () {
      if (!this.isFinshed) {
        this.loadLoading = true;
        outCashDetail({ page: this.currentPage }).then(res => {
          this.loadLoading = false;
          if (res.code === 200) {
            if (res.data.list.length < 20) {
              this.isFinshed = true;
            } else {
              this.currentPage += 1
              this.isFinshed = false
            }
            this.cashList = this.cashList.concat(res.data.list)
          } else {
            this.$toast(res.msg)
          }
        }).catch(err => {
          this.loadLoading = false;
        })

      }
    }
  },
  mounted () {
    this.getOutCashDetail()
  }
};
</script>
<style lang="less" scoped>
.cash_record {
  width: 100%;
  .layout {
    height: 90px;
  }
  .container {
    // overflow: auto;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    height: calc(100vh - 90px);
    .record_list {
      min-height: calc(100% + 1px);
      margin-left: 30px;
      .no_record {
        margin-top: 280px;
        text-align: center;
        .no_record_icon {
          width: 254px;
          height: 270px;
        }
        .no_record_text {
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
      .item {
        padding: 20px 0px;
        border-bottom: rgba(229, 229, 229, 1) solid 0.05px;
        .item_cash {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 28px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(33, 33, 33, 1);
          .item_cash_text {
            height: 40px;
            line-height: 40px;
            letter-spacing: 1px;
          }
          .item_cash_num {
            height: 40px;
            line-height: 40px;
            letter-spacing: 1px;
            margin-right: 30px;
          }
        }
        .item_date {
          height: 30px;
          font-size: 22px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 30px;
        }
      }
    }
  }
}
</style>
