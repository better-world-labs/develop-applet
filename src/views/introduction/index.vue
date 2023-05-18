<!--
 * @Author: Sandy
 * @Date: 2023-05-17 10:38:12
 * @Description: 
-->
<template>
  <div>
    <div class="home-header">
      <div class="back-btn" @click="backPrePage">
        <IconFont name="icon-icon-fanhui" />
        返回
      </div>
      <notice-box></notice-box>
      <n-button class="highlight-btn" size="large" @click="createTemplate">
        <IconFont name="icon-icon-chuangjianwodexiaochengxu" />
        创建我的小程序
      </n-button>
      <user-integral></user-integral>
    </div>
    <div class="introduction">
      <div class="top-bar">
        <img :src="userStore.info.avatar || '@/assets/default-user.jpg'" />
        <div class="info-header">
          {{ userStore.info.nickname }}
          <p v-if="userStore.info?.id">ID：#{{ String(userStore.info?.id).slice(1) }}</p>
        </div>
      </div>
      <div class="bar-items">
        <div class="item item01">
          <p>作品数</p>
          <span>{{ state.statistic.apps }}</span>
        </div>
        <div class="item item02">
          <p>成为创作者天数</p>
          <span>{{ state.statistic.registeredDays }}</span>
        </div>
        <div class="item item03">
          <p>积分</p>
          <span>{{ state.statistic.points }}</span>
        </div>
        <div class="item item04">
          <p>作品使用量</p>
          <span>{{ state.statistic.appUses }}</span>
        </div>
        <div class="item item05">
          <p>作品点赞数</p>
          <span>{{ state.statistic.appLikes }}</span>
        </div>
      </div>
      <div class="pro-list">
        <p>作品列表</p>
        <app-list :appList="state.appList"></app-list>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { useInit } from '@/hooks/useInit';
  import { useUserStore } from '@/store/modules/user';
  import $router from '@/router/index';
  import { useRoute } from 'vue-router';
  import { getStatistic } from '@/api/user';
  import { getAppListByUser } from '@/api/application';
  import { sendLog } from '@/utils/sls-logger/sendLog';
  import { useBizDialog } from '@/plugins';
  const dialog = useBizDialog();

  const userStore = useUserStore();
  const { goAuth, logout } = useInit();
  const state = reactive({
    statistic: {},
    appList: [],
  });

  // 返回上一页
  function backPrePage() {
    $router.go(-1);
  }
  // 创建模版
  function createTemplate() {
    if (!userStore.token) goAuth();
    $router.push({ name: 'builder' });
  }
  onMounted(async () => {
    if (!userStore.token) goAuth();
    const route = useRoute();
    const id = Number(route.query.id || 0);
    const { userId } = useUserStore();
    // 未传入用户id 拉取自己的
    const getStatisticData = await getStatistic(id || userId);
    const getApps = await getAppListByUser(id || userId);
    state.statistic = getStatisticData.data;
    state.appList = getApps.data.list;
  });
</script>
<style lang="scss">
  .home-header {
    .back-btn {
      flex: 1;
      font-weight: 400;
      font-size: 16px;
      line-height: 52px;
      color: #5b5d62;
      cursor: pointer;
      .iconfont {
        color: #5b5d62;
        font-size: 16px;
        margin-right: 4px;
      }
    }
  }

  .introduction {
    padding: 48px 52px;
    min-width: 908px;
    width: calc(100% - 312px);
    height: calc(100% - 72px);
    box-sizing: border-box;
    overflow-y: scroll;
    position: absolute;
    .top-bar {
      height: 144px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 8px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: right bottom;
      //   background-size: 100% 100%;
      background-image: url('https://moyu-chat.oss-cn-hangzhou.aliyuncs.com/develop-applet/images/img_introduction_bg.png');
      display: flex;
      padding: 24px;
      box-sizing: border-box;
      margin-bottom: 16px;
      img {
        width: 96px;
        height: 96px;
        margin-right: 24px;
        border-radius: 50%;
      }
      > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-weight: 500;
        font-size: 22px;
        line-height: 31px;
        color: #181d24;
        p {
          margin: 0;
          padding: 0;
          font-size: 16px;
          line-height: 16px;
          color: #5b5d62;
          margin-top: 6px;
        }
      }
    }
    .bar-items {
      display: flex;
      .item {
        display: flex;
        flex: 1;
        height: 91px;
        flex-direction: column;
        padding: 16px 0 0 24px;
        background: #ffffff;
        border-radius: 8px;
        box-sizing: border-box;
        // background: linear-gradient(180deg, rgba(255, 247, 228, 0.7) 0%, #ffffff 66.92%);
        position: relative;
        & + .item {
          margin-left: 16px;
        }
        &:after {
          content: '';
          position: absolute;
          right: 0;
          bottom: 0;
          width: 58px;
          height: 52px;
          opacity: 0.5;
          background-size: 100% 100%;
          background-image: url('@/assets/img_introduction_01.png');
        }
        &.item01:after {
          background-image: url('@/assets/img_introduction_01.png');
        }
        &.item02:after {
          background-image: url('@/assets/img_introduction_02.png');
        }
        &.item03:after {
          background-image: url('@/assets/img_introduction_03.png');
        }
        &.item04:after {
          background-image: url('@/assets/img_introduction_04.png');
        }
        &.item05:after {
          background-image: url('@/assets/img_introduction_05.png');
        }
        p {
          font-size: 16px;
          line-height: 22px;
          color: #5b5d62;
          padding: 0;
          margin: 0;
          margin-bottom: 11px;
        }
        span {
          font-weight: 500;
          font-size: 24px;
          line-height: 34px;
          color: #181d24;
        }
      }
    }
    .pro-list {
      p {
        margin: 40px 0 24px;
        font-weight: 500;
        font-size: 18px;
        line-height: 25px;
        color: #181d24;
      }
    }
  }
</style>
