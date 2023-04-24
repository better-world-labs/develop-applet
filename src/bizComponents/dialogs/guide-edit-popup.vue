<!--
 * @Author: 刘一笔
 * @Date: 2023-04-18 15:02:32
 * @Description: 编辑页的弹窗
-->
<template>
  <div class="guide-popup"> 
    <div class="guide-video">
      <n-spin v-show="!canplayVideo" size="small"/>
      <video v-show="canplayVideo" :src="props.guideVideo" alt="" autoplay loop @canplay="canplay()"></video>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close']); 
const props = defineProps(['guideVideo']);
const canplayVideo = ref(false);
function canplay() {
  canplayVideo.value = true;
}
</script>
<style lang="scss">
.guide-edit-popup.n-modal { 
  padding: 20px !important; 
    .n-dialog__title {
     color: #5652FF;
    }
 
}
</style>

<style lang="scss" scoped>
.guide-popup {
  width: 616px; 
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
  color: #BEBFC0;
  margin-top: -40px;
  cursor: pointer;
  &:hover {
    color: #5B5D62;
  }
}
.guide-popup {
	.guide-video{ 
    background: red($color: #000000);
    padding: 0px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px; 
    width: 614px;  
    height: 386px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    video { 
      width: 100%;   
      border-radius: 8px;
    }
  }
}
</style>