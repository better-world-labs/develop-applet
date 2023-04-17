<!--
 * @Author: Lemon
 * @Date: 2023-04-17 10:21:38
 * @Description: 举例使用静态资源
-->
<template>
    <div>
        <video :src="homeVideo1" style="width: 400px;height: 200px;"></video>
    </div>
</template>
<script  lang="ts" setup>
// 标签使用方式 
import staticConfig from '@/settings/staticConfig';
const { homeVideo1 } = staticConfig;

</script>
<style scoped lang="scss">
// css shi使用方式
@import '../styles/static-config.scss';

div{ 
    background-image: url($entryBg);
}
</style>
