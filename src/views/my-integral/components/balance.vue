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
  <div>文案文案</div>
  <shop @selective="selective"></shop>
  <realization></realization>
</template>

<script setup>
  import { getIntegral } from '@/api/user';
  import shop from './shop/index.vue';
  import { useRoute } from 'vue-router';
  import realization from './shop/realization.vue';
  import { useNative } from './native.ts';
  import { putOrder } from '@/api/application';
  import { useUserStore } from '@/store/modules/user';
  import { useBizDialog } from '@/plugins';
  const dialog = useBizDialog();
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
        onAfterLeave: () => {
          getTotal();
        },
      },
      orderData.data
    );
  };
  onMounted(() => {
    if (!userStore.token) goAuth();
    // 积分总额
    getTotal();
    const route = useRoute();
    const isBuy = route.query.type == 'buy';
    if (isBuy) activateShop();
  });
  const getTotal = async () => {
    // 积分总额
    const totalData = await getIntegral();
    total.value = totalData.data.total;
  };
</script>

<style lang="scss">
  .integral-balance {
    background-color: #fff;
    border-radius: 8px;
    padding: 24px;

    .total {
      font-weight: 500;
      font-size: 32px;
      color: #5652ff;
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
