<!--
 * @Author: Sandy
 * @Date: 2023-04-26 17:42:47
 * @Description: 微信支付
-->

<template>
  <div class="dialog-content">
    <div class="title">微信支付</div>
    <div class="content">
      <div class="code-box">
        <vue-qr
          v-if="codeUrl"
          :text="codeUrl"
          :correct-level="3"
          :size="240"
          :margin="10"
          color-dark="#000"
          color-light="white"
          background-color="white"
          background-dimming="white"
          :logo-src="codeLogo"
          :logo-scale="0.2"
          :logo-margin="5"
          logo-background-color="white"
          :callback="loadingQr"
        />
      </div>
      <p>请使用微信扫一扫，进行支付</p>
    </div>
  </div>
</template>

<script setup>
  import vueQr from 'vue-qr/src/packages/vue-qr.vue';
  import { getOrderStateById } from '@/api/application';
  import { useMessage } from 'naive-ui';
  const customerCode =
    'https://moyu-chat.oss-cn-hangzhou.aliyuncs.com/static-web/images/main-logo2.png';

  let timer = null;
  let isFirst = true;
  const message = useMessage();
  onMounted(async () => {
    await nextTick();
    timer = setInterval(async () => {
      const data = await getOrderStateById(props.orderId);
      //"state": 0  // 0. 未支付 1. 已支付  2.已关闭
      if (data.data.state === 1) {
        isFirst && message.success('支付成功!');
        onClose();
      } else if (data.data.state === 2) {
        isFirst && message.warning('订单已关闭, 请重新下单');
        onClose();
      }
    }, 1000);
  });

  const onClose = async () => {
    isFirst = false;
    setTimeout(() => {
      emit('close');
    }, 1200);
  };

  onUnmounted(() => {
    clearInterval(timer);
  });

  const emit = defineEmits(['close']);
  const props = defineProps({
    goods: Object,
    price: Number,
    codeUrl: String,
    orderId: String,
  });

  function onCancel() {
    emit('close');
  }
</script>

<style lang="scss">
  .buy-wx-dialog {
    height: 376px;
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
    font-size: 24px;
    line-height: 34px;
    color: #181d24;
    text-align: center;
    margin-top: 32px;
  }
  .dialog-content {
    width: 384px;
    .content {
      text-align: center;
      margin: 16px auto 32px;
      display: flex;
      flex-direction: column;

      p {
        margin: 16px 0 0;
        padding: 0;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #5b5d62;
      }
      .code-box {
        overflow: hidden;
        width: 224px;
        height: 224px;
        align-self: center;
        img {
          width: 224px;
          height: 224px;
          // background: #d9d9d9;
          margin: 0 auto;
        }
      }
    }
  }
</style>
