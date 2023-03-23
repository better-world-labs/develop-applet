<!--
 * @Author: Lemon
 * @Date: 2023-03-23 09:43:30
 * @Description: 用户积分
-->
<template>
    <div class="user-integral">
        <n-image width="36" src="../../../assets/test.jpg" />
        <div>
            <div>章三</div>
            <div><span class="active-text">323</span>积分</div>
        </div>
    </div>
</template>
<script setup>

</script>
<style lang="scss" scoped>
.user-integral {
    height: 160px;
    margin-left: 24px;
    background: #F3F3F7;
    border-radius: 12px;
    height: 52px;
    padding: 8px 12px;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    color: #202226;
    box-sizing: border-box;

    display: flex;
    flex-direction: row;

    image {
        width: 36px !important;
        height: 36px !important;
        border-radius: 36px;
        margin-right: 8px;

    }

    div:last-child {
        color: rgba(91, 93, 98, 1);
        margin-top: 4px;

        .active-text {
            color: rgba(86, 82, 255, 1);
        }
    }
}
</style>