<!--
 * @Author: Sandy
 * @Date: 2023-05-16 14:31:11
 * @Description: 修改昵称
-->

<template>
  <div class="dialog-content">
    <div class="title">修改昵称</div>
    <div class="content">
      <img :src="userStore.info.avatar || '@/assets/default-user.jpg'" />
      <n-input
        maxlength="15"
        style="border-radius: 4px"
        v-model:value="nickname"
        placeholder="请输入昵称"
        @keydown.enter.prevent="submit"
      />
      <div class="btn-sub" @click="submit()">确定</div>
    </div>
  </div>
</template>

<script setup>
  import { useMessage } from 'naive-ui';
  import $router from '@/router/index';
  import { putInfo } from '@/api/user';
  import { useUserStore } from '@/store/modules/user';
  import { useBizDialog } from '@/plugins';

  const userStore = useUserStore();
  const emit = defineEmits(['close']);
  const dialog = useBizDialog();
  const message = useMessage();
  const nickname = ref(userStore.info.nickname);

  function onCancel() {
    emit('close');
  }
  const submit = async () => {
    if (!nickname.value.trim()) return message.warning('昵称不能为空!');
    const infoData = { ...userStore.info, nickname: nickname.value };
    await putInfo(infoData);
    userStore.setUser(infoData);
    onCancel();
  };
</script>

<style lang="scss">
  .update-nickname-dialog {
    background-color: #ffffff !important;
    border-radius: 12px !important;
    .n-dialog__title {
      justify-content: center;
    }
    .n-dialog__content {
      margin-top: 0 !important;
    }
    .n-base-close.n-dialog__close {
      width: 24px;
      height: 24px;
      margin-top: 22px;
      margin-right: 16px;
    }
  }
</style>
<style lang="scss" scoped>
  .title {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #181d24;
    text-align: center;
  }
  .dialog-content {
    width: 336px;
    background: white;

    font-weight: 400;
    font-size: 16px;
    line-height: 22px;

    color: #5b5d62;

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        margin-top: 30px;
        width: 96px;
        height: 96px;
        border-radius: 50%;
      }
      :deep(.n-input) {
        width: 193px;
        height: 44px;
        line-height: 44px;
        border-radius: 4px;
        margin: 24px 0;

        --n-border-radius: 12px !important;
        --n-font-size: 14px !important;
        --n-height: 42px !important;
        --n-text-color: #202226 !important;
        --n-placeholder-color: #abacae !important;
        background: #f3f3f7;
        --n-caret-color: #202226 !important;
        --n-border-hover: 1px solid transparent !important;
        --n-border-focus: 1px solid transparent !important;
        --n-loading-color: transparent !important;
        --n-box-shadow-focus: 0 0 0 2px transparent !important;
        --n-caret-color-error: #dc504c !important;
        --n-border-error: 1px solid #dc504c !important;
      }
      .btn-sub {
        background: #5652ff;
        border-radius: 8px;
        width: 193px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-weight: 500;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;
        &:hover {
          background: #716efe;
        }
      }
    }
  }
</style>
