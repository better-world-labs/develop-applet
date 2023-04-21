<!--
 * @Author: 刘一笔
 * @Date: 2023-04-14 17:47:23
 * @Description: 新手引导
-->

<template>
  <div class="home-guide">
    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="icon-wrap" @click="showFirstDialog('manual')">
          <IconFont name="icon-icon-bangzhu"/>
        </div>
      </template>
      <span>帮助和资源</span>
    </n-popover>
    <!-- trigger隐藏的问题怎么解决 -->
    <n-popconfirm :show-icon="false" ref="popConfirm" :show-arrow="false" 
                  :content-style="sam">
      <template #trigger>
        <span></span>
      </template>
      <template #action>
        <div @click="hidePopConfirm" class="guide-popconfirm">我知道了</div>
      </template>
      新手教程可以在这里找到哦～
    </n-popconfirm>
  </div>
</template>

<script setup>
import staticConfig from '@/settings/staticConfig';
import { useApplicationStore } from '@/store/modules/application';
import { useBizDialog } from '@/plugins';
import {NPopconfirm} from "naive-ui"
import {ref, reactive} from 'vue'
import { sendLog } from '@/utils/sls-logger/sendLog';

const dialog = useBizDialog();
const popConfirm = ref()
const applicationStore = useApplicationStore();


// todo 但是这样改不了外层样式
const sam = reactive({
  borderRadius: 8 + 'px'
})
onMounted(() => {
  autoTrigger()
})

// 用户第一次进入自动显示引导
function autoTrigger() {
  let useViewCount = Number(localStorage.getItem('userViewCount')) || 0
  if (useViewCount === 0) {
    showFirstDialog('auto')
  }
  localStorage.setItem('userViewCount', useViewCount + 1)
}

function hidePopConfirm() {
  popConfirm.value.setShow(false)
}

// 第一步
function showFirstDialog(triggerType) {
  // 埋点
  report({
    type: triggerType == 'auto' ? 'Show' : 'Click', // 自动触发 Show
    block: 'help_center',
    data: triggerType == 'auto' ? 0 : 1
  })

  dialog.open(
    'guide-popup',
    {
      title: '1/3',
      class: 'guide-wrap',
      negativeText: '稍后再看',
      positiveText: '下一步',
      onAfterLeave: () => {
        report({
          type: 'Click',
          block: 'help_step1',
          node: 'later'
        })
        popConfirm.value.setShow(true)
      },
      onNegativeClick: () => {
        // 点x和稍后再看都要触发提醒弹窗
        popConfirm.value.setShow(true)
      },
      handlePositiveClick: () => {
        report({
          type: 'Click',
          block: 'help_step1',
          node: 'next'
        })
        dialog.close('guide-popup')
        showSecondDialog()
      }
    },
    {
      guideTitle: '创作同款小程序',
      guideContent: '输入信息，立即生成你的专属结果。可以选择是否公开为社区构建，公开后的结果会显示在当前小程序下方',
      guideVideo: staticConfig.homeVideo1
    }
  )
}

// 第二步
function showSecondDialog() {
  dialog.open(
      'guide-popup',
      {
        title: '2/3',
        class: 'guide-wrap',
        negativeText: '上一步',
        positiveText: '下一步',
        onAfterLeave: () => {
          report({
            type: 'Click',
            block: 'help_step2',
            node: 'later'
          })
          popConfirm.value.setShow(true)
        },
        onNegativeClick: () => {
          report({
            type: 'Click',
            block: 'help_step2',
            node: 'forward'
          })
          dialog.close('guide-popup')
          showFirstDialog()
        },
        handlePositiveClick: () => {
          report({
            type: 'Click',
            block: 'help_step2',
            node: 'next'
          })
          dialog.close('guide-popup')
          showThirdDialog()
        }
      },
      {
        guideTitle: '创作同款小程序',
        guideContent: '您可以直接复制此款小程序的指令，也可以在此基础上进行修改，一键生成自己的小程序',
        guideVideo: staticConfig.homeVideo2
      }
    )
}

// 第三步
function showThirdDialog() {
  dialog.open(
    'guide-popup',
    {
      title: '3/3',
      class: 'guide-wrap',
      onAfterLeave: () => {
        report({
          type: 'Click',
          block: 'help_step3',
          node: '-close'
        })
        popConfirm.value.setShow(true)
      },
      positiveText: '开始创作',
      handlePositiveClick: () => {
        report({
          type: 'Click',
          block: 'help_step3',
          node: '-start'
        })
        dialog.close('guide-popup')
        applicationStore.changeGuideState(1)
      }
    },
    {
      guideTitle: '创作同款小程序',
      guideContent: '你创建的小程序都被收录在这里啦，点击查看，一键分享给好友吧',
      guideVideo: staticConfig.homeVideo3
    }
  )
}

// 帮助和资源埋点
function report(params) {
  sendLog({
    action_type: params.type,
    page: 'home',
    block: params.block,
    node: params.node || '',
    data: params.data || ''
  })
}
</script>

<style lang="scss">
.guide-popconfirm {
  color: #5652FF;
  cursor: pointer;
}
</style>
<style lang="scss" scoped>
.home-guide {
    position: fixed;
    right: 10px;
    bottom: 50px;
    .icon-wrap {
      cursor: pointer; 
      width: 36px;
      height: 36px;
      border-radius: 50%;
      line-height: 36px;
      text-align: center;
      background-color: #fff;
      .iconfont {
        color: #202226;
        &:hover {
          color: #5652FF;
        }
      }
    }
}
</style>