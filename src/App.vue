<!--
 * @Author: Sandy
 * @Date: 2023-04-18 14:25:54
 * @Description: 
-->
<template>
  <AppProvider>
    <RouterView />
  </AppProvider>
</template>

<script setup>
import { AppProvider } from '@/components/app-provider';
import { getIntegral } from "@/api/user"
import { getAllRetainMessage } from "@/api/notice"
import { useUserStore } from "@/store/modules/user"
import { sendLog } from '@/utils/sls-logger/sendLog';
import { useWebSocket } from "@/hooks/useWebSocket";
import { useSocket } from '@/store/modules/webSocket';
import { useBizDialog } from '@/plugins';
import { SocketTriggerTypeEnum } from '@/enums/socketEnum';
import { useNotice } from "@/bizComponents/notice-box/notice";

const {
  getUnread
} = useNotice();
const dialog = useBizDialog();
const userStore = useUserStore();
const { connect } = useWebSocket();
const { $on } = useSocket();

const registerOn = () => {
  // 未读消息数有变化
  $on(SocketTriggerTypeEnum.NOTIFY_MESSAGE_CHANGE, () => {
    getUnread();
  });
  // 创建第一个小程序后触发
  $on(SocketTriggerTypeEnum.SHARE_HINT_CREATE_APP, (res) => {
    dialog.open(
      'score-add-copy',
      {
        class: "center-dialog",
        title: '恭喜🎉',
      },
      {
        title1: `你已经创建${res.createdApps}个小程序，获得${res.earnPoints}积分😊`,
        title2: "立刻邀请好友来使用，单次可得 ",
        integral: "5",
      }
    );
  });
  // 使用三个小程序后 
  $on(SocketTriggerTypeEnum.SHARE_HINT_USE_APP, (res) => {

    dialog.open(
      'score-add-copy',
      {
        class: "center-dialog",
        title: '恭喜🎉',
      },
      {
        title1: `你已经使用${res.usedApps}个小程序，消耗${res.costPoints}积分😭`,
        title2: "立刻邀请好友加入社区，最高可得",
        integral: "100"
      }
    )
  });
  // 邀请好友成功
  $on(SocketTriggerTypeEnum.RETAIN_MESSAGE_CHANGE, () => {
    initDialog();
  });
}
// 请求是否有初始化弹出框展示
const initDialog = () => {
  getAllRetainMessage().then(({ data }) => {
    if (!data.list[0]) return;
    dialog.open(
      'invited-friend-add-score',
      {
        class: "center-dialog",
        title: '恭喜🎉',
      },
      {
        data: data.list[0]
      }
    )
  })
}

// 监听登录
watch(() => userStore.token, (newVal, oldVal) => {
  if (newVal) {
    connect(userStore.token);
    registerOn(); // 注册事件
    initDialog(); // 初始化弹出框
    getUnread();// 初始化通知的消息 
  }
}, {
  immediate: true
})

// 组件错误
onErrorCaptured((err) => {
  console.error('onErrorCaptured', err);
  sendLog({
    action_type: 'Monitor_Error',
    data: {
      ...err,
      type: 'onErrorCaptured',
    },
  });
});

onMounted(() => {
  getIntegral().then(({ data }) => {
    userStore.setTotal(data.total);
  })
})
</script>

<style lang="scss">
body {
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    display: none;
  }
}
</style>