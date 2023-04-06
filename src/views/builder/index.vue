<!--
 * @Author: Sandy
 * @Date: 2023-03-23 14:47:22
 * @Description: app builder
-->

<template>
  <div class="builder">
    <header>
      <div class="back" @click="$router.go(-1)"><IconFont name="icon-icon-fanhui" />返回</div>

      <n-button @click="submit">
        <IconFont name="icon-icon-fabu"></IconFont>
        发布
      </n-button>
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
  });

  const submit = async (isBack = true) => {
    await refCoding.value.publishApp(isBack);
  };
  const back = () => {
    router.push({
      name: 'view-template-details',
      query: { type: 'save', uuid: state.uuid },
    });
  };
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

      :deep(.n-button) {
        i {
          margin-right: 8px;
        }

        --n-bezier: cubic-bezier(0.4, 0, 0.2, 1);
        --n-bezier-ease-out: cubic-bezier(0, 0, 0.2, 1);
        --n-ripple-duration: 0.6s;
        --n-opacity-disabled: 0.5;
        --n-wave-opacity: 0.6;
        font-weight: 500 !important;
        --n-color: #fff !important;
        --n-color-hover: #fff !important;
        --n-color-pressed: #fff !important;
        --n-color-focus: #fff !important;
        --n-color-disabled: #fff !important;
        --n-ripple-color: #fff !important;
        --n-text-color: #5652ff !important;
        --n-text-color-hover: #5652ff !important;
        --n-text-color-pressed: #5652ff !important;
        --n-text-color-focus: #5652ff !important;
        --n-text-color-disabled: #fff !important;
        --n-border: 1px solid #5652ff !important;
        --n-border-hover: 1px solid #5652ff !important;
        --n-border-pressed: 1px solid #5652ff !important;
        --n-border-focus: 1px solid #5652ff !important;
        --n-border-disabled: 1px solid #5652ff !important;
        --n-height: 40px !important;
        --n-font-size: 16px !important;
        --n-padding: 0 36px !important;
        --n-icon-size: 18px !important;
        --n-icon-margin: 8px !important;
        --n-border-radius: 8px !important;
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
