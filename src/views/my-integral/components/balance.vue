<!--
 * @Author: 刘一笔
 * @Date: 2023-04-25 22:56:06
 * @Description: 积分余额
-->
<template>
  <div class="integral-balance">
    <div class="total">{{ total }}</div>
    <div class="btn-wrap">
      <div class="highlight-btn" @click="activateShop">立即充值</div>
      <div class="withdraw-btn" @click="activateRealization">
        立即提现<span class="tips" v-if="withdrawAmount > 0">可提2元</span>
      </div>
    </div>
  </div>
  <div class="integral-get">积分获取攻略</div>
  <div class="strategy">
    <div class="title">方式1：空投奖励</div>
    <div class="content">
      🎉欢迎来到社区！首次加入时，我们会赠送你 30 积分哦，尽情使用并创作属于你自己的小程序吧！🎁
    </div>
    <div class="title">方式2：签到奖励</div>
    <div class="content">
      🌟我们期待你每天来社区体验和创作小程序！在个人中心，你可以签到获取积分，记得每天来哦！💫
    </div>
    <div class="title">方式3：小程序创作</div>
    <div class="content">
      🚀社区鼓励你的创意和分享！当你创建的小程序被他人使用或同款使用时，你都会获得分成奖励！💰
    </div>
    <div class="title">方式4：积分充值</div>
    <div class="content">
      💡为了让社区更稳定地运转，我们提供了积分充值方式。用较低的价格，你就可以获得大量积分！这些资金将用于维护
      API 接口的稳定和可持续性，为大家提供更优质的服务！🌈
    </div>
  </div>
  <shop @selective="selective"></shop>
  <realization></realization>
</template>

<script setup>
  import { getIntegral } from '@/api/user';
  import shop from './shop/index.vue';
  import realization from './shop/realization.vue';
  import { useRoute } from 'vue-router';
  import { useNative } from './native.ts';
  import { putOrder } from '@/api/application';
  import { useUserStore } from '@/store/modules/user';
  import { useBizDialog } from '@/plugins';
  const dialog = useBizDialog();
  const { isShop, isRealization, activateShop, activateRealization } = useNative();

  const total = ref(0);
  const withdrawAmount = ref(0);
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
    withdrawAmount.value = totalData.data.withdrawAmount;
    userStore.setTotal(totalData.data.total);
  };
</script>

<style lang="scss">
  .integral-balance {
    background-color: #fff;
    border-radius: 8px;
    padding: 24px;
    background: url('../../../assets/bg.png'), url('../../../assets/star.png'), #fff;
    background-repeat: no-repeat, no-repeat, no-repeat;
    background-position: top left, bottom right, center;

    .total {
      font-weight: 500;
      font-size: 32px;
      color: #5652ff;
    }

    .btn-wrap {
      margin-top: 24px;
      display: flex;

      .withdraw-btn {
        box-sizing: border-box;
        background: #eeedfe;
        border: 1px solid #5652ff;
        border-radius: 8px;
        width: 112px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-weight: 500;
        font-size: 14px;
        color: #5652ff;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        margin-left: 24px;
        &:hover {
          background: #d6d3ff;
        }
        span.tips {
          position: absolute;
          top: -16px;
          right: -46px;
          font-weight: 500;
          font-size: 13px;
          line-height: 26px;
          color: #887242;
          text-align: center;
          padding: 0 10px;
          height: 26px;
          border-top-left-radius: 8px;
          border-bottom-right-radius: 8px;
          border-top-right-radius: 8px;
          border: 1px solid #fff4e4;
          // border-image: linear-gradient(45deg, #fff4e4 100%, #fff2d0 100%); /* Added */
          background: linear-gradient(177.63deg, #f9e5b9 1.99%, #efd08b 120.2%);
        }
      }
      .highlight-btn {
        background: #5652ff;
        border-radius: 8px;
        width: 112px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-weight: 500;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;
        &:hover {
          background: #716efe;
        }
      }
    }
  }

  .integral-get {
    margin-top: 40px;
    color: #181d24;
    font-size: 16px;
    margin-top: 40px;
  }

  .strategy {
    border-radius: 12px;
    padding: 20px;
    background: linear-gradient(180deg, rgba(211, 210, 252, 0.7) 0%, rgba(255, 255, 255, 1) 45.04%);

    .title {
      color: #202226;
    }

    .content {
      color: #5b5d62;
    }
  }
</style>
