<!--
 * @Author: 刘一笔
 * @Date: 2023-04-14 17:47:23
 * @Description: 新手引导
-->

<template>
  <div class="home-guide">
    <div class="icon-wrap" style="margin-bottom: 16px" @click="shareLink">
      <IconFont name="icon-icon-yemianfenxiang" />
    </div>
    <n-popover trigger="click" :show-arrow="false" placement="left-end" @update:show="updatePopover" class="popover-feed">
      <template #trigger>
        <n-popover @update:show="updateHover" trigger="hover" placement="left" class="popover" :disabled="popFeedBack">
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
    <n-popover trigger="click" :show-arrow="false" placement="left-end" class="popover-feed" :show="showTips"
      @clickoutside="hideTipsBox">
      <template #trigger>
        <n-popover @update:show="updateHover" trigger="hover" placement="left" class="popover" :disabled="popFeedBack2">
          <template #trigger>
            <div class="icon-wrap" @click="showFirstDialog()">
              <IconFont name="icon-icon-bangzhu" />
            </div>
          </template>
          <span>帮助和资源</span>
        </n-popover>
      </template>
      <div class="tips-feed">
        <p> 新手教程可以在这里找到哦～</p>
        <div @click="hideTipsBox">
          知道了
        </div>
      </div>
    </n-popover>
  </div>
</template>

<script setup>
import { useBizDialog } from '@/plugins';
import { ref, reactive } from 'vue';
import { getSystemConfig } from '@/api/application';
const dialog = useBizDialog();
const popFeedBack = ref(false);
const showTips = ref(false);
const feedBackState = reactive({
  feedBackKey: 'MINI_APP_QRCODE',
  qrCode: '',
  // https://moyu-chat.oss-cn-hangzhou.aliyuncs.com/o-auth/Snipaste_2023-04-21_14-07-14.png
});

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
// 分享链接
const shareLink = () => {
  dialog.open(
    'share-link',
    {
      class: "center-dialog",
      title: '分享',
    }
  )
  // dialog.open(
  //   'score-add-copy',
  //   {
  //     class: "center-dialog",
  //     title: '恭喜🎉',
  //   },
  //   {
  //     title1: "你已经创建1个小程序，获得12积分😊",
  //     title2: "立刻邀请好友来使用，单次可得 ",
  //     integral: "5"
  //   }
  // );
  // dialog.open(
  //   'score-add-copy',
  //   {
  //     class: "center-dialog",
  //     title: '恭喜🎉',
  //   },
  //   {
  //     title1: "你已经使用3个小程序，消耗15积分😭",
  //     title2: "立刻邀请好友加入社区，最高可得",
  //     integral: "100"
  //   }
  // )
  // dialog.open(
  //   'invited-friend-add-score',
  //   {
  //     class: "center-dialog",
  //     title: '恭喜🎉',
  //   }
  // )
}

const updatePopover = (show) => {
  popFeedBack.value = show;
};

// hover 隐藏提示框，显示tooltips 
const updateHover = (show) => {
  if (show) showTips.value = false;
};
const hideTipsBox = (show) => {
  showTips.value = false;
}

function showFirstDialog() {
  showTips.value = false;
  dialog.open(
    'guide-popup',
    {
      class: 'guide-wrap',
      maskClosable: false,
    },
    {
      complete: () => {
        showTips.value = true;
      }
    }
  );
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

    }

    &:hover .iconfont {
      color: #5652ff;
    }
  }

  .icon-wrap:nth-last-child(2) {
    &:before {
      position: absolute;
      content: "";
      left: 26px;
      width: 8px !important;
      height: 8px !important;
      border-radius: 8px;
      background: #DC504C;
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

  .tips-feed {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #5B5D62;
    margin-right: 8px;

    div {
      text-align: right;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #5652FF;
    }
  }
}
</style>
