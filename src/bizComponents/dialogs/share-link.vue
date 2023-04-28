<!--
 * @Author: Lemon
 * @Date: 2023-04-27 17:30:46
 * @Description: 分享链接
--> 
<template>
    <div class="share-content">
        <div class="content">
            <div>
                <input type="text" :disabled="true" :value="url">
                <n-popover placement="top" trigger="hover">
                    <template #trigger>
                        <IconFont name="icon-icon-shequnhefankui" @click="onCopy" />
                    </template>
                    <div class="large-text">
                        复制
                    </div>
                </n-popover>
            </div>
            <div>
                邀请好友注册，最高可得100积分！<span class="active-text" @click="getMore">点击了解更多玩法>></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import $router from '@/router/index';
import useClipboard from 'vue-clipboard3';
import { useUserStore } from '@/store/modules/user';
const { toClipboard } = useClipboard();
const emit = defineEmits(['close']);
const userStore = useUserStore();
const url = ref("");

function onCancel() {
    emit('close');
}

async function onCopy() {
    e.stopPropagation();
    url.value = `${com}?invitedBy=${userStore.userId}`;
    try {
        await toClipboard(url.value);
        message.success('已复制，快去分享给朋友吧~');
    } catch (e) {
        console.error(e);
    }
}

function getMore() {
    onCancel();
    $router.push({ name: 'my-integral' });
}

onMounted(() => {
    url.value = window.location.href.substr(0, window.location.href.lastIndexOf('/'));
})
</script>  
<style lang="scss">
.center-dialog {
    background: linear-gradient(180deg, rgba(211, 210, 252, 1) 0%, rgba(255, 255, 255, 1) 40.04%) !important;
    background-color: white;

    .n-dialog__title {
        >div {
            width: 100%;
            text-align: center !important;
        }
    }
}
</style>
<style lang="scss" scoped>
.share-content {
    width: 402px;
    margin-top: 24px;
    background: white;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #5B5D62;

    .content {

        .active-text {
            color: rgba(86, 82, 255, 1);
            cursor: pointer;
        }

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
    }
}
</style>