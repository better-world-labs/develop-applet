<!--
 * @Author: 刘一笔
 * @Date: 2023-04-14 22:19:33
 * @Description: 用于新手引导
-->
<template>
    <div class="guide-popup">
			<IconFont @click="onCancel" name="icon-icon-guanbi-xiao" />
			<div class="guide-title">{{ props.guideTitle }}</div>
			<div class="guide-content">{{ props.guideContent }}</div>
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
const props = defineProps(['guideTitle', 'guideContent', 'guideVideo'])
</script>
<style lang="scss">
.guide-wrap.n-dialog {
  position: fixed;
	right: 60px;
	bottom: 40px;
  width: 424px;
} 
</style>

<style lang="scss" scoped>
.guide-popup {
  width: 376px; 
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
  overflow: hidden;
	.guide-title {
		color: #5652FF;
		margin-bottom: 16px;
		font-size: 20px;
		font-weight: 500;
	}
  .guide-content {
    margin-bottom: 16px;
  }
	.guide-video{ 
    padding: 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    height: 235px;

    video {
      border-radius: 8px;
      width: 374px;  
      margin: 0;
    }
  }
}
</style>