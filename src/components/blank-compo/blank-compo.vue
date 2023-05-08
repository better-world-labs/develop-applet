<!--
 * @Author: 刘一笔
 * @Date: 2023-05-08 17:51:31
 * @Description: 
-->
<template>
  <div class="no-data" :style="{ 'padding-top': top + 'px' }">
    <img src="@/assets/no-data.png" alt="" />
    <p>暂无充值记录</p>
  </div>
</template>
<script setup>
const props = defineProps(['content']);
const top = ref();
onMounted(() => {
    top.value = (window.screen.height - 72) / 2 / 2;
})
</script>
<style scoped lang="scss">
.no-data {
  display: flex;
  flex-direction: column;

  img {
    width: 82px;
    height: 82px;
    margin: 78px auto 12px;
  }

  p {
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    color: #abacae;
    margin: 0;
    padding: 0;
  }
}
</style>