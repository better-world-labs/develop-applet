<!--
 * @Author: 刘一笔
 * @Date: 2023-04-25 22:56:06
 * @Description: 积分余额
-->
<template>
  <div class="integral-balance">
    <div class="total">{{total}}</div>
    <div class="btn-wrap">
        <n-button type="info">立即充值</n-button>
        <n-button>立即提现</n-button>
    </div>
  </div>
  <div class="integral-get">积分获取攻略</div>
  <div>
    文案文案
  </div>
</template>

<script setup>
  import { getIntegral } from '@/api/user';

  import { useUserStore } from '@/store/modules/user';
  const total = ref(0);
  const userStore = useUserStore();

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