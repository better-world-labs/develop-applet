<!--
 * @Author: 刘一笔
 * @Date: 2023-04-25 22:56:06
 * @Description: 积分余额
-->
<template>
  <div class="integral-balance">
    <div class="total">{{ total }}</div>
    <div class="btn-wrap">
      <n-button type="info" @click="activateShop">立即充值</n-button>
      <n-button @click="activateRealization">立即提现</n-button>
    </div>
  </div>
  <div class="integral-get">积分获取攻略</div>
  <div>
    文案文案
  </div>
  <shop @selective="selective"></shop>
  <realization></realization>
</template>

<script setup>
import { getIntegral } from '@/api/user';
import shop from './components/shop/index.vue';
import realization from './components/shop/realization.vue';

import { useUserStore } from '@/store/modules/user';
const { isShop, isRealization, activateShop, activateRealization } = useNative();

const total = ref(0);
const userStore = useUserStore();

//选购
const selective = async (data) => {
  activateShop(false);
  const orderData = await putOrder(data.id);
  dialog.open(
    'buy-wx',
    {
      class: 'buy-wx-dialog',
      title: '',
    },
    orderData.data
  );
};
onMounted(() => {
  if (!userStore.token) goAuth();
  // 积分总额
  getIntegral().then(({ data }) => {
    total.value = data.total;
  });
});
</script>

<style lang="scss">
.integral-balance {
  background-color: #FFF;
  border-radius: 8px;
  padding: 24px;

  .total {
    font-weight: 500;
    font-size: 32px;
    color: #5652FF;
  }

  .btn-wrap {
    margin-top: 24px;
  }

  .integral-get {
    margin-top: 40px;
    color: #181d24;
    font-size: 16px;
  }
}
</style>