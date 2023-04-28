<!--
 * @Author: Sandy
 * @Date: 2023-04-26 10:27:37
 * @Description: 确认提现
-->
<template>
  <!-- <n-modal v-model:show="showModal" preset="dialog" title="Dialog" :showIcon="false">
    <template #header>
      <div>请选择适合你的方案</div>
    </template>
    <div>内容</div>
    <template #action>
      <div>操作</div>
    </template>
  </n-modal> -->
  <n-modal v-model:show="isRealization">
    <div class="shop-box">
      <div class="title">确认提现</div>
      <div class="close" @click="activateRealization(false)">
        <IconFont name="icon-icon-guanbi-xiao" />
      </div>
      <div class="list">
        <p>累计<span>1000积分</span>即可提现，添加企业微信发起提现</p>
        <div class="code-box">
          <img :src="state.qrCode" alt="" srcset="" />
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script lang="ts" setup>
  import { defineComponent, ref } from 'vue';
  import { getSystemConfig } from '@/api/application';
  import { useNative } from '../native';
  const customerCode =
    'https://moyu-chat.oss-cn-hangzhou.aliyuncs.com/static-web/images/main-logo2.png';
  const { isRealization, activateRealization } = useNative();
  const state = reactive({
    codeKey: 'MINI_APP_WITHDRAW_QRCODE',
    qrCode: '',
  });
  onMounted(async () => {
    const feedBackData = await getSystemConfig({ key: state.codeKey });
    state.qrCode = String(feedBackData.data.value);
  });
</script>

<style lang="scss" scoped>
  .shop-box {
    background-color: #ffffff;
    border-radius: 12px;
    width: 408px;
    height: 316px;
    overflow: hidden;
    box-sizing: border-box; // needed to fix an issue with the modal not centering itself on the page. 描述：https://codege
    padding: 24px; // 56px;
    position: relative;
    .title {
      font-weight: 500;
      font-size: 20px;
      line-height: 20px;
      text-align: center;
      color: #181d24;
    }
    .close {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 22px;
      right: 16px;
      opacity: 0.7;
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      i {
        line-height: 24px;
        font-size: 24px;
        color: #5b5d62;
      }
      &:hover {
        opacity: 1;
      }
    }
    .list {
      display: flex;
      flex-direction: column;
      p {
        margin: 24px 0;
        padding: 0;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #5b5d62;
        span {
          font-weight: 500;
          color: #202226;
        }
      }
      .code-box {
        // border-radius: 7px;
        overflow: hidden;
        width: 178px;
        height: 178px;
        align-self: center;
        img {
          width: 178px;
          height: 178px;
          background: #f2f2f8;
          margin: 0 auto;
        }
      }
    }
    .actions {
      display: flex;
      justify-content: center;
      .btn-sub {
        background: #5652ff;
        border-radius: 8px;
        width: 228px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-weight: 500;
        font-size: 16px;
        color: #ffffff;
        cursor: pointer;
        &:hover {
          background: #716efe;
        }
      }
    }
  }
</style>
