<!--
 * @Author: Sandy
 * @Date: 2023-05-17 10:38:12
 * @Description: 
-->
<template>
  <div>
    <div class="home-header">
      <div class="back-btn"></div>
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

  onMounted(() => {
    if (!userStore.token) goAuth();
  });
</script>
<style lang="scss">
  .home-header {
    .back-btn {
      flex: 1;
    }
  }

  .introduction {
    width: 680px;
    margin: 48px 52px;
  }
</style>
