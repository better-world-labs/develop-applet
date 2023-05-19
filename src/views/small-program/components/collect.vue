<!--
 * @Author: 刘一笔
 * @Date: 2023-05-02 21:58:42
 * @Description: 我收藏的
-->
<template>
  <div class="collect-program">
    <blank-compo v-if="applicationStore.collectAppList.length === 0">
      <div>还未收藏哦，快去广场体验小程序吧！</div>
      <div>更多玩法等你来解锁～ <a href="/my-integral" class="link"> 点击了解>> </a></div>
    </blank-compo>
    <n-grid :x-gap="32" v-else cols="1 860:2 1200:3 1666:4 2000:4">
      <n-grid-item v-for="item in applicationStore.collectAppList" :key="item.id">
        <card :item="item" @useTemplate="toDetail(item)"></card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup>
import { useApplicationStore } from '@/store/modules/application';
import { useUserStore } from '@/store/modules/user';
import { useInit } from '@/hooks/useInit';
import blankCompo from './blankCompo.vue'
import $router from '@/router/index';

const applicationStore = useApplicationStore();
const userStore = useUserStore();

// 去小程序详情
function toDetail(item) {
  if (!userStore.token) goAuth();
  $router.push({ name: 'view-template-details', query: { uuid: item.uuid } });
}

function init() {
  applicationStore.getCollectAppList();
}

onMounted(() => {
  if (!userStore.token) goAuth();
  init();
});
</script>
 