<!--
 * @Author: Lemon
 * @Date: 2023-03-22 15:13:40
 * @Description: 
-->
<template>
  <div>
    <div class="home-header">
      <div style="flex: 1"></div>
      <n-button type="info" @click="createTemplate">
        <IconFont name="icon-icon-chuangjianwodexiaochengxu" />
        创建我的小程序
      </n-button>
      <user-integral></user-integral>
    </div>
    <div class="small-program">
      <default-composition
        v-if="applicationStore.mineAppList.length <= 0"
        content="暂无小程序哦~"
      ></default-composition>
      <n-grid :x-gap="12" v-else cols="1 s:1 m:2 l:3 xl:3 2xl:4" responsive="screen">
        <n-grid-item v-for="item in applicationStore.mineAppList" :key="item.id">
          <div class="item" @click="detailApp(item)">
            <div class="delete-icon" @click="deleteTemplate(item.uuid)">
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
              <n-button @click="editApp($event, item)">编辑</n-button>
              <n-button @click="shareTemplate($event, item)">分享</n-button>
            </div>
          </div>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>
<script setup>
  import { useInit } from '@/hooks/useInit';
  import { useApplicationStore } from '@/store/modules/application';
  import { useUserStore } from '@/store/modules/user';
  import useClipboard from 'vue-clipboard3';
  import $router from '@/router/index';
  import dayjs from 'dayjs';
  import { useMessage } from 'naive-ui';
  import { deleteApp } from '@/api/application';
  import { useBizDialog } from '@/plugins';

  const message = useMessage();
  const dialog = useBizDialog();
  const { toClipboard } = useClipboard();
  const value = ref(true);
  const applicationStore = useApplicationStore();
  const userStore = useUserStore();
  const { goAuth } = useInit();

  // 查看应用详情
  function detailApp(item) {
    if (!userStore.token) goAuth();
    $router.push({ name: 'view-template-details', query: { uuid: item.uuid } });
  }

  // 编辑应用
  function editApp(e, item) {
    e.stopPropagation();

    if (!userStore.token) goAuth();
    $router.push({ name: 'builder', query: { id: item.uuid } });
  }

  // 创建模版
  function createTemplate() {
    if (!userStore.token) goAuth();
    $router.push({ name: 'builder' });
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

  function deleteTemplate(uuid) {
    dialog.open(
      'regular-popup',
      {
        title: '提示信息',
        positiveText: '确认',
        negativeText: '取消',
        handlePositiveClick() {
          deleteApp(uuid).then(({ data }) => {
            init();
          });
        },
        onNegativeClick: () => {},
      },
      {
        content: '你确定要删除该小程序吗？',
      }
    );
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
  .small-program {
    padding: 42px 52px;
    background: linear-gradient(180deg, #f3f3f6 0%, #edeffc 100%);
    position: absolute;
    height: calc(100% - 72px);
    width: calc(100% - 312px);
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: scroll;
    // background-image: url(../../assets/default-bg.png);
    // background-repeat: no-repeat;
    // background-position: 50% 50%;
    // background-size: 112px 112px;

    // &::after{
    //   content: "暂无小程序哦~";
    //   color: #ABACAE;
    //   margin-left: calc(50% - 90px);
    //   top: calc(50% + 66px);
    //   position: absolute;
    //   }

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

        color: #181d24;
        margin-bottom: 10px;
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

      .n-button {
        width: 105px;
        height: 40px;
        background: #eeedfe;
        border: 1px solid #5652ff;
        border-radius: 8px;
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        color: #5652ff;
        margin-left: 16px;
        --n-border: none !important;
        --n-border-hover: none !important;
        --n-border-focus: none !important;

        &:hover {
          background: #d6d3ff;
        }
      }
    }
  }
</style>
