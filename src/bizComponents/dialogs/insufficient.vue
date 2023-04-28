<!--
 * @Author: Sandy
 * @Date: 2023-04-26 10:45:58
 * @Description: 积分不足 insufficient
-->

<template>
  <div class="dialog-content">
    <div class="content">积分余额不足，你可以邀请好友或直接充值获得积分哟~</div>
    <div class="actions">
      <div class="btn-add">邀请好友<span>+100积分</span></div>
      <div class="btn-sub">0.99元得50积分</div>
    </div>
  </div>
</template>

<script setup>
  const emit = defineEmits(['close']);
  const props = defineProps({
    user: Object,
    price: Number,
  });

  function onCancel() {
    emit('close');
  }
</script>

<style lang="scss">
  .insufficient-dialog {
    .n-dialog__title {
      justify-content: center;
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
  .dialog-content {
    width: 480px;
    margin-top: 8px;
    background: white;

    font-weight: 400;
    font-size: 16px;
    line-height: 22px;

    color: #5b5d62;

    .content {
      text-align: center;
    }
  }

  .actions {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    .btn-add {
      background: #eeedfe;
      border: 1px solid #5652ff;
      border-radius: 8px;
      width: 126px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      color: #5652ff;
      cursor: pointer;
      position: relative;
      &:hover {
        background: #d6d3ff;
      }
      span {
        position: absolute;
        top: -16px;
        right: -54px;
        font-weight: 500;
        font-size: 13px;
        line-height: 26px;
        color: #887242;
        text-align: center;
        width: 75px;
        height: 26px;
        border-top-left-radius: 8px;
        border-bottom-right-radius: 8px;
        border-top-right-radius: 8px;
        border: 1px solid #fff4e4;
        // border-image: linear-gradient(45deg, #fff4e4 100%, #fff2d0 100%); /* Added */
        background: linear-gradient(177.63deg, #f9e5b9 1.99%, #efd08b 120.2%);
      }
    }
    .btn-sub {
      margin-left: 80px;
      background: #5652ff;
      border-radius: 8px;
      width: 126px;
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

  // .iconfont {
  //   float: right;
  //   font-size: 24px;
  //   color: #bebfc0;
  //   margin-top: -40px;
  //   cursor: pointer;
  //   &:hover {
  //     color: #5b5d62;
  //   }
  // }
</style>
