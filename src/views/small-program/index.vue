<!--
 * @Author: Lemon
 * @Date: 2023-03-22 15:13:40
 * @Description: 
-->
<template>
    <div>
        <div class="home-header">
            <div>

            </div>
            <n-button type="info" @click="createTemplate">
                <IconFont name="icon-icon-chuangjianwodexiaochengxu" />
                创建我的小程序
            </n-button>
            <user-integral></user-integral>
        </div>
        <div class="small-program">
            <n-grid :x-gap="12" :y-gap="8" :cols="3">
                <n-grid-item class="item">
                    <div class="title">
                        测一测你的生辰八字！用过的都惊呆了
                    </div>
                    <div class="date">
                        2023-1-12 13:12:22
                    </div>
                    <div>
                        已售： <span class="active-text">1451</span>积分
                    </div>
                    <div class="options">
                        <div>
                            <div>
                                被使用
                            </div>
                            <div>
                                1223次
                            </div>
                        </div>
                        <div>
                            <div>
                                被使用
                            </div>
                            <div>
                                1223次
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <n-button>编辑</n-button>
                        <n-button>分享</n-button>
                    </div>
                </n-grid-item>
                <n-grid-item class="item">
                    <div class="title">
                        测一测你的生辰八字！用过的都惊呆了
                    </div>
                    <div class="date">
                        2023-1-12 13:12:22
                    </div>
                    <div>
                        已售： <span class="active-text">1451</span>积分
                    </div>
                    <div class="options">
                        <div>
                            <div>
                                被使用
                            </div>
                            <div>
                                1223次
                            </div>
                        </div>
                        <div>
                            <div>
                                被使用
                            </div>
                            <div>
                                1223次
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <n-button>编辑</n-button>
                        <n-button>分享</n-button>
                    </div>
                </n-grid-item>
                <n-grid-item class="item">
                    <div class="title">
                        测一测你的生辰八字！用过的都惊呆了
                    </div>
                    <div class="date">
                        2023-1-12 13:12:22
                    </div>
                    <div>
                        已售： <span>1451</span> 积分
                    </div>
                    <div class="options">
                        <div>
                            <div>
                                被使用
                            </div>
                            <div>
                                1223次
                            </div>
                        </div>
                        <div>
                            <div>
                                被使用
                            </div>
                            <div>
                                1223次
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <n-button>编辑</n-button>
                        <n-button>分享</n-button>
                    </div>
                </n-grid-item>
                <n-grid-item class="item">
                    <div class="title">
                        测一测你的生辰八字！用过的都惊呆了
                    </div>
                    <div class="date">
                        2023-1-12 13:12:22
                    </div>
                    <div>
                        已售： <span>1451</span> 积分
                    </div>
                    <div class="options">
                        <div>
                            <div>
                                被使用
                            </div>
                            <div>
                                1223次
                            </div>
                        </div>
                        <div>
                            <div>
                                被使用
                            </div>
                            <div>
                                1223次
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <n-button>编辑</n-button>
                        <n-button>分享</n-button>
                    </div>
                </n-grid-item>
            </n-grid>

        </div>
    </div>
</template>
<script>
import UserIntegral from "@/views/home/components/user-integral.vue"
</script>
<style lang="scss" scoped>
.home-header>div {
    flex: 1;
}

.small-program {
    padding: 42px 52px;
    background: linear-gradient(180deg, #F3F3F6 0%, #EDEFFC 100%);
    position: absolute;
    height: calc(100% - 72px);
    width: calc(100% - 312px);
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: scroll;

    .item {
        background: #FFFFFF;
        box-shadow: 0px 6px 16px rgba(211, 213, 235, 0.4);
        border-radius: 24px;
        padding: 24px;
        font-weight: 500;
        font-size: 20px;
        line-height: 20px;
        color: #181D24;
        margin-bottom: 24px;
        margin-right: 16px;


        .title {
            font-weight: 500;
            font-size: 28px;
            line-height: 40px;

            color: #181D24;
            margin-bottom: 10px;
        }

        .date {
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            color: #5B5D62;
            margin-bottom: 16px;
        }

        .active-text {
            color: rgba(86, 82, 255, 1);
        }

        .options {
            margin-top: 24px;
            margin-bottom: 15px;
            width: 100%;
            height: 83px;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            color: #ABACAE;
            background: #F3F3F7;
            border-radius: 10px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 0 20px;
            box-sizing: border-box;

            div {
                flex-basis: 50%;
                text-align: center;
            }

        }

        .n-button {
            width: 105px;
            height: 40px;
            background: #EEEDFE;
            border: 1px solid #5652FF;
            border-radius: 8px;
            font-weight: 500;
            font-size: 16px;
            line-height: 16px;
            color: #5652FF;
            margin-left: 16px;

        }

    }
}
</style>