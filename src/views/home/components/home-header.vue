<!--
 * @Author: Lemon
 * @Date: 2023-03-22 15:39:33
 * @Description: 广场顶部
-->
<template>
    <div class="home-header">
        <n-tabs animated>
            <n-tab-pane name="oasis" tab="Oasis">
            </n-tab-pane>
            <n-tab-pane name="the beatles" tab="the Beatles">
            </n-tab-pane>
            <n-tab-pane name="jay chou" tab="周杰伦">
            </n-tab-pane>
        </n-tabs>
        <n-button type="info">
            创建我的小程序
        </n-button>
        <user-integral></user-integral>
    </div>
</template>
<script setup>
import UserIntegral from "./user-integral.vue"
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