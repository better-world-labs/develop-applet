<!--
 * @Author: 刘一笔
 * @Date: 2023-05-02 21:58:42
 * @Description: 我收藏的
-->
<template>
  <div class="collect-program">
    <blank-compo v-if="applicationStore.collectAppList.length <= 0" content="暂无小程序哦~"></blank-compo>
    <n-grid :x-gap="12" v-else cols="1 860:2 1200:3 1666:4 2000:4">
      <n-grid-item v-for="item in applicationStore.collectAppList" :key="item.id">
        <card :item="item" @click="toDetail(item)"></card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup>
import { useApplicationStore } from '@/store/modules/application';
import { useUserStore } from '@/store/modules/user';
import { useInit } from '@/hooks/useInit';
import $router from '@/router/index';

const applicationStore = useApplicationStore();
const userStore = useUserStore();

// 去小程序详情
function toDetail(item) {
  // 注意，在详情页点返回，需返回到我的收藏

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

<style lang="scss" scoped>
// .collect-program {
//   position: absolute;
//   height: calc(100% - 72px);
//   overflow-x: hidden;
//   overflow-y: scroll;
// }
</style>