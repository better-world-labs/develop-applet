<!--
 * @Author: Lemon
 * @Date: 2023-04-28 15:20:56
 * @Description: 
-->
<template>
    <div>
        <input type="text" :disabled="true" :value="url">
        <n-popover placement="top" trigger="hover">
            <template #trigger>
                <IconFont name="icon-icon-fuzhi" @click="onCopy()" />
            </template>
            <div class="large-text">
                复制
            </div>
        </n-popover>
    </div>
</template>
<script setup>
import useClipboard from 'vue-clipboard3';
import { useUserStore } from '@/store/modules/user';
import { useMessage } from 'naive-ui';

const message = useMessage();
const { toClipboard } = useClipboard();
const userStore = useUserStore();
const url = ref("");

async function onCopy() {
    url.value = `${url.value}?invitedBy=${userStore.userId}`;
    try {
        await toClipboard(url.value);
        message.success('已复制，快去分享给朋友吧~');
    } catch (e) {
        console.error(e);
    }
}

onMounted(() => {
    url.value = window.location.href.substr(0, window.location.href.lastIndexOf('/'));
})
</script>  
<style lang="scss" scoped>
input {
    width: 362px;
    height: 40px;
    box-sizing: border-box;
    line-height: 20px;
    color: #202226;
    padding: 12px 16px;
    background: #F3F3F3;
    border-radius: 4px;
    border: none;
    margin-bottom: 16px;
    margin-right: 16px;
    cursor: text;
}

.iconfont {
    font-size: 24px;
    color: #BEBFC0;
    cursor: pointer;

    &:hover {
        color: #5b5d61;
    }
}
</style>