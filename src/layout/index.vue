<template>
  <div class="layout">
    <div class="layout-content">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup> 
   
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
