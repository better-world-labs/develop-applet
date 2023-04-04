 <!--
 * @Author: Lemon
 * @Date: 2022-09-23 14:22:55
 * @LastEditTime: 2023-04-03 16:43:05
 * @Description: 文字表情
-->
<template>
  <div class="emoji-box">
    <div>
      <div class="emoji-list">
        <span class="emoji" v-for="emoji in emojiList.symbol" :key="emoji" @click="useEmoji(emoji)">
          {{ emoji }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { emojiList } from './emoji';
const emits = defineEmits(['hidePopo', 'updateInfo']);
// 点击使用表情
function useEmoji(emjoi) {
  // 输入框追加表情
  emits('hidePopo');
  // 隐藏表情框
  emits('updateInfo', emjoi);
}
</script>
<style lang="scss" scoped>
.emoji-box {
  width: 168px;
  height: 145px;
  display: flex;
  background: #fcfcfd;
  border-radius: 4px;

  .emoji-list {
    padding: 8px;

    .emoji {
      width: 24px;
      height: 24px;
      text-align: center;
      display: inline-block;
      font-size: 16px !important;
      cursor: pointer;
      margin: 0 3px;

      &:hover {
        background: #e9eaec;
        border-radius: 2px;
      }
    }
  }
}
</style>
