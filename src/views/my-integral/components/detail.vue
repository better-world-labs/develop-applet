<!--
 * @Author: 刘一笔
 * @Date: 2023-04-25 22:57:12
 * @Description: 积分明细
-->
<template>
  <div class="integral-detail">
    <div class="no-data" v-if="dataList.length === 0">
      <img src="@/assets/no-data.png" alt="" />
      <p>暂无积分记录</p>
    </div>
    <div class="item" v-else v-for="item in dataList" :key="item.userId">
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
</template>

<script setup>
import { useUserStore } from '@/store/modules/user';
import { getIntegralDetails } from '@/api/user';
const userStore = useUserStore();
import dayjs from 'dayjs';
const dataList = ref([]);

onMounted(() => {
  if (!userStore.token) goAuth();
  // 明细
  getIntegralDetails().then(({ data }) => {
    dataList.value = data.list;
  });
})
</script>


<style lang="scss">
.integral-detail {
  background-color: #FFF;
  border-radius: 8px;
  padding: 24px;
  position: absolute;
  height: calc(100% - 72px - 96px - 48px);
  width: calc(100% - 312px - 104px);
  max-width: 660px;
  overflow-x: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  
  .no-data {
    display: flex;
    flex-direction: column;
    img {
      width: 82px;
      height: 82px;
      margin: 68px auto 12px;
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

    .item-one-line {
      display: flex;
      flex-direction: row;
      margin-bottom: 2px;
      padding-top: 8px;

      >div:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      >div:last-child {
        margin-left: auto;
        padding-left: 30px;
        white-space: nowrap;
        color: #5b5d62;
      }

      >div.active-text:last-child {
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
</style>