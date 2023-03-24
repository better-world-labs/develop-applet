<!--
 * @Author: Lemon
 * @Date: 2023-03-23 10:47:31
 * @Description: 模版详情（非编辑态）
--> 
<template>
    <div>
        <div class="home-header">
            <div class="back-btn">
                返回
            </div>
            <n-button type="info">
                一键同款小程序
            </n-button>
            <user-integral></user-integral>
        </div>
        <div class="template-details-content">

            <div>
                <div class="template">
                    <n-grid x-gap="12" :cols="2">
                        <n-gi style="margin-right:8px">
                            <div class="title"> 测一测你的生辰八字！用过的都惊呆了🤯</div>
                            <div class="user">
                                <div>
                                    <img width="36" src="@/assets/test.jpg" />
                                </div>
                                <div>Tu啊黑科</div>
                            </div>
                            <div>
                                这是一个为你专业分析你的生辰八字的小程序，按照右边的提示问题填写相关信息，立即可以生成你的八字信息，用过的都说好！是vahvvhkvaakvb啊哈撒谎
                                想哈手机哈哈欧股
                                沙拉金德拉克撒撒浪嘿拉升大了啥快乐生活垃圾上来看
                                阿萨是卢卡斯了
                                啊设计阿斯利康
                            </div>
                        </n-gi>
                        <n-gi>
                            <div class="form-box">
                                <div>
                                    <div class="form-item">
                                        <div class="label">
                                            你的姓名
                                        </div>
                                        <div>
                                            <n-input size="large" round autosize placeholder="大"
                                                style="height:56px;width:100%;" />
                                        </div>
                                    </div>
                                    <div class="form-item">
                                        <div class="label">
                                            你的姓名
                                        </div>
                                        <div>
                                            <n-input size="large" round autosize placeholder="大"
                                                style="height:56px;width:100%;" />
                                        </div>
                                    </div>
                                    <div class="form-item">
                                        <div class="label">
                                            你的姓名
                                        </div>
                                        <div>
                                            <n-input size="large" round autosize placeholder="大"
                                                style="height:56px;width:100%;" />
                                        </div>
                                    </div>
                                    <div class="form-item">
                                        <div class="label">
                                            你的姓名
                                        </div>
                                        <div>
                                            <n-input size="large" round autosize placeholder="大"
                                                style="height:56px;width:100%;" />
                                        </div>
                                    </div>
                                    <div class="form-item">
                                        <div class="label">
                                            你的姓名
                                        </div>
                                        <div>
                                            <n-input size="large" round autosize placeholder="大"
                                                style="height:56px;width:100%;" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </n-gi>
                    </n-grid>
                    <div class="footer">
                        <n-grid x-gap="12" :cols="2">
                            <n-gi>
                                <div class="icon">
                                    <span></span>
                                    <span>分享</span>
                                </div>
                                <div class="icon">
                                    <span></span>
                                    <span>分享</span>
                                </div>
                                <div class="icon">
                                    <span></span>
                                    <span>分享</span>
                                </div>
                            </n-gi>
                            <n-gi>
                                <n-checkbox v-model:checked="value">
                                    公开我的模板结果（用于社区构建）
                                </n-checkbox>
                                <n-button type="info">
                                    立即生成 <br />5积分
                                </n-button>
                            </n-gi>
                        </n-grid>
                    </div>
                </div>
                <div class="result-box">

                    <div class="title">
                        结果：
                    </div>
                    <div class="result-content">
                        <div class="loading">
                            结果生成中，AI正在奋笔疾书中.......
                            <n-progress type="line" :percentage="60" color="#5652FF" rail-color="#DCDBFF"
                                :show-indicator="false" processing />
                        </div>
                        年柱：丙戌，丙火戌土，火土之年，丙火得地而旺，与戌土相合，为偏印生财之命。月柱：甲辰，甲木辰土，木土之气，甲木嫩根有泄，但得相生，为食神生财之格
                        总体来看，您的八字五行比较均衡，命格偏向偏印生财的类型，事业上可能会有一定的成就，但必须加强自我修养和意志力，才能更好的发挥自己的长处。
                        <p class='typewriter'>{{ typewriter }}</p>
                        <div class="option">
                            <span>踩</span>
                        </div>
                    </div>
                </div>

                <div class="public-results">
                    <n-carousel :space-between="20" :loop="false" slides-per-view="auto" draggable>
                        <n-carousel-item style="width: 40%">
                            <div class="result-item">
                                <div class="user">
                                    <div>
                                        <img width="36" src="@/assets/test.jpg" />
                                    </div>
                                    <div>Tu啊黑科</div>
                                </div>
                                <div class="label">
                                    黄雨萱 · 1998年12月31日 · 女 · 猪
                                </div>
                                <div>
                                    这是一个为你专业分析你的生辰八字的小程序按照右边的提示问题填写相关信息，立即可以生成你的八字信息，用过的都说好！阿不会上课吧vhkvaakvb啊哈撒
                                </div>
                            </div>
                        </n-carousel-item>
                        <n-carousel-item style="width: 40%">
                            <div class="result-item">
                                <div class="user">
                                    <div>
                                        <img width="36" src="@/assets/test.jpg" />
                                    </div>
                                    <div>Tu啊黑科</div>
                                </div>
                                <div class="label">
                                    黄雨萱 · 1998年12月31日 · 女 · 猪
                                </div>
                                <div>
                                    这是一个为你专业分析你的生辰八字的小程序按照右边的提示问题填写相关信息，立即可以生成你的八字信息，用过的都说好！阿不会上课吧vhkvaakvb啊哈撒
                                </div>
                            </div>
                        </n-carousel-item>
                        <n-carousel-item style="width: 40%">
                            <div class="result-item">
                                <div class="user">
                                    <div>
                                        <img width="36" src="@/assets/test.jpg" />
                                    </div>
                                    <div>Tu啊黑科</div>
                                </div>
                                <div class="label">
                                    黄雨萱 · 1998年12月31日 · 女 · 猪
                                </div>
                                <div>
                                    这是一个为你专业分析你的生辰八字的小程序按照右边的提示问题填写相关信息，立即可以生成你的八字信息，用过的都说好！阿不会上课吧vhkvaakvb啊哈撒
                                </div>
                            </div>
                        </n-carousel-item>
                        <n-carousel-item style="width: 40%">
                            <div class="result-item">
                                <div class="user">
                                    <div>
                                        <img width="36" src="@/assets/test.jpg" />
                                    </div>
                                    <div>Tu啊黑科</div>
                                </div>
                                <div class="label">
                                    黄雨萱 · 1998年12月31日 · 女 · 猪
                                </div>
                                <div>
                                    这是一个为你专业分析你的生辰八字的小程序按照右边的提示问题填写相关信息，立即可以生成你的八字信息，用过的都说好！阿不会上课吧vhkvaakvb啊哈撒
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
import UserIntegral from "./components/user-integral.vue"

const value = ref(true);

// const typewriter = ref("");
// const i = ref(0);
// const timer = ref(0);
// const str = "年柱：丙戌，丙火戌土，火土之年，丙火得地而旺，与戌土相合，为偏印生财之命。月柱：甲辰，甲木辰土，木土之气，甲木嫩根有泄，但得相生，为食神生财之格"
// function typeing() {
//     if (i.value <= str.length) {
//         typewriter.value = str.slice(0, i.value++) + '_'
//         timer.value = setTimeout(() => {
//             typeing()
//         }, 100)
//     } else {
//         clearTimeout(timer.value)
//     }
// }
// onMounted(() => {
//     // typeing();
// }),
</script>

<style lang="scss"> .template-details-content {
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

 }
</style>

<style scoped lang="scss">
.home-header {
    .back-btn {
        flex: 1;
        font-weight: 400;
        font-size: 16px;
        line-height: 52px;
        color: #5B5D62;
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
                    height: 80px;
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

                .form-box {
                    background: linear-gradient(132.93deg, #F1F7FF 5.27%, #FAF8FF 59.89%, #EEEDFE 98.91%);
                    border-radius: 16px;
                    max-width: 456px;
                    height: 454px;
                    box-sizing: border-box;
                    padding: 8px 8px 8px 32px;

                    >div {
                        padding-top: 16px;
                        padding-right: 16px;
                        overflow-x: hidden;
                        height: 422px;
                        overflow-y: scroll;
                    }

                    .form-item {
                        margin-bottom: 32px;

                        .label {
                            font-weight: 500;
                            font-size: 20px;
                            line-height: 20px;
                            color: #181D24;
                            margin-bottom: 16px;

                        }
                    }
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

            }

            .option {
                height: 20px;
                margin-top: 12px;
                text-align: right;
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
            }
        }
    }
}
</style>