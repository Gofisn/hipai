<template>
  <div class='strategy'>
    <div class="strategy_bana">
    </div>
    <div class="main_cantainer">
      <div class="spike_left_icon"></div>
      <div class="item">
        <div class="item_title">
          <span class="item_title_icon"></span>
          <span class="item_title_text">玩法一</span>
          <span class="item_title_icon"></span>
        </div>
        <div class="item_outer_frame">
          <div class="item_inner_frame">
            <div class="item_main_title_box">
              <div class="item_main_title">参与话题创作获得“嗨豆”</div>
              <div class="item_main_desc">“嗨豆”是Hi拍APP中唯一的积分道具，只有通过每天参与话题创作才能获得“嗨豆”。如果忘记参与当天的话题创作，就需要重新开始喽～</div>
            </div>
            <div class="item_detail_box">
              <div class="item_detail_title_box">
                <div class="item_detail_title item_detail_title1">获得数目</div>
                <div class="item_detail_title item_detail_title2">获得时间</div>
              </div>
              <div class="box">
                <div class="item_detail_centent">
                  <div class="left">第 <span> 1 </span> 颗</div>
                  <div class="center"></div>
                  <div class="right">第 1 天</div>
                </div>
                <div class="item_detail_centent"
                     v-for="(item,index) of data"
                     :class="index%2===0?'bgcolor':''"
                     :key="index">
                  <div class="left">第 <span>{{item.count}}</span> 颗</div>
                  <div class="center"></div>
                  <div class="right">第 {{item.days}} 天</div>
                </div>
                <div class="item_detail_centent">
                  <div class="left left_rediu">…</div>
                  <div class="center"></div>
                  <div class="right">…</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item_title">
          <span class="item_title_icon"></span>
          <span class="item_title_text">玩法二</span>
          <span class="item_title_icon"></span>
        </div>
        <div class="item_outer_frame">
          <div class="item_inner_frame">
            <div class="item_main_title_box">
              <div class="item_main_title">参与平台的分红获得“嗨豆”</div>
              <div class="item_main_desc">平台会根据一周盈利拿出一定的比例组成分红池，每位用户根据自己的持有的“嗨豆”每周进行分红奖励，“嗨豆”越多奖励金币越多，金币可以提现哦～</div>
            </div>
            <div class="item_detail_box">
              <img src="../assets/img/strategy_money.png"
                   class="item_img1">
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item_title">
          <span class="item_title_icon"></span>
          <span class="item_title_text">玩法三</span>
          <span class="item_title_icon"></span>
        </div>
        <div class="item_outer_frame">
          <div class="item_inner_frame">
            <div class="item_main_title_box">
              <div class="item_main_title">邀请好友获得“嗨豆”</div>
              <div class="item_main_desc">如果感觉创作获得“嗨豆”的速度太慢了，试着邀请些好友吧，邀请的好友越多，好友的活跃度越高，获得的“嗨豆”也越多。 </div>
            </div>
            <div class="item_detail_box">
              <img src="../assets/img/strategy_share.png"
                   class="item_img2">
            </div>
          </div>
        </div>
      </div>
      <div class="water">
        <img src="../assets/img/water.png"
             class="icon_water">
      </div>
      <div class="tip"># 特别提醒 #
      </div>
      <img src="../assets/img/bottom_gold.png"
           class="bottom_gold">
      <div class="tip_desc">长时间不登录本平台，创作和邀请好友获得嗨豆会按照一定比例被平台回收。所以一定要经常参与话题创作，获得更多“嗨豆”哦～</div>

    </div>
    <div class="bottom_icon"></div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {

  },
  data () {
    return {
      data: [
        {
          count: 2,
          days: 5
        },
        {
          count: 3,
          days: 12
        },
        {
          count: 4,
          days: 21
        },
        {
          count: 5,
          days: 32
        },
        {
          count: 6,
          days: 45
        },
        {
          count: 7,
          days: 60
        },
        {
          count: 8,
          days: 77
        },
        {
          count: 9,
          days: 96
        },
        {
          count: 10,
          days: 117
        },
      ]
    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>
<style lang='less' scoped>
.strategy {
  width: 100%;
  background: rgba(3, 32, 26, 1);
  .strategy_bana {
    width: 100%;
    height: 620px;
    background: url(../assets/img/strategy_bg.png) no-repeat center;
    background-size: 100%;
  }
  .main_cantainer {
    position: relative;
    margin: 0 30px;
    margin-top: -75px;
    .spike_left_icon {
      position: absolute;
      left: -35px;
      top: -20px;
      width: 98px;
      height: 108px;
      background: url(../assets/img/spike.png) no-repeat center;
      background-size: 100%;
      z-index: 10;
    }
    .item {
      margin-bottom: 30px;
      text-align: center;
      .item_title {
        position: relative;
        margin: 0 auto;
        width: 381px;
        height: 86px;
        z-index: 10;
        line-height: 86px;
        background: url(../assets/img/strategy_title.png) no-repeat center;
        background-size: 100%;
        .item_title_icon {
          display: inline-block;
          width: 18px;
          height: 18px;
          background: rgba(144, 89, 65, 1);
          border-radius: 18px;
          margin-left: 10px;
          margin-bottom: 4px;
        }
        .item_title_text {
          font-size: 36px;
          font-family: PingFangSC-Medium;
          font-weight: 550;
          padding: 0 39px;
          color: rgba(123, 77, 43, 1);
        }
      }
      .item_outer_frame {
        margin-top: -64px;
        padding-top: 20px;
        background: linear-gradient(
          180deg,
          rgba(241, 225, 181, 1) 0%,
          rgba(207, 181, 132, 1) 100%
        );
        padding-bottom: 20px;
        border-radius: 15px;
        .item_inner_frame {
          margin: 0px auto;
          padding-bottom: 18px;
          width: 661px;
          border-radius: 15px;
          border: 1px solid rgba(142, 88, 64, 1);
          .item_main_title_box {
            padding: 56px 18px 19px;
            text-align: left;
            .item_main_title {
              height: 48px;
              font-size: 34px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              color: rgba(105, 68, 49, 1);
              line-height: 48px;
            }
            .item_main_desc {
              margin-top: 9px;
              font-size: 28px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(105, 69, 59, 1);
              line-height: 40px;
            }
          }
          .item_detail_box {
            margin: 0 31px;
            border-radius: 15px;
            overflow: hidden;
            .item_img1 {
              width: 480px;
              height: 253px;
              margin: 21px auto 20px;
            }
            .item_img2 {
              width: 460px;
              height: 279px;
              margin: 19px auto 20px;
            }
            .item_detail_title_box {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .item_detail_title {
                flex: 1;
                height: 60px;
                background: rgba(142, 88, 64, 1);
                font-size: 28px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(255, 255, 255, 0.9);
                line-height: 60px;
              }
              .item_detail_title1 {
                border-top-left-radius: 10px;
              }
              .item_detail_title2 {
                border-top-right-radius: 10px;
              }
            }
            .box {
              .item_detail_centent {
                height: 60px;
                background: rgba(255, 255, 251, 1);
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                  flex: 1;
                  border-left: 1px solid rgba(142, 88, 64, 0.5);
                  border-bottom: 1px solid rgba(142, 88, 64, 0.5);
                  font-size: 28px;
                  font-family: PingFangSC-Regular;
                  font-weight: 400;
                  color: rgba(105, 68, 49, 1);
                  line-height: 60px;
                  span {
                    color: rgba(139, 115, 73, 1);
                  }
                }
                .right {
                  flex: 1;
                  border-right: 1px solid rgba(142, 88, 64, 0.5);
                  border-bottom: 1px solid rgba(142, 88, 64, 0.5);
                  font-size: 28px;
                  font-family: PingFangSC-Regular;
                  font-weight: 400;
                  color: rgba(105, 68, 49, 1);
                  line-height: 60px;
                }
                .center {
                  width: 1px;
                  height: 60px;
                  background: rgba(142, 88, 64, 1);
                }
                &.bgcolor {
                  background: rgba(246, 233, 208, 1);
                }
              }
            }
          }
        }
      }
    }
    .water {
      margin-top: -31px;
      height: 74px;
      text-align: center;
      .icon_water {
        width: 52px;
        height: 74px;
      }
    }
    .tip {
      margin-top: 24px;
      height: 48px;
      text-align: center;
      font-size: 34px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(150, 99, 65, 1);
      line-height: 48px;
    }
    .bottom_gold {
      position: absolute;
      width: 101px;
      height: 115px;
      right: -30px;
      bottom: 196px;
    }
    .tip_desc {
      margin: 20px 45px 0 20px;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(150, 99, 65, 1);
      line-height: 40px;
      padding-bottom: 54px;
    }
  }
  .bottom_icon {
    width: 100%;
    height: 119px;
    background: url(../assets/img/bottom_icon.png) no-repeat center;
    background-size: 100%;
  }
}
</style>