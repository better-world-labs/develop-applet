<!--
 * @Author: Sandy
 * @Date: 2023-03-23 14:47:22
 * @Description: app builder
-->

<template>
    <div class="builder">
        <header>
            <div class="back">返回</div>
            <n-button>发布</n-button>
        </header>
        <div class="body">
            <div class="coding scroll-y">
                <coding :app-data="state"></coding>
            </div>
            <div>
                <preview :app-data="state"></preview>
            </div>
        </div>
    </div>
</template>
<script setup>
import preview from './components/preview.vue'
import coding from './components/coding.vue'
const state = reactive({
    "uuid": "uuid",
    "name": "未命名模板",
    "category": 1,
    "description": "模板描述",
    "form": [
        {
            "id": "321",
            "label": "姓名",
            "type": "text",
            "properties": {
                "placeholder": "xxx"
            }
        },
        {
            "id": "uuid",
            "label": "性别",
            "type": "text",
            "properties": {
                "placeholder": "xxx",
                "values": "男\n女"
            }
        }
    ],
    "flow": [
        {
            "type": "chatgpt",
            "outputVisible": true,
            "prompt": [
                {
                    "id": "123",
                    "type": "text",
                    "properties": {
                        "value": "从"
                    }
                },
                {
                    "id": "321",
                    "type": "tag",
                    "properties": {
                        "from": "result", //form 或者 result
                        "character": '321'
                    }
                },
                {
                    "id": "uuid",
                    "type": "text",
                    "properties": {
                        "value": "选出最好的结果"
                    }
                },
            ]
        }
    ],
    "createdBy": {
        "id": 12,
        "name": "xxxx",
        "avatar": "http://xxx/xxx"
    },
    "createdAt": "2023-03-22T07:08:02.851Z",
    "updatedAt": "2023-03-22T07:08:02.851Z",
    "status": 1 // 状态 (0.未发布 1.已发布)
})
const generalOptions = ['groode', 'veli good', 'emazing', 'lidiculous'].map(
    (v) => ({
        label: v,
        value: v
    })
)

onMounted(() => {
    setInterval(() => {
        console.log(state);
    }, 3000)
})
</script>
<style lang="scss" scoped>
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

.builder {
    // min-height: 100vh;
    height: 100vh;
    background: #fff;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    >header {
        height: 72px;
        line-height: 72px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        padding-right: 80px;

        .back {
            font-weight: 400;
            font-size: 16px;
            color: #5B5D62;
        }
    }

    .body {
        flex: 1;
        display: flex;
        height: calc(100vh - 72px);

        .coding {
            padding: 48px 52px;
            box-sizing: border-box;
            width: 712px;
            background: #F3F3F3;
            height: inherit;
            overflow-y: auto;
        }

        >div:last-child {
            flex: 1;

        }


    }

}
</style>
