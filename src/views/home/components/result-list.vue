<!--
 * @Author: Lemon
 * @Date: 2023-05-15 14:12:35
 * @Description: 
-->
<template>
    <div class="public-results" v-if="applicationStore.resultList.length > 0">
        <div class="custom-arrow">
            <icon-font name="icon-icon-qiehuanjiantou" class="custom-arrow--left" @click="prev" />
            <icon-font name="icon-icon-qiehuanjiantou" class="custom-arrow--right" @click="next" />
        </div>
        <div>
            <n-carousel :slides-per-view="slidesPerView" :loop="false" :autoplay="autoplay" :show-dots="false"
                :current-index="currentIndex" @update:current-index="changeCurrent">
                <n-carousel-item v-for="(result, index) in applicationStore.resultList" :key="result.id">
                    <div class="result-item">
                        <div class="user">
                            <div>
                                <img width="36" :src="result.createdBy.avatar || '@/assets/default-user.jpg'" />
                            </div>
                            <div>{{ result.createdBy.nickname }}</div>
                            <div v-if="slidesPerView == 2" @click="setFullScreen(index)">
                                <icon-font name="icon-icon-zhankaikapian" />
                            </div>
                            <div v-else @click="setFullScreen(index)">
                                <icon-font name="icon-icon-shouqikapian" />
                            </div>
                        </div>
                        <div class="label">
                            <span>
                                {{ result.inputArgs.join('·') }}
                            </span>
                        </div>
                        <div v-if="slidesPerView == 2" class="content">
                            {{ result.content }}
                        </div>
                        <div v-else class="content-container" v-html="marked.parse(result.content)">
                        </div>
                        <div class="option">
                            <div class="count">
                                {{ index + 1 }}/{{ applicationStore.resultTotal }}
                            </div>
                            <div class="right">
                                <div @click="option(result, 1)">
                                    <icon-font-symbol :name="applicationStore.resultStateList?.get(result.id) == 1
                                        ? 'icon-icon-yidianzan'
                                        : 'icon-icon-dianzan'
                                        " />

                                    <div :class="{
                                        'active-text': applicationStore.resultStateList?.get(result.id) == 1,
                                    }">
                                        {{ result.likeTimes }}
                                    </div>
                                </div>
                                <div @click="option(result, -1)">
                                    <icon-font-symbol :name="applicationStore.resultStateList?.get(result.id) == -1
                                        ? 'icon-icon-yicai'
                                        : 'icon-icon-cai'
                                        " />

                                    <div :class="{
                                        'active-text': applicationStore.resultStateList?.get(result.id) == -1,
                                    }">
                                        {{ result.hateTimes }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </n-carousel-item>

            </n-carousel>
        </div>
    </div>
</template>
<script setup>
import { useApplicationStore } from '@/store/modules/application';
import { marked } from 'marked';

const applicationStore = useApplicationStore();
const props = defineProps(['uuid']);
const emit = defineEmits(['result']);

const currentIndex = ref(0);
const slidesPerView = ref(2);
const autoplay = ref(true);


const option = (item, state) => {
    emit('result', item, state);
}

// 上一页
const prev = () => {
    if (currentIndex.value > 0) {
        currentIndex.value -= slidesPerView.value;
    }
};

// 下一页
const next = () => {
    // 已经请求的，直接翻页 
    if (currentIndex.value < (applicationStore.resultList.length - slidesPerView.value)) {
        currentIndex.value += slidesPerView.value;
    }

    if (currentIndex.value > (applicationStore.resultList.length - slidesPerView.value * 2) &&
        applicationStore.resultList.length < applicationStore.resultTotal) { // 小于总数，请求下一页，请求的原则是，提前一页发送请求
        requestNextData();
    }
};

// 请求下一页数据
const requestNextData = () => {
    applicationStore.getAppResult(props.uuid);
}

const setFullScreen = (index) => {
    if (slidesPerView.value == 2) { // 展开成一个   
        autoplay.value = false;
        currentIndex.value = index;
        slidesPerView.value = 1;
    } else {// 两个展示     
        autoplay.value = true;
        slidesPerView.value = 2;
        if ((index % 2) === 0) {
            currentIndex.value = index;
        } else {
            currentIndex.value = index - 1;
        }
    }
}

const changeCurrent = (val) => {
    currentIndex.value = val;
}

</script>
<style lang="scss">
.public-results {
    position: relative;
    background: #ffffff;
    border-radius: 16px;
    padding: 16px 56px;
    margin-top: 16px;
    height: 274px;
    box-sizing: border-box;

    .result-item {
        margin: 0 8px;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #202226;
        background: #f7f7fb;
        border-radius: 12px;
        padding: 16px;
        height: 242px;
        box-sizing: border-box;

        .user {
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            color: #5b5d62;
            display: flex;
            flex-direction: row;

            img {
                width: 24px;
                height: 24px;
                border-radius: 24px;
                margin-right: 8px;
            }

            >div:last-child {
                margin-left: auto;

                .iconfont {
                    font-size: 20px;
                    color: #ABACAE;

                    &:hover {
                        cursor: pointer;
                        color: #5652FF;
                    }
                }
            }
        }

        .label {
            border-radius: 4px;
            font-weight: 400;
            font-size: 14px;
            line-height: 30px;
            color: #000000;
            margin: 12px 0;
            height: 30px;

            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            white-space: pre-line;

            span {
                display: inline-block;
                background: white;
                border-radius: 4px;
                padding: 0 8px;
            }
        }

        .content {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            white-space: pre-line;
            height: 96px;
            margin-bottom: 6px;

            h1 {
                line-height: 32px;
            }
        }

        .content-container {
            height: 96px;
            margin-bottom: 6px;
            overflow-x: hidden;
            overflow-y: scroll;
        }

        .option {
            display: flex;
            flex-direction: row;
            align-items: center;
            align-content: center;


            .count {
                color: #ABACAE;
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 18px;
            }

            .right {
                margin-left: auto;
                cursor: pointer;
                color: #5B5D62;
                display: flex;
                flex-direction: row;



                >div {
                    background: #f7f7fb;
                    margin-right: 4px;
                    padding: 4px;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: row;

                    .iconfont-svg {
                        width: 24px;
                        height: 24px;
                        display: flex;
                        flex-direction: row;
                        margin-right: 6px;
                    }

                    &:hover {
                        color: #202226;
                    }

                    .active-text {
                        color: #5652ff;
                    }
                }
            }
        }
    }
}

.custom-arrow {
    display: flex;
    position: absolute;
    margin-left: -40px;
    width: calc(100% - 32px);
    margin-top: 105px;
    height: 32px;
}

.iconfont {
    font-size: 32px;
    color: #E3E4E5;
}

.custom-arrow--left,
.custom-arrow--right {
    cursor: pointer;

    &:hover {
        color: #ABACAE !important;
    }
}

.custom-arrow--right {
    margin-left: auto;
    transform: rotate(180deg);
}
</style>