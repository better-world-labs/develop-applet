<template>
  <svg class="iconfont-svg" :style="props.iconStyle" aria-hidden="true">
    <use :xlink:href="`#${name || ''}`" />
  </svg>
</template>
<script setup lang="ts">
  import '@/assets/iconfonts/iconfont.js';
  const props = defineProps({
    iconStyle: Object,
    name: String,
  });
</script>
