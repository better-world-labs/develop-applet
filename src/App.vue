<template>
  <AppProvider>
    <RouterView />
  </AppProvider>
</template>

<script setup>
import { AppProvider } from '@/components/app-provider';
import { getIntegral } from "@/api/user"
import { useUserStore } from "@/store/modules/user"
const userStore = useUserStore();

onMounted(() => {
  getIntegral().then(({ data }) => {
    userStore.setTotal(data.total);
  })
})
</script>

<style lang="scss">
body {
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    display: none;
  }
}
</style>
