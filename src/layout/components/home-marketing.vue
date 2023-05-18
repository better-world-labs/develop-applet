<!--
 * @Author: Lemon
 * @Date: 2023-05-12 17:12:11
 * @Description: 首页营销
-->
<template>
    <div v-if="show" class="home-marketing">
        <div v-for="item in list">
            <advertising-space-img :item="item"></advertising-space-img>
        </div>
    </div>
</template>

<script  setup>
import { getSystemConfig } from '@/api/application';
import { useRouter, onBeforeRouteUpdate } from 'vue-router';
const show = ref(false);
const router = useRouter()
const list = ref([])

const init = async () => {
    const { data } = await getSystemConfig({ key: 'MINI_APP_AD_PLACEHOLDER_HOME' });
    list.value = data.value;
}

onBeforeRouteUpdate((to) => {
    show.value = to.name == 'home'
    if (show.value) {
        init();
    }
})

onMounted(() => {
    show.value = router.currentRoute.value.path == '/home';
    if (show.value) {
        init();
    }
})
</script>
<style lang="scss" scoped>
.home-marketing {
    margin-bottom: 48px;
    position: absolute;
    bottom: 0;

    >div {
        width: 280px;
        height: 80px;
        margin: 16px 16px 0px 16px;
        cursor: pointer;
    }

    img {
        width: 280px;
        height: 80px;
        padding-bottom: 0px;
        border: none;
    }

    .popover-feed {
        padding: 8px !important;

        .code-feed {
            img {
                width: 112px;
                height: 112px;
                background: #f5f5f5;
                border-radius: 4px;
            }
        }

    }
}
</style>