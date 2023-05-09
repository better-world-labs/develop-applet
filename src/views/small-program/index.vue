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
      <n-tabs type="line" 
              @update:value="updateTab"
              :default-value="applicationStore.mineAppCurrentTab">
        <n-tab-pane v-for="item in tabList" :name="item.order" :tab="item.name"
                    :key="item.name">
          <component class="list-box" :is="item.compo"></component>
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>
<script setup>
  import { useUserStore } from '@/store/modules/user';
  import { useApplicationStore } from "@/store/modules/application"
  import { useInit } from '@/hooks/useInit';
  import create from './components/create.vue'
  import collect from './components/collect.vue'
  import $router from '@/router/index';

  const { goAuth } = useInit();
  const applicationStore = useApplicationStore();
  const userStore = useUserStore();
  const tabList = ref([
    {
      name: '我创建的',
      compo: create,
      order: 1
    },
    {
      name: '我收藏的',
      compo: collect,
      order: 2
    }
  ]); // tab列表

  // 更新当前选中的tab
  function updateTab(tab) {
    applicationStore.setMineAppCurrentTab(tab)
  }
  // 创建模版
  function createTemplate() {
    if (!userStore.token) goAuth();
    $router.push({ name: 'builder' });
  }

</script>
<style lang="scss" scoped>
  .my-smallmp {
    padding: 42px 52px;
    .list-box{ 
      width: calc(100% - 365px);
      position: absolute;
      height: calc(100% - 158px); 
      padding-right: 28px;  
      padding-bottom: 30px;  
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: scroll; 
    }
  } 
</style>
