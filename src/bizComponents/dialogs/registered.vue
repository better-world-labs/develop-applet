<!--
 * @Author: Sandy
 * @Date: 2023-04-26 15:53:21
 * @Description: 注册成功 [分享链接/自然流量]
-->

<template>
  <div id="registeredDialog"></div>
  <div class="dialog-content">
    <div class="title">恭喜🎉</div>
    <div class="content">
      <p>新朋友，欢迎你！</p>
      <p v-if="user.nickname">你被好友{{ user.nickname }}成功邀请，</p>
      <p>
        送你<span>{{ price }}</span
        >积分大礼包 😊
      </p>
    </div>
  </div>
</template>

<script setup>
  import SVGA from 'svgaplayerweb';

  const svga_url =
    'https://moyu-chat.oss-cn-hangzhou.aliyuncs.com/develop-applet/registered-dialog.svga';

  onMounted(() => {
    nextTick(() => {
      const player = new SVGA.Player('#registeredDialog');
      let parser = new SVGA.Parser('#registeredDialog');
      parser.load(svga_url, function (videoItem) {
        player.setVideoItem(videoItem);
        player.startAnimation();
      });
    });
  });

  const emit = defineEmits(['close']);
  const props = defineProps({
    user: Object,
    price: Number,
  });

  function onCancel() {
    emit('close');
  }
</script>

<style lang="scss">
  .registered-dialog {
    height: 242px;
    padding: 0 !important;
    background: linear-gradient(
      180deg,
      rgba(211, 210, 252, 0.7) 0%,
      rgba(255, 255, 255, 0) 45.04%
    ) !important;
    background-color: #ffffff !important;
    border-radius: 12px !important;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    .n-base-close.n-dialog__close {
      width: 24px;
      height: 24px;
      margin-top: 22px;
      margin-right: 16px;
      z-index: 9;
    }
    .n-dialog__content.n-dialog__content--last {
      margin-top: 0;
    }
  }
</style>
<style lang="scss" scoped>
  .title {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #181d24;
    text-align: center;
  }
  #registeredDialog {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  .dialog-content {
    position: relative;
    z-index: 8;
    padding: 24px;
    width: 402px;

    font-weight: 400;
    font-size: 16px;
    line-height: 22px;

    color: #5b5d62;

    .content {
      text-align: center;
      margin: 47px auto 36px;
      p {
        margin: 0;
        padding: 0;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: #5b5d62;
        // &:first-child {
        margin-bottom: 8px;
        // }
        span {
          color: #5d57f6;
          font-weight: 500;
          font-size: 20px;
          margin: 0 6px;
        }
      }
    }
  }

  .actions {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    .btn-add {
      background: #eeedfe;
      border: 1px solid #5652ff;
      border-radius: 8px;
      width: 126px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      color: #5652ff;
      cursor: pointer;
      position: relative;
      &:hover {
        background: #d6d3ff;
      }
      span {
        position: absolute;
        top: -16px;
        right: -54px;
        font-weight: 500;
        font-size: 13px;
        line-height: 26px;
        color: #887242;
        text-align: center;
        width: 75px;
        height: 26px;
        border-top-left-radius: 8px;
        border-bottom-right-radius: 8px;
        border-top-right-radius: 8px;
        border: 1px solid #fff4e4;
        // border-image: linear-gradient(45deg, #fff4e4 100%, #fff2d0 100%); /* Added */
        background: linear-gradient(177.63deg, #f9e5b9 1.99%, #efd08b 120.2%);
      }
    }
    .btn-sub {
      margin-left: 80px;
      background: #5652ff;
      border-radius: 8px;
      width: 126px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
      &:hover {
        background: #716efe;
      }
    }
  }

  // .iconfont {
  //   float: right;
  //   font-size: 24px;
  //   color: #bebfc0;
  //   margin-top: -40px;
  //   cursor: pointer;
  //   &:hover {
  //     color: #5b5d62;
  //   }
  // }
</style>
