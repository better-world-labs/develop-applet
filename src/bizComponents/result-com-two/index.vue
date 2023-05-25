<!--
 * @Author: Lemon
 * @Date: 2023-05-19 14:45:27
 * @Description: 
-->
<template>
    <div class="result-item">
        <div class="user">
            <div>
                <img width="36" :src="props.result?.createdBy.avatar || '@/assets/default-user.jpg'" />
            </div>
            <div>{{ props.result?.createdBy.nickname }}</div>
            <div @click="setExpansion(props.num)">
                <icon-font name="icon-icon-zhankaikapian" />
            </div>
        </div>
        <template v-if="props.quantity == 2">
            <div class="label">
                {{ props.result?.inputArgs.join('·') }}
            </div>
            <div class="content">
                {{ props.result?.content }}
            </div>
        </template>
        <template v-if="props.quantity == 1">
            <div class="label">
                <template v-for="(arg, index) in props.result?.inputArgs" :key="index">
                    {{ props.result?.inputForm[index].label || '' }} : {{ arg }};
                </template>
            </div>
            <!-- <div v-if="props.result?.content" class="content-container" v-html="marked.parse(props.result?.content)">
            </div> -->
        </template>

        <div class="option">
            <div class="count">
                {{ props.num + 1 }}/{{ applicationStore.resultTotal }}
            </div>
            <div class="right">
                <div @click="option(props.result, 1)">
                    <icon-font-symbol :name="applicationStore.resultStateList?.get(props.result.id) == 1
                        ? 'icon-icon-yidianzan'
                        : 'icon-icon-dianzan'
                        " />

                    <div :class="{
                        'active-text': applicationStore.resultStateList?.get(props.result.id) == 1,
                    }">
                        {{ props.result.likeTimes }}
                    </div>
                </div>
                <div @click="option(props.result, -1)">
                    <icon-font-symbol :name="applicationStore.resultStateList?.get(props.result.id) == -1
                        ? 'icon-icon-yicai'
                        : 'icon-icon-cai'
                        " />

                    <div :class="{
                        'active-text': applicationStore.resultStateList?.get(props.result.id) == -1,
                    }">
                        {{ props.result.hateTimes }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useApplicationStore } from '@/store/modules/application';
import { marked } from 'marked';
const applicationStore = useApplicationStore();
const props = defineProps(['result', 'num', 'option', 'quantity']);
const emit = defineEmits(['updatePerView'])

const setExpansion = (index) => {
    if (props.quantity == 2) {
        emit('updatePerView', index, 1);
    } else {
        emit('updatePerView', index, 2);
    }
} 
</script>
<style lang="scss" scoped> .result-item {
     margin: 0 8px;
     font-weight: 400;
     font-size: 16px;
     line-height: 24px;
     color: #202226;
     background: #f7f7fb;
     border-radius: 12px;
     padding: 16px;
     height: 242px;
     box-sizing: border-box;

     .user {
         font-weight: 400;
         font-size: 16px;
         line-height: 24px;
         color: #5b5d62;
         display: flex;
         flex-direction: row;

         img {
             width: 24px;
             height: 24px;
             border-radius: 24px;
             margin-right: 8px;
         }

         >div:last-child {
             margin-left: auto;

             .iconfont {
                 font-size: 20px;
                 color: #ABACAE;

                 &:hover {
                     cursor: pointer;
                     color: #5652FF;
                 }
             }
         }
     }

     .label {
         border-radius: 4px;
         font-weight: 400;
         font-size: 14px;
         line-height: 30px;
         color: #000000;
         margin: 12px 0;
         height: 30px;

         overflow: hidden;
         text-overflow: ellipsis;
         display: -webkit-box;
         -webkit-line-clamp: 1;
         -webkit-box-orient: vertical;
         white-space: pre-line;

         span {
             display: inline-block;
             background: white;
             border-radius: 4px;
             padding: 0 8px;
         }
     }

     .content {
         overflow: hidden;
         text-overflow: ellipsis;
         display: -webkit-box;
         -webkit-line-clamp: 3;
         -webkit-box-orient: vertical;
         white-space: pre-line;
         height: 96px;
         margin-bottom: 6px;

         h1 {
             line-height: 32px;
         }
     }

     .content-container {
         height: 96px;
         margin-bottom: 6px;
         overflow-x: hidden;
         overflow-y: scroll;


     }

     .option {
         display: flex;
         flex-direction: row;
         align-items: center;
         align-content: center;


         .count {
             color: #ABACAE;
             font-style: normal;
             font-weight: 400;
             font-size: 16px;
             line-height: 18px;
         }

         .right {
             margin-left: auto;
             cursor: pointer;
             color: #5B5D62;
             display: flex;
             flex-direction: row;



             >div {
                 background: #f7f7fb;
                 margin-right: 4px;
                 padding: 4px;
                 box-sizing: border-box;
                 display: flex;
                 flex-direction: row;

                 .iconfont-svg {
                     width: 24px;
                     height: 24px;
                     display: flex;
                     flex-direction: row;
                     margin-right: 6px;
                 }

                 &:hover {
                     color: #202226;
                 }

                 .active-text {
                     color: #5652ff;
                 }
             }
         }
     }
 }
</style>