<!--
 * @Author: 刘一笔
 * @Date: 2023-05-03 00:26:23
 * @Description: 业务组件，小程序卡片
-->
<template>
  <div class="template-item">
    <div class="desc-text" @click="$emit('useTemplate', item)">
      {{ item.name }}
    </div>
    <div class="result-text" @click="$emit('useTemplate', item)">
      <div>
        <div v-if="item.results[0]">
          <span>精彩结果1:</span>
          {{ item.results[0]?.content }}
        </div>
        <div v-if="item.results[1]"><span>精彩结果2:</span> {{ item.results[1]?.content }}</div>
      </div>
    </div>
    <div class="footer-options">
      <div class="left" @click="toIntegral(item.createdBy.id)">
        <img :src="item.createdBy.avatar || '../../assets/default-user.jpg'" />
        <div>
          {{ item.createdBy.nickname }}
        </div>
      </div>
      <div class="right">
        <div class="text-box" @click="giveAHot(item)" style="margin-right: 24px">
          <IconFontSymbol :class="{ hide: !appListHotState[item.uuid] }"
            :name="appListHotState[item.uuid] ? 'icon-icon-yituijian' : 'icon-icon-tuijian'" />
          <IconFont :class="{ show: !appListHotState[item.uuid] }" name="icon-icon-tuijian" />
          <div>
            {{ item.recommendTimes || 0 }}
          </div>
          <div v-if="showHotAnimation" class="add-hot">
            <img src="@/assets/rocket.png" alt="" />
            小火箭嗖嗖嗖～已推荐～
          </div>
        </div>
        <div class="text-box" @click="giveALike(item)">
          <IconFontSymbol :class="{ hide: !appListLikeState[item.uuid] }"
            :name="appListLikeState[item.uuid] ? 'icon-icon-yidianzan' : 'icon-icon-dianzan'" />
          <IconFont :class="{ show: !appListLikeState[item.uuid] }" name="icon-icon-dianzan" />
          <div>
            {{ item.likeTimes }}
          </div>
          <div v-if="showAnimation" class="add-like">+1</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import $router from '@/router/index';
import { giveLikeApp, giveHotApp } from '@/api/application';
import { useApplicationStore } from '@/store/modules/application';
import { storeToRefs } from 'pinia';
import { useInit } from '@/hooks/useInit';
import { useUserStore } from '@/store/modules/user';

const { goAuth } = useInit();
const userStore = useUserStore();

const applicationStore = useApplicationStore();
const { appListLikeState, appListHotState } = storeToRefs(applicationStore);

defineProps(['item']);
defineEmits(['useTemplate']);

const showAnimation = ref(false);
const showHotAnimation = ref(false);

function giveALike(item) {
  if (!userStore.token) goAuth();
  const newState = !appListLikeState.value[item.uuid];
  if (newState) {
    showAnimation.value = true;
    setTimeout(() => {
      showAnimation.value = false;
    }, 1000);
  }
  giveLikeApp(item.uuid, { like: newState }).then(() => {
    appListLikeState.value[item.uuid] = newState;
    if (appListLikeState.value[item.uuid]) {
      item.likeTimes += 1;
    } else {
      item.likeTimes -= 1;
    }
  });
}

function giveAHot(item) {
  if (!userStore.token) goAuth();
  const newState = !appListHotState.value[item.uuid];
  if (newState) {
    showHotAnimation.value = true;
    setTimeout(() => {
      showHotAnimation.value = false;
    }, 1000);
  }
  giveHotApp(item.uuid, newState).then(() => {
    appListHotState.value[item.uuid] = newState;
    if (appListHotState.value[item.uuid]) {
      item.recommendTimes += 1;
    } else {
      item.recommendTimes -= 1;
    }
  });
}

// 跳转到积分
function toIntegral(userId) {
  $router.push({ name: 'introduction', query: { id: userId } });
}
</script>

<style lang="scss" scoped>
.template-item {
  background: #ffffff;
  box-shadow: 0px 6px 16px rgba(211, 213, 235, 0.4);
  border-radius: 16px;
  margin-bottom: 32px;
  height: 308px;
  box-sizing: border-box;

  .desc-text {
    padding-top: 24px;
    margin: 0 24px 16px 24px;
    font-weight: 500;
    font-size: 24px;
    line-height: 34px;
    color: #181d24;
    height: 34px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    cursor: pointer;
  }

  .result-text {
    cursor: pointer;

    >div {
      margin: 0px 24px 0 24px;
      height: 170px;
      box-sizing: border-box;
      background-color: #f3f3f7;
      border-radius: 10px;
      padding: 20px 12px;
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      color: rgba(91, 93, 98, 1);
      background-image: url(@/assets/bg.png);
      background-repeat: no-repeat;
      white-space: pre-line;

      >div {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      >div:first-child {
        margin-bottom: 24px;
      }

      span {
        color: rgba(145, 142, 255, 1);
      }
    }
  }

  .footer-options {
    padding: 16px 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: 400;
    font-size: 16px;
    color: #5b5d62;

    .left {
      display: flex;
      flex-direction: row;
      cursor: pointer;

      img {
        width: 32px;
        height: 32px;
        border-radius: 32px;
        margin-right: 8px;
      }
    }

    .right {
      margin-left: auto;
      font-size: 16px;
      color: #5b5d62;
      display: flex;
      flex-direction: row;
      padding-top: 5px;

      .text-box {
        display: flex;
        flex-direction: row;
        cursor: pointer;

        &:hover {
          color: #202226 !important;

          .iconfont-svg.hide {
            display: none;
          }

          .iconfont.show {
            display: block;
          }
        }

        .iconfont-svg {
          width: 24px;
          height: 24px;
          display: flex;
          flex-direction: row;
          margin-right: 6px;
        }

        .iconfont {
          display: none;
          font-size: 24px;
          line-height: 24px;
          margin-right: 6px;
          color: rgba(86, 82, 255, 1);
        }

        div {
          display: flex;
          flex-direction: row;
          line-height: 25px;
        }
      }

      .add-hot {
        box-sizing: border-box;
        background: green;
        position: absolute;
        width: 180px;
        height: 30px;
        line-height: 30px !important;
        font-size: 12px;
        background: #eeedfe;
        background-image: url(@/assets/rocket-bg.png);
        background-size: 100% 100%;
        border-radius: 14.5px;
        padding: 0px 8px;
        font-weight: 400;
        color: #202226;
        margin-top: -36px;
        margin-left: -80px;
        animation-name: move-left;
        animation-duration: 1.5s;
        animation-iteration-count: 1;
        opacity: 1;

        img {
          width: 30px;
          height: 30px;
          float: left;
        }
      }

      .add-like {
        position: absolute;
        width: 24px;
        height: 28px;
        margin-top: -10px;
        padding-left: 2px;
        font-style: normal;
        font-weight: 700;
        font-size: 30rpx;
        color: rgba(86, 82, 255, 1);
        animation-name: move-top;
        animation-duration: 1s;
        animation-iteration-count: 1;
        opacity: 1;
      }

      @keyframes move-top {
        0% {
          transform: translateY(0);
        }

        30% {
          opacity: 1;
        }

        100% {
          transform: translateY(-100%);
          opacity: 0;
        }
      }

      @keyframes move-left {

        0%,
        30% {
          transform: translateX(0);
        }

        30% {
          opacity: 1;
        }

        100% {
          transform: translate(-100%);
          opacity: 0;
        }
      }
    }
  }
}
</style>
