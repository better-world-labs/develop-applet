<!--
 * @Author: Lemon
 * @Date: 2023-04-28 15:43:48
 * @Description: 邀请好友得积分
--> 
<template>
    <div class="share-content">
        <div class="content">
            <div>
                哇塞！你已成功邀请好友xxxx
            </div>
            <div>
                恭喜获得 <span class="active-text"></span> 积分
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['title1', 'title2', "integral"])
// const emit = defineEmits(['close']);

// function onCancel() {
//     emit('close');
// }

</script>   
<style lang="scss" scoped></style>