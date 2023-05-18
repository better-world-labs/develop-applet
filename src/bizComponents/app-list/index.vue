<!--
 * @Author: Lemon
 * @Date: 2023-03-22 15:50:05
 * @Description: 
-->
<template>
  <default-composition v-if="appList.length <= 0" content="暂无小程序哦~"></default-composition>
  <n-grid :x-gap="12" cols="1 860:2 1200:3 1666:4 2000:4">
    <n-grid-item v-for="item in appList" :key="item.id">
      <card :item="item" @useTemplate="useTemplate"></card>
    </n-grid-item>
  </n-grid>
</template>
<script setup>
  import $router from '@/router/index';
  import { useInit } from '@/hooks/useInit';
  import { useUserStore } from '@/store/modules/user';
  const props = defineProps(['appList']);
  const userStore = useUserStore();
  const { goAuth } = useInit();
  // 使用模版
  function useTemplate(item) {
    if (!userStore.token) goAuth();
    $router.push({ name: 'view-template-details', query: { uuid: item.uuid } });
  }
</script>
<style lang="scss" scoped></style>
