<!--
 * @Author: Sandy
 * @Date: 2023-03-23 15:33:01
 * @Description: 
-->

<template>
    <div class="title">预览区</div>
    <div class="preview-box scroll-y">
        <div class="app-title">{{ props.appData.name }}</div>
        <div class="user">
            <img :src="props.appData.createdBy.avatar" />{{ props.appData.createdBy.name }}
        </div>
        <div class="des">
            {{ props.appData.description }}
        </div>
        <div class="body">
            <n-form ref="formRef" :model="props.appData.form">
                <n-form-item :label="item.label" v-for="(item, i) in props.appData.form" :key="item.id">
                    <n-input v-model:value="state.form[i]" :placeholder="item.properties.placeholder"
                        @keydown.enter.prevent />
                </n-form-item>
            </n-form>
        </div>
        <div class="action" @click="getAppRun">
            <span>立即生成</span>
            <em>5积分</em>
        </div>
        <Result ref="resultRef" :form="state.form" :uuid="props.appData.uuid" v-show="state.showResult"></Result>
    </div>
</template>
<script setup>
import Result from './process/result.vue'
const props = defineProps(['appData'])
const emits = defineEmits(['submit'])
const resultRef = ref('');
const state = reactive({
    showResult:false,
    form: new Array(props.appData.form?.length||0)
})
const getAppRun = async() => {
    await emits('submit',false)
    await nextTick()
    
    state.showResult = true;
    resultRef.value.requestSave()
}
</script>
<style lang="scss" scoped>
.title {
    height: 50px;
    line-height: 50px;
    font-weight: 500;
    font-size: 18px;
    color: #181D24;
    background: #EEEDFE;
    text-align: center;
}

.preview-box {
    height: 100%;
    background: linear-gradient(132.93deg, #F1F7FF 5.27%, #FAF8FF 59.89%, #EEEDFE 98.91%);
    padding: 56px 80px;
    overflow-y: auto;
    position: relative;
    box-sizing: border-box;

    .app-title {
        font-weight: 500;
        font-size: 40px;
        line-height: 40px;
        color: #181D24;
    }

    .user {
        margin: 32px 0 24px;
        display: flex;
        align-items: center;
        font-size: 20px;
        line-height: 20px;
        color: #5B5D62;

        img {
            width: 40px;
            height: 40px;
            margin-right: 8px;
            border-radius: 50%;
        }
    }

    .des {
        font-weight: 400;
        font-size: 20px;
        line-height: 28px;
        color: #202226;
        word-break: break-all;
    }

    .action {
        margin-left: auto;
        margin-top: 16px;
        width: 132px;
        height: 88px;
        background: linear-gradient(101.85deg, #957BFB 0%, #5652FF 98.88%);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        span {
            font-weight: 500;
            font-size: 16px;
            line-height: 16px;
            color: #FFFFFF;
        }

        em {
            font-weight: 400;
            font-size: 12px;
            line-height: 12px;
            margin-top: 6px;
            color: #FFFFFF;
            font-style: normal;
        }
    }

    .body {
        margin-top: 48px;

        :deep(.n-form-item) {
            --n-bezier: cubic-bezier(0.4, 0, 0.2, 1);
            --n-line-height: 1.6;
            --n-blank-height: 34px;
            --n-label-font-size: 14px;
            --n-label-text-align: flex-start;
            --n-label-height: 26px;
            --n-label-padding: 0 0 6px 2px;
            --n-label-font-weight: 400;
            --n-asterisk-color: #d03050;
            --n-label-text-color: #202226 !important;
            --n-feedback-padding: 4px 0 0 2px;
            --n-feedback-font-size: 14px;
            --n-feedback-height: 24px;
            --n-feedback-text-color: rgb(118, 124, 130);
            --n-feedback-text-color-warning: #f0a020;
            --n-feedback-text-color-error: #d03050;

            .n-form-item-label {
                font-weight: 500;
                font-size: 24px !important;
                line-height: 24px !important;
                margin-bottom: 20px;
                color: #181D24;

                grid-area: label;
                align-items: center;
                line-height: 1.25;
                text-align: var(--n-label-text-align);
                font-size: var(--n-label-font-size);
                min-height: var(--n-label-height);
                padding: var(--n-label-padding);
                color: var(--n-label-text-color);
                transition: color .3s var(--n-bezier);
                box-sizing: border-box;
                font-weight: var(--n-label-font-weight);
            }

            .n-input {
                height: 80px;
                line-height: 80px;
                background: #FFFFFF;
                box-shadow: 0px 4px 8px rgba(215, 212, 225, 0.5);
                border-radius: 12px;
                margin-bottom: 8px;
                font-size: 22px;
                color: #202226;
                padding: 0 24px;
                --n-caret-color: #5652FF !important;
                --n-border-hover: 1px solid #5652FF !important;
                --n-border-focus: 1px solid #5652FF !important;
                --n-loading-color: #5652FF !important;
            }
        }

    }
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
    background: #D2D1DC;
    border-radius: 4px;
}

.scroll-y::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 4px;
    background: transparent;
}
</style>
