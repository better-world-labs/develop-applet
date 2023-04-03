<!--
 * @Author: Sandy
 * @Date: 2023-03-24 14:10:20
 * @Description: 只能删除文本的版本
-->

<template>
  <div>
    <div class="not-model" v-show="!props.appData.flow[0].type">
      <p @click="addModel">
        <icon-font-symbol :size="24" name="icon-icon-tianjiaxuanxiang" />
      </p>
    </div>
    <div class="has-model" v-show="props.appData.flow[0].type">
      <div class="flow">
        <p>
          <span>输入提示词</span>
          <IconFont :size="18" name="icon-icon-jiantou" />
          <span>
            <IconFont name="icon-icon-ChatGPT" style="color: #5652ff" />
            ChatGPT
          </span>
          <IconFont :size="18" name="icon-icon-jiantou" /><span>生成结果（ChatGPT）</span>
        </p>
        <IconFont name="icon-icon-shanchu" class="default" @click="clear()" />
      </div>
      <div class="description">
        <!-- <mention @input="handleComment"></mention> -->
        <expression
          ref="expressionRef"
          @refreshPromptData="refreshPromptData"
          :tagList="props.appData.form"
          :prompt="props.appData.flow[0].prompt"
        ></expression>
      </div>
    </div>
    <n-modal
      v-model:show="showModal"
      preset="dialog"
      title="Dialog"
      class="model-box"
      :trap-focus="false"
      :show-icon="false"
    >
      <template #header>
        <div>选择AI模型</div>
      </template>
      <div class="body">
        <template v-for="item in state.aiList" :key="item.id">
          <div class="label">{{ item['category'] }}</div>
          <div class="items">
            <div
              class="item"
              @click="model.available && choose(model)"
              v-for="model in item.models"
              :key="model.id"
              :class="{ available: model.available }"
            >
              <img :src="model.icon" alt="" />
              <span>{{ model.name }}</span>
            </div>
          </div>
        </template>
      </div>
    </n-modal>
  </div>
</template>
<script setup>
  import { v4 as uuid } from 'uuid';
  import expression from './expression.vue';
  //   import mention from './mention.vue';
  import { getAIList } from '@/api/application';
  // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  const props = defineProps(['appData']);
  const showModal = ref(false);
  const expressionRef = ref('');
  // const category = [{ type: 'text', des: '语言类模型' }, { type: 'image', des: '图像类模型（AI作画）' }]
  const addModel = () => {
    showModal.value = true;
  };
  const handleComment = () => {
    showModal.value = true;
  };
  const choose = (model) => {
    if (model.available) {
      props.appData.flow[0].type = model.name;
      showModal.value = false;
    }
  };
  const state = reactive({
    currentItem: {
      id: uuid(),
      type: 'text',
      properties: {
        value: '从',
      },
    }, //prompt
    currentIndex: 0,
    aiList: [],
  });
  const refreshPromptList = () => {
    nextTick(() => {
      const list = props.appData.flow[0].prompt;
      const arr = [];
      list.reduce((p, c) => {
        if (c.type && p.type !== c.type) {
          arr.push(c);
          return c;
        } else if (p.type === 'text' && p.type === c.type) {
          p.properties.value += c.properties.value;
          // arr[arr.length - 1].properties.value += c.properties.value
          return p;
          // 连续tag 之间不能添加内容
          // } else if (p.type === 'tag' && p.type === c.type) {
          //     // arr[arr.length - 1].properties.value += c.properties.value
          //     p.value += c.properties.value
          //     return p
          // 连续tag 之间有空标签
          // } else if (p.type === 'tag' && p.type === c.type) {
          //     // arr[arr.length - 1].properties.value += c.properties.value
          //     p.value += c.properties.value
          //     return p
        } else {
          arr.push(c);
          return c;
        }
      }, {});
      props.appData.flow[0].prompt = arr;
    });
  };
  const onCreate = () => {
    return {
      id: uuid(),
      label: '',
      type: 'text',
      properties: {
        placeholder: '',
      },
    };
  };

  onMounted(async () => {
    const aiList = await getAIList();
    state.aiList = aiList.data.list;
  });

  const getNewPrompt = (str = '') => {
    const newItem = {
      id: uuid(),
      type: 'text',
      properties: {
        value: str,
      },
    };
    return newItem;
    // props.appData.flow[0].prompt.push(newItem)
    // const index = props.appData.flow[0].prompt.length;
    // insertPrompt(index, newItem)
  };
  const insertPrompt = (index, item) => {
    const list = props.appData.flow[0].prompt;
    list.splice(index, 0, item);
  };
  // 备用
  const delPrompt = (index, item = {}) => {
    const list = props.appData.flow[0].prompt;
    list.splice(index, 1);
  };
  const removeTag = (index, item = {}) => {
    console.log('removeTag');
    const list = props.appData.flow[0].prompt;
    list.splice(index, 1);
    refreshPromptList();
  };
  const clear = () => {
    props.appData.flow[0].type = '';
    props.appData.flow[0].prompt = [getNewPrompt()];
  };
  let isFirstDel = true;

  const getTag = (uuid) => {
    const list = props.appData.form;
    const findTag = list.find((f) => f.id == uuid);
    if (findTag) {
      return findTag['label'];
    }
  };
  const addTag = (item) => {
    const newTag = {
      id: uuid(),
      type: 'tag',
      properties: {
        character: item.id,
        from: 'form',
      },
    };
    const { currentIndex, currentItem } = state;

    const list = props.appData.flow[0].prompt;
    const findIndex = list.findIndex((f) => f.id == currentItem.id);
    // list.splice(findIndex, 0, newTag)
    console.log(
      currentIndex,
      findIndex,
      currentItem.properties.value,
      currentItem.properties.value.length - 1
    );
    // 特殊处理 长度为1 最后一个text tag加载后面
    if (findIndex + 1 == list.length && currentItem.properties.value.length === 1) {
      insertPrompt(findIndex + 1, newTag);
      if (findIndex + 2 == list.length) insertPrompt(list.length, getNewPrompt());
      return;
    }
    // 常规逻辑
    if (currentIndex == 0) {
      insertPrompt(findIndex, newTag);
    } else if (currentIndex == currentItem.properties.value.length) {
      insertPrompt(findIndex + 1, newTag);
      if (findIndex + 2 == list.length) insertPrompt(list.length, getNewPrompt());
    } else {
      const str = currentItem.properties.value;
      const textL = getNewPrompt(str.slice(0, currentIndex));
      const textR = getNewPrompt(str.slice(currentIndex));
      list.splice(findIndex, 1, textL, newTag, textR);
      state.currentItem = list[findIndex + 2];
      // 重置选择的位置为0
      state.currentIndex = 0;
    }
  };
  // TODO 焦点有问题
  const changeVal = (e) => {
    // state.currentIndex = getSelection().getRangeAt(0);
    var CaretPos = 0,
      ctrl = e.target;
    if (document.selection) {
      ctrl.focus();
      var Sel = document.selection.createRange();
      Sel.moveStart('character', -ctrl.value.length);
      CaretPos = Sel.text.length;
    } else if (ctrl.selectionStart || ctrl.selectionStart === '0') {
      CaretPos = ctrl.selectionStart;
    }
    console.log(CaretPos);
    state.currentIndex = getSelection().getRangeAt(0).startOffset;
    console.log('change', state.currentIndex, e.target.dataset['num']);
    const list = props.appData.flow[0].prompt;
    state.currentItem = list.find((f) => f.id == e.target.dataset['num']);
  };

  const handleBlurEvent = (e, uuid) => {
    // this.data = e.target.innerHTML;
    nextTick(() => {
      console.log('handleBlurEvent', e, uuid);
      const list = props.appData.flow[0].prompt;
      const findTag = list.find((f) => f.id == uuid);
      if (findTag && findTag['type'] == 'text') {
        findTag['properties']['value'] = e.target.innerHTML;
      }
      refreshPromptList();
    });
  };
  const refreshPromptData = (data) => {
    // console.log(data, 'refreshPrompt');
    props.appData.flow[0].prompt = data;
  };
</script>
<style lang="scss" scoped>
  .not-model {
    p {
      color: #d9d9d9;
      border-top: 2px dashed rgba(0, 0, 0, 0.2);
      position: relative;
      cursor: pointer;

      svg {
        position: absolute;
        left: 0;
        top: -12px;
        width: 24px;
        height: 24px;
        margin-left: 13px;
      }
    }
  }

  .has-model {
    .flow {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 12px;

      p {
        flex: 1;
        display: flex;
        align-items: center;

        span {
          font-weight: 500;
          font-size: 16px;
          line-height: 16px;
          color: #5b5d62;

          i {
            margin: 0 4px 0 0;
          }
        }

        i {
          margin: 0 11px;
        }
      }

      .del {
      }
    }

    .description {
      color: #5b5d62;
      background: #f3f3f7;
      border-radius: 21px;
    }

    :deep(.diy-group) {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .n-input {
        font-size: 16px;
        --n-border-radius: 21px !important;
        --n-font-size: 16px !important;
        --n-height: 42px !important;
        background: #f3f3f7;
        margin-bottom: 16px;
        // --n-caret-color: #5652FF !important;
        // --n-border-hover: 1px solid #5652FF !important;
        // --n-border-focus: 1px solid #5652FF !important;
        // --n-loading-color: #5652FF !important;
        --n-caret-color: rgb(51, 54, 57) !important;
        --n-border-hover: 1px solid transparent !important;
        --n-border-focus: 1px solid transparent !important;
        --n-loading-color: transparent !important;
        --n-box-shadow-focus: 0 0 0 2px transparent !important;
      }
    }
  }

  :deep(.n-dynamic-input-item__action) {
    margin-top: 3px !important;
  }

  :deep(button.n-button) {
    --n-text-color-hover: #5652ff !important;
    --n-text-color-pressed: #5652ff !important;
    --n-text-color-focus: #5652ff !important;
    --n-border-hover: 1px solid #5652ff !important;
    --n-border-pressed: 1px solid #5652ff !important;
    --n-border-focus: 1px solid #5652ff !important;
    --n-text-color-focus: rgb(51, 54, 57) !important;
    --n-border-focus: 1px solid rgb(224, 224, 230) !important;
  }

  .scroll-y::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
    padding-right: 4px;
  }

  .scroll-y::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 4px;
    background: #d2d1dc;
    border-radius: 4px;
  }

  .scroll-y::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 4px;
    background: transparent;
  }
</style>

<style lang="scss">
  .model-box.n-dialog.n-modal {
    background: #fff !important;
    padding: 32px !important;
    width: 624px;

    .n-dialog__title {
      font-weight: 500;
      font-size: 20px;
      line-height: 20px;
      color: #181d24;
    }

    .n-dialog__content {
      margin-top: 0 !important;

      .label {
        margin-top: 32px;
        margin-bottom: 16px;
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        color: #5b5d62;
      }

      .items {
        .item {
          width: 124px;
          height: 112px;
          border: 1px solid #5b5d62;
          border-radius: 8px;
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0.5;

          & + .item {
            margin-left: 16px;
          }

          &.available {
            opacity: 1;
            cursor: pointer;
            &:hover {
              background: #eeedfe;
            }
          }

          img {
            margin-bottom: 6px;
            width: 40px;
            height: 40px;
          }

          span {
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            color: #5b5d62;
          }
        }
      }
    }
  }
</style>
