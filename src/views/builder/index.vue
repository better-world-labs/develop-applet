<!--
 * @Author: Sandy
 * @Date: 2023-03-23 14:47:22
 * @Description: app builder
-->

<template>
  <div class="builder">
    <header>
      <div class="back" @click="$router.go(-1)"><IconFont name="icon-icon-fanhui" />返回</div>
      <div class="right-btn">
        <n-popover trigger="click" :show-arrow="false" placement="bottom-end"
                    style="border-radius: 12px; box-shadow: 2px 2px 19px -5px rgba(127, 124, 132, 0.3);
                          padding: 16px 16px 10px 16px;">
          <template #trigger>
            <div class="solution" @click="solutionBtn">如何创建小程序？</div>
          </template>
          <video style="width: 432px;border-radius: 8px;border: 1px solid rgba(0, 0, 0, 0.1);" 
                  autoplay loop :src="staticConfig.editVideo1">
          </video>
        </n-popover>
        <div class="submit" @click="submit">
          <IconFont name="icon-icon-fabu"></IconFont>
          <span>发布</span>
          <span class="integral-num">（20积分）</span>
        </div>
      </div>
    </header>
    <div class="body">
      <div class="coding scroll-y">
        <coding ref="refCoding" @back="back" :app-data="state"></coding>
      </div>
      <div>
        <preview @submit="submit" :app-data="state"></preview>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { v4 as uuid } from 'uuid';
  import preview from './components/preview.vue';
  import coding from './components/coding.vue';
  import { getApp } from '@/api/application';
  import { useRouter, useRoute } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';
  import { useBizDialog } from '@/plugins';
  import staticConfig from '@/settings/staticConfig';
  import { sendLog } from '@/utils/sls-logger/sendLog';
  const dialog = useBizDialog();
  const userStore = useUserStore();
  const route = useRoute();
  const router = useRouter();
  const isEditId = route.query.id;
  const isCopy = route.query.type == 'new';
  const refCoding = ref('');
  const state = reactive({
    uuid: uuid(),
    name: '未命名模板',
    category: undefined,
    description: '',
    duplicateFrom: '',
    form: [
      {
        id: '321',
        label: '选项名1',
        type: 'text',
        properties: {
          placeholder: '',
        },
      },
    ],
    flow: [
      {
        id: uuid(),
        type: '',
        outputVisible: true,
        prompt: [
          {
            id: uuid(),
            type: 'text',
            properties: {
              value: '',
            },
          },
          // {
          //     "id": "11",
          //     "type": "tag",
          //     "properties": {
          //         "from": "result", //form 或者 result
          //         "character": '321'
          //     }
          // },
          // {
          //     "id": "13",
          //     "type": "text",
          //     "properties": {
          //         "value": "选出最好的结果"
          //     }
          // },
        ],
      },
    ],
    createdBy: {
      // "id": 12,
      // "name": "不知道是谁",
      // "avatar": "http://xxx/xxx"
    },
    // "createdAt": "2023-03-22T07:08:02.851Z",
    // "updatedAt": "2023-03-22T07:08:02.851Z",
    status: 1, // 状态 (0.未发布 1.已发布)
  });

  onMounted(async () => {
    // setInterval(() => {
    //     console.log(state);
    // }, 3000)
    if (isEditId) {
      const appData = await getApp(isEditId);
      if (isCopy) {
        appData.data.uuid = uuid();
        state.duplicateFrom = isEditId;
        appData.data.name += '-1';
      }
      state.uuid = appData.data.uuid;
      state.name = appData.data.name;
      state.description = appData.data.description;
      state.category = appData.data.category;
      state.form = appData.data.form;
      state.flow = appData.data.flow;
    }
    state.createdBy = { ...userStore.info, name: userStore.info.nickname };
    // 用户引导状态
    userStore.getGuideState()
    // 新用户显示引导
    showEditGuide()
  });

  const submit = async (isBack = true) => {
    await refCoding.value.publishApp(isBack);
  };
  const back = () => {
    router.replace(
      {
          name: 'view-template-details',
          query: { type: 'save', uuid: state.uuid },
      }
    )
  };
  function solutionBtn() {
    report({
      type: 'Click',
      block: 'callout_creat2',
      data: '0'
    })
  };
  function showEditGuide() {
    // 没完成就显示
    if (!userStore.completeGuide) {
      report({
        type: 'Show',
        block: 'callout_creat1',
        data: '0'
      })
      dialog.open(
        'guide-edit-popup',
        {
          class:"guide-edit-popup",
          title: '如何创建小程序',
          positiveText: '知道了',
          onAfterLeave: () =>{
            userStore.setGuideState()
          }
        },
        {
          guideVideo: staticConfig.editVideo1
        }
      )
    }
  }

  // 埋点
  function report(params) {
    sendLog({
      action_type: params.type,
      page: 'detail',
      block: params.block,
      node: params.node || '',
      data: params.data || ''
    })
  }
</script>
<style lang="scss" scoped>
  .scroll-y::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
    padding-right: 4px;
  }

  .scroll-y::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 4px;
    background: #d2d1dc;
    border-radius: 4px;
  }

  .scroll-y::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 4px;
    background: #e5e5ee;
  }

  .builder {
    // min-height: 100vh;
    height: 100vh;
    background: #fff;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    > header {
      height: 72px;
      line-height: 72px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 80px;

      .back {
        font-weight: 400;
        font-size: 16px;
        color: #5b5d62;
        margin-left: 24px;
        display: flex;
        align-items: center;
        cursor: pointer;

        i {
          font-size: 20px;
          margin-right: 4px;
        }
      }

      .right-btn {
        display: flex;
        align-items: center;
        .solution {
          color: #5B5D62;
          margin-right: 24px;
          cursor: pointer;
          &:hover {
            color: #5652ff;
          }
        }
        .submit {
          height: 40px;
          line-height: 40px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 16px;
          color: #5652ff;
          width: 152px;
          text-align: center;
          i {
            font-size: 18px;
            margin-right: 9px;
          }
          border: 1px solid #5652ff;
          background: #fff;
          float: right;
          cursor: pointer;
          &:hover {
            background: #eeedfe;
          }
          .integral-num{
            font-size: 12px;
          }
        }
      }
    }

    .body {
      flex: 1;
      display: flex;
      height: calc(100vh - 72px);
      //小屏适应
      @media screen and (max-width: 1636px) {
        flex-direction: column;
        overflow-y: auto;

        .coding {
          width: auto !important;
          height: auto !important;
          overflow-y: visible !important;
        }
        :deep(.preview-box) {
          overflow-y: visible !important;
        }
        :deep(.bg) {
          height: auto !important;
        }
      }

      .coding {
        padding: 48px 52px;
        box-sizing: border-box;
        min-width: 712px;
        width: 712px;
        background: #f3f3f3;
        height: inherit;
        overflow-y: auto;
      }

      > div:last-child {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: inherit;
      }
    }
  }
</style>
