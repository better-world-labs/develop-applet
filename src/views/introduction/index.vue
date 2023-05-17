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
    <div class="introduction"></div>
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
    width: 680px;
    margin: 48px 52px;
  }
</style>
