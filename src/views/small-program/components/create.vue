<!--
 * @Author: 刘一笔
 * @Date: 2023-05-02 21:59:30
 * @Description: 我创建的小程序
-->
<template>
    <div class="create-program">
      <!-- 我创建的 -->
      <blank-compo v-if="applicationStore.collectAppList.length === 0">
        <div>还未创建小程序哦，</div>
        <div>所创建小程序被使用单次可得5积分哦！</div>
        <div class="link-wrap">更多玩法等你来解锁～<a class="link" href="/my-integral">点击了解>></a></div>
      </blank-compo>
      <n-grid :x-gap="12" v-else cols="1 860:2 1200:3 1666:4 2000:4">
        <n-grid-item v-for="item in applicationStore.mineAppList" :key="item.id">
          <div class="item" @click="detailApp(item)">
            <div class="delete-icon" @click="deleteTemplate($event,item.uuid)">
              <IconFont name="icon-icon-shanchu" />
            </div>
            <div class="title">
              {{ item.name }}
            </div>
            <div class="date">
              {{ dayjs(item.createdAt).format('YYYY/MM/DD HH:mm:ss') }}
            </div>
            <div>
              已售： <span class="active-text">{{ item.soldPoints || 0 }}</span
              >积分
            </div>
            <div class="options">
              <div>
                <div>被使用</div>
                <div class="number">{{ item.runTimes }}次</div>
              </div>
              <div>
                <div>被采用</div>
                <div class="number">{{ item.useTimes }}次</div>
              </div>
            </div>
            <div style="text-align: right">
              <n-button class="border-bg-btn" size="large" @click="editApp($event, item)">编辑</n-button>
              <n-button class="border-bg-btn" size="large" style="margin-left: 16px;" @click="shareTemplate($event, item)">分享</n-button>
            </div>
          </div>
        </n-grid-item>
      </n-grid>
    </div>
</template>

<script setup>
  import { useApplicationStore } from '@/store/modules/application';
  import { useUserStore } from '@/store/modules/user';
  import { useInit } from '@/hooks/useInit';
  import { deleteApp } from '@/api/application';
  import { useMessage } from 'naive-ui';
  import { useBizDialog } from '@/plugins';
  import blankCompo from './blankCompo.vue';
  import useClipboard from 'vue-clipboard3';
  import $router from '@/router/index';
  import dayjs from 'dayjs';

  const message = useMessage();
  const dialog = useBizDialog();
  const applicationStore = useApplicationStore();
  const userStore = useUserStore();
  const { toClipboard } = useClipboard();
  const { goAuth } = useInit();

  // 查看应用详情
  function detailApp(item) {
    if (!userStore.token) goAuth();
    $router.push({ name: 'view-template-details', query: { uuid: item.uuid } });
  }
  function deleteTemplate(e, uuid) {
    e.stopPropagation();

    $dialog.info({
      class: "prompt-dialog",
      showIcon: false,
      title: '提示信息',
      content: '你确定要删除该小程序吗？',
      positiveText: '确认',
      negativeText: '取消',
      onPositiveClick() {
        deleteApp(uuid).then(({ data }) => {
        init();
      });
      },
      onNegativeClick: () => {
         
      },
    }); 
  }
  // 编辑应用
  function editApp(e, item) {
    e.stopPropagation();

    if (!userStore.token) goAuth();
    $router.push({ name: 'builder', query: { id: item.uuid } });
  }
  // 分享模版
  async function shareTemplate(e, item) {
    e.stopPropagation();
    const com = window.location.href.substr(0, window.location.href.lastIndexOf('/'));
    const url = `${com}/view-template-details?uuid=${item.uuid}&invitedBy=${userStore.userId}`;

    try {
      await toClipboard(url);
      message.success('已复制，快去分享给朋友吧~');
    } catch (e) {
      console.error(e);
    }
  }
  function init() {
    applicationStore.getMineAppList();
  }

  onMounted(() => {
    if (!userStore.token) goAuth();
    init();
  });
</script>

<style lang="scss" scoped>
.create-program {
  position: absolute;
  height: calc(100% - 72px);
  width: calc(100% - 400px);
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .item {
    background: #ffffff;
    box-shadow: 0px 6px 16px rgba(211, 213, 235, 0.4);
    border-radius: 16px;
    padding: 24px;
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
    color: #181d24;
    margin-bottom: 24px;
    margin-right: 16px;
    cursor: pointer;

    .title {
      font-weight: 500;
      font-size: 28px;
      line-height: 40px; 
      height: 80px;
      color: #181d24;
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .delete-icon {
      float: right;
      width: 32px;
      height: 32px;
      border-radius: 32px;
      cursor: pointer;
      padding: 5px;
      box-sizing: border-box;
      margin-top: 4px;

      .iconfont {
        font-size: 24px;
        color: #bec3c5;
      }

      &:hover {
        background: #f3f3f8;

        .iconfont {
          color: #5b5d62;
        }
      }
    }

    .date {
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      color: #5b5d62;
      margin-bottom: 16px;
    }

    .active-text {
      color: rgba(86, 82, 255, 1);
    }

    .options {
      margin-top: 24px;
      margin-bottom: 15px;
      width: 100%;
      height: 83px;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #abacae;
      background: #f3f3f7;
      border-radius: 10px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;

      div {
        flex-basis: 50%;
        text-align: center;
      }

      .number {
        color: #5b5d62;
      }
    } 
  }
}
</style>