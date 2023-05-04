<!--
 * @Author: 刘一笔
 * @Date: 2023-05-02 21:58:42
 * @Description: 我收藏的
-->
<template>
  <div>2</div>
</template>

<script setup>
  import { useApplicationStore } from '@/store/modules/application';
  import { useUserStore } from '@/store/modules/user';
  import { useInit } from '@/hooks/useInit';
  // import MpCard from '@/bizComponents/card'

  const applicationStore = useApplicationStore();
  const userStore = useUserStore();

  // 去小程序详情
  function toDetail() {
    // 注意，在详情页点返回，需返回到我的收藏

  }

  function init() {
    applicationStore.getCollectAppList();
  }

  onMounted(() => {
    if (!userStore.token) goAuth();
    init();
  });
</script>

<style lang="scss" scoped>
</style>