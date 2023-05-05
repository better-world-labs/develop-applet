<!--
 * @Author: Lemon
 * @Date: 2023-04-28 15:43:48
 * @Description: 邀请好友得积分
--> 
<template>
    <div class="share-content">
        <div class="content">
            <div>
                哇塞！你已成功邀请好友 {{ nameList.join("、") }}
            </div>
            <div>
                恭喜获得 <span class="active-text">{{ props.payload.points }}</span> 积分
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['data'])
const nameList = ref([]);
for (let index = 0; index < 3; index++) {
    nameList.value.push(props.payload.friends[index].nickname);
}

// const emit = defineEmits(['close']);

// function onCancel() {
//     emit('close');
// }

</script>   
<style lang="scss" scoped></style>