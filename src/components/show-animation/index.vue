<template>
  <div ref="imageInstance" :class="{ 'rise-up-wrapper': true, 'item-rise-up': isImageShown }">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import useShowPic from '@/hooks/usePic';
  const { isImageShown, imageInstance } = useShowPic();
</script>

<style lang="scss" scoped>
  .rise-up-wrapper {
    opacity: 0;
  }
  .item-rise-up {
    -webkit-animation: rise-up 1.5s forwards;
    animation: rise-up 1.5s forwards;
  }
  @keyframes rise-up {
    0% {
      opacity: 0;
      -webkit-transform: translateY(100px);
      transform: translateY(100px);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }
</style>
