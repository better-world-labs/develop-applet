<!--
 * @Author: 刘一笔
 * @Date: 2023-05-03 00:26:23
 * @Description: 业务组件，小程序卡片
-->
<template>
  <div class="template-item">
    <div class="desc-text">
      {{ item.name }}
    </div>
    <div class="result-text">
      <div v-if="item.results[0]">
        <span>精彩结果1:</span>
        {{ item.results[0]?.content }}
      </div>
      <div v-if="item.results[1]"><span>精彩结果2:</span> {{ item.results[1]?.content }}</div>
    </div>
    <div class="footer-options">
      <div class="left">
        <img :src="item.createdBy.avatar || '../../assets/default-user.jpg'" />
        <div>
          {{ item.createdBy.nickname }}
        </div>
      </div>
      <div class="right">
        <div class="text-box" style="margin-right: 24px">
          <icon-font-symbol name="icon-icon-pinglun" />
          <div>
            {{ item.commentTimes }}
          </div>
        </div>
        <div class="text-box">
          <IconFontSymbol name="icon-icon-dianzan" />
          <div>
            {{ item.likeTimes }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['item'])
defineEmits(['toDetail'])

</script>

<style lang="scss" scoped>
    .template-item {
      background: #ffffff;
      box-shadow: 0px 6px 16px rgba(211, 213, 235, 0.4);
      border-radius: 16px;
      margin-bottom: 24px;
      padding: 24px;
      margin-right: 20px;
      cursor: pointer;

      .desc-text {
        font-weight: 500;
        font-size: 28px;
        line-height: 40px;
        color: #181d24;
        height: 80px;
        margin-bottom: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .result-text {
        height: 170px;
        background-color: #f3f3f7;
        border-radius: 10px;
        padding: 20px 12px;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: rgba(91, 93, 98, 1);
        background-image: url(../../../assets/bg.png);
        background-repeat: no-repeat;
        white-space: pre-line;

        > div {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }

        > div:first-child {
          margin-bottom: 24px;
        }

        span {
          color: rgba(145, 142, 255, 1);
        }
      }

      .footer-options {
        margin-top: 16px;
        display: flex;
        flex-direction: row;
        font-weight: 400;
        font-size: 16px;
        line-height: 32px;
        color: #5b5d62;

        .left {
          display: flex;
          flex-direction: row;

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

            .iconfont-svg {
              width: 24px;
              height: 24px;
              display: flex;
              flex-direction: row;
              margin-right: 6px;
            }

            div {
              display: flex;
              flex-direction: row;
              line-height: 25px;
            }
          }
        }
      }
    }</style>