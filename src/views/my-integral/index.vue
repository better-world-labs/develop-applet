<!--
 * @Author: Lemon
 * @Date: 2023-03-22 15:13:40
 * @Description: 我的积分
-->
<template>
    <div>
        <div class="home-header">
            <div class="back-btn"></div>
            <n-button type="info" @click="createTemplate">
                <IconFont name="icon-icon-chuangjianwodexiaochengxu" />
                创建我的小程序
            </n-button>
            <user-integral></user-integral>
        </div>
        <div class="my-integral-content">
            <div>
                <div class="title">
                    我的积分
                </div>
                <div class="title2">
                    积分余额 <span class="active-text ">{{ total }}分</span>
                </div>
                <div class="title2">积分明细：</div>
                <div class="item" v-for="item in dataList" :key="item.userId">
                    <div>
                        <div>
                            {{ item.description }}
                        </div>
                        <div class="active-text ">
                            {{ item.points }}
                        </div>
                    </div>
                    <div class="small">
                        {{ dayjs(item.createdAt).format('YYYY/MM/DD HH:mm:ss') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useInit } from '@/hooks/useInit';
import { getIntegralDetails } from "@/api/user";
import dayjs from 'dayjs';

const { goAuth } = useInit()
const total = ref(0);
const dataList = ref([]);

// 创建模版
function createTemplate() {
    if (!userStore.token) goAuth();
    $router.push({ name: 'builder' });
}
onMounted(() => {
    getIntegralDetails().then(({ data }) => {
        dataList.value = data.list;
        total.value = data.total;
    })
})
</script>
<style scoped lang="scss">
.home-header {
    .back-btn {
        flex: 1;
    }
}

.my-integral-content {
    padding: 42px 52px;
    background: #F3F3F7;
    position: absolute;
    height: calc(100% - 72px);
    width: calc(100% - 312px);
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: scroll;

    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #202226;

    >div:first-child {
        max-width: 660px;

        .title {
            font-weight: 500;
            font-size: 20px;
            line-height: 28px;
            color: #181D24;
            padding-bottom: 16px;
            border-bottom: 1px solid rgba(171, 172, 174, 0.2);

        }

        .title2 {
            font-weight: 500;
            font-size: 16px;
            line-height: 22px;
            color: #202226;
            margin: 16px 0;
        }


        .item {
            border-bottom: 1px solid rgba(171, 172, 174, 0.2);

        }

        .active-text {
            color: rgba(86, 82, 255, 1)
        }

        .small {
            font-weight: 400;
            font-size: 12px;
            line-height: 17px;

            color: #ABACAE;
        }
    }


}
</style>