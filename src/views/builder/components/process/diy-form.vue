<!--
 * @Author: Sandy
 * @Date: 2023-03-23 16:38:26
 * @Description: 
-->

<template>
    <!-- <n-form ref="formRef" :model="props.appData.form" :rules="rules" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging">
        <n-form-item path="age" label="小程序标题">
            <n-input v-model:value="props.appData.name" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="age" label="小程序描述">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <n-input v-model:value="props.appData.description" @keydown.enter.prevent type="textarea" :autosize="{
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            minRows: 3,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            maxRows: 5
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }" />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </n-form-item>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </n-form> -->

    <!-- <n-dynamic-input v-model:value="props.appData.form" preset="pair" key-placeholder="环境变量名" value-placeholder="环境变量值" /> -->
    <n-dynamic-input v-model:value="props.appData.form" :on-create="onCreate" :min="1">
        <template #create-button-default>
            随便搞点啥
        </template>
        <template #default="{ value, index }">
            <div class="diy-body">
                <div class="index">选项{{ index + 1 }}</div>
                <div class="diy-group">
                    <n-input v-model:value="value.label" :placeholder="`选项${index + 1}-名称`" type="text" />
                    <n-input v-model:value="value.properties.placeholder" :placeholder="`选项${index + 1}-说明`" type="text" />
                </div>
                <!-- <div class="del">删除</div> -->
            </div>
        </template>
    </n-dynamic-input>
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

.diy-body {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 12px;

    .index {
        font-weight: 500;
        font-size: 16px;
        line-height: 42px;
        color: #5B5D62;
        width: 63px;
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
