<!--
 * @Author: Lemon
 * @Date: 2023-04-27 17:30:46
 * @Description: 分享链接
--> 
<template>
    <div class="share-content">
        <div class="content">
            <share-input></share-input>
            <div>
                邀请好友注册，最高可得100积分！<span class="active-text" @click="getMore">点击了解更多玩法>></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { sendLog } from '@/utils/sls-logger/sendLog';
import shareInput from "./components/share-input.vue"
import $router from '@/router/index';

const emit = defineEmits(['close']);

function onCancel() {
    emit('close');
}

function getMore() {
    sendLog({
        action_type: 'Click',
        page: 'home',
        block: 'help_share',
        node: 'more',
        data: ''
    })
    onCancel();
    $router.push({ name: 'my-integral' });
}

</script>    
<style lang="scss" scoped></style>