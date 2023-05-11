<!--
 * @Author: Sandy
 * @Date: 2023-03-29 10:35:46
 * @Description: 
-->
<template>
    <div class="result-box">
        <div class="title">结果：</div>
        <div class="result-content">
            <div class="loading" v-if="state.showLoading">
                结果生成中，AI正在奋笔疾书中.......
                <n-progress type="line" :percentage="60" color="#5652FF" rail-color="#DCDBFF" :show-indicator="false"
                    processing />
            </div>
            <div v-else>
                <p>{{ state.printContent }} <span v-if="state.cacheContent.length != state.printContent.length"></span></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useUserStore } from "@/store/modules/user";
import { fetchEventSource } from '@microsoft/fetch-event-source';
const props = defineProps(['form', 'uuid'])
const state = reactive({
    showLoading: false,
    printContent: '',
    cacheContent: ''
})
const userStore = useUserStore()
// 打印内容
function printout() {
    const timer = ref(0);
    timer.value = setInterval(() => {
        if (state.cacheContent.length > state.printContent.length) {
            state.printContent = state.cacheContent.slice(0, state.printContent.length + 1);
        } else {
            clearInterval(timer.value);
        }
    }, 80)
}

const requestSave = () => {
    let values = [...props.form];

    state.cacheContent = "";
    state.printContent = "";
    state.showLoading = true;
    const data = {
        "values": values,
        "open": true
    };

    receiveMessage(data)
}

// 生成结果 
function receiveMessage(data) {
    if (!('EventSource' in window)) return;

    const eventSourceUrl = `/api/apps/${props.uuid}/run`;
    new fetchEventSource(eventSourceUrl, {
        method: "POST",
        headers: {
            "Accept": "text/event-stream",
            "Content-type": "application/json; charset=utf-8",
            "X-CSRF-TOKEN": `${userStore.token}`
        },
        body: JSON.stringify(data),
        async onopen(response) {
            if (response.status == 200) {
                state.showLoading = false;
                printout();
            }
        },
        onmessage(msg) {
            if (msg.event == 'done') return;
            // console.log("收到服务器发来的数据!",msg, JSON.parse(msg.data)) 
            const text = JSON.parse(msg.data).content
            text && text.length && (state.cacheContent += text);
        },
        onclose() {
            console.log("连接关闭!")
        },
        onerror(err) {
            console.log("连接失败!", err)
        }

    });
}

defineExpose({ requestSave })

</script>

<style scoped lang="scss">
.result-box {
    padding: 24px 24px 48px 24px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #202226;
    background: #FFFFFF;
    border-radius: 16px;
    margin-top: 16px;

    .title {
        font-weight: 500;
        font-size: 20px;
        line-height: 20px;
        color: #181D24;
        margin-bottom: 20px;

    }

    .result-content {
        padding: 16px;
        background: linear-gradient(132.93deg, #F1F7FF 5.27%, #FAF8FF 59.89%, #EEEDFE 98.91%);
        border-radius: 16px;
        min-height: 128px;

        .loading {
            padding: 40px 64px;
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
            color: #5B5D62;

            .n-progress {
                margin-top: 8px;
            }
        }

        p {
            min-height: 80px;

            span {
                display: inline-block;
                width: 16px;
                height: 4px;
                background: #5F58FF;
            }
        }

    }

    .option {
        height: 20px;
        margin-top: 12px;
        text-align: right;

        .iconfont {
            font-size: 24px;
            margin-right: 8px;
            cursor: pointer;
        }

    }
}
</style>