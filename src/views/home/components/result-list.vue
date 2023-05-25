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
         <result-com-one :result="applicationStore.resultList[0]"
             :option="option" :num="index" @updatePerView="updatePerView">
         </result-com-one> 
        <div v-if="slidesPerView == 2">
            <n-carousel key="slidesPerView1" slides-per-view="2" :loop="true" autoplay :show-dots="false" :current-index="currentIndex"
                @update:current-index="changeCurrent">
                <n-carousel-item v-for="(result, index) in applicationStore.resultList" :key="index + '1'">
                    <component :is="resultComTwo" :key="'resultComTwo' + index + '1'" :result="result"
                        :option="option" :num="index" @updatePerView="updatePerView">
                    </component>
                </n-carousel-item>
            </n-carousel> 
        </div>
        <div> 
            <n-carousel key="slidesPerView2" :show-dots="false" :current-index="currentIndex"
                @update:current-index="changeCurrent">
                <n-carousel-item v-for="(result, index) in applicationStore.resultList" :key="index + '2'"> 
                    <div style="min-height: 200rpx;color:red">
                        {{ index }}
                        <button>{{ index }}</button>
                        <result-com-one :key="'resultComOne' + index + '2'"  :result="result"
                            :option="option" :num="index" @updatePerView="updatePerView">
                        </result-com-one>
                    </div>
                </n-carousel-item>
            </n-carousel>
        </div>
    </div>
</template>
<script setup>
import { useApplicationStore } from '@/store/modules/application';
// import resultComOne from "./result-com/result-com-one.vue"
// import resultComTwo from "./result-com/result-com-two.vue"
const applicationStore = useApplicationStore();
const props = defineProps(['uuid']);
const emit = defineEmits(['result']);
 
const currentIndex = ref(0);
const slidesPerView = ref(1); 
 
const option = (item, state) => {
    emit('result', item, state);
}

const updatePerView = (currentNum, index) => {  
    if (index === 1) { 
        currentIndex.value = currentNum; 
    } else {
        if ((currentNum % 2) === 0) {
            currentIndex.value = currentNum;
        } else {
            currentIndex.value = currentNum - 1;
        }  
    } 
     slidesPerView.value = index;
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