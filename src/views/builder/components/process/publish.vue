<!--
 * @Author: Sandy
 * @Date: 2023-03-24 10:43:57
 * @Description: 
-->

<template>
  <div class="save-share">
    <div class="des">
      <p>小程序信息</p>
      <div class="table">
        <div class="col" v-for="des in desList" :key="des.label">
          <span>{{ des.label }}</span>
          <p>{{ des.value }}</p>
        </div>
      </div>
    </div>
    <p>模版分类</p>
    <div class="tags">
      <n-radio-group v-model:value="props.appData.category">
        <n-radio :value="tag.id" v-for="tag in categoryList" :key="tag.id">
          <div class="tag" :class="{ active: props.appData.category == tag.id }">
            {{ tag.text }}
          </div>
        </n-radio>
      </n-radio-group>
    </div>
    <div class="submit" @click="$emit('submit')">
      <IconFont name="icon-icon-fabu"></IconFont>发布<span v-if="isCopy" class="integral-num"
        >（20积分）</span
      >
    </div>
  </div>
</template>
<script setup>
  import { useRoute } from 'vue-router';
  import { getCategories } from '@/api/application';
  const props = defineProps(['appData']);
  const route = useRoute();
  const isCopy = route.query.type == 'new';
  const categoryList = ref([]);
  onMounted(async () => {
    const tabsData = await getCategories();
    categoryList.value = tabsData.data.list;
  });
  const desList = [
    {
      label: '积分定价',
      value: '5积分',
    },
    {
      label: '运行耗时（预估）',
      value: '15秒',
    },
    {
      label: '公开发行',
      value: '公开',
    },
  ];
</script>
<style lang="scss" scoped>
  .save-share {
    overflow: hidden;

    .submit {
      height: 40px;
      line-height: 40px;
      border-radius: 8px;
      font-weight: 500;
      font-size: 16px;
      color: #fff;
      width: 152px;
      text-align: center;
      i {
        font-size: 18px;
        margin-right: 9px;
      }
      margin-top: 72px;
      background-color: #5652ff;
      background: linear-gradient(101.85deg, #957bfb 0%, #5652ff 98.88%);
      float: right;
      cursor: pointer;
      &:hover {
        background: linear-gradient(109.65deg, #a994ff 30.38%, #657eff 98.29%);
      }
      .integral-num {
        font-size: 12px;
      }
    }

    .des {
      background: #f3f3f7;
      border-radius: 12px;
      padding: 16px 16px 24px;

      p {
        margin: 0;
      }

      .table {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        padding-right: 100px;

        .col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          span {
            font-weight: 400;
            font-size: 16px;
            line-height: 16px;
            color: #abacae;
            margin-bottom: 13px;
          }

          p {
            font-weight: 400;
          }
        }
      }
    }

    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 16px;
      color: #5b5d62;
      margin-top: 32px;
      margin-bottom: 16px;
    }

    .n-button {
      margin-top: 72px;
      float: right;
    }

    .tags {
      .tag {
        font-size: 16px;
        line-height: 16px;
        color: #5b5d62;
        padding: 12px 24px;
        border: 1px solid #abacae;
        border-radius: 8px;

        &.active {
          background: #eeedfe;
          border: 1px solid #5652ff;
        }
      }

      :deep(.n-radio__dot-wrapper) {
        display: none;
      }

      :deep(.n-radio) {
        &:first-child {
          padding-left: 0px;
        }

        --n-label-padding: 0 4px !important;
      }
    }
  }
</style>
