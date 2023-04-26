<!--
 * @Author: Lemon
 * @Date: 2023-04-25 16:40:37
 * @Description: 通知组件
-->
<template>
    <n-popover class="notice" trigger="click" :show-arrow="false">
        <template #trigger>
            <div class="notice-icon">
                <div v-if="unreadMessage > 0" class="unread-notice">{{ unreadMessage }}</div>
                <IconFont name="icon-icon-chuangjianwodexiaochengxu" size="24" />
            </div>
        </template>
        <div class="notice-box">
            <div class="title">
                <div>通知</div>
                <n-popselect v-model:value="option" :options="options" trigger="click">
                    <div class="select-option">
                        {{ options[option]?.label }}
                        <IconFont name="icon-icon-chuangjianwodexiaochengxu" />
                    </div>
                </n-popselect>
            </div>
            <div class="list" v-if="messageList.length">
                <div class="item" v-for="item in messageList" :class="{ 'is-read': item.isRead }">
                    <img :src="types[item.type]" alt="">
                    <div>
                        <div class="line1">
                            <div class="label">{{ item.title }}</div>
                            <div class="time">{{ item.createdAt }}</div>
                        </div>
                        <div class="content">{{ item.content }}</div>
                    </div>
                </div>
            </div>
            <div v-else class="default-bg">
                <div>
                    <img src="./images/bg.png" alt="">
                </div>
                <div>
                    近六个月未收到消息
                </div>
                <!-- <div>
                    暂无未读消息
                </div> -->
            </div>
            <div class="tag-message" v-show="unreadMessage">
                <img src="./images/check.png" alt="">
                标记为全部已读
            </div>
        </div>
    </n-popover>
</template>
<script setup>
import notifyReward from "./images/airdrop.png";
import notifyInvited from "./images/invited.png";
import notifyPointsRecharge from "./images/points-recharge.png";
import notifyDuplicateApp from "./images/duplicate-app.png";
import notifyAppBeUsed from "./images/app-be-used.png";
const option = ref(0);
const unreadMessage = ref(6);
const options = [
    {
        label: "查看全部",
        value: 0
    }, {
        label: "未读消息",
        value: 1
    }];

const types = {
    "notify-reward": notifyReward,
    "notify-invited": notifyInvited,
    "notify-points-recharge": notifyPointsRecharge,
    "notify-duplicate-app": notifyDuplicateApp,
    "notify-app-be-used": notifyAppBeUsed
};

const messageList = ref([
    {
        "id": 21,
        "type": "notify-reward",
        "title": "空投奖励",
        "content": "嗨新伙伴，欢迎加入我们！送你 30 积分，和我们开始创造吧！",
        "isRead": false,
        "createdAt": "2023-03-22T07:08:02.851Z"
    },
    {
        "id": 22,
        "type": "notify-invited",
        "title": "空投奖励",
        "content": "嗨新伙伴，欢迎加入我们！送你 30 积分，和我们开始创造吧！",
        "isRead": true,
        "createdAt": "2023-03-22T07:08:02.851Z"
    },
])

</script>
<style lang="scss">
.notice.n-popover {
    padding: 0px !important;
}

[v-placement='bottom']>.notice.n-popover-shared {
    margin-top: 0px;
}

// 选择框
.notice .v-binder-follower-content {
    .n-popselect-menu {
        margin-top: 0px;
        padding: 0px;

        .n-base-select-menu-option-wrapper {
            padding: 0px !important;
            width: 80px;
        }

        .n-base-select-option__content {
            padding: 0;
            font-size: 12px;
            padding-right: 0 !important;
            white-space: nowrap;
            text-overflow: unset;
            overflow: visible;

        }

        // 选中
        .n-base-select-option--selected {

            .n-base-select-option__content {
                color: #5652FF !important;
            }

            i.n-base-select-option__check {
                display: none;
            }
        }

        .n-base-select-option {
            min-height: 29px !important;
            box-sizing: border-box;
            line-height: 29px;

            &:hover {
                background: #F3F3F3 !important;
            }

            .n-base-select-option__content {
                height: 29px;
                padding-left: 4px;
                text-align: center;
                color: #5B5D62;
            }

            &:before {
                display: none;
                left: 0;
                right: 0;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.notice-box {
    width: 344px;
    height: 437px;
    background: #FFFFFF;

    .title {
        font-weight: 500;
        font-size: 16px;
        line-height: 46px;
        color: #181D24;
        height: 46px;
        border-bottom: 1px solid #eeeeef;
        display: flex;
        justify-content: space-between;
        padding: 0 16px;

        .select-option {
            margin-top: 9px;
            width: 80px;
            box-sizing: border-box;
            height: 29px;
            line-height: 29px !important;
            font-weight: 400;
            font-size: 13px;
            line-height: 18px;
            color: #5B5D62;
            cursor: pointer;
            padding-left: 4px;
        }
    }

    .default-bg {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #5B5D62;
        text-align: center;
        padding-top: 56px;

        img {
            width: 182px;
            height: 182px;
        }

    }

    .list {
        height: 390px;
        overflow-y: auto;
        overflow-x: hidden;
        padding-bottom: 16px;
        box-sizing: border-box;

        .item {
            padding: 11px 16px;
            display: flex;


            &:hover {
                cursor: pointer;
                background: #F3F3F3;
            }

            img {
                width: 40px;
                height: 40px;
                border-radius: 12px;
                margin-right: 8px;
            }

            .line1 {
                display: flex;
                margin-bottom: 2px;
                width: 264px;
            }

            .label {
                font-weight: 500;
                font-size: 14px;
                line-height: 20px;
                color: #181D24;
            }

            .time {
                font-weight: 400;
                font-size: 12px;
                line-height: 17px;
                text-align: right;
                color: #ABACAE;
                margin-left: auto;
            }

            .content {
                font-weight: 400;
                font-size: 12px;
                line-height: 17px;
                color: #5B5D62;
            }
        }

        .item.is-read {
            .label {
                color: #5B5D62;
                font-weight: 400;
            }

            .content {
                color: #ABACAE;
            }

            &:hover {
                cursor: pointer;
                background: #fff;
            }
        }
    }


    .tag-message {
        background: white;
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        bottom: 0px;
        padding: 10px 16px;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        color: #202226;
        display: flex;
        align-items: center;

        img {
            width: 20px;
            height: 20px;
            margin-right: 4px;
        }

        &:hover {
            cursor: pointer;
            background: #F3F3F3;
            color: #5652FF;
        }
    }
}

.notice-icon {
    cursor: pointer;
    height: 50px;
    font-size: 24px;
    color: #202226;
    display: flex;
    align-items: center;
    margin-right: 27px;

    .unread-notice {
        font-weight: 500;
        font-size: 11px;
        line-height: 12px;
        text-align: center;
        color: #FFFFFF;
        position: absolute;
        padding: 2px 4px;
        box-sizing: border-box;
        min-width: 16px;
        min-height: 16px;
        border-radius: 16px;
        background: #DC504C;
        margin-left: 16px;
        margin-top: -16px;
    }

    .iconfont:hover {
        color: #5652FF;
    }
}
</style>