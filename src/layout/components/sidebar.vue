<!--
 * @Author: Lemon
 * @Date: 2023-03-22 09:30:35
 * @Description: 
-->
<template>
    <div class="left-sider">
        <div class="logo" @click="toHome">
            <img src="@/assets/logo.png" alt="">
        </div>
        <n-layout has-sider>
            <n-layout-sider :width="296">
                <n-menu class="menu" :options="menuOptions" default-value="home" @update:value="handleUpdateValue" />
            </n-layout-sider>
        </n-layout>
        <n-button type="success" @click="goAuth">登录</n-button>
    </div>
</template>
<script lang="ts" setup>
import $router from '@/router/index';
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { ref, h } from "vue"
import { useInit } from '@/hooks/useInit';
const currentMenu = ref('home');
import IconFont from "@/components/icon-font/icon-font.vue"


function renderIcon(str: string) {
    return () => h(IconFont, { class: str, style: { 'font-size': '30px', 'margin-right': '10px' } })
}

const menuOptions: MenuOption[] = [
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'home',
                    }
                },
                { default: () => '小程序广场' }
            ),
        key: 'home',
        icon: renderIcon('icon-icon-xiaochengxuguangchang-moren')
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'small-program',
                    }
                },
                { default: () => '我的小程序' }
            ),
        key: 'small-program',
        icon: renderIcon('icon-icon-wodexiaochengxu-moren')
    },
    {
        label: '我参与的',
        key: 'my-participation',
        disabled: true,
        icon: renderIcon('icon-icon-wocanyude-moren')
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'my-integral',
                    }
                },
                { default: () => '我的积分' }
            ),
        key: 'my-integral',
        icon: renderIcon('icon-icon-wodejifen-moren')
    }
]
// 创建模版
function toHome() {
    $router.push({ name: 'home' });
}
// Tips: 页面需要登录的地方 使用
const { goAuth } = useInit()
const handleUpdateValue = (key: string) => {
    currentMenu.value = key;
};

</script>
<style lang="scss">
.left-sider {
    background: white;

    .logo {
        height: 72rpx;
        background: white;
        width: 312rpx;
        padding: 18px 24px;
        box-sizing: border-box;
        cursor: pointer;

        img {
            width: 164px;
            height: 36px;
        }
    }

    .n-layout {
        padding: 8px;
    }

    .n-menu .n-menu-item {
        height: 56px;
        line-height: 56px;
        background: none !important;
        border-radius: 8px !important;
        font-size: 18px !important;
        padding: 0 20rpx;
        color: #5B5D62;
        font-weight: 400;
        margin-top: 0 !important;



        .n-menu-item-content.n-menu-item-content--selected::before {
            background-color: #EEEDFE;
        }

        .n-menu-item-content.n-menu-item-content--selected .n-menu-item-content-header a {
            color: #5652FF;
            font-weight: 500 !important;
        }

    }

    .n-menu .n-menu-item-content:hover {
        &::before {
            background: #F9F9FC;
        }
    }


    .n-menu .n-menu-item-content .n-menu-item-content__icon {
        color: rgba(91, 93, 98, 1);
    }

    .n-menu .n-menu-item-content.n-menu-item-content--selected .n-menu-item-content__icon {
        color: #5652FF;
    }

}
</style>