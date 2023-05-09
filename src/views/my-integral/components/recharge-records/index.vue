<!--
 * @Author: Sandy
 * @Date: 2023-05-05 15:44:45
 * @Description: rechargeRecords
-->
<template>
  <div class="integral-detail-box">
    <div class="integral-detail-inner">
      <div class="no-data" v-if="!state.loading && state.dataList.length == 0">
        <img src="@/assets/no-data.png" alt="" />
        <p>暂无充值记录</p>
      </div>
      <div class="item" v-else v-for="item in state.dataList" :key="item.orderId">
        <div class="item-one-line">
          <div>
            {{ item.goods.description }}
          </div>
          <div class="active-text">{{ item.goods.price }}元</div>
          <!-- <div v-if="item.points > 0" class="active-text">{{ item.goods.points }}积分</div>
          <div v-else>{{ item.goods.points }}积分</div> -->
        </div>
        <div class="small">
          {{ dayjs(item.createdAt).format('YYYY/MM/DD HH:mm:ss') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useUserStore } from '@/store/modules/user';
  import { getIntegralOrders } from '@/api/user';
  const userStore = useUserStore();
  import dayjs from 'dayjs';
  const state = reactive({
    dataList: [],
    loading: false,
  });

  onMounted(() => {
    if (!userStore.token) goAuth();
    // 明细
    state.loading = true;
    getIntegralOrders()
      .then(({ data }) => {
        state.dataList = data.list;
        // state.dataList = [];
      })
      .finally(() => {
        state.loading = false;
      });
  });
</script>

<style lang="scss">
  .integral-detail-box {
    position: absolute;
    height: calc(100% - 72px - 96px - 48px);
    width: calc(100% - 312px - 104px);
    max-width: 680px;
    background-color: #fff;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: scroll;
    border-radius: 8px;
    .integral-detail-inner {
      border-radius: 8px;
      padding: 12px 20px;

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

      .item {
        border-bottom: 1px solid rgba(171, 172, 174, 0.2);
        padding-bottom: 8px;
        color: #202226;
        &:last-child {
          border-bottom: 0 none;
        }

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
