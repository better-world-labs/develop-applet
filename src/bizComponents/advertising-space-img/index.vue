<!--
 * @Author: Lemon
 * @Date: 2023-05-15 11:00:07
 * @Description: 广告位图片
-->
<template>
    <div>
        <n-popover v-if="props.item.target.type == 'image'" trigger="click" :show-arrow="false" class="popover-feed">
            <template #trigger>
                <div>
                    <img :src="props.item.thumbnail" alt="" />
                </div>
            </template>
            <div class="code-feed" style="height:112px">
                <img :src="props.item.target.url" alt="" />
            </div>
        </n-popover>
        <div v-else>
            <img :src="props.item.thumbnail" alt="" @click="openUrl(props.item.target.url)" />
        </div>
    </div>
</template>
<script setup>
const props = defineProps(['item'])

const openUrl = (url) => {
    window.open(url, "_blank");
}
</script>
<style lang="scss" scoped>
img {
    width: 280px;
    height: 80px;
    padding-bottom: 0px;
    border: none;
}

.popover-feed {
    padding: 8px !important;

    .code-feed {
        img {
            width: 112px;
            height: 112px;
            background: #f5f5f5;
            border-radius: 4px;
        }
    }

}
</style>
