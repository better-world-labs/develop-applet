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
      <div class="info">
        <img :src="userStore.info.avatar || '@/assets/default-user.jpg'" />
        <div>
          <div class="info-header">
            {{ userStore.info.nickname }}
            <span><IconFont name="icon-icon-xiugainicheng" :size="16" />修改昵称</span>
          </div>
          <p v-if="userStore.info?.id">ID：#{{ String(userStore.info?.id).slice(1) }}</p>
          <div class="logout-btn" @click="logOff">退出登录</div>
        </div>
      </div>
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
  import { postLogout } from '@/api/user';
  import { useUserStore } from '@/store/modules/user';
  import $router from '@/router/index';
  import balance from './components/balance.vue';
  import detail from './components/detail.vue';
  import dayjs from 'dayjs';
  import { sendLog } from '@/utils/sls-logger/sendLog';
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
  const { goAuth, logout } = useInit();

  const logOff = async () => {
    await postLogout();
    await logout();
    // 退出登录日志
    sendLog({
      action_type: 'Logout',
      data: {},
    });
  };
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
    width: 680px;
    margin: 48px 52px;
  }

  .info {
    width: 680px;
    height: 144px;
    background: #ffffff;
    border-radius: 8px;
    padding: 24px;
    display: flex;
    box-sizing: border-box;
    cursor: default;
    img {
      width: 96px;
      height: 96px;
      margin-right: 24px;
      border-radius: 50%;
    }
    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        margin: 0;
        padding: 0;
        font-size: 16px;
        line-height: 16px;
        color: #5b5d62;
      }
    }
    .info-header {
      font-weight: 500;
      font-size: 22px;
      line-height: 31px;
      color: #181d24;
      display: inline-flex;
      align-items: center;
      span {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #abacae;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        &:hover {
          color: #5b5d62;
        }
        i {
          margin-left: 8px;
          margin-right: 2px;
        }
      }
    }
    .logout-btn {
      height: 32px;
      line-height: 32px;
      box-sizing: border-box;
      width: 81px;
      text-align: center;
      border: 1px solid #e3e4e5;
      border-radius: 8px;
      font-size: 14px;
      color: #202226;
      cursor: pointer;
      &:hover {
        background: rgba(227, 228, 229, 0.5);
      }
    }
  }
</style>
