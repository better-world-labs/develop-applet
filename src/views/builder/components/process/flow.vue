<!--
 * @Author: Sandy
 * @Date: 2023-03-24 14:10:20
 * @Description: 
-->

<template>
    <div class="not-model" v-if="false"></div>
    <div class="has-model" v-else>
    <div class="flow">
        <p><span>输入提示词</span><span>ChatGPT</span><span>生成结果（ChatGPT）</span></p>
        <i class="del">删除</i>
    </div>
        <div class="description">
            <!-- <div class="expression">
                                                                                                                                                                                                                                                                                <div class="tags-input" @keydown.enter.prevent="" placeholder="添加标签"></div>
                                                                                                                                                                                                                                                                            <div class="tag">你的姓名<a class="tag-close"></a></div>
                                                                                                                                                                                                                                                                                <div class="tags-input" @keydown.enter.prevent placeholder="添加标签"> </div>
                                                                                                                                                                                                                                                                            </div> -->
            <p class="expression">
                <span class="tags-input" @keydown.enter.prevent="" placeholder="输入提示词"></span>
                <!-- <span class="tag">你的姓名<a class="tag-close"></a></span>
                    <span class="tags-input" @keydown.enter.prevent placeholder="输入提示词">提示词</span> -->
            </p>
            <div class="line"></div>
            <div class="tags">
                <div class="tag">你的姓名<a class="tag-close"></a></div>
                <div class="tag">你的姓名<a class="tag-close"></a></div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(['appData'])
const model = reactive({
    age: '',
    password: '',
    selectValue: ''
})
const onCreate = () => {
    return {
        "id": "uuid",
        "label": "",
        "type": "text",
        "properties": {
            "placeholder": ""
        }
    }
}

</script>
<style lang="scss" scoped>
.has-model {
    .flow {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 12px;

        p {
            flex: 1;
            display: flex;
            align-items: center;

            span {
                margin-right: 12px;
                font-weight: 500;
                font-size: 16px;
                line-height: 16px;
                color: #5B5D62;
            }
        }

        .del {}
    }

    .description {
        color: #5B5D62;
        background: #F3F3F7;
        border-radius: 21px;

        .expression {
            // display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            gap: 4px;
            width: 100%;
            box-sizing: border-box;
            padding: 8px 16px;
            font-size: 14px;
            line-height: 24px;
            overflow: auto;
            cursor: text;

            span {}
        }

        .line {
            background: #FFFFFF;
            height: 2px;
        }

        .tag {
            font-size: 12px;
            color: #5652FF;
            padding-left: 10px;
            height: 24px;
            line-height: 24px;
            border: 1px solid #ABACAE;
            border-radius: 15px;
            display: inline-flex;
            width: fit-content;
            align-items: center;
            padding: 2px 4px 2px 8px;

            .tag-close {
                width: 22px;
                height: 20px;
                cursor: pointer;
                background: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.578 5l2.93-3.493a.089.089 0 0 0-.068-.146h-.891a.182.182 0 0 0-.137.064l-2.417 2.88-2.416-2.88a.178.178 0 0 0-.137-.064h-.89a.089.089 0 0 0-.069.146L4.413 5l-2.93 3.493a.089.089 0 0 0 .068.146h.89a.182.182 0 0 0 .138-.064l2.416-2.88 2.417 2.88c.033.04.083.064.137.064h.89a.089.089 0 0 0 .069-.146l-2.93-3.493z' fill='%23000' fill-opacity='.45'/%3E%3C/svg%3E") center no-repeat;
            }
        }

        .tags {
            padding: 9px 16px 1px 16px;
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            width: 100%;
            box-sizing: border-box;

            .tag {
                margin-bottom: 8px;
                margin-right: 10px;
            }
        }

        .tags-input {
            flex: auto;
            border: 0;
            outline: 0;
            padding: 3px 0;
            font-size: 14px;
            line-height: 23px;
            background: transparent;
            -webkit-user-modify: read-write-plaintext-only;
        }

        .tags-input:focus-within,
        .tags-input:active {
            &::before {
                content: ''
            }

            // outline: auto #4F46E5;
        }

        .expression:focus-within,
        .expression:active {
            // outline: auto #4F46E5;
        }

        // .tags-input:empty {
        //     min-width: 8px;
        // }

        // .tags-input:last-child {
        //     width: 20%;
        // }

        .tags-input:empty::before {
            content: attr(placeholder);
            color: #828282;
        }

        .tags-input:only-child:empty::before {
            content: attr(placeholder);
            color: #828282;
        }
    }


    :deep(.diy-group) {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;


        .n-input {
            font-size: 16px;
            --n-border-radius: 21px !important;
            --n-font-size: 16px !important;
            --n-height: 42px !important;
            background: #F3F3F7;
            margin-bottom: 16px;
            // --n-caret-color: #5652FF !important;
            // --n-border-hover: 1px solid #5652FF !important;
            // --n-border-focus: 1px solid #5652FF !important;
            // --n-loading-color: #5652FF !important;
            --n-caret-color: rgb(51, 54, 57) !important;
            --n-border-hover: 1px solid transparent !important;
            --n-border-focus: 1px solid transparent !important;
            --n-loading-color: transparent !important;
            --n-box-shadow-focus: 0 0 0 2px transparent !important;
        }

    }
}

:deep(.n-dynamic-input-item__action) {
    margin-top: 3px !important;
}


:deep(button.n-button) {
    --n-text-color-hover: #5652FF !important;
    --n-text-color-pressed: #5652FF !important;
    --n-text-color-focus: #5652FF !important;
    --n-border-hover: 1px solid #5652FF !important;
    --n-border-pressed: 1px solid #5652FF !important;
    --n-border-focus: 1px solid #5652FF !important;
    --n-text-color-focus: rgb(51, 54, 57) !important;
    --n-border-focus: 1px solid rgb(224, 224, 230) !important;
}


.scroll-y::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
    padding-right: 4px;
}

.scroll-y::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 4px;
    background: var(--bg-color-scrollbar-thumb);
    border-radius: 4px;
}

.scroll-y::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 4px;
    background: var(--bg-color-scrollbar-track);
}
</style>
