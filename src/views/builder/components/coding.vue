<!--
 * @Author: Sandy
 * @Date: 2023-03-23 15:34:48
 * @Description: 
-->

<template>
  <div class="n-collapse">
    <div
      v-for="(item, i) in cardList"
      :key="i"
      @click="handleItem(i)"
      :class="{ 'n-collapse-item--active': i === current }"
      class="n-collapse-item n-collapse-item--right-arrow-placement item-box"
    >
      <div class="n-collapse-item__header n-collapse-item__header--active">
        <div class="n-collapse-item__header-main">{{ item.label }}</div>
        <div class="n-collapse-item__header-extra">
          <IconFont
            :style="{ color: item.status ? '#5652FF' : '#E3E4E5', fontSize: '20px' }"
            :name="item.status ? 'icon-icon-yitianwan' : 'icon-a-icon-weitianxiewanStroke'"
          ></IconFont>
        </div>
      </div>
      <n-collapse-transition :show="i === current">
        <div class="n-collapse-item__content-wrapper" style="">
          <div class="n-collapse-item__content-inner">
            <n-form
              ref="formRef"
              v-show="i == 0"
              :rules="rules"
              :model="props.appData"
              label-placement="left"
              label-width="auto"
              require-mark-placement="right-hanging"
            >
              <n-form-item
                path="age"
                label="小程序标题"
                :class="{
                  require: true,
                  firstBlur: props.appData.name == '' && appNameStatus == 'blur',
                }"
              >
                <n-input
                  :status="props.appData.name == '' && appNameStatus == 'blur' ? 'error' : ''"
                  type="textarea"
                  :autosize="{
                    minRows: 1,
                  }"
                  @blur="appNameStatus = 'blur'"
                  style="border-radius: 21px"
                  v-model:value="props.appData.name"
                  :placeholder="
                    props.appData.name == '' && appNameStatus == 'blur' ? '请填写标题' : '旅行攻略'
                  "
                  @keydown.enter.prevent
                />
              </n-form-item>
              <n-form-item path="age" label="小程序描述">
                <n-input
                  v-model:value="props.appData.description"
                  placeholder="输入出发地、目的地、天数和预算，给你生成一个诚意和细节都满满的行程安排"
                  type="textarea"
                  :autosize="{
                    minRows: 3,
                  }"
                />
              </n-form-item>
            </n-form>
            <diy-form v-show="i == 1" :app-data="props.appData"></diy-form>
            <flow v-if="i == 2" :app-data="props.appData"></flow>
            <publish v-show="i == 3" :app-data="props.appData" @submit="publishApp"> </publish>
          </div>
        </div>
      </n-collapse-transition>
    </div>
  </div>
</template>
<script setup>
  import { useMessage } from 'naive-ui';
  import { ref, reactive } from 'vue';
  import Publish from './process/publish.vue';
  import DiyForm from './process/diy-form.vue';
  import Flow from './process/flow.vue';
  import { putApp } from '@/api/application';
  import { useBizDialog } from '@/plugins';
  const props = defineProps(['appData']);
  const emit = defineEmits(['back']);
  const message = useMessage();
  const dialog = useBizDialog();
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
  const appNameStatus = ref('normal'); //blur

  const current = ref(0);
  const rules = {
    name: {
      required: true,
      message: '最短长度为 1',
    },
    description: {
      required: false,
    },
  };
  watchEffect(() => {
    cardList[0].status = props.appData.name && true;
    cardList[1].status =
      props.appData.form && props.appData.form.length && props.appData.form.every((a) => a.label);
    cardList[2].status =
      props.appData.flow &&
      props.appData.flow[0] &&
      props.appData.flow[0].type &&
      props.appData.flow[0].prompt.length > 0;
    cardList[3].status = props.appData.category && true;
  });
  const handleItem = (i) => {
    current.value = i;
  };
  const publishApp = async (isBack = true) => {
    props.appData.formItemsStatus = 'blur';
    props.appData.form = props.appData.form.map((element) => {
      element.status = 'blur';
      return element;
    });
    appNameStatus.value = 'blur';
    if (current.value === 2) current.value = 0;
    // return console.log(props.appData);
    if (cardList.some((a) => a.status != true)) {
      return message.warning('请检查模板配置，完整填写后再提交哟~');
    }
    try {
      const tags = props.appData.flow[0].prompt.filter((f) => f.type === 'tag');
      if (tags.some((t) => !props.appData.form.find((f) => f.id == t.properties.character))) {
        return message.warning('小程序编辑中使用了不存在的选项,请检查修改');
      }
    } catch (error) {}

    try {
      await putApp(props.appData.uuid, props.appData);
      if (isBack) {
        message.success('发布成功'); 
        emit('back');
      }
    } catch (error) { 
      if (error?.response?.code == 500000) {
        dialog.open('insufficient', {
          class: 'insufficient-dialog',
          title: '积分不够啦',
        });
      } else {
        message.error(error?.response?.msg);
      }
    }
  };
  defineExpose({ publishApp });
