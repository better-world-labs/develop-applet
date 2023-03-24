<!--
 * @Author: Sandy
 * @Date: 2023-03-24 10:43:57
 * @Description: 
-->

<template>
    <div class="save-share">
        <div class="des">
            <p>小程序信息</p>
            <div class="table">
                <div class="col" v-for="des in desList" :key="des.label">
                    <span>{{ des.label }}</span>
                    <p>{{ des.value }}</p>
                </div>
            </div>
        </div>
        <p>模版分类</p>
        <div class="tags">
            <n-radio-group v-model:value="props.appData.category">
                <n-radio :value="tag.id" v-for="tag in categoryList" :key="tag.id">
                    <div class="tag" :class="{ active: props.appData.category == tag.id }">{{
                        tag.text
                    }}</div>
                </n-radio>
            </n-radio-group>
        </div>
        <n-button type="primary">发布</n-button>
    </div>
</template>
<script setup>
const props = defineProps(['appData']);
const categoryList = reactive([{
    "id": 1,
    "text": "文学"
},
{
    "id": 2,
    "text": "生活"
},
{
    "id": 3,
    "text": "办公神器"
}])
const desList = [{
    "label": '积分定价',
    "value": "5积分"
},
{
    "label": '运行耗时（预估）',
    "value": "15秒"
},
{
    "label": '公开发行',
    "value": "公开"
}]
</script>
<style lang="scss" scoped>
.save-share {
    overflow: hidden;

    .des {
        background: #F3F3F7;
        border-radius: 12px;
        padding: 16px 16px 24px;

        p {
            margin: 0;
        }

        .table {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            padding-right: 100px;

            .col {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                span {
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 16px;
                    color: #ABACAE;
                    margin-bottom: 13px;
                }

                p {
                    font-weight: 400;
                }
            }
        }
    }

    p {
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        color: #5B5D62;
        margin-top: 32px;
        margin-bottom: 16px;
    }

    .n-button {
        margin-top: 72px;
        float: right;
    }

    .tags {
        .tag {
            font-size: 16px;
            line-height: 16px;
            color: #5B5D62;
            padding: 12px 24px;
            border: 1px solid #ABACAE;
            border-radius: 8px;

            &.active {
                background: #EEEDFE;
                border: 1px solid #5652FF;
            }
        }

        :deep(.n-radio__dot-wrapper) {
            display: none;
        }

        :deep(.n-radio) {
            &:first-child {
                padding-left: 0px;
            }

            --n-label-padding: 0 4px !important;
        }
    }
}
</style>
