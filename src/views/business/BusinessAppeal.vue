<template>
  <div class="BusinessAppeal">
    <top-head title="交易申诉" rightMsg="提交" @leftClick="goBack" @rightClick="goSubmit"></top-head>
    <div class="item_title">申诉原因</div>
    <div class="reason_box">
      <van-dropdown-menu>
        <van-dropdown-item v-model="reason" :options="reasons"/>
      </van-dropdown-menu>
    </div>
    <div class="item_title">描述</div>
    <div class="detail_box">
      <textarea
        id="detail"
        placeholder="请输入您的描述"
        v-model.trim="detailReason"
      ></textarea>
      <div class="num">{{wordNum}}/{{maxNum}}字</div>
    </div>
    <div class="item_title">上传凭证</div>
    <div class="img_list">
      <div class="img_box" v-for="(item,index) in imgList" :key="index">
        <img :src="item" alt="tp" @click="showImg(item)">
        <span class="img_close" @click="deleteImg(index)"></span>
      </div>
      <div class="img_box" v-show="fileList.length<3" @click="getImages">
        <img src="../../assets/img/upload_img.png" alt>
        <input v-show="isWeb" type="file" id="upload" accept="image/*" @change="uploadIMG">
      </div>
    </div>
    <div class="big_img_box" v-show="bigImgShow">
      <img :src="bigImg" alt>
      <van-icon name="cross" class="close_big" @click="big_close"/>
    </div>
  </div>
</template>
<script>
import TopHead from "@/components/TopHead";
import { businessAppeal } from "utils/ajax";
import { DropdownMenu, DropdownItem, Dialog, Icon, Toast } from "vant";
// import { getSystemInfoFromApp } from "@/assets/js/utils.js";

import Vue from "vue";
Vue.use(DropdownMenu)
  .use(DropdownItem)
  .use(Icon);
export default {
  name: "BusinessAppeal",
  data() {
    return {
      isWeb: true,
      reason: 1,
      detailReason: "",
      maxNum: 500,
      fileList: [],
      bigImgShow: false,
      bigImg: "",
      reasons: [
        { text: "已付款，嗨豆没到", value: 1 },
        { text: "没收到付款", value: 2 },
        { text: "其他", value: 3 }
      ]
    };
  },
  computed: {
    wordNum() {
      if (this.detailReason.length > this.maxNum) {
        this.detailReason = this.detailReason.substring(0, this.maxNum);
      }
      return this.detailReason.length;
    },
    imgList() {
      return this.fileList.map(item => {
        return this.getObjectURL(item);
      });
    }
  },
  created() {
    this.checkUserAgent();
    window.appImg = this.appImg;
    this.scrollTop = document.body.scrollTop;
  },
  components: {
    TopHead
  },

  methods: {
    goBack() {
      const route = this.$store.state.business.appearBack;
      if (route === "GoBuy") {
        this.$router.replace("/givebeans");
      } else if (route === "BusinessList") {
        this.$router.replace({ name: route });
      }
    },
    checkUserAgent() {
      if (window.webkit || window.android) {
        this.isWeb = false;
      }
    },

    goSubmit() {
      if (!this.$route.query.id) {
        Toast("数据丢失，请重新进入该页面");
        return;
      } else if (!this.reason) {
        Toast("请选择您的申诉需求");
        return;
      } else if (!this.detailReason) {
        Toast("请输入您的描述");
        return;
      } else if (!this.fileList.length) {
        Toast("请上传凭证");
        return;
      }

      let params = {
        trans_order_id: this.$route.query.id,
        reason_type: this.reason,
        desc: this.detailReason
      };
      params = this.$resultParams(params);
      params.files = this.fileList;
      let formData = new FormData();
      formData.append("trans_order_id", this.$route.query.id);
      formData.append("reason_type", this.reason);
      formData.append("desc", this.detailReason);
      formData.append("sign", params.sign);
      for (let i = 0; i < this.fileList.length; i++) {
        formData.append("files[" + i + "]", this.fileList[i]);
      }
      businessAppeal(formData)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            Dialog.alert({
              title: "提交成功",
              message: "您的申诉已收到，客服会尽快回复您的消息。",
              confirmButtonText: "好的"
            }).then(() => {
              this.goBack();
            });
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          Toast(res.msg);
        });
    },
    changeImg(e) {
      let fil = e.target.files || e.dataTransfer.files;
      for (let i = 0; i < fil.length; i++) {
        this.fileList.push(fil[i]);
      }
      e.target.value = "";
    },
    deleteImg(index) {
      console.log(index);
      this.fileList.splice(index, 1);
    },
    showImg(img) {
      this.bigImgShow = true;
      this.bigImg = img;
    },
    big_close() {
      this.bigImgShow = false;
    },
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    uploadIMG(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];

      if (file.size < 1024 * 1024) {
        this.fileList.push(file);
      } else if (file.size < 10 * 1024 * 1024) {
        this.imgPreview(file);
      }
      e.target.value = "";
    },
    //获取图片
    imgPreview(file, callback) {
      let self = this;
      //判断支不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        //创建一个reader
        let reader = new FileReader();

        //将图片转成base64格式
        reader.readAsDataURL(file);
        //读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          img.onload = function() {
            let data = self.compress(img);
            let blob = self.dataURItoBlob(data);
            self.fileList.push(blob);
          };
        };
      }
    },
    // 压缩图片
    compress(img) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);

      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.1);

      return ndata;
    },
    // base64转成bolb对象
    dataURItoBlob(base64Data) {
      var byteString;
      if (base64Data.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(base64Data.split(",")[1]);
      else byteString = unescape(base64Data.split(",")[1]);
      var mimeString = base64Data
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    },
    //删除事件
    delImg() {
      this.imgUrl = null;
    },
    appImg(img) {
      console.log("appImg");
      let blob = this.dataURItoBlob(img);
      this.fileList.push(blob);
    },
    getImages() {
      this.$getSystemInfoFromApp("appealUpload");
    }
  }
};
</script>

<style lang="less"   src="../../assets/css/style.less">
</style>

