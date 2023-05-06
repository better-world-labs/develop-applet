import { getNoticeList, getUnreadCount, setMessageRead, setAllMessageRead } from '@/api/notice';
import notifyReward from './images/airdrop.png';
import notifyInvited from './images/invited.png';
import notifyPointsRecharge from './images/points-recharge.png';
import notifyDuplicateApp from './images/duplicate-app.png';
import notifyAppBeUsed from './images/app-be-used.png';
import { debounce } from 'lodash-es';

interface ParamsItf {
  cursor: string;
  isRead?: boolean;
}
const showPopover = ref(false);
const option = ref(0);
const nextCursor = ref('');
const unreadMessageCount = ref(0);
const messageList = ref<Notice.Message[]>([]);
const scrollHeight = ref(0);
const options = [
  {
    label: '查看全部',
    value: 0,
  },
  {
    label: '未读消息',
    value: 1,
  },
];

const types = {
  'notify-reward': notifyReward,
  'notify-invited': notifyInvited,
  'notify-points-recharge': notifyPointsRecharge,
  'notify-duplicate-app': notifyDuplicateApp,
  'notify-app-be-used': notifyAppBeUsed,
};
// 时间计算
const timeCalculation = (t: string) => {
  let now = new Date();
  let msgDate = new Date(t);
  now.setHours(0);
  now.setMinutes(0);
  now.setMilliseconds(0);
  // 今天消息
  if (now.toDateString() == msgDate.toDateString()) {
    let hour: string | number = msgDate.getHours();
    let minutes: string | number = msgDate.getMinutes();
    if (hour < 10) hour = `0${hour}`;
    if (minutes < 10) minutes = `0${minutes}`;
    return `${hour}:${minutes}`;
  } else if (now.getTime() - msgDate.getTime() < 60 * 60 * 24 * 1000) {
    // 昨天
    let hour: string | number = msgDate.getHours();
    let minutes: string | number = msgDate.getMinutes();
    if (hour < 10) hour = `0${hour}`;
    if (minutes < 10) minutes = `0${minutes}`;
    return `昨天 ${hour}:${minutes}`;
  } else {
    // 两天之前
    let month: string | number = msgDate.getMonth() + 1;
    let day: string | number = msgDate.getDay();
    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;
    if (now.getFullYear() != msgDate.getFullYear()) {
      return `${msgDate.getFullYear()}-${month}-${day}`;
    } else {
      return `${month}-${day}`;
    }
  }
};
export function useNotice() {
  // 滚动加载数据
  const handleMessageScroll = debounce((e) => {
    const scroll = e.target;
    scrollHeight.value = scroll.scrollHeight;
    if (scrollHeight.value - scroll.scrollTop == scroll.clientHeight) {
      getList();
    } else if (scroll.scrollTop == 0) {
      // 滚动条到顶部刷新第一页数据
      initOption();
    }
  }, 300);
  // 每次打开通知重新加载数据
  const updatePopover = (show: boolean) => {
    showPopover.value = show;
    if (showPopover.value) {
      nextCursor.value = '';
      getList();
    }
  };
  // 初始化第一页数据
  const initOption = () => {
    messageList.value = [];
    nextCursor.value = '';
    getList();
  };
  // 获取未读消息数量
  async function getUnread() {
    const { data } = await getUnreadCount();
    unreadMessageCount.value = data.count;
  }
  // 请求消息列表
  async function getList() {
    const params: ParamsItf = {
      cursor: nextCursor.value || '',
    };
    if (option.value == 1) params.isRead = false; // 未读

    const { data } = await getNoticeList(params);

    data.list.forEach((element: Notice.Message) => {
      messageList.value.push(element);
    });
    nextCursor.value = data?.nextCursor;
  }
  // 设置消息已读
  async function setMsgRead(item: Notice.Message) {
    if (item.read == true) return;
    await setMessageRead(item.id);
    item.read = true;
    unreadMessageCount.value -= 1;
  }
  // 设置消息全部已读
  async function setAllMsgRead() {
    await setAllMessageRead();
    unreadMessageCount.value = 0;
  }

  return {
    showPopover,
    option,
    nextCursor,
    unreadMessageCount,
    messageList,
    scrollHeight,
    options,
    types,
    timeCalculation,
    handleMessageScroll,
    updatePopover,
    initOption,
    getList,
    getUnread,
    getNoticeList,
    setMsgRead,
    setAllMsgRead,
  };
}
