<!--
 * @Author: Lemon
 * @Date: 2023-04-28 15:28:57
 * @Description: 获取积分加复制地址
--> 
<template>
    <div class="share-content">
        <div class="content">
            <div class="title1">
                {{ props.title1 }}
            </div>
            <div class="title2">
                {{ props.title2 }} <span class="active-text"> {{ props.integral }} </span> 积分😊
            </div>
            <share-input v-if="!props.isNotCopy"></share-input>
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