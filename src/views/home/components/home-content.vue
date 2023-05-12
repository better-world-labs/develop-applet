<!--
 * @Author: Lemon
 * @Date: 2023-03-22 15:50:05
 * @Description: 
-->
<template>
  <div class="home-content">
    <default-composition v-if="applicationStore.appList.length <= 0" content="暂无小程序哦~"></default-composition>
    <n-grid :x-gap="12" cols="1 860:2 1200:3 1666:4 2000:4">
      <n-grid-item v-for="item in applicationStore.appList" :key="item.id">
        <card :item="item" @useTemplate="useTemplate"></card>
      </n-grid-item>
    </n-grid>
  </div>
</template>
<script setup>
import $router from '@/router/index';
import { useInit } from '@/hooks/useInit';
import { useUserStore } from '@/store/modules/user';
import { useApplicationStore } from '@/store/modules/application';
const applicationStore = useApplicationStore();
const userStore = useUserStore();
const { goAuth } = useInit();
// 使用模版
function useTemplate(item) {
  if (!userStore.token) goAuth();
  $router.push({ name: 'view-template-details', query: { uuid: item.uuid } });
} 
</script>
<style lang="scss" scoped>
.home-content {
  padding: 48px 32px 48px 52px;
  background: linear-gradient(180deg, #f3f3f6 0%, #edeffc 100%);
  position: absolute;
  height: calc(100% - 72px);
  width: calc(100% - 312px);
  overflow-x: hidden;
  box-sizing: border-box;
  overflow-y: scroll;

  :deep(.n-grid) {
    @media screen and (max-width: 896px) {
      min-width: 480px;
    }
  }
}
</style>
