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
      <notice-box></notice-box>
      <n-button class="highlight-btn" size="large" @click="createApp">
        <IconFont name="icon-icon-yijiantongkuan" />
        一键同款小程序
      </n-button>
      <user-integral></user-integral>
    </div>
    <div class="template-details-content" ref="templateDetailRef">
      <div>
        <div class="template">
          <n-grid x-gap="12" :cols="2">
            <n-gi style="margin-right: 8px">
              <div class="title">{{ appInfo.name }}</div>
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
                    <n-input type="textarea" :autosize="{
                      minRows: 1,
                    }" v-model:value="model[form.label]" @keydown.enter.prevent
                      :placeholder="form?.properties?.placeholder" />
                  </n-form-item>
                </n-form>
              </div>
            </n-gi>
          </n-grid>
          <div class="footer">
            <n-grid x-gap="12" :cols="2">
              <n-gi>
                <div class="icon" @click="collectTemplate">
                  <div>
                    <icon-font-symbol :class="{ 'hide': !collected }"
                      :name="collected ? 'icon-icon-yishoucang' : 'icon-icon-shoucang'" />
                    <icon-font :class="{ 'show': !collected }" name="icon-icon-shoucang" />
                  </div>
                  <div :class="{ 'active-text': collected }">
                    <div v-if="appInfo.collectTimes > 0">{{ appInfo.collectTimes }}</div>
                    <div v-else>收藏</div>
                  </div>
                </div>
                <div class="icon" @click="shareTemplate">
                  <div>
                    <icon-font-symbol class="hide" name="icon-icon-fenxiang" />
                    <icon-font class="show" name="icon-icon-fenxiang-hover" />
                  </div>
                  <div>分享</div>
                </div>
                <div class="icon" @click="addComment">
                  <div>
                    <icon-font-symbol class="hide" name="icon-icon-pinglun" />
                    <icon-font class="show" name="icon-icon-pinglun-hover" />
                  </div>
                  <div v-if="appInfo.commentTimes > 0">{{ appInfo.commentTimes }}</div>
                  <div v-else>评论</div>
                </div>
                <div class="icon" @click="giveALike">
                  <div>
                    <icon-font-symbol :class="{ 'hide': !isLike }"
                      :name="isLike ? 'icon-icon-yidianzan' : 'icon-icon-dianzan'" />
                    <icon-font :class="{ 'show': !isLike }" name="icon-icon-dianzan" />
                  </div>
                  <div :class="{ 'active-text': isLike }">
                    <div v-if="appInfo.likeTimes > 0">{{ appInfo.likeTimes }}</div>
                    <div v-else>点赞</div>
                  </div>
                </div>
              </n-gi>
              <n-gi>
                <n-checkbox v-model:checked="openData"> 公开我的结果（用于社区构建） </n-checkbox>
                <n-button class="gradient-btn" @click="handleValidateButtonClick" :disabled="showLoading">
                  <span>立即生成</span>
                  <em> {{ appInfo.price }}积分</em>
                </n-button>
              </n-gi>
            </n-grid>
          </div>
        </div>
        <div class="result-box" v-show="showResult">
          <div class="title">结果：</div>
          <div class="result-content">
            <div class="loading" v-if="showLoading">
              结果生成中，AI正在奋笔疾书中.......
              <n-progress type="line" :percentage="60" color="#5652FF" rail-color="#DCDBFF" :show-indicator="false"
                processing />
            </div>
            <div v-else>
              <p>
              <div id="printContent"
                :class="{ 'print-stop': !receiveMessaging && cacheContent.length == printContent.length }"></div>
              </p>
              <div class="option">
                <icon-font-symbol @click="resultOption(currentResult, 1)" :name="applicationStore.resultStateList?.get(currentResult.id) == 1
                  ? 'icon-icon-yidianzan'
                  : 'icon-icon-dianzan'
                  " />
                <icon-font-symbol @click="resultOption(currentResult, -1)" :name="applicationStore.resultStateList?.get(currentResult.id) == -1
                  ? 'icon-icon-yicai'
                  : 'icon-icon-cai'
                  " />
              </div>
            </div>
          </div>
          <div class="advertising-space"
            v-if="advertisingList.length && !receiveMessaging && !showLoading && cacheContent.length == printContent.length">
            <div v-for="item in advertisingList">
              <advertising-space-img :item="item"></advertising-space-img>
            </div>
          </div>
        </div>
        <result-list @result="resultOption" :uuid="uuid"></result-list>
        <!-- 评论 -->
        <div style="margin-top: 16px">
          <comment-box v-if="uuid" :uuid="uuid"></comment-box>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ResultList from "./components/result-list.vue"
import CommentBox from './components/comment-box.vue';
import { useApplicationStore } from '@/store/modules/application';
import { useUserStore } from '@/store/modules/user';
import $router from '@/router/index';
import { useRouter } from 'vue-router';
import { getAppInfo, getSystemConfig } from '@/api/application';
import { ref, onUnmounted } from 'vue';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { useBizDialog } from '@/plugins';
import { marked } from 'marked';

import {
  readStateApp,
  giveLikeApp,
  addEvents,
  resultLike,
  getCollectStatus,
  setCollect,
} from '@/api/application';

import { useMessage } from 'naive-ui';

const dialog = useBizDialog();

const message = useMessage();

const userStore = useUserStore();
const applicationStore = useApplicationStore();
const uuid = ref();
const appInfo = ref({});
const openData = ref(true);
const templateDetailRef = ref();

// 是否已经点赞
const isLike = ref(false);

const formRef = ref(null);
const collected = ref(false); // 收藏状态
const model = ref({});
const rules = {};

const showResult = ref(false);
const showLoading = ref(false);
const receiveMessaging = ref(false);

const printContent = ref(''); // 结果内容
const cacheContent = ref('');
const timer = ref(0);
const currentResult = ref({ hateTimes: 0, likeTimes: 0 });

const advertisingList = ref([]); // 广告列表

// 请求广告列表
const getAdvertising = async () => {
  try {
    const { data } = await getSystemConfig({ key: 'MINI_APP_AD_PLACEHOLDER_OUTPUT' });
    advertisingList.value = data?.value || [];
  } catch (error) {
    console.log(error)
  }
}

// 结果列表操作
function resultOption(item = {}, val) {
  let status = val;
  if (
    (applicationStore.resultStateList?.get(item.id) == 1 && status == 1) ||
    (applicationStore.resultStateList?.get(item.id) == -1 && status == -1)
  ) {
    status = 0;
  }
  resultLike(item.id, { like: status }).then(() => {
    const oldStatus = applicationStore.resultStateList?.get(item.id);
    if (oldStatus == -1 && status == 1) {
      item.likeTimes += 1;
      item.hateTimes -= 1;
    } else if (oldStatus == 1 && status == -1) {
      item.likeTimes -= 1;
      item.hateTimes += 1;
    } else if (oldStatus == 0 && status == -1) {
      item.hateTimes += 1;
    } else if (oldStatus == 0 && status == 1) {
      item.likeTimes += 1;
    } else if (oldStatus == -1 && status == 0) {
      item.hateTimes -= 1;
    } else if (oldStatus == 1 && status == 0) {
      item.likeTimes -= 1;
    }
    applicationStore.resultStateList?.set(item.id, status);
    //
    for (let i = 0; i < applicationStore.resultList.length; i++) {
      if (applicationStore.resultList[i].id == item.id) {
        applicationStore.resultList[i].hateTimes = item.hateTimes;
        applicationStore.resultList[i].likeTimes = item.likeTimes;
        break;
      }
    }
  });
}
// 设置收藏
async function collectTemplate() {
  await setCollect(uuid.value, !collected.value);
  collected.value = !collected.value;
  if (collected.value) {
    appInfo.value.collectTimes += 1;
    message.success('已添加到“收藏”');
  } else {
    appInfo.value.collectTimes -= 1;
    message.warning('已从“收藏”中移除');
  }
}
// 获取 应用收藏状态
async function getCollect() {
  const { data } = await getCollectStatus([uuid.value]);
  collected.value = data[uuid.value];
}

// 打印内容
function printout() {
  const cursorSpan = `｜`
  timer.value = setInterval(() => {
    if (cacheContent.value.length > printContent.value.length) {
      printContent.value = cacheContent.value.slice(0, printContent.value.length + 2);
      document.getElementById('printContent').innerHTML = marked.parse(printContent.value);

    }
  }, 80);
}

function init() {
  appInfo.value.form.map((item) => {
    model[item.label] = null;
    rules[item.label] = [
      {
        required: true,
        message: item.properties?.placeholder,
      },
    ];
  });
  getCollect(); // 请求收藏状态
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

const toastPoint = () => {
  dialog.close();
  nextTick(() => {
    setTimeout(() => {
      dialog.open('insufficient', {
        class: 'insufficient-dialog',
        title: '积分不够啦',
      });
    }, 300);
  });
};

function requestSave() {
  // 积分不够消费，直接提示
  if (appInfo.value.price > userStore.total) {
    return toastPoint();
  }

  dialog.open(
    'run-template',
    {
      class: 'prompt-dialog',
      title: '提示信息',
      positiveText: '确认',
      negativeText: '取消',
      handlePositiveClick() {
        let values = [];
        appInfo.value.form.map((item) => {
          values.push(model.value[item.label]);
        });

        cacheContent.value = '';
        printContent.value = '';
        currentResult.value = { hateTimes: 0, likeTimes: 0 };
        showResult.value = true;
        showLoading.value = true;
        const data = {
          values: values,
          open: openData.value,
        };

        receiveMessage(data);
      },
    },
    {
      user: appInfo.value.createdBy,
      price: appInfo.value.price,
    }
  );
}

// 生成结果
function receiveMessage(data) {
  if (!('EventSource' in window)) return;
  const eventSourceUrl = `/api/apps/${uuid.value}/run`;
  const eventData = new fetchEventSource(eventSourceUrl, {
    method: 'POST',
    headers: {
      Accept: 'text/event-stream',
      'Content-type': 'application/json; charset=utf-8',
      'X-CSRF-TOKEN': `${userStore.token}`,
    },
    openWhenHidden: true,
    body: JSON.stringify(data),
    async onopen(response) {
      if (response.status == 200) {
        console.log('连接成功!');
        printContent.value = ""; // 结果内容
        cacheContent.value = "";
        showLoading.value = false;
        receiveMessaging.value = true; // 正在接收消息
        printout();
      }
    },
    onmessage(msg) {
      // console.log('收到服务器发来的数据!', msg);
      if (msg.event == 'done' && JSON.parse(msg.data).code == 500000) {
        // message.warning('内容生成失败，积分不足！'); // TODO 积分不足弹窗
        toastPoint();
        showResult.value = false;
        return;
      } else if (msg.event == 'done' && JSON.parse(msg.data).code == 400) {
        message.warning('内容生成失败，运行模板的参数错误！');
        showResult.value = false;
        return;
      }
      if (JSON.parse(msg.data).id) currentResult.value.id = JSON.parse(msg.data).id;
      if (JSON.parse(msg.data).content != undefined) {
        cacheContent.value += JSON.parse(msg.data).content;
      }
    },
    onclose() {
      console.log('连接关闭!');
      receiveMessaging.value = false; // 停止接收消息
      // document.getElementById('printContent').innerHTML = marked.parse(`${printContent.value}`);
      // 刷新结果列表
      getAppResultList();
    },
    onerror(err) {
      console.log('连接失败!', err);
    },
  });
}

// 分享模版
async function shareTemplate() {
  dialog.open('share-link', {
    class: 'center-dialog',
    title: '分享',
  });
}

// 请求结果列表
function getAppResultList() {
  applicationStore.getAppResult(uuid.value, true);
}

// 返回上一页
function backPrePage() {
  $router.go(-1);
}

// 创建同款app
function createApp() {
  $router.push({ name: 'builder', query: { id: uuid.value, type: 'new' } });
}

function giveALike() {
  giveLikeApp(uuid.value, { like: !isLike.value }).then(() => {
    isLike.value = !isLike.value;
    if (isLike.value) {
      message.success('已点赞~');
      appInfo.value.likeTimes += 1;
    } else {
      message.info('已取消点赞');
      appInfo.value.likeTimes -= 1;
    }
  });
}

// 添加评论
function addComment() {
  templateDetailRef.value.scrollTop = window.screen.height / 2;
}

onMounted(() => {

  const router = useRouter();
  uuid.value = router.currentRoute.value.query.uuid;
  addEvents({
    type: 'app-viewed',
    args: [uuid.value],
  });
  getAdvertising();// 请求广告位数据
  getAppResultList();
  // 获取应用信息
  getAppInfo(uuid.value).then(({ data }) => {
    appInfo.value = data;
    init();
  });

  readStateApp(uuid.value).then(({ data }) => {
    isLike.value = data.like;
  });
  nextTick(() => {
    templateDetailRef.value.scrollTop = 0;
  });
});

onUnmounted(() => {
  if (timer && timer.value) clearInterval(timer.value);
});
</script>

<style lang="scss">
.template-details-content {
  .n-carousel__dot.n-carousel__dot--active {
    background: #5652ff !important;
    opacity: 0.6;
  }

  .n-carousel__dot {
    background: #f7f7fb !important;
  }

  .n-checkbox-box {
    background: #eeedfe !important;
    width: 20px !important;
    height: 20px !important;
    border-radius: 20px !important;
    margin-right: 8px;

    .n-checkbox-box__border {
      border: 5px solid #eeedfe !important;
    }
  }

  .n-checkbox--checked {
    .n-checkbox-icon {
      margin: 4px;
      width: 10px !important;
      height: 10px !important;
      border-radius: 10px !important;
      color: #5652ff !important;
      background: #5652ff !important;

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
        color: #181d24;
        margin-bottom: 16px;
      }

      .n-form-item-label__asterisk {
        display: none;
      }

      .n-input {
        min-height: 56px !important;
        background: #ffffff;
        box-shadow: 0px 4px 8px rgba(215, 212, 225, 0.5);
        border-radius: 12px !important;
        margin-bottom: 8px !important;
        font-size: 18px !important;
        color: #202226 !important;
        padding: 8px 16px !important;
        --n-caret-color: #5652ff !important;
        --n-border-hover: 1px solid #5652ff !important;
        --n-border-focus: 1px solid #5652ff !important;
        --n-loading-color: #5652ff !important;

        .n-input__border {
          border: 0 none !important;
        }

        .n-input__state-border {
          box-shadow: none;
        }
      }
    }
  }

}
</style>
<style scoped lang="scss">
// 光标动画
@keyframes blink {

  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}

// 设置光标
#printContent>:not(ol):not(ul):not(pre):last-child:after,
#printContent>ol:last-child li:last-child:after,
#printContent>pre:last-child code:after,
#printContent>ul:last-child li:last-child:after {
  -webkit-animation: blink 1s steps(1, start) infinite;
  animation: blink 1s steps(1, start) infinite;
  content: "▋";
  margin-left: .25rem;
  vertical-align: baseline;
  color: #5652ff;
}

// 隐藏光标
#printContent.print-stop>:not(ol):not(ul):not(pre):last-child:after,
#printContent.print-stop>ol:last-child li:last-child:after,
#printContent.print-stop>pre:last-child code:after,
#printContent.print-stop>ul:last-child li:last-child:after {
  display: none;
}

.home-header {
  .back-btn {
    flex: 1;
    font-weight: 400;
    font-size: 16px;
    line-height: 52px;
    color: #5b5d62;
    cursor: pointer;

    .iconfont {
      color: #5B5D62;
      font-size: 16px;
      margin-right: 4px;
    }
  }
}

.template-details-content {
  padding: 42px 52px;
  background: linear-gradient(180deg, #f3f3f6 0%, #edeffc 100%);
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
      background: #ffffff;
      border-radius: 16px;
      padding: 32px 24px 32px 32px;

      >div:first-child {
        display: flex;
        flex-direction: row;
        font-weight: 400;
        font-size: 16px;
        line-height: 30px;
        color: #5b5d62;

        .title {
          font-weight: 500;
          font-size: 28px;
          line-height: 40px;
          color: #181d24;
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
          white-space: pre-wrap;
        }

        .form-box {
          background: linear-gradient(132.93deg, #f1f7ff 5.27%, #faf8ff 59.89%, #eeedfe 98.91%);
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
        color: #5b5d62;
        margin-top: 20px;

        .icon {
          margin-right: 24px;
          float: left;
          display: flex;
          flex-direction: row;
          align-items: center;
          align-content: center;
          cursor: pointer;

          >div:first-child {
            width: 32px;
            height: 32px;
            border-radius: 32px;
            background: #ebebff;
            margin-right: 4px;
            padding: 4px;
            box-sizing: border-box;
            text-align: center;
          }

          .iconfont {
            display: none;
            font-size: 24px;
            line-height: 24px;
          }

          .iconfont.icon-icon-shoucang,
          .iconfont.icon-icon-fenxiang-hover,
          .iconfont.icon-icon-pinglun-hover,
          .iconfont.icon-icon-dianzan {
            color: #525af6;
          }

          .iconfont.icon-icon-fenxiang-hover {
            margin-left: 1px;
          }

          .iconfont-svg {
            width: 24px;
            height: 24px;
            display: flex;
            flex-direction: row;
            margin-right: 6px;
          }

          &:hover {
            color: #202226;

            .iconfont-svg.hide {
              display: none;
            }

            .iconfont.show {
              display: block;
            }
          }

          .active-text {
            color: #5652ff;
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
      background: #ffffff;
      border-radius: 16px;
      margin-top: 16px;

      .title {
        font-weight: 500;
        font-size: 20px;
        line-height: 20px;
        color: #181d24;
        margin-bottom: 20px;
      }

      .result-content {
        padding: 16px;
        background: linear-gradient(132.93deg, #f1f7ff 5.27%, #faf8ff 59.89%, #eeedfe 98.91%);
        border-radius: 16px;
        min-height: 128px;


        .loading {
          padding: 40px 64px;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
          color: #5b5d62;

          .n-progress {
            margin-top: 8px;
          }
        }

        p {
          min-height: 80px;
        }
      }

      // 广告位
      .advertising-space {
        padding: 16px 0px 0px 0px;
        display: flex;
        flex-direction: row;

        >div {
          margin-right: 16px;
          height: 80px;
          overflow: hidden;
        }
      }

      .option {
        height: 20px;
        margin-top: 12px;
        text-align: right;

        .iconfont-svg {
          width: 24px;
          height: 24px;
          margin-right: 8px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
