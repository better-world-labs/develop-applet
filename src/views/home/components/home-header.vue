<!--
 * @Author: Lemon
 * @Date: 2023-03-22 15:39:33
 * @Description: 广场顶部
-->
<template>
    <div class="home-header">
        <n-tabs animated :default-value="applicationStore.currentTab" @update:value="handleUpdateValue">
            <n-tab-pane v-for="tab in applicationStore.tabs" :name="tab.category" :tab="tab.label">
            </n-tab-pane>
        </n-tabs>
        <n-button type="info" @click="createTemplate">
            创建我的小程序
        </n-button>
        <user-integral></user-integral>
    </div>
</template>
<script setup>
import $router from '@/router/index';
import UserIntegral from "./user-integral.vue"
import { useApplicationStore } from "@/store/modules/application"
import { useInit } from '@/hooks/useInit';
import { useUserStore } from "@/store/modules/user"

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


onMounted(() => {
    applicationStore.getTabs();
})


</script>
<style lang="scss">
.home-header .n-tabs {
    flex: 1;
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
</style> 