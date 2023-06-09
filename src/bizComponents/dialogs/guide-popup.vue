<!--
 * @Author: 刘一笔
 * @Date: 2023-04-14 22:19:33
 * @Description: 用于新手引导
-->
<template>
  <div class="guide-popup">
    <div v-for="(item, index) in steps">
      <template v-if="index == step">
        <div class="guide-label">{{ step + 1 }}/3</div>
        <div class="guide-title">{{ item.guideTitle }}</div>
        <div class="guide-content">{{ item.guideContent }}</div>
        <div class="guide-video">
          <n-spin v-show="!item.canplay" size="small" />
          <video v-show="item.canplay" :src="item.guideVideo" alt="" autoplay loop @canplay="canplay(item)"></video>
        </div>
        <div class="option-action">
          <n-button class="border-btn" v-if=item.negativeText @click="item.onNegativeClick">
            {{ item.negativeText }}
          </n-button>
          <n-button class="highlight-btn" v-if="item.positiveText" type="primary" @click="item.handlePositiveClick">
            {{ item.positiveText }}
          </n-button>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
import { useApplicationStore } from '@/store/modules/application';
import staticConfig from '@/settings/staticConfig';
import { sendLog } from '@/utils/sls-logger/sendLog';
const applicationStore = useApplicationStore();
const props = defineProps(['complete'])
const emit = defineEmits(['close']);
function onCancel(state) {
  emit('close');
  props.complete();
  if (!state) {
    report({
      type: 'Click',
      block: `help_step${step.value + 1}`,
      node: 'later',
    })
  }
}
// 开始播放
function canplay(item) {
  item.canplay = true;
}

// 帮助和资源埋点
function report(params) {
  sendLog({
    action_type: params.type,
    page: 'home',
    block: params.block,
    node: params.node || '',
    data: params.data || '',
  });
}
const step = ref(0);
const steps = ref([
  {
    canplay: false,
    guideTitle: '一键生成专属结果',
    guideContent: `使用AI，回答你的各种问题。
选择喜欢的小程序，输入对话内容，点击立即生成。`,
    guideVideo: staticConfig.homeVideo1,
    positiveText: "下一步",
    negativeText: "稍后再看",
    handlePositiveClick: () => {
      report({
        type: 'Click',
        block: 'help_step1',
        node: 'next',
      });
      step.value = 1;
    },
    onNegativeClick: () => {
      onCancel(); // 关闭
    }
  },
  {
    canplay: false,
    guideTitle: '0代码创作小程序·得积分',
    guideContent: '没有自己想问的？简单三步，一键生成，赚积分来来来来~',
    guideVideo: staticConfig.homeVideo2,
    positiveText: "下一步",
    negativeText: "上一步",
    handlePositiveClick: () => {
      report({
        type: 'Click',
        block: 'help_step2',
        node: 'next',
      });
      step.value = 2;
    },
    onNegativeClick: () => {
      report({
        type: 'Click',
        block: 'help_step2',
        node: 'forward',
      });
      step.value = 0;
    }
  },
  {
    canplay: false,
    guideTitle: '我的小程序',
    guideContent: '创建和收藏的小程序都被收录在这里啦，查看、编辑、一键分享好友赚积分！',
    guideVideo: staticConfig.homeVideo3,
    positiveText: "开始创作",
    handlePositiveClick: () => {
      report({
        type: 'Click',
        block: 'help_step3',
        node: '-start',
      });
      applicationStore.changeGuideState(1);
      onCancel(true); // 关闭
    }
  }
]);

</script>
<style lang="scss">
.option-action {
  margin-top: 20px;
  float: right;

  .n-button:last-child {
    margin-right: 0px;
    margin-left: 17px;
  }
}

.guide-wrap.n-dialog {
  position: fixed;
  right: 60px;
  bottom: 40px;
  width: 424px;

  .n-dialog__content {
    margin-bottom: 0px !important;
  }
}
</style>

<style lang="scss" scoped>
.guide-popup {
  width: 524px;
  margin-top: -16px;
  background: white;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #5B5D62;
}

// 图标位置
.iconfont {
  float: right;
  font-size: 24px;
  color: #BEBFC0;
  margin-top: -40px;
  cursor: pointer;

  &:hover {
    color: #5B5D62;
  }
}

.guide-popup {
  overflow: hidden;

  .guide-label {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: #5B5D62;
    margin-bottom: 16px;
  }

  .guide-title {
    color: #5652FF;
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: 500;
  }

  .guide-content {
    margin-bottom: 16px;
    white-space: pre-wrap;
  }

  .guide-video {
    padding: 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    height: 328px;
    display: flex;
    align-items: center;
    justify-content: center;

    video {
      border-radius: 8px;
      width: 522px;
      height: 100%;
      margin: 0;
    }
  }
}
</style>