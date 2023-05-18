<!--
 * @Author: Lemon
 * @Date: 2023-03-22 15:36:11
 * @Description: 
-->
<template>
  <div>
    <home-header></home-header>
    <div class="home-content">
      <app-list :appList="applicationStore.appList"></app-list>
    </div>
  </div>
</template>
<script setup>
  import HomeHeader from './components/home-header.vue';
  import { useApplicationStore } from '@/store/modules/application';
  const applicationStore = useApplicationStore();
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
