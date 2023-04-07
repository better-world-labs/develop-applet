<!--
 * @Author: Lemon
 * @Date: 2023-04-03 15:10:09
 * @Description: 编辑器
-->
<template>
    <div class="feed-editor">
        <img :src="userStore.info.avatar || '@/assets/default-user.jpg'" alt="">
        <div class="editor-text">
            <div id="editorText" ref="EditorRef" class="textarea" :placeholder="'分享你的想法'" @input="handleTextChange($event)"
                @keyup="handleTextChange($event)" @compositionend="compositionend" :contenteditable="true"
                @compositionstart="compositionstart" :style="{ width: inputWidth }"></div>
            <div class="right-box">
                <n-popover ref="EmojiPopover" scrollable style="max-height: 315px; margin-bottom: 20px !important"
                    :show-arrow="false" placement="top-end" @update:show="updatePopover" :animated="false"
                    :content-style="{ padding: 0 }" trigger="click">
                    <template #trigger>
                        <div class="icon-right">
                            <icon-font-symbol :class="{ active: showEmojiPopover }" name="icon-icon-biaoqing" />
                        </div>
                    </template>
                    <div>
                        <EditorEmoticon @updateInfo="updateInfo" @hide-popo="hideEmoji" />
                    </div>
                </n-popover>
                <n-button type="info" @click="send"> 评论 </n-button>
            </div>
        </div>

    </div>
</template>
<script  setup>
import { useUserStore } from "@/store/modules/user";
import EditorEmoticon from "./editor-emoticon.vue"
import { NPopover } from 'naive-ui';
import { useMeEditor } from "./useMeEditor"
import { computed, ref } from "vue"
const emits = defineEmits(['updateEditorText', 'sendMsg']);

const { EditorRef, handleTextChange, compositionstart, compositionend, updateEditorText } =
    useMeEditor();

const userStore = useUserStore();
let showEmojiPopover = ref(false);
const EmojiPopover = ref();

const isSafari = () => {
    const userAgent = navigator.userAgent;
    return userAgent.indexOf('Chrome') == -1 && userAgent.indexOf('Safari') > -1;
};

const inputWidth = computed(() => {
    return isSafari() ? 'auto' : '100%';
});


const updatePopover = (show) => {
    showEmojiPopover.value = show;
};

const hideEmoji = () => {
    EmojiPopover.value.setShow(false);
    showEmojiPopover.value = false;
};

const send = () => {
    emits('sendMsg');
};

// 更新输入框消息
const updateInfo = (emoji) => {
    updateEditorText(emoji);
};

</script> 

<style lang="scss" scoped> .feed-editor {
     background: white;
     border-radius: 4px;
     display: flex;
     flex-direction: row;
     align-items: top;

     img {
         width: 32px;
         height: 32px;
         border-radius: 32px;
         margin-right: 16px;
         margin-top: 8px;
     }
 }

 .editor-text {
     flex: 1 auto;
     display: flex;
     align-items: top;
     cursor: text;
     background: #F3F3F7;
     border-radius: 4px;
     box-sizing: border-box;
     padding: 8px 12px;

     .textarea {
         background: none;
         border: 0 none;
         outline: none;
         height: inherit;
         max-height: 96px;
         min-height: 25px;
         overflow-x: hidden;
         overflow-y: auto;
         font-size: 16px;
         line-height: 26px;
         color: #202226;
         padding: 0px;
         box-sizing: border-box;
         white-space: pre-wrap;
         word-break: break-word;
         word-wrap: break-word;
         -webkit-user-select: text;
         user-select: text;
         cursor: text;
     }

     .textarea:empty::before {
         color: #ABACAE;
         content: attr(placeholder);
         line-height: 26px;
         font-size: 14px;
     }

     .textarea::-webkit-scrollbar {
         /*滚动条整体样式*/
         width: 4px;
         height: 1px;
     }

     .textarea::-webkit-scrollbar-thumb {
         /*滚动条里面小方块*/
         border-radius: 4px;
         color: #ABACAE;
         border-radius: 4px;
         width: 8px;
     }

     .textarea::-webkit-scrollbar-track {
         /*滚动条里面轨道*/
         border-radius: 4px;
         background: none;
     }
 }

 .n-button {
     width: 56px;
     height: 26px;
     background: #5652FF;
     border-radius: 4px;
     text-align: center;
     padding: 0;
     margin: 0;
     margin-left: 16px;
     color: #fff !important;
     border: none !important;

     --n-border: none !important;
     --n-border-hover: none !important;
     --n-color-hover: none !important;

     &:hover {
         background: #716EFE;
         --n-border: none !important;
         --n-border-hover: none !important;
         --n-color-hover: none !important;
         color: #fff !important;
     }
 }

 .right-box {
     display: flex;
     flex-direction: row;
     align-items: top;

     .icon-right {
         font-size: 20px;
         cursor: pointer;
         height: 24px;

         .iconfont-svg {
             width: 20px;
             height: 20px;
             color: #8a8b8d;

             &.active,
             &:hover {
                 color: #BEC3C5;
                 cursor: pointer;
             }
         }
     }
 }
</style>