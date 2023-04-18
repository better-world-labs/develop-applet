<!--
 * @Author: 刘一笔
 * @Date: 2023-04-18 15:02:32
 * @Description: 编辑页的弹窗
-->
<template>
  <div class="guide-popup">
    <IconFont @click="onCancel" name="icon-icon-guanbi-xiao" />
    <div class="guide-video">
      <video :src="props.guideVideo" alt="" autoplay loop></video>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close']);
function onCancel() {
  emit('close');
}
const props = defineProps(['guideVideo'])
</script>
<style lang="scss">
.n-dialog.n-modal {
  background: white !important;

  .n-dialog__action {
    text-align: right;
    margin-top: 48px;

    .n-button {
      min-width: 68px;
      height: 36px;
      border-radius: 8px !important;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      background: #E3E4E5;
      margin-left: 12px;
      color: #202226;
    }

    .n-button.n-button--primary-type {
      background: #5652FF !important;
      color: #FFFFFF;
    }
    .n-button.n-button--default-type {
      background-color: #FFFFFF;
      border: 1px solid #5652FF;
      color: #5652FF;
    }
  }
}
</style>

<style lang="scss" scoped>
.guide-popup {
  width: 408px;
  margin-top: 16px;
  background: white;

  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  color: #5B5D62;
}
// 图标位置
.iconfont {
  float: right;
  font-size: 24px;
  color: #D9D9D9;
  margin-top: -40px;
  cursor: pointer;
}
.guide-popup {
	.guide-video{
    padding: 4px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    video {
      width: 100%;
    }
  }
}
</style>