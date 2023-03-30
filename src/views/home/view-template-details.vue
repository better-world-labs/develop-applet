<!--
 * @Author: Lemon
 * @Date: 2023-03-23 10:47:31
 * @Description: 模版详情（非编辑态）
--> 
<template>
    <div>
        <div class="home-header">
            <div class="back-btn" @click="backPrePage">
                <IconFont name="icon-icon-fanhui" />
                返回
            </div>
            <n-button type="info" @click="createApp">
                <IconFont name="icon-icon-yijiantongkuan" />
                一键同款小程序
            </n-button>
            <user-integral></user-integral>
        </div>
        <div class="template-details-content">

            <div>
                <div class="template">
                    <n-grid x-gap="12" :cols="2">
                        <n-gi style="margin-right:8px">
                            <div class="title"> {{ appInfo.name }}</div>
                            <div class="user">
                                <div>
                                    <img width="36" :src="appInfo.createdBy?.avatar || '@/assets/default-user.jpg'" />
                                </div>
                                <div>{{ appInfo.createdBy?.nickname }}</div>
                            </div>
                            <div class="description">
                                {{ appInfo.description }}
                            </div>
                        </n-gi>
                        <n-gi>
                            <div class="form-box">
                                <n-form ref="formRef" :model="model" :rules="rules">
                                    <n-form-item class="form-item" :path="form.label" :label="form.label"
                                        v-for="(form, index) in appInfo.form" :key="index">
                                        <n-input v-model:value="model[form.label]" @keydown.enter.prevent
                                            :placeholder="form?.properties?.placeholder" />
                                    </n-form-item>
                                </n-form>
                            </div>
                        </n-gi>
                    </n-grid>
                    <div class="footer">
                        <n-grid x-gap="12" :cols="2">
                            <n-gi>
                                <div class="icon" @click="shareTemplate">
                                    <div>
                                        <IconFont name="icon-icon-fenxiang" />
                                    </div>
                                    <div>分享</div>
                                </div>
                                <div class="icon">
                                    <div>
                                        <IconFont name="icon-icon-pinglun" />
                                    </div>
                                    <div>123</div>
                                </div>
                                <div class="icon">
                                    <div>
                                        <IconFont name="icon-icon-yidianzan" style="color:#5652FF" />
                                    </div>
                                    <div>456</div>
                                </div>
                            </n-gi>
                            <n-gi>
                                <n-checkbox v-model:checked="openData">
                                    公开我的模板结果（用于社区构建）
                                </n-checkbox>
                                <n-button type="info" @click="handleValidateButtonClick" :disabled="showLoading">
                                    立即生成 <br />5积分
                                </n-button>
                            </n-gi>
                        </n-grid>
                    </div>
                </div>
                <div class="result-box" v-show="showResult">

                    <div class="title">
                        结果：
                    </div>
                    <div class="result-content">
                        <div class="loading" v-if="showLoading">
                            结果生成中，AI正在奋笔疾书中.......
                            <n-progress type="line" :percentage="60" color="#5652FF" rail-color="#DCDBFF"
                                :show-indicator="false" processing />
                        </div>
                        <div v-else>
                            <p style="white-space: pre-line">{{ printContent }} <span
                                    v-if="cacheContent.length != printContent.length"></span></p>
                            <div class="option">
                                <IconFont name="icon-icon-dianzan" />
                                <IconFont name="icon-icon-cai" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="public-results">
                    <n-carousel :space-between="20" :loop="false" draggable>
                        <n-carousel-item style="width: 40%" v-for="result in applicationStore.resultList" :key="result.id">
                            <div class="result-item">
                                <div class="user">
                                    <div>
                                        <img width="36" :src="result.createdBy.avatar || '@/assets/default-user.jpg'" />
                                    </div>
                                    <div>{{ result.createdBy.nickname }}</div>
                                </div>
                                <div class="label">
                                    {{ result.inputArgs.join('·') }}
                                </div>
                                <div class="content">
                                    {{ result.content }}
                                </div>
                            </div>
                        </n-carousel-item>
                    </n-carousel>
                </div>
            </div>
        </div>
    </div>
</template> 
<script setup>
import { useApplicationStore } from "@/store/modules/application";
import { useUserStore } from "@/store/modules/user";
import $router from '@/router/index';
import { useRouter } from 'vue-router';
import { getAppInfo } from "@/api/application";
import { ref } from "vue";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import useClipboard from 'vue-clipboard3';
import { useMessage } from 'naive-ui'

const { toClipboard } = useClipboard();
const message = useMessage()

const userStore = useUserStore();
const applicationStore = useApplicationStore();
const uuid = ref();
const appInfo = ref({});
const openData = ref(true);

const formRef = ref(null);
const model = ref({});
const rules = {};

const showResult = ref(false);
const showLoading = ref(false);
const printContent = ref("");// 结果内容 
const cacheContent = ref("");
const timer = ref(0);

// 打印内容
function printout() {
    timer.value = setInterval(() => {
        if (cacheContent.value.length > printContent.value.length) {
            printContent.value = cacheContent.value.slice(0, printContent.value.length + 2);
        }
    }, 80)
}

function init() {
    appInfo.value.form.map((item) => {
        model[item.label] = null;
        rules[item.label] = [{
            required: true,
            message: item.properties?.placeholder
        }]
    });
}

function handleValidateButtonClick(e) {
    e.preventDefault();
    formRef.value?.validate((errors) => {
        if (!errors) {
            requestSave();
        } else {
            console.log(errors);
        }
    });
}

function requestSave() {
    let values = [];
    appInfo.value.form.map((item) => {
        values.push(model.value[item.label]);
    });

    cacheContent.value = "";
    printContent.value = "";
    showResult.value = true;
    showLoading.value = true;
    const data = {
        "values": values,
        "open": openData.value
    };

    receiveMessage(data)
}

// 生成结果 
function receiveMessage(data) {
    if (!('EventSource' in window)) return;

    const eventSourceUrl = `/api/apps/${uuid.value}/run`;
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
                console.log("连接成功!", response);
                showLoading.value = false;
                printout();
            }
        },
        onmessage(msg) {
            // console.log("收到服务器发来的数据!", JSON.parse(msg.data).content)
            if (JSON.parse(msg.data).content != undefined) {
                cacheContent.value += JSON.parse(msg.data).content;
            }
        },
        onclose() {
            console.log("连接关闭!")
            clearInterval(timer.value);
            // 刷新结果列表
            getAppResultList();
        },
        onerror(err) {
            console.log("连接失败!", err)
        }

    });
}

// 分享模版
async function shareTemplate() {
    try {
        await toClipboard(window.location.href);
        message.success('已复制，快去分享给朋友吧~');
    } catch (e) {
        console.error(e);
    }
}


// 请求结果列表
function getAppResultList() {
    applicationStore.getAppResult(uuid.value);
}

// 返回上一页
function backPrePage() {
    $router.go(-1);
}

// 创建同款app 
function createApp() {
    $router.push({ name: 'builder', query: { id: uuid.value, type: "new" } });
}

onMounted(() => {
    const router = useRouter();
    uuid.value = router.currentRoute.value.query.uuid;

    getAppResultList();
    // 获取应用信息
    getAppInfo(uuid.value).then(({ data }) => {
        appInfo.value = data;
        init();
    })

})

</script>

<style lang="scss"> .template-details-content {
     .n-input {
         .template-details-content {
             .n-input {
                 background: white;
                 box-shadow: 0px 4px 5px rgba(215, 212, 225, 0.5);
                 border-radius: 12px;
             }

             .n-input .n-input__border,
             .n-input .n-input__state-border {
                 border: none !important;
             }

             .n-input.n-input--focus {
                 border: none;
             }

             .n-input[type=text]:focus {
                 outline: none;
             }


             .n-carousel__dot.n-carousel__dot--active {
                 background: #5652FF !important;
                 opacity: 0.6;
             }

             .n-carousel__dot {
                 background: #F7F7FB !important;
             }


             .n-checkbox-box {
                 background: #EEEDFE !important;
                 width: 20px !important;
                 height: 20px !important;
                 border-radius: 20px !important;
                 margin-right: 8px;

                 .n-checkbox-box__border {
                     border: 5px solid #EEEDFE !important;
                 }

             }

             .n-checkbox--checked {
                 .n-checkbox-icon {
                     margin: 4px;
                     width: 10px !important;
                     height: 10px !important;
                     border-radius: 10px !important;
                     color: #5652FF !important;
                     background: #5652FF !important;

                     svg {
                         opacity: 0 !important;
                     }
                 }
             }

             .n-form {
                 padding-top: 16px;
                 padding-right: 16px;
                 overflow-x: hidden;
                 height: 422px;
                 overflow-y: scroll;

                 .n-form-item {
                     margin-bottom: 12px;
                     padding-left: 2px;

                     .n-form-item-label__text {
                         font-weight: 500;
                         font-size: 20px;
                         line-height: 20px;
                         color: #181D24;
                         margin-bottom: 16px;

                     }

                     .n-input {
                         width: 100% !important;
                         height: 56px !important;
                     }

                     .n-input__input .n-input__input-el {
                         height: 56px !important;
                         line-height: 56px !important;
                     }
                 }
             }


         }

         <style scoped lang="scss">.home-header {
             .back-btn {
                 flex: 1;
                 font-weight: 400;
                 font-size: 16px;
                 line-height: 52px;
                 color: #5B5D62;
                 cursor: pointer;
             }
         }

         .template-details-content {
             padding: 42px 52px;
             background: linear-gradient(180deg, #F3F3F6 0%, #EDEFFC 100%);
             position: absolute;
             height: calc(100% - 72px);
             width: calc(100% - 312px);
             box-sizing: border-box;
             overflow-x: hidden;
             overflow-y: scroll;

             >div {
                 max-width: 992px;

                 .template {
                     height: 592px;
                     box-sizing: border-box;
                     background: #FFFFFF;
                     border-radius: 16px;
                     padding: 32px 24px 32px 32px;

                     >div:first-child {
                         display: flex;
                         flex-direction: row;
                         font-weight: 400;
                         font-size: 16px;
                         line-height: 30px;
                         color: #5B5D62;

                         .title {
                             font-weight: 500;
                             font-size: 28px;
                             line-height: 40px;
                             color: #181D24;
                             max-height: 80px;
                             margin-bottom: 16px;
                             overflow: hidden;
                             text-overflow: ellipsis;
                             display: -webkit-box;
                             -webkit-line-clamp: 2;
                             -webkit-box-orient: vertical;
                         }

                         .user {
                             font-weight: 400;
                             font-size: 16px;
                             color: #202226;
                             margin: 24px 0;
                             line-height: 36px;
                             display: flex;
                             flex-direction: row;

                             img {
                                 width: 36px;
                                 height: 36px;
                                 border-radius: 36px;
                                 margin-right: 8px;
                             }
                         }

                         .description {
                             overflow: hidden;
                             text-overflow: ellipsis;
                             display: -webkit-box;
                             -webkit-line-clamp: 9;
                             -webkit-box-orient: vertical;
                         }

                         .form-box {
                             background: linear-gradient(132.93deg, #F1F7FF 5.27%, #FAF8FF 59.89%, #EEEDFE 98.91%);
                             border-radius: 16px;
                             max-width: 456px;
                             height: 454px;
                             box-sizing: border-box;
                             padding: 8px 8px 8px 30px;

                         }
                     }

                     .footer {
                         font-weight: 400;
                         font-size: 14px;
                         line-height: 54px;
                         color: #5B5D62;
                         margin-top: 20px;

                         .icon {
                             margin-right: 24px;
                             float: left;
                             display: flex;
                             flex-direction: row;
                             cursor: pointer;

                             .iconfont {
                                 padding-right: 8px;
                                 font-size: 24px;
                                 color: #5B5D62;
                             }

                             &:hover {
                                 color: #202226;
                             }

                         }

                         .n-button {
                             background: linear-gradient(101.85deg, #957BFB 0%, #5652FF 98.88%);
                             border: none;
                             border-radius: 8px;
                             height: 54px;
                             box-sizing: border-box;
                             font-weight: 500;
                             font-size: 16px;
                             line-height: 16px;
                             color: #FFFFFF;
                             float: right;
                             --n-border: none !important;
                             --n-border-hover: none !important;
                             --n-border-focus: none !important;

                             &:hover {
                                 background: linear-gradient(109.65deg, #A994FF 30.38%, #657EFF 98.29%);
                             }
                         }
                     }

                 }

                 .result-box {
                     padding: 24px 24px 16px 24px;
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

                 .public-results {
                     background: #FFFFFF;
                     border-radius: 16px;
                     padding: 16px;
                     margin-top: 16px;
                     height: 280px;

                     .result-item {
                         font-weight: 400;
                         font-size: 16px;
                         line-height: 24px;
                         color: #202226;
                         background: #F7F7FB;
                         border-radius: 12px;
                         padding: 16px;
                         height: 206px;

                         .user {
                             font-weight: 400;
                             font-size: 16px;
                             line-height: 24px;
                             color: #5B5D62;
                             display: flex;
                             flex-direction: row;

                             img {
                                 width: 24px;
                                 height: 24px;
                                 border-radius: 24px;
                                 margin-right: 8px;
                             }
                         }

                         .label {
                             background: #FFFFFF;
                             border-radius: 4px;
                             font-weight: 400;
                             font-size: 14px;
                             line-height: 30px;
                             color: #000000;
                             margin: 12px 0;
                             height: 30px;
                             padding: 0 8px;

                         }

                         .content {
                             overflow: hidden;
                             text-overflow: ellipsis;
                             display: -webkit-box;
                             -webkit-line-clamp: 5;
                             -webkit-box-orient: vertical;
                             white-space: pre-line
                         }
                     }
                 }
             }
         }
</style>