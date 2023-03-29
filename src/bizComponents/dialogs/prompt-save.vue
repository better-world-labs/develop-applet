<!--
 * @Author: Lemon
 * @Date: 2023-03-29 09:25:13
 * @Description: 
--> 
<template>
  <div class="dialog-content">
    <IconFont @click="onCancel" name="icon-icon-guanbi-xiao" />
    <div>
      当前页面有内容未保存，是否确认退出？
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close']);
function onCancel() {
  emit('close');
} 
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
      border-radius: 2px;
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
  }
}
</style>

<style lang="scss" scoped>
.dialog-content {
  width: 408px;
  margin-top: 16px;
  background: white;

  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  color: #5B5D62;
}

.iconfont {
  float: right;
  font-size: 24px;
  color: #D9D9D9;
  margin-top: -40px;
  cursor: pointer;
}
</style>
