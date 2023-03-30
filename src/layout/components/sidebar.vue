 
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
                <n-menu class="menu" :options="menuOptions" :value="applicationStore.currentMenu"
                    :default-value="applicationStore.currentMenu" @update:value="handleUpdateValue" />
            </n-layout-sider>
        </n-layout>
    </div>
</template>
<script lang="ts" setup>
import $router from '@/router/index';
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { h } from "vue"
import IconFontSymbol from "@/components/icon-font/icon-font-symbol.vue"
import { useApplicationStore } from "@/store/modules/application";
const applicationStore = useApplicationStore();

function renderIcon(name: string, str: string, activeIcon: string) {
    return () => h(IconFontSymbol, { size: 30, name: name == applicationStore.currentMenu ? activeIcon : str })
}

function redirectLink(name: string, label: string) {
    return h(
        RouterLink,
        {
            to: {
                name: name,
            }
        },
        { default: () => label }
    )
}


const menuOptions: MenuOption[] = [
    {
        label: () => redirectLink('home', "小程序广场"),
        key: 'home',
        icon: renderIcon('home', 'icon-icon-xiaochengxuguangchang-moren', 'icon-icon-xiaochengxuguangchang-xuanzhong')
    },
    {
        label: () => redirectLink('small-program', "我的小程序"),
        key: 'small-program',
        icon: renderIcon('small-program', 'icon-icon-wodexiaochengxu-moren', 'icon-icon-wodexiaochengxu-xuanzhong')
    },
    {
        label: '我参与的',
        key: 'my-participation',
        disabled: true,
        icon: renderIcon('my-participation', 'icon-icon-wocanyude-moren', 'icon-icon-wodejifen-xuanzhong')
    },
    {
       label:  () => redirectLink('my-integral', "我的积分"), 
        key: 'my-integral',
        // disabled: true,
        icon: renderIcon('my-integral', 'icon-icon-wodejifen-moren', 'icon-icon-wocanyude-xuanzhong')
    }
]
// 创建模版
function toHome() {
    $router.push({ name: 'home' });
    applicationStore.setCurrentMenu('home');
}

const handleUpdateValue = (key: string) => {
    applicationStore.setCurrentMenu(key);
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
            border-radius: 8px !important;
        }

        .n-menu-item-content.n-menu-item-content--selected .n-menu-item-content-header a {
            color: #5652FF;
            font-weight: 500 !important;
        }

    }

    .n-menu .n-menu-item-content:hover {
        &::before {
            background: #F9F9FC;
            border-radius: 8px !important;
        }
    }


    .n-menu .n-menu-item-content .n-menu-item-content__icon {
        color: rgba(91, 93, 98, 1);
    }

    .n-menu .n-menu-item-content.n-menu-item-content--selected .n-menu-item-content__icon {
        color: #5652FF !important;
    }

}
</style>