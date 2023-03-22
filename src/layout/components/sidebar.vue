<!--
 * @Author: Lemon
 * @Date: 2023-03-22 09:30:35
 * @Description: 
-->
<template>
    <div class="left-sider">
        <div class="logo"> logo</div>
        <n-layout has-sider>
            <n-layout-sider :width="296" >
              <n-menu class="menu" :options="menuOptions" default-value="home"  @update:value="handleUpdateValue"/>
            </n-layout-sider>  
        </n-layout>
    </div>
</template>
<script lang="ts" setup> 
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { ref , h} from "vue"
const currentMenu = ref('home');

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
    },
    {
        label: '我参与的',
        key: 'my-participation',
        disabled: true,
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
    }
]

const handleUpdateValue = (key: string) => {
   currentMenu.value = key;
};

</script>
<style lang="scss">
.left-sider{
    background: white;
    .logo{
        height: 72rpx;
        background: greenyellow;
        width: 312rpx;
        padding: 18px 24px;
        box-sizing: border-box;
    }
    .n-layout{
        padding:8px; 
    }

    .n-menu .n-menu-item{
        height: 56px;
        line-height: 56px;
        background: none !important; 
        border-radius: 8px !important; 
        font-size: 18px !important; 
        padding: 0 20rpx ;
        color: #5B5D62; 
        font-weight: 400; 

        .n-menu-item-content.n-menu-item-content--selected::before{
            background-color:  #EEEDFE;
        } 
        .n-menu-item-content.n-menu-item-content--selected .n-menu-item-content-header a{ 
            color: #5652FF !important;
                    font-weight: 500 !important;
        }
         
    }
     
}

</style>