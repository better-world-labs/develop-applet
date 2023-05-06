<!--
 * @Author: Sandy
 * @Date: 2023-04-26 14:51:48
 * @Description: 
-->
<template>
  <div class="home-header">
    <div class="back-btn"></div>
    <n-button class="highlight-btn" size="large" @click="createTemplate">
      <IconFont name="icon-icon-chuangjianwodexiaochengxu" />
      创建我的小程序
    </n-button>
    <user-integral></user-integral>
  </div>
  <div class="integral-wrap">
    <n-tabs type="line" bar-width="300">
      <n-tab-pane v-for="item in tabList" :name="item.name" :key="item.name">
        <component :is="item.compo"></component>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
<script setup>
import { useInit } from '@/hooks/useInit';
import { getIntegralDetails, getIntegral } from '@/api/user';
import { useUserStore } from '@/store/modules/user';
import $router from '@/router/index';
import balance from './components/balance.vue';
import detail from './components/detail.vue';
import dayjs from 'dayjs';
import { useBizDialog } from '@/plugins';
const dialog = useBizDialog();

const userStore = useUserStore();
const { goAuth } = useInit();
const total = ref(0);
const dataList = ref([]);
const tabList = ref([
  {
    name: '积分余额',
    compo: balance,
  },
  {
    name: '积分明细',
    compo: detail,
  },
  {
    name: '充值及提现记录',
    compo: detail,
  },
]); // tab列表

// 创建模版
function createTemplate() {
  if (!userStore.token) goAuth();
  $router.push({ name: 'builder' });
}
onMounted(() => {
  if (!userStore.token) goAuth();
  // 明细
  getIntegralDetails().then(({ data }) => {
    dataList.value = data.list;
  });
  // 积分总额
  getIntegral().then(({ data }) => {
    total.value = data.total;
  });
});
</script>
<style lang="scss">
.home-header {
  .back-btn {
    flex: 1;
  }
}

.integral-wrap {
  width: 660px;
  margin: 48px 52px;
}
</style>
