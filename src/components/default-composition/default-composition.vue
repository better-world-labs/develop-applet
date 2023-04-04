<!--
 * @Author: Lemon
 * @Date: 2023-03-23 09:43:30
 * @Description: 缺省组建
-->
<template>
    <div>
       <img src="@/assets/default-bg.png" alt="">
        <span> {{ props.content }}</span>
    </div>
</template>
<script setup>
const props  = defineProps(['content'])
</script>
<style lang="scss" scoped>
div{
    // height: 100%;  
    color: #ABACAE;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: center;   
    padding-top: calc(50% - 328px);

    img{
        width: 112px;
        height: 112px; 
        margin:0 auto;
        display: block;
        margin-bottom: 20px;
        
    }
} 
</style>