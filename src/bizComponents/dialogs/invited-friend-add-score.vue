<!--
 * @Author: Lemon
 * @Date: 2023-04-28 15:43:48
 * @Description: 邀请好友得积分
--> 
<template>
    <div class="share-content">
        <div class="content">
            <div style="margin-bottom: 8px;">
                哇塞！你已成功邀请好友 {{ nameList.join("、") }}
            </div>
            <div style="margin-bottom: 22px;">
                恭喜获得 <span class="active-text">{{ props.data.payload.points }}</span> 积分
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['data'])
const nameList = ref([]);
const len = props.data.payload.friends.length > 3 ? 3 : props.data.payload.friends.length;
for (let index = 0; index < len; index++) {
    nameList.value.push(props.data.payload.friends[index].nickname);
}

</script>   
<style lang="scss" scoped></style>