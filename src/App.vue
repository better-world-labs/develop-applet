<!--
 * @Author: Sandy
 * @Date: 2023-04-18 14:25:54
 * @Description: 
-->
<template>
  <AppProvider>
    <RouterView />
  </AppProvider>
</template>

<script setup>
import { AppProvider } from '@/components/app-provider';
import { getIntegral } from "@/api/user"
import { useUserStore } from "@/store/modules/user"
  import { sendLog } from '@/utils/sls-logger/sendLog';
const userStore = useUserStore();

onMounted(() => {
  getIntegral().then(({ data }) => {
    userStore.setTotal(data.total);
  })
})

// 组件错误
onErrorCaptured((err) => {
  console.error('onErrorCaptured', err);
  sendLog({
    action_type: 'Monitor_Error',
    data: {
      ...err,
      type: 'onErrorCaptured',
    },
  });
});
</script>

<style lang="scss">
body {
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    display: none;
  }
}
</style>