</script>
<style lang="scss" scoped>
  .n-collapse {
    --n-font-size: 14px;
    --n-bezier: cubic-bezier(0.4, 0, 0.2, 1);
    --n-text-color: rgb(51, 54, 57);
    --n-divider-color: rgb(239, 239, 245);
    --n-title-font-size: 14px;
    --n-title-text-color: rgb(31, 34, 37);
    --n-title-text-color-disabled: rgba(194, 194, 194, 1);
    --n-title-font-weight: 400;
    --n-arrow-color: rgb(51, 54, 57);
    --n-arrow-color-disabled: rgba(194, 194, 194, 1);
    --n-item-margin: 16px 0 0 0;
  }
  .item-box {
    background: #ffffff;
    border-radius: 16px;
    padding: 0 24px;
    box-sizing: border-box;
    user-select: none;
    cursor: pointer;
    &.n-collapse-item--active {
      border: 1px solid #5652ff;
    }
    & + .item-box {
      margin-top: 16px;
    }

    :deep(.n-collapse-item__content-inner) {
      padding: 16px 0 !important;
      //   margin-top: 24px !important;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    :deep(.n-collapse-item__header-main) {
      font-weight: 500;
      font-size: 18px;
      line-height: 20px;
      color: #181d24;
    }

    :deep(.n-collapse-item__header) {
      padding: 18px 0 !important;
      display: flex;
      align-items: center;
      .n-collapse-item__header-extra {
        margin-left: auto;
      }
    }

    :deep(.n-form) {
      .n-form-item-label__text {
        font-weight: 500;
        font-size: 16px;
        line-height: 42px;
        color: #5b5d62;
      }

      .n-form-item {
        .n-form-item-label {
          padding-right: 6px !important;
          .n-form-item-label__text {
            position: relative;
            &::after {
              position: absolute;
              content: '';
              top: 50%;
              right: -9px;
              color: #dc504c;
              font-weight: 400;
              transform: translateY(-50%);
              font-size: 16px;
            }
          }
        }
        &.require {
          .n-form-item-label {
            .n-form-item-label__text {
              &::after {
                content: '*';
              }
            }
          }
          &.firstBlur {
            .n-input__placeholder {
              color: #dc504c;
            }
          }
        }
      }

      .n-input {
        font-size: 14px;
        --n-border-radius: 12px !important;
        --n-font-size: 14px !important;
        --n-height: 42px !important;
        background: #f3f3f7;
        --n-caret-color: rgb(51, 54, 57) !important;
        --n-border-hover: 1px solid transparent !important;
        --n-border-focus: 1px solid transparent !important;
        --n-loading-color: transparent !important;
        --n-box-shadow-focus: 0 0 0 2px transparent !important;
        --n-caret-color-error: #dc504c !important;
        --n-border-error: 1px solid #dc504c !important;
        // --n-caret-color: #5652FF !important;
        // --n-border-hover: 1px solid #5652FF !important;
        // --n-border-focus: 1px solid #5652FF !important;
        // --n-loading-color: #5652FF !important;
        .n-input__border {
          border: 0 none !important;
        }
        .n-input__state-border {
          box-shadow: none;
        }
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
      --n-caret-color-error: #dc504c;
      --n-color-focus-error: rgba(255, 255, 255, 1);
      --n-box-shadow-focus-error: 0 0 0 2px rgba(208, 48, 80, 0.2);
      --n-border-error: 1px solid #dc504c;
      --n-border-focus-error: 1px solid #dc504c;
      --n-border-hover-error: 1px solid #dc504c;
      --n-loading-color-error: #dc504c;
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
