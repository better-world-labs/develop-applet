<!--
 * @Author: Lemon
 * @Date: 2022-09-30 14:34:16
 * @LastEditTime: 2023-04-21 11:05:11
 * @Description: 
-->
<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <MessageContent />
      <n-modal ref="appDialog" v-model:show="show" preset="dialog" class="content-dialog"  :show-icon="false"
        @after-leave="onClose" :closable="false" v-bind="dialogProps" @positive-click="onPositive">
        <template #header>
          <div>
            <div class="title" :class="dialogProps?.titlePlacement ? `title--${dialogProps?.titlePlacement}` : ''">
              {{ dialogProps?.title }}
            </div>
            <IconFont class="close-btn" name="icon-icon-guanbi-da" @click="closeHandler" />
          </div>
        </template>
        <component v-bind="data" ref="dialogComp" @close="show = false" :is="__d_dialogName" />
      </n-modal>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { MessageContent } from '@/components/message-content';
import { close } from './index';
import type { BaseModalProps } from './index';
import { darkTheme } from 'naive-ui';

const props = defineProps({
  data: Object,
  dialogProps: Object as PropType<BaseModalProps>,
  // eslint-disable-next-line
  __d_dialogName: String,
  // eslint-disable-next-line
  __d_useShow: Function,
});
const show = props.__d_useShow?.();
function onClose() {
  close();
}

const appDialog = ref();
const dialogComp = ref();
function onPositive() {
  const compRef = dialogComp.value;
  props.dialogProps?.handlePositiveClick?.({
    data: compRef?.dialogData,
    ref: compRef,
  });
  // 开启表单验证后 点击内置确认按钮时 根据dialog内部组件valid属性判断弹窗是否关闭
  if (props.dialogProps?.openValid) {
    return compRef?.valid;
  }
}

function closeHandler() {
  appDialog.value.doUpdateShow(false);
}
</script>
