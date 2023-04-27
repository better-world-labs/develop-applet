<!--
 * @Author: Sandy
 * @Date: 2023-04-26 14:51:48
 * @Description: 
-->
<template>
  <div>
    <div class="home-header">
      <div class="back-btn"></div>
      <n-button class="highlight-btn" size="large" @click="createTemplate">
        <IconFont name="icon-icon-chuangjianwodexiaochengxu" />
        创建我的小程序
      </n-button>
      <user-integral></user-integral>
    </div>
    <div class="my-integral-content">
      <div>
        <div class="title">我的积分</div>
        <div class="title2">
          积分余额
          <n-button @click="activateShop()">立即充值</n-button>
          <n-button @click="activateRealization()">立即提现</n-button>
          <span class="active-text" style="padding-left: 4px">{{ total }}分</span>
        </div>
        <div class="title2" style="padding-top: 16px">积分明细：</div>
        <div class="item" v-for="item in dataList" :key="item.userId">
          <div class="item-one-line">
            <div>
              {{ item.description }}
            </div>
            <div v-if="item.points > 0" class="active-text">{{ item.points }}积分</div>
            <div v-else>{{ item.points }}积分</div>
          </div>
          <div class="small">
            {{ dayjs(item.createdAt).format('YYYY/MM/DD HH:mm:ss') }}
          </div>
        </div>
      </div>
    </div>
    <shop @selective="selective"></shop>
    <realization></realization>
  </div>
</template>
<script setup>
  import { useInit } from '@/hooks/useInit';
  import { getIntegralDetails, getIntegral } from '@/api/user';
  import { useUserStore } from '@/store/modules/user';
  import $router from '@/router/index';
  import dayjs from 'dayjs';
  import { useNative } from './components/native.ts';
  import shop from './components/shop/index.vue';
  import realization from './components/shop/realization.vue';
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
  const total = ref(0);
  const dataList = ref([]);

  // 创建模版
  function createTemplate() {
    if (!userStore.token) goAuth();
    $router.push({ name: 'builder' });
  }
  onMounted(() => {
    if (!userStore.token) goAuth();
    getIntegralDetails().then(({ data }) => {
      dataList.value = data.list;
    });
    getIntegral().then(({ data }) => {
      total.value = data.total;
    });
  });
</script>
<style scoped lang="scss">
  .home-header {
    .back-btn {
      flex: 1;
    }
  }

  .my-integral-content {
    padding: 42px 52px;
    background: #f3f3f7;
    position: absolute;
    height: calc(100% - 72px);
    width: calc(100% - 312px);
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: scroll;

    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #202226;

    > div:first-child {
      max-width: 660px;

      .title {
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        color: #181d24;
        padding-bottom: 16px;
        border-bottom: 1px solid rgba(171, 172, 174, 0.2);
      }

      .title2 {
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #202226;
        margin: 16px 0;
      }

      .item {
        border-bottom: 1px solid rgba(171, 172, 174, 0.2);
        padding-bottom: 8px;
        color: #202226;

        .item-one-line {
          display: flex;
          flex-direction: row;
          margin-bottom: 2px;
          padding-top: 8px;

          > div:first-child {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }

          > div:last-child {
            margin-left: auto;
            padding-left: 30px;
            white-space: nowrap;
            color: #5b5d62;
          }

          > div.active-text:last-child {
            color: rgba(86, 82, 255, 1);
          }
        }
      }

      .active-text {
        color: rgba(86, 82, 255, 1);
      }

      .small {
        font-weight: 400;
        font-size: 12px;
        line-height: 17px;

        color: #abacae;
      }
    }
  }
</style>
