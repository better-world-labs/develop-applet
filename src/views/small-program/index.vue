<!--
 * @Author: Lemon
 * @Date: 2023-03-22 15:13:40
 * @Description: 
-->
<template>
    <div>
        <div class="home-header">
            <div style="flex: 1;">
            </div>
            <n-button type="info" @click="createTemplate">
                <IconFont name="icon-icon-chuangjianwodexiaochengxu" />
                创建我的小程序
            </n-button>
            <user-integral></user-integral>
        </div>
        <div class="small-program">
            <n-grid :x-gap="12" :y-gap="8" :cols="3">
                <n-grid-item class="item" v-for="item in applicationStore.mineAppList" :key="item.id">
                    <div class="title">
                        {{ item.name }}
                    </div>
                    <div class="date">
                        {{ item.createdAt }}
                    </div>
                    <div>
                        已售： <span class="active-text">100</span>积分
                    </div>
                    <div class="options">
                        <div>
                            <div>
                                被使用
                            </div>
                            <div>
                                14次
                            </div>
                        </div>
                        <div>
                            <div>
                                被使用
                            </div>
                            <div>
                                15次
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <n-button @click="editApp(item)">编辑</n-button>
                        <n-button @click="shareTemplate(item)">分享</n-button>
                    </div>
                </n-grid-item>
            </n-grid>
        </div>
    </div>
</template>
<script setup>
import { useInit } from '@/hooks/useInit';
import { useApplicationStore } from "@/store/modules/application"
import { useUserStore } from "@/store/modules/user"
import useClipboard from 'vue-clipboard3';
import { useMessage } from 'naive-ui'
import $router from '@/router/index';

const message = useMessage()
const { toClipboard } = useClipboard();
const value = ref(true);
const applicationStore = useApplicationStore();
const userStore = useUserStore();
const { goAuth } = useInit()
// 编辑应用
function editApp(item) {
    if (!userStore.token) goAuth();
    $router.push({ name: 'builder', query: { id: uuid.value } });
}

// 分享模版
async function shareTemplate(item) {
    const com = window.location.href.substr(0, window.location.href.lastIndexOf('/'));
    const url = `${com}/view-template-details?uuid=${item.uuid}`

    try {
        await toClipboard(url);
        message.success('已复制，快去分享给朋友吧~');
    } catch (e) {
        console.error(e);
    }
}

onMounted(() => {
    if (!userStore.token) goAuth();
    applicationStore.getMineAppList();
})
</script>
<style lang="scss" scoped> .small-program {
     padding: 42px 52px;
     background: linear-gradient(180deg, #F3F3F6 0%, #EDEFFC 100%);
     position: absolute;
     height: calc(100% - 72px);
     width: calc(100% - 312px);
     box-sizing: border-box;
     overflow-x: hidden;
     overflow-y: scroll;

     .item {
         background: #FFFFFF;
         box-shadow: 0px 6px 16px rgba(211, 213, 235, 0.4);
         border-radius: 24px;
         padding: 24px;
         font-weight: 500;
         font-size: 20px;
         line-height: 20px;
         color: #181D24;
         margin-bottom: 24px;
         margin-right: 16px;


         .title {
             font-weight: 500;
             font-size: 28px;
             line-height: 40px;

             color: #181D24;
             margin-bottom: 10px;
         }

         .date {
             font-weight: 400;
             font-size: 14px;
             line-height: 18px;
             color: #5B5D62;
             margin-bottom: 16px;
         }

         .active-text {
             color: rgba(86, 82, 255, 1);
         }

         .options {
             margin-top: 24px;
             margin-bottom: 15px;
             width: 100%;
             height: 83px;
             font-weight: 400;
             font-size: 16px;
             line-height: 24px;
             color: #ABACAE;
             background: #F3F3F7;
             border-radius: 10px;
             display: flex;
             flex-direction: row;
             justify-content: center;
             align-items: center;
             padding: 0 20px;
             box-sizing: border-box;

             div {
                 flex-basis: 50%;
                 text-align: center;
             }

         }

         .n-button {
             width: 105px;
             height: 40px;
             background: #EEEDFE;
             border: 1px solid #5652FF;
             border-radius: 8px;
             font-weight: 500;
             font-size: 16px;
             line-height: 16px;
             color: #5652FF;
             margin-left: 16px;

         }

     }
 }
</style>