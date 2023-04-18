<!--
 * @Author: Lemon
 * @Date: 2023-03-22 15:39:33
 * @Description: 广场顶部
-->
<template>
    <div class="home-header">
        <div class="tabs">
            <n-tabs animated v-if="applicationStore.tabs.length" @update:value="handleUpdateValue">
                <n-tab-pane v-for="tab in applicationStore.tabs" :key="tab.category" :name="`${tab.category}`"
                    :tab="`${tab.label}`">
                </n-tab-pane>
            </n-tabs>
        </div>
        <n-button type="info" @click="createTemplate">
            <IconFont name="icon-icon-chuangjianwodexiaochengxu" />
            创建我的小程序
            <div ref="animationRef"></div>
        </n-button>
        <user-integral></user-integral>
    </div>
</template>
<script setup>
import $router from '@/router/index';
import { useApplicationStore } from "@/store/modules/application"
import { useInit } from '@/hooks/useInit';
import { useUserStore } from "@/store/modules/user"
import { ref } from 'vue'

const animationRef = ref()
const applicationStore = useApplicationStore();

const userStore = useUserStore();
const { goAuth } = useInit()
// 创建模版
function createTemplate() {
    if (!userStore.token) goAuth();
    $router.push({ name: 'builder' });
}

const handleUpdateValue = (category) => {
    applicationStore.setCurrentTab(category);
};

let animationTime = ''
watch(() => applicationStore.finishCount, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    // 动画开始
    animationRef.value.classList.add('guide-animation')
    // 5s 后结束
    animationTime = setTimeout(()=>{
      animationRef.value.classList.remove('guide-animation')
    },5500)
  }
})

onMounted(() => {
    applicationStore.getTabs();
})
onUnmounted(() => {
  clearTimeout(animationTime)
})


</script>
<style lang="scss">
.home-header .tabs {
    flex: 1;
}

.home-header .n-tabs {
    height: 50px;
    padding-top: 10px;

    .n-tabs-tab .n-tabs-tab__label {
        color: #5B5D62;
        font-weight: 400;
        font-size: 16px;
    }

    .n-tabs-tab.n-tabs-tab--active .n-tabs-tab__label {
        color: #202226 !important;
        font-weight: 600;
    }

    .n-tabs-bar {
        background: #5652FF !important;
    }
}
.home-header .guide-animation {
    position: relative;
    transform:rotate(-55deg);
    background: rgba(255,255,255,.5);
    box-shadow: 0 0 30px 20px rgba(255,255,255, 0.6);
    animation:move 1.5s infinite ;
    @keyframes move{
        from{left:-150px;}
        to{left:10px;}
    }
}
</style> 