<!--
 * @Author: Sandy
 * @Date: 2023-04-25 17:46:07
 * @Description: 请选择适合你的方案
-->
<template>
  <!-- <n-modal v-model:show="showModal" preset="dialog" title="Dialog" :showIcon="false">
    <template #header>
      <div>请选择适合你的方案</div>
    </template>
    <div>内容</div>
    <template #action>
      <div>操作</div>
    </template>
  </n-modal> -->
  <n-modal v-model:show="isShop">
    <div class="shop-box">
      <div class="title">请选择适合你的方案</div>
      <div class="close" @click="activateShop(false)">
        <IconFont name="icon-icon-guanbi-xiao" />
      </div>
      <div class="list">
        <div
          class="item"
          v-for="(item, i) in state.goods"
          :key="item.id"
          :class="{ active: state.current === i }"
          @click="state.current = i"
        >
          <div class="tag" v-if="item.tag == 'new-deal'">新人特惠</div>
          <p>{{ item.points }}积分</p>
          <p><span>¥</span>{{ item.price }}</p>
        </div>
        <!-- <div class="item active">
          <p>50积分</p>
          <p><span>¥</span>9.9</p>
        </div>
        <div class="item">
          <p>50积分</p>
          <p><span>¥</span>9.9</p>
        </div> -->
      </div>
      <div class="actions">
        <div class="btn-sub" :class="{ disable: state.current < 0 }" @click="buy">
          <i></i>立即充值
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script setup>
  import { useMessage } from 'naive-ui';
  import { getGoods } from '@/api/application';
  import { defineComponent, ref } from 'vue';
  import { useNative } from '../native';
  const emit = defineEmits(['selective']);
  const message = useMessage();
  const { isShop, activateShop } = useNative();
  const state = reactive({
    goods: [],
    current: -1,
  });
  onMounted(async () => {
    const goodsData = await getGoods();
    console.log(goodsData);
    state.goods = goodsData.data.list;
  });
  const buy = () => {
    if (state.current < 0) return false;
    // if (state.current < 0) return message.warning('请选择适合的采购方案');
    emit('selective', state.goods[state.current]);
  };
</script>

<style lang="scss" scoped>
  .shop-box {
    background: linear-gradient(180deg, rgba(211, 210, 252, 0.7) 0%, rgba(255, 255, 255, 0) 45.04%);
    background-color: #ffffff;
    border-radius: 12px;
    width: 743px;
    height: 366px;
    overflow: hidden;
    box-sizing: border-box; // needed to fix an issue with the modal not centering itself on the page. 描述：https://codege
    padding: 32px; // 56px;
    position: relative;
    .title {
      font-weight: 500;
      font-size: 24px;
      line-height: 34px;
      text-align: center;
      color: #181d24;
    }
    .close {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 22px;
      right: 16px;
      opacity: 0.7;
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      i {
        line-height: 24px;
        font-size: 24px;
        color: #5b5d62;
      }
      &:hover {
        opacity: 1;
      }
    }
    .list {
      margin: 27px auto 40px;
      display: flex;
      justify-content: center;
      .item {
        width: 189px;
        height: 153px;
        background-color: #f3f3f7;
        border-radius: 8px;
        position: relative;
        padding: 32px 0;
        cursor: pointer;
        box-sizing: border-box;
        overflow: hidden;
        border: 1px solid transparent;
        & + .item {
          margin-left: 32px;
        }

        .tag {
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(177.63deg, #ffa29c 1.99%, #f56f66 120.2%);
          padding: 4px 10px;
          font-weight: 500;
          font-size: 13px;
          line-height: 18px;
          text-align: center;
          color: #7c2626;
          border-top-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
        &:hover {
          border: 1px solid #5652ff;
        }
        &.active {
          background: #eeedfe;
          border: 1px solid #5652ff;
        }
        > p {
          margin: 0;
          padding: 0;
          font-weight: 500;
          font-size: 24px;
          line-height: 34px;
          text-align: center;
          color: #181d24;
          &:last-child {
            margin-top: 16px;
            font-weight: 500;
            font-size: 28px;
            line-height: 39px;
            color: #5d57f6;
            span {
              font-weight: 500;
              font-size: 20px;
              line-height: 28px;
              color: #5d57f6;
            }
          }
        }
      }
    }
    .actions {
      display: flex;
      justify-content: center;
      .btn-sub {
        background: #5652ff;
        border-radius: 8px;
        width: 228px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-weight: 500;
        font-size: 16px;
        color: #ffffff;
        cursor: pointer;
        position: relative;
        i {
          width: 24px;
          height: 24px;
          margin-right: 8px;
          display: inline-block;
          background-size: 100% 100%;
          background-image: url(@/assets/wx-pay.png);
          position: relative;
          top: 6px;
        }
        &:hover {
          background: #716efe;
        }
        &.disable {
          opacity: 0.5;
          cursor: default;
        }
      }
    }
  }
</style>
