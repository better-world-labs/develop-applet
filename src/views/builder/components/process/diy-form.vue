<!--
 * @Author: Sandy
 * @Date: 2023-03-23 16:38:26
 * @Description: 
-->

<template>
  <n-dynamic-input v-model:value="props.appData.form" :on-create="onCreate" :min="1">
    <template #create-button-default> 随便搞点啥 </template>
    <template #default="{ value, index }">
      <div
        class="diy-body"
        :class="{ require: true, firstBlur: value.label == '' && value.status == 'blur' }"
      >
        <div class="index">选项{{ index + 1 }}</div>
        <div class="diy-group">
          <n-input
            :status="value.label == '' && value.status == 'blur' ? 'error' : ''"
            v-model:value="value.label"
            @blur="value.status = 'blur'"
            :placeholder="
              value.label == '' && value.status == 'blur'
                ? '请填写标题'
                : `${index == 0 ? '出发地' : '选项' + (index + 1)}`
            "
            type="text"
          />
          <n-input
            v-model:value="value.properties.placeholder"
            :placeholder="`${
              index == 0 ? '请输入出发地' : '选项' + (index + 1) + '-说明（非必填）'
            }`"
            type="text"
          />
        </div>
        <!-- <div class="del">删除</div> -->
      </div>
    </template>
  </n-dynamic-input>
</template>
<script setup>
  import { v4 as uuid } from 'uuid';
  const props = defineProps(['appData']);
  const model = reactive({
    age: '',
    password: '',
    selectValue: '',
  });
  const onCreate = () => {
    return {
      id: uuid(),
      label: '',
      status: 'normal', //blur
      type: 'text',
      properties: {
        placeholder: '',
      },
    };
  };
</script>
<style lang="scss" scoped>
  :deep(.n-dynamic-input-item__action) {
    margin-top: 3px !important;
  }

  :deep(button.n-button) {
    --n-text-color-hover: #5652ff !important;
    --n-text-color-pressed: #5652ff !important;
    --n-text-color-focus: #5652ff !important;
    --n-border-hover: 1px solid #5652ff !important;
    --n-border-pressed: 1px solid #5652ff !important;
    --n-border-focus: 1px solid #5652ff !important;
    --n-text-color-focus: rgb(51, 54, 57) !important;
    --n-border-focus: 1px solid rgb(224, 224, 230) !important;
  }

  .diy-body {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 12px;

    &.require {
      .index {
        &::after {
          content: '*';
          color: #dc504c;
          font-weight: 400;
          font-size: 16px;
        }
      }
      &.firstBlur {
        :deep(.n-input) {
          &:first-child {
            .n-input__placeholder {
              color: #dc504c;
            }
          }
        }
      }
    }

    .index {
      font-weight: 500;
      font-size: 16px;
      line-height: 42px;
      color: #5b5d62;
      width: 63px;
    }

    :deep(.diy-group) {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .n-input {
        font-size: 14px;
        --n-border-radius: 21px !important;
        --n-font-size: 14px !important;
        --n-height: 42px !important;
        background: #f3f3f7;
        margin-bottom: 16px;
        // --n-caret-color: #5652FF !important;
        // --n-border-hover: 1px solid #5652FF !important;
        // --n-border-focus: 1px solid #5652FF !important;
        // --n-loading-color: #5652FF !important;
        --n-caret-color: rgb(51, 54, 57) !important;
        --n-border-hover: 1px solid transparent !important;
        --n-border-focus: 1px solid transparent !important;
        --n-loading-color: transparent !important;
        --n-box-shadow-focus: 0 0 0 2px transparent !important;
        .n-input__border {
          border: 0 none !important;
        }
        .n-input__state-border {
          box-shadow: none;
        }
      }
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
