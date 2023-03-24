<!--
 * @Author: Sandy
 * @Date: 2023-03-23 15:33:01
 * @Description: 
-->

<template>
    <div class="title">预览区</div>
    <div class="preview-box">
        <div class="app-title">测一测你的生辰八字！用过的都惊呆了🤯</div>
        <div class="user">东门过儿</div>
        <div class="des">
            这是一个为你专业分析你的生辰八字的小程序，按照右边的提示问题填写相关信息，立即可以生成你的八字信息，用过的都说好！是vahvvhkvaakvb啊哈撒谎这是一个为你专业分析你的生辰八字的小程序，按照右边的提示问题填写相关信息，立即可以生成你的八字信息，用过的都说好！
        </div>
        <div class="body">
            <n-form ref="formRef" :model="model">
                <n-form-item path="age" label="年龄">
                    <n-input v-model:value="model.age" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="password" label="密码">
                    <n-input v-model:value="model.password" type="password" @input="handlePasswordInput"
                        @keydown.enter.prevent />
                </n-form-item>
                <n-form-item ref="rPasswordFormItemRef" first path="reenteredPassword" label="重复密码"><n-select
                        v-model:value="model.selectValue" placeholder="Select" :options="generalOptions" />
                </n-form-item>
                <n-row :gutter="[0, 24]">
                    <n-col :span="24">
                        <div style="display: flex; justify-content: flex-end">
                            <n-button :disabled="model.age === null" round type="primary"
                                @click="handleValidateButtonClick">
                                验证
                            </n-button>
                        </div>
                    </n-col>
                </n-row>
            </n-form>
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
const generalOptions = ['groode', 'veli good', 'emazing', 'lidiculous'].map(
    (v) => ({
        label: v,
        value: v
    })
)
const handleValidateButtonClick = () => {

}
const handlePasswordInput = () => {

}
</script>
<style lang="scss" scoped>
.title {}

.preview-box {}

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
