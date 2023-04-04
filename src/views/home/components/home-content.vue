<!--
 * @Author: Lemon
 * @Date: 2023-03-22 15:50:05
 * @Description: 
-->
<template>
    <div class="home-content">
         <default-composition v-if="applicationStore.appList.length <= 0" content="暂无小程序哦~"></default-composition>
        <n-grid :x-gap="12" cols="1 s:1 m:2 l:3 xl:3 2xl:4" responsive="screen">
            <n-grid-item v-for="item in applicationStore.appList" :key="item.id" >
                <div class="template-item" @click="useTemplate(item)">
                    <div class="desc-text">
                        {{ item.name }}
                    </div>
                    <div class="result-text">
                        <div v-if="item.results[0]">
                            <span>精彩结果1:</span>
                            {{ item.results[0]?.content }}
                        </div>
                        <div v-if="item.results[1]">
                            <span>精彩结果2:</span> {{ item.results[1]?.content }}
                        </div>
                    </div>
                    <div class="footer-options">
                        <div class="left">
                            <img :src="item.createdBy.avatar || '../../assets/default-user.jpg'" />
                            <div>
                                {{ item.createdBy.nickname }}
                            </div>
                        </div>
                        <div class="right">
                            <div class="text-box" style="margin-right:24px">
                                <icon-font-symbol name="icon-icon-pinglun" />
                                <div>
                                    65
                                </div>
                            </div>
                            <div class="text-box">
                                <IconFontSymbol name="icon-icon-dianzan" />
                                <div>
                                    348
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </n-grid-item>
        </n-grid>
    </div>
</template>
<script setup>
import $router from '@/router/index';
import { useInit } from '@/hooks/useInit';
import { useUserStore } from "@/store/modules/user"
import { useApplicationStore } from "@/store/modules/application"
const applicationStore = useApplicationStore();
const userStore = useUserStore();
const { goAuth } = useInit()
// 使用模版
function useTemplate(item) {
    if (!userStore.token) goAuth();
    $router.push({ name: 'view-template-details', query: { uuid: item.uuid } });
}
</script>
<style lang="scss" scoped> .home-content {
     padding: 48px 32px 48px 52px;
     background: linear-gradient(180deg, #F3F3F6 0%, #EDEFFC 100%);
     position: absolute;
     height: calc(100% - 72px);
     width: calc(100% - 312px);
     overflow-x: hidden;
     box-sizing: border-box;
     overflow-y: scroll;

     .template-item {
         background: #FFFFFF;
         box-shadow: 0px 6px 16px rgba(211, 213, 235, 0.4);
         border-radius: 24px;
         margin-bottom: 24px;
         padding: 24px;
         margin-right: 20px;
         cursor: pointer;

         .desc-text {
             font-weight: 500;
             font-size: 28px;
             line-height: 40px;
             color: #181D24;
             height: 80px;
             margin-bottom: 16px;
             overflow: hidden;
             text-overflow: ellipsis;
             display: -webkit-box;
             -webkit-line-clamp: 2;
             -webkit-box-orient: vertical;
            

         }

         .result-text {
             height: 170px;
             background-color: #F3F3F7;
             border-radius: 10px;
             padding: 20px 12px;
             font-weight: 400;
             font-size: 14px;
             line-height: 18px;
             color: rgba(91, 93, 98, 1);
             background-image: url(../../../assets/bg.png);
             background-repeat: no-repeat; 
             white-space: pre-line;


             >div {
                 overflow: hidden;
                 text-overflow: ellipsis;
                 display: -webkit-box;
                 -webkit-line-clamp: 4;
                 -webkit-box-orient: vertical;
             }

             >div:first-child {
                 margin-bottom: 24px;
             }

             span {
                 color: rgba(145, 142, 255, 1);
             }

         }

         .footer-options {
             margin-top: 16px;
             display: flex;
             flex-direction: row;
             font-weight: 400;
             font-size: 16px;
             line-height: 32px;
             color: #5B5D62;

             .left {
                 display: flex;
                 flex-direction: row;

                 img {
                     width: 32px;
                     height: 32px;
                     border-radius: 32px;
                     margin-right: 8px;
                 }
             }

             .right {
                 margin-left: auto;
                 font-size: 16px;
                 color: #5B5D62;
                 display: flex;
                 flex-direction: row;
                 padding-top: 5px;

                 .text-box {
                     display: flex;
                     flex-direction: row;


                     .iconfont-svg {
                         width: 24px;
                         height: 24px;
                         display: flex;
                         flex-direction: row;
                         margin-right: 6px;
                     }

                     div {
                         display: flex;
                         flex-direction: row;
                         line-height: 25px;
                     }
                 }

             }

         }
     }
 }
</style>