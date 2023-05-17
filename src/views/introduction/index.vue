<!--
 * @Author: Sandy
 * @Date: 2023-05-17 10:38:12
 * @Description: 
-->
<template>
  <div>
    <div class="home-header">
      <div class="back-btn" @click="backPrePage">
        <IconFont name="icon-icon-fanhui" />
        返回
      </div>
      <notice-box></notice-box>
      <n-button class="highlight-btn" size="large" @click="createTemplate">
        <IconFont name="icon-icon-chuangjianwodexiaochengxu" />
        创建我的小程序
      </n-button>
      <user-integral></user-integral>
    </div>
    <div class="introduction">
      <div class="top-bar">
        <img :src="userStore.info.avatar || '@/assets/default-user.jpg'" />
        <div class="info-header">
          {{ userStore.info.nickname }}
          <p v-if="userStore.info?.id">ID：#{{ String(userStore.info?.id).slice(1) }}</p>
        </div>
      </div>
      <div class="bar-items">
        <div class="item" data-placeholder="1">
          <p>作品数</p>
          <span>56</span>
        </div>
        <div class="item" data-placeholder="2">
          <p>作品数</p>
          <span>56</span>
        </div>
        <div class="item">
          <p>作品数</p>
          <span>56</span>
        </div>
      </div>
      <div class="pro-list">
        <p>作品列表</p>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { useInit } from '@/hooks/useInit';
  import { useUserStore } from '@/store/modules/user';
  import $router from '@/router/index';
  import { sendLog } from '@/utils/sls-logger/sendLog';
  import { useBizDialog } from '@/plugins';
  const dialog = useBizDialog();

  const userStore = useUserStore();
  const { goAuth, logout } = useInit();

  // 返回上一页
  function backPrePage() {
    $router.go(-1);
  }
  // 创建模版
  function createTemplate() {
    if (!userStore.token) goAuth();
    $router.push({ name: 'builder' });
  }
  onMounted(() => {
    if (!userStore.token) goAuth();
  });
</script>
<style lang="scss">
  .home-header {
    .back-btn {
      flex: 1;
      font-weight: 400;
      font-size: 16px;
      line-height: 52px;
      color: #5b5d62;
      cursor: pointer;
      .iconfont {
        color: #5b5d62;
        font-size: 16px;
        margin-right: 4px;
      }
    }
  }

  .introduction {
    margin: 48px 52px;
    .top-bar {
      height: 144px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 8px;
      background-size: 100% 100%;
      background-image: url('https://moyu-chat.oss-cn-hangzhou.aliyuncs.com/develop-applet/images/img_introduction_bg.png');
      display: flex;
      padding: 24px;
      box-sizing: border-box;
      margin-bottom: 16px;
      img {
        width: 96px;
        height: 96px;
        margin-right: 24px;
        border-radius: 50%;
      }
      > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-weight: 500;
        font-size: 22px;
        line-height: 31px;
        color: #181d24;
        p {
          margin: 0;
          padding: 0;
          font-size: 16px;
          line-height: 16px;
          color: #5b5d62;
          margin-top: 6px;
        }
      }
    }
    .bar-items {
      display: flex;
      .item {
        display: flex;
        flex: 1;
        height: 91px;
        flex-direction: column;
        padding: 16px 0 0 24px;
        background: #ffffff;
        border-radius: 8px;
        box-sizing: border-box;
        // background: linear-gradient(180deg, rgba(255, 247, 228, 0.7) 0%, #ffffff 66.92%);
        position: relative;
        & + .item {
          margin-left: 16px;
        }
        &:after {
          content: '';
          position: absolute;
          right: 0;
          bottom: 0;
          width: 58px;
          height: 52px;
          opacity: 0.5;
          background-size: 100% 100%;
          background-image: url('@/assets/img_introduction_01.png');
        }
        p {
          font-size: 16px;
          line-height: 22px;
          color: #5b5d62;
          padding: 0;
          margin: 0;
          margin-bottom: 11px;
        }
        span {
          font-weight: 500;
          font-size: 24px;
          line-height: 34px;
          color: #181d24;
        }
      }
    }
  }
</style>
