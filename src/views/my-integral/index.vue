<!--
 * @Author: Sandy
 * @Date: 2023-04-26 14:51:48
 * @Description: 
-->
<template>
  <div>
    <div class="home-header">
      <div class="back-btn"></div>
      <notice-box></notice-box>
      <n-button class="highlight-btn" size="large" @click="createTemplate">
        <IconFont name="icon-icon-chuangjianwodexiaochengxu" />
        创建我的小程序
      </n-button>
      <user-integral></user-integral>
    </div>
    <div class="integral-wrap">
      <n-tabs type="line">
        <n-tab-pane v-for="item in tabList" :name="item.name" :key="item.name">
          <component :is="item.compo"></component>
        </n-tab-pane>
      </n-tabs>
    </div>
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
  import { useNative } from './components/native.ts';
  import shop from './components/shop/index.vue';
  import realization from './components/shop/realization.vue';
  import rechargeRecords from './components/recharge-records/index.vue';
  import { useBizDialog } from '@/plugins';
  import { putOrder } from '@/api/application';
  const dialog = useBizDialog();
  const { isShop, isRealization, activateShop, activateRealization } = useNative();
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

  const userStore = useUserStore();
  const { goAuth } = useInit();
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
      name: '充值记录',
      compo: rechargeRecords,
    },
  ]); // tab列表

  // 创建模版
  function createTemplate() {
    if (!userStore.token) goAuth();
    $router.push({ name: 'builder' });
  }
  onMounted(() => {
    if (!userStore.token) goAuth();
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
