<!--
 * @Author: Lemon
 * @Date: 2023-03-30 14:56:58
 * @Description: 运行模版
-->
 
<template>
  <div class="dialog-content">
    <div class="content">
      使用该小程序，需要给原创作者
      <img :src="user.avatar"> <span class="active">
        {{ user.nickname }}
      </span>打赏<span class="active">{{ price }}</span>积分，请确认扣除积分～
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close']);
const props = defineProps({
  user: Object,
  price: Number
})

function onCancel() {
  emit('close');
} 
</script> 

<style lang="scss" scoped>
.dialog-content {
  width: 408px;
  margin-top: 16px;
  background: white;

  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  color: #5B5D62;

  .content {
    img {
      width: 24px;
      height: 24px;
      border-radius: 24px;
      vertical-align: middle;
    }

    .active {
      color: #5652FF;
      font-weight: 500;
    }
  }


}

.iconfont {
  float: right;
  font-size: 24px;
  color: #BEBFC0;
  margin-top: -40px;
  cursor: pointer;

  &:hover {
    color: #5B5D62;
  }
}
</style>
