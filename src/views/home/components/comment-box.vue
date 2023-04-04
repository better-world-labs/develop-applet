<!--
 * @Author: Lemon
 * @Date: 2023-04-03 14:46:05
 * @Description: 评论交流区
-->
<template>
    <div class="comment-box">
        <div>
            <editor-box @sendMsg="sendMsg"></editor-box>
        </div>
        <div class="count">评论 {{ dataList.length }}</div>
        <div class="list-item" v-for="item in  dataList" :key="item.id">
            <img :src="item.createdBy.avatar || '@/assets/default-user.jpg'" alt="">
            <div>
                <div class="first-line">
                    <div class="title">
                        {{ item.createdBy.nickname }}
                    </div>
                    <div v-if="item.createdAt" class="date-time">
                        {{ dayjs(item.createdAt).format('YYYY/MM/DD HH:mm:ss') }}
                    </div>
                </div>
                <div style="white-space: pre-wrap">
                    {{ item.content }}
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import EditorBox from "./editor-box.vue"
import { getCommentListApp } from "@/api/application"
import { useApplicationStore } from "@/store/modules/application";
import { addCommentsApp } from "@/api/application";
import dayjs from "dayjs";

const applicationStore = useApplicationStore();

const props = defineProps(['uuid'])
const dataList = ref([]);

function getList() {
    getCommentListApp(props.uuid).then(({ data }) => {
        dataList.value = data.list;
    })
}

const sendMsg = () => {
    if (!applicationStore.editorText) return;
    addCommentsApp(props.uuid, { content: applicationStore.editorText }).then((
    ) => {
        getList(); // 刷新评论列表
        applicationStore.updateEditorText(""); // 清空输入框

    });
};

onMounted(() => {
    getList();
})
</script>
<style lang="scss">
.comment-box {
    padding: 32px;
    background: #FFFFFF;
    border-radius: 16px;

    .count {
        font-weight: 400;
        font-size: 14px;
        line-height: 14px;
        color: #101010;
        margin-top: 20px;
    }

    .list-item {
        padding: 20px 0;
        border-bottom: 1px solid rgba(171, 172, 174, 0.1);
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #5B5D62;
        display: flex;
        flex-direction: row;

        &:last-child {
            border: none !important;
        }

        .first-line {
            display: flex;
            flex-direction: row;
            margin-bottom: 6px;
        }

        img {
            width: 32px;
            height: 32px;
            border-radius: 32px;
            margin-right: 10px;
        }

        .title {
            font-weight: 400;
            font-size: 14px;
            line-height: 14px;

            color: #101010;
        }

        .date-time {
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;

            text-align: justify;

            color: #ABACAE;
            margin-left: 8px;
        }
    }
}
</style>