<!--
 * @Author: Sandy
 * @Date: 2023-04-25 14:26:11
 * @Description: 
-->
<template>
  <!-- <n-button-group>
    <n-button @click="activate"> 打开 </n-button>
  </n-button-group> -->
  <n-drawer v-model:show="active" :width="602">
    <n-drawer-content>
      <template #header>做个小程序 - 收银台 </template>
      <template #footer>
        <n-button>Footer</n-button>
      </template>
      <div class="body">
        <p>
          <span>订单编号:</span>
          <span>积分:</span>
        </p>
        <p>应付金额:9.90</p>
      </div>
      <vue-qr
        v-if="codeUrlRef"
        :text="codeUrlRef"
        :correct-level="3"
        :size="240"
        :margin="10"
        color-dark="#000"
        color-light="white"
        background-color="white"
        background-dimming="white"
        :logo-src="codeLogo"
        :logo-scale="0.2"
        :logo-margin="5"
        logo-background-color="white"
        :callback="loadingQr"
      />
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
  import { defineComponent, ref } from 'vue';
  import { useNative } from '../native';
  import vueQr from 'vue-qr/src/packages/vue-qr.vue';
  const codeLogo =
    'https://moyu-chat.oss-cn-hangzhou.aliyuncs.com/static-web/images/main-logo2.png';

  const { active, activate } = useNative();
  const codeUrlRef = ref('weixin://wxpay/bizpayurl?pr=BVuHOTVzz');
  const drawQrCode = ref<Boolean>(false);

  const loadingQr = () => {
    drawQrCode.value = true;
  };
</script>
