<!--
 * @Author: Lemon
 * @Date: 2023-03-22 15:13:40
 * @Description: 
-->
<template>
  <div>
    <div class="home-header">
      <div style="flex: 1"></div>
      <notice-box></notice-box>
      <n-button class="highlight-btn" size="large" @click="createTemplate">
        <IconFont name="icon-icon-chuangjianwodexiaochengxu" />
        创建我的小程序
      </n-button>
      <user-integral></user-integral>
    </div>
    <div class="my-smallmp">
      <n-tabs type="line">
        <n-tab-pane v-for="item in tabList" :name="item.name" :key="item.name">
          <component :is="item.compo"></component>
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>
<script setup>
  import { useUserStore } from '@/store/modules/user';
  import { useInit } from '@/hooks/useInit';
  import create from './components/create.vue'
  import collect from './components/collect.vue'
  import $router from '@/router/index';

  const { goAuth } = useInit();
  const userStore = useUserStore();
  const tabList = ref([
    {
      name: '我创建的',
      compo: create,
    },
    {
      name: '我收藏的',
      compo: collect,
    }
  ]); // tab列表

  // 创建模版
  function createTemplate() {
    if (!userStore.token) goAuth();
    $router.push({ name: 'builder' });
  }

</script>
<style lang="scss" scoped>
  .my-smallmp {
    padding: 42px 52px;
  }

</style>
