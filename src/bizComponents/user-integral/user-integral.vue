<!--
 * @Author: Lemon
 * @Date: 2023-03-23 09:43:30
 * @Description: 用户积分
-->
<template>
  <div class="user-integral" v-if="userStore.info.avatar && userStore.info.nickname">
    <n-popover trigger="click" raw placement="bottom-end" :show-arrow="false">
      <template #trigger>
        <div class="trigger-wrap">
          <img :src="userStore.info.avatar || '@/assets/default-user.jpg'" />
          <div>
            <div>{{ userStore.info.nickname }}</div>
            <div>
              <span class="active-text">{{ userStore.total }}</span>积分
            </div>
          </div>
        </div>
      </template>
      <div class="registration">
        <div class="left">
          <img src="@/assets/signin.png" alt="">
          <span>每日签到</span>
        </div>
        <div @click="signIn" class="register-btn" :class="signInCase.class">{{signInCase.word }}</div>
      </div>
    </n-popover>
  </div>
  <div class="login" @click="login" v-else>登录</div>
</template>
<script setup>
  import { useUserStore } from '@/store/modules/user';
  import { useInit } from '@/hooks/useInit';
  import {computed} from 'vue'
  import { useMessage } from 'naive-ui';

  const message = useMessage();
  const userStore = useUserStore();
  const { goAuth } = useInit();

  const signInCase = computed(() => {
    const state = userStore.registrationState
    return {
      word: state ? '已签到' : '签到',
      class: state ? 'signed' : 'not-sign'
    }
  })

  const login = () => {
    if (!userStore.token) goAuth();
  };

  function signIn() {
    userStore.makeRegistration()
    // 不知道这样写会不会有问题
    if (useUserStore.registrationState) {
      message.success('签到成功，积分已入账，快去使用吧~')
    } else {
      message.error('签到失败，请重新尝试')
    }
  }
  onMounted(() => {
    if (userStore.token) {
      // 有登录态之后再查询签到状态
      userStore.getRegistrationState()
    }
  })
</script>
<style lang="scss" scoped>
  .login {
    display: flex;
    align-items: center;
    padding: 0 32px;
    font-weight: 500;
    font-size: 16px;
    color: #5b5d62;
    cursor: pointer;
    &:hover {
      color: #202226;
    }
  }
  .user-integral {
    height: 160px;
    margin-left: 24px;
    background: #f3f3f7;
    border-radius: 12px;
    height: 52px;
    padding: 8px 12px;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    color: #202226;
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    
    .trigger-wrap {
      display: flex;
      cursor: pointer;

      img {
        width: 36px !important;
        height: 36px !important;
        border-radius: 36px;
        margin-right: 8px;
      }

      div:last-child {
        color: rgba(91, 93, 98, 1);
        margin-top: 4px;

        .active-text {
          color: rgba(86, 82, 255, 1);
        }
      }
    }
  }
</style>
<style lang="scss">
.registration {
  display: flex;
  align-items: center;
  padding: 20px 16px;
  border-radius: 4px;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 12px rgba(176, 177, 179, 0.3);
  .left {
    display: flex;
    align-items: center;
    img {
      width: 26px;
      height: 26px;
    }
    span {
      padding-left: 10px;
    }
  }
  .register-btn {
    cursor: pointer;
    margin-left: 42px;
    padding: 2px 12px;
    border-radius: 8px;
    background: #EEEDFE;
    border: 1px solid #5652FF;
    &:hover {
      background-color:  #D6D3FF;
    }
    &.signed {
      opacity: 0.5;
    }
    &.not-sign {
      background-color: #EEEDFE;;
    }
  }
}
.v-binder-follower-content {
  left: 12px !important;
}
.n-popover-shared {
  border-radius: 4px !important;
  margin-top: 24px !important;
}
</style>
