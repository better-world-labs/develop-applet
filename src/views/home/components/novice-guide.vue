<!--
 * @Author: 刘一笔
 * @Date: 2023-04-14 17:47:23
 * @Description: 新手引导
-->

<template>
    <div class="home-guide">
      <n-popover trigger="hover" placement="left">
        <template #trigger>
          <div class="icon-wrap">
            <IconFont @click="showDialog" name="icon-icon-chuangjianwodexiaochengxu"/>
          </div>
        </template>
        <span>帮助和资源</span>
      </n-popover>
    </div>
</template>

<script setup>
// todo 这里应该还要去plugin那里加点东西
import { useBizDialog } from '@/plugins';
const dialog = useBizDialog();

function showDialog() {
    dialog.open(
      'guide-popup',
      {
        title: '1/3',
        negativeText: '稍后再看',
        positiveText: '下一步'
      },
      {
        guideTitle: '创作同款小程序',
        guideContent: '你看的大代价地掉的旧爱 大家讲掉价的a',
        guideImg: 'https://moyu-chat.oss-cn-hangzhou.aliyuncs.com/default/avatar/%E6%9B%BE%E7%BB%8F.jpg'
      }
    )
}
</script>

<style lang="scss" scoped>
.home-guide {
    position: fixed;
    right: 10px;
    bottom: 50px;
    .icon-wrap {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      line-height: 36px;
      text-align: center;
      background-color: #fff;
      .iconfont {
        color: #5652FF;
      }
    }
}
</style>