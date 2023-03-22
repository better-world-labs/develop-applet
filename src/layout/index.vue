<!--
 * @Author: Lemon
 * @Date: 2023-03-21 17:42:49
 * @Description: 
-->
<template>
  <div class="layout">
    <sidebar></sidebar>
    <div class="layout-content">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup> 
   import Sidebar from "./components/sidebar.vue";
</script>

<style scoped lang="scss">
  .layout {
    display: flex;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
  }
  .layout-content {
    background: var(--app-bg-color);
    flex: 1;
    transition: var(--theme-transition);
  }
</style>
