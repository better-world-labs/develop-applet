<!--
 * @Author: Sandy
 * @Date: 2023-03-23 15:34:48
 * @Description: 
-->

<template>
  <n-collapse
    default-expanded-names="0"
    accordion
    arrow-placement="right"
    @item-header-click="handleItem"
  >
    <n-collapse-item
      :title="item.label"
      :name="i"
      v-for="(item, i) in cardList"
      :key="i"
      class="item-box"
    >
      <n-form
        ref="formRef"
        v-show="i == 0"
        :model="props.appData"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item path="age" label="小程序标题">
          <n-input v-model:value="props.appData.name" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="age" label="小程序描述">
          <n-input
            v-model:value="props.appData.description"
            @keydown.enter.prevent
            type="textarea"
            :autosize="{
              minRows: 3,
              maxRows: 5,
            }"
          />
        </n-form-item>
      </n-form>
      <diy-form v-show="i == 1" :app-data="props.appData"></diy-form>
      <flow v-show="i == 2" :app-data="props.appData"></flow>
      <publish v-show="i == 3" :app-data="props.appData" @submit="publishApp"> </publish>
      <template #arrow>
        <span></span>
      </template>
      <template #header-extra>
        <IconFont
          :style="{ color: item.status ? '#5652FF' : '#E3E4E5', fontSize: '24px' }"
          :name="item.status ? 'icon-icon-yitianwan' : 'icon-a-icon-weitianxiewanStroke'"
        ></IconFont>
      </template>
    </n-collapse-item>
  </n-collapse>
</template>
<script setup>
  import { useMessage } from 'naive-ui';
  import Publish from './process/publish.vue';
  import DiyForm from './process/diy-form.vue';
  import Flow from './process/flow.vue';
  import { putApp } from '@/api/application';
  const props = defineProps(['appData']);
  const emit = defineEmits(['back']);
  const message = useMessage();
  const cardList = reactive([
    {
      label: '小程序详情',
      status: false,
      key: '',
    },
    {
      label: '小程序选项',
      status: true,
      key: 'form',
    },
    {
      label: '小程序编辑',
      status: false,
      key: 'flow',
    },
    {
      label: '发布并分享',
      status: false,
      key: '',
    },
  ]);
  const current = ref(1);
  const rules = {
    name: {
      required: true,
      min: 1,
      message: '最短长度为 1',
    },
    description: {
      required: true,
      min: 2,
      message: '最短长度为 2',
    },
  };
  watchEffect(() => {
    cardList[0].status = props.appData.name && props.appData.description && true;
    cardList[1].status = props.appData.form && props.appData.form.length > 0;
    cardList[2].status =
      props.appData.flow &&
      props.appData.flow[0] &&
      props.appData.flow[0].type &&
      props.appData.flow[0].prompt.length > 0;
    cardList[3].status = props.appData.category && true;
  });
  const handleItem = ({ name }) => {
    console.log(name);
    current.value = name;
  };
  const publishApp = async (isBack = true) => {
    if (cardList.some((a) => a.status != true)) {
      return message.warning('信息未补充完整');
    }
    await putApp(props.appData.uuid, props.appData);

    if (isBack) {
      message.success('发布成功');
      emit('back');
    }
  };
  defineExpose({ publishApp });
</script>
<style lang="scss" scoped>
  .item-box {
    background: #ffffff;
    border-radius: 16px;
    padding: 0 24px;
    box-sizing: border-box;

    &.n-collapse-item--active {
      border: 1px solid #5652ff;
    }

    :deep(.n-collapse-item__content-inner) {
      padding: 24px 0 !important;
      //   margin-top: 24px !important;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    :deep(.n-collapse-item__header-main) {
      font-weight: 500;
      font-size: 20px;
      line-height: 20px;
      color: #181d24;
    }

    :deep(.n-collapse-item__header) {
      padding: 24px 0 !important;
    }

    :deep(.n-form) {
      .n-form-item-label__text {
        font-weight: 500;
        font-size: 16px;
        line-height: 42px;
        color: #5b5d62;
      }

      .n-input {
        font-size: 16px;
        --n-border-radius: 21px !important;
        --n-font-size: 16px !important;
        --n-height: 42px !important;
        background: #f3f3f7;
        --n-caret-color: rgb(51, 54, 57) !important;
        --n-border-hover: 1px solid transparent !important;
        --n-border-focus: 1px solid transparent !important;
        --n-loading-color: transparent !important;
        --n-box-shadow-focus: 0 0 0 2px transparent !important;
        // --n-caret-color: #5652FF !important;
        // --n-border-hover: 1px solid #5652FF !important;
        // --n-border-focus: 1px solid #5652FF !important;
        // --n-loading-color: #5652FF !important;
      }

      --n-bezier: cubic-bezier(0.4, 0, 0.2, 1);
      --n-count-text-color: rgb(118, 124, 130);
      --n-count-text-color-disabled: rgba(194, 194, 194, 1);
      --n-color: rgba(255, 255, 255, 1);
      --n-font-size: 14px;
      --n-height: 34px;
      --n-padding-left: 12px;
      --n-padding-right: 12px;
      --n-text-color: rgb(51, 54, 57);
      --n-text-decoration-color: rgb(51, 54, 57);
      --n-border: 1px solid rgb(224, 224, 230);
      --n-border-disabled: 1px solid rgb(224, 224, 230);
      --n-placeholder-color: rgba(194, 194, 194, 1);
      --n-placeholder-color-disabled: rgba(209, 209, 209, 1);
      --n-icon-size: 16px;
      --n-line-height-textarea: 1.6;
      --n-color-disabled: rgb(250, 250, 252);
      --n-color-focus: rgba(255, 255, 255, 1);
      --n-text-color-disabled: rgba(194, 194, 194, 1);
      --n-box-shadow-focus: 0 0 0 2px rgba(24, 160, 88, 0.2);
      --n-caret-color-warning: #f0a020;
      --n-color-focus-warning: rgba(255, 255, 255, 1);
      --n-box-shadow-focus-warning: 0 0 0 2px rgba(240, 160, 32, 0.2);
      --n-border-warning: 1px solid #f0a020;
      --n-border-focus-warning: 1px solid #fcb040;
      --n-border-hover-warning: 1px solid #fcb040;
      --n-loading-color-warning: #f0a020;
      --n-caret-color-error: #d03050;
      --n-color-focus-error: rgba(255, 255, 255, 1);
      --n-box-shadow-focus-error: 0 0 0 2px rgba(208, 48, 80, 0.2);
      --n-border-error: 1px solid #d03050;
      --n-border-focus-error: 1px solid #de576d;
      --n-border-hover-error: 1px solid #de576d;
      --n-loading-color-error: #d03050;
      --n-clear-color: rgba(194, 194, 194, 1);
      --n-clear-size: 16px;
      --n-clear-color-hover: rgba(146, 146, 146, 1);
      --n-clear-color-pressed: rgba(175, 175, 175, 1);
      --n-icon-color: rgba(194, 194, 194, 1);
      --n-icon-color-hover: rgba(146, 146, 146, 1);
      --n-icon-color-pressed: rgba(175, 175, 175, 1);
      --n-icon-color-disabled: rgba(209, 209, 209, 1);
      --n-suffix-text-color: rgb(51, 54, 57);
    }
  }

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
    background: transparent;
  }
</style>
