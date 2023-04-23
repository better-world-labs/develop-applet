<!--
 * @Author: 刘一笔
 * @Date: 2023-04-14 17:47:23
 * @Description: 新手引导
-->

<template>
  <div class="home-guide">
    <n-popover
      trigger="click"
      :show-arrow="false"
      placement="left-end"
      @update:show="updatePopover"
      class="popover-feed"
    >
      <template #trigger>
        <n-popover trigger="hover" placement="left" class="popover" :disabled="popFeedBack">
          <template #trigger>
            <div class="icon-wrap" style="margin-bottom: 16px">
              <IconFont name="icon-icon-shequnhefankui" class="msg" />
            </div>
          </template>
          <span>社群和反馈</span>
        </n-popover>
      </template>
      <div class="code-feed">
        <img :src="feedBackState.qrCode" alt="" />
        <p>添加AI小助手</p>
      </div>
    </n-popover>
    <n-popover trigger="hover" placement="left" class="popover">
      <template #trigger>
        <div class="icon-wrap" @click="showFirstDialog('manual')">
          <IconFont name="icon-icon-bangzhu" />
        </div>
      </template>
      <span>帮助和资源</span>
    </n-popover>
    <!-- trigger隐藏的问题怎么解决 -->
    <n-popconfirm :show-icon="false" ref="popConfirm" :show-arrow="false" :content-style="sam">
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
  import { NPopconfirm } from 'naive-ui';
  import { ref, reactive } from 'vue';
  import { sendLog } from '@/utils/sls-logger/sendLog';
  import { getSystemConfig } from '@/api/application';

  const dialog = useBizDialog();
  const popConfirm = ref();
  const popFeedBack = ref(false);
  const feedBackState = reactive({
    feedBackKey: 'MINI_APP_QRCODE',
    qrCode: '',
    // https://moyu-chat.oss-cn-hangzhou.aliyuncs.com/o-auth/Snipaste_2023-04-21_14-07-14.png
  });
  const applicationStore = useApplicationStore();

  // todo 但是这样改不了外层样式
  const sam = reactive({
    borderRadius: 8 + 'px',
  });
  onMounted(async () => {
    autoTrigger();
    const feedBackData = await getSystemConfig({ key: feedBackState.feedBackKey });
    feedBackState.qrCode = feedBackData.data.value;
  });

  // 用户第一次进入自动显示引导
  function autoTrigger() {
    let useViewCount = Number(localStorage.getItem('userViewCount')) || 0;
    if (useViewCount === 0) {
      showFirstDialog('auto');
    }
    localStorage.setItem('userViewCount', useViewCount + 1);
  }

  const updatePopover = (show) => {
    popFeedBack.value = show;
  };

  function hidePopConfirm() {
    popConfirm.value.setShow(false);
  }

function showFirstDialog() {
    
     dialog.open(
      'guide-popup',
      { 
        class: 'guide-wrap', 
      }
    );
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
</script>

<style lang="scss">
  .guide-popconfirm {
    color: #5652ff;
    cursor: pointer;
  }
</style>
<style lang="scss" scoped>
  .home-guide {
    position: fixed;
    right: 10px;
    bottom: 40px;
    .msg {
      width: 20px;
      height: 20px;
      display: inline-block;
      margin-top: 2px;
    }
    .icon-wrap {
      cursor: pointer;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      line-height: 36px;
      text-align: center;
      background-color: #fff;
      .iconfont {
        font-size: 20px;
        color: #202226;
        &:hover {
          color: #5652ff;
        }
      }
    }
  }
</style>
<style lang="scss">
  .popover-feed {
    padding: 10px !important;
    margin-right: 4px !important;
    .code-feed {
      img {
        width: 112px;
        height: 112px;
        background: #f5f5f5;
        border-radius: 4px;
      }
      p {
        padding: 0;
        margin: 0;
        margin-top: 4px;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: #202226;
        text-align: center;
      }
    }
  }
  .popover.n-popover {
    --n-text-color: #fff !important;
    --n-color: #4f5051 !important;
    --n-divider-color: #4f5051 !important;
    --n-box-shadow: 0px 4px 12px rgba(16, 19, 22, 0.3) !important;
    border-radius: 4px;
  }
</style>
