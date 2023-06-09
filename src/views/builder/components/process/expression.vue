<!--
 * @Author: Sandy
 * @Date: 2023-03-30 16:22:41
 * @Description: 表达式处理
-->
<template>
  <div
    class="expression-box"
    :class="{
      firstBlur: notInput && firstBlur,
    }"
  >
    <div class="expression">
      <div id="editorRef" @input="someEvent" @blur="someBlur"></div>
    </div>
    <div class="line"></div>
    <div class="tags">
      <div class="tag" v-for="item in tagList" :key="item.id">
        {{ item.label }}
        <IconFont
          @click="addTag(item)"
          :size="18"
          class="tag-close"
          name="icon-icon-tianjiabiaoqian"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { v4 as uuid } from 'uuid';
  var quill2 = null;
  var def_placeholder =
    '由{出发地}出发，目的地是{目的地}，总行程天数为{天数}天，预算为{预算}元，在保证游玩体验良好的前提下，综合考虑交通、住宿等因素，尽可能详细地为我安排每半日的行程。';
  var require_placeholder = '请填写内容';
  export default {
    data() {
      return {
        firstBlur: false,
        editorDom: null,
      };
    },
    props: ['tagList', 'prompt', 'formItemsStatus'],
    mounted() {
      const self = this;
      quill2 = new Quill('#editorRef', {
        placeholder: def_placeholder,
        modules: {
          mention: {
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            mentionDenotationChars: ['|||||'],
            positioningStrategy: 'fixed',
            spaceAfterInsert: true,
            renderItem: (data) => {
              if (data.disabled) {
                return `<div style="height:10px;line-height:10px;font-size:10px;background-color:#ccc;margin:0 -20px;padding:4px">${data.value}</div>`;
              }
              return data.value;
            },
            renderLoading: () => {
              return 'Loading...';
            },
            source: (searchTerm, renderList, mentionChar) => {
              var matches = [];

              if (searchTerm.length === 0) {
                matches = self.tagList;
              } else {
                for (i = 0; i < self.tagList.length; i++)
                  if (~self.tagList[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
                    matches.push(self.tagList[i]);
              }

              //create group header items
              var matchesWithGroupHeaders = [];
              var currentTeam;
              for (i = 0; i < matches.length; i++) {
                var match = matches[i];
                if (currentTeam !== match.team) {
                  matchesWithGroupHeaders.push({
                    id: match.team,
                    value: match.team,
                    disabled: true,
                  });
                  currentTeam = match.team;
                }
                matchesWithGroupHeaders.push(match);
              }
              matches = matchesWithGroupHeaders;

              window.setTimeout(() => {
                renderList(matches, searchTerm);
              }, 1000);
            },
          },
        },
      });

      window.setTimeout(() => {
        self.displayMention();
      }, 600);

      function getElementByAttr(tag, dataAttr, reg) {
        var aElements = document.querySelectorAll(tag);
        // console.log(reg, aElements, dataAttr);
        for (var i = 0; i < aElements.length; i++) {
          var ele = aElements[i].getAttribute(dataAttr);
          if (reg.test(ele)) {
            return aElements[i];
          }
        }
      }

      window.addEventListener('mention-clicked', function (event) {
        // console.log(event);
        // TODO 点击删除, 暂缓
        try {
          // const dom = getElementByAttr(
          //   '.expression .mention',
          //   `data-uuid`,
          //   new RegExp(event.value.uuid)
          // );
          //   dom.remove();
          //   self.getData();
        } catch (error) {}
      });
      //   window.addEventListener('click', function (event) {
      //     self.getData();
      //   });
      this.editorDom = document.querySelector('#editorRef .ql-editor');
      this.editorDom.onblur = this.someBlur;
      this.setPlaceholder();
    },
    computed: {
      options() {
        const self = this;
        return {};
      },
      notInput() {
        const { prompt } = this;
        if (prompt.length < 2 && prompt[0].type === 'text') {
          const text = prompt[0]?.properties?.value.trim();
          return text.replaceAll('\n', '') == '';
        } else {
          return false;
        }
      },
    },
    async beforeUnmount() {
      await this.getData();
    },
    unmounted() {
      //   quill2 = null;
      //   quill2 = new Quill('#editorRef');
    },
    watch: {
      notInput() {
        this.setPlaceholder();
      },
      firstBlur() {
        this.setPlaceholder();
      },
      formItemsStatus: {
        handler: 'updateRequire',
        immediate: true,
      },
      deep: true,
    },
    methods: {
      updateRequire(val) {
        val == 'blur' && (this.firstBlur = true);
      },
      setPlaceholder() {
        if (this.editorDom) {
          this.editorDom.dataset.placeholder =
            this.notInput && this.firstBlur ? require_placeholder : def_placeholder;
        }
      },
      showMenu() {
        quill2.getModule('mention').openMenu('@');
      },
      someEvent() {
        this.getData();
      },
      someBlur() {
        this.firstBlur = true;
        this.getData();
      },

      async getData() {
        const mentions = quill2.getContents();
        const res = mentions.map((m) => {
          if (typeof m.insert == 'string') {
            return {
              id: uuid(),
              type: 'text',
              properties: {
                value: m.insert,
              },
            };
          } else {
            return {
              id: m.insert.mention.id,
              type: 'tag',
              properties: {
                value: m.insert.mention.denotationChar,
                character: m.insert.mention.id,
                from: 'form',
              },
            };
          }
        });
        // return res;
        await this.$emit('refreshPromptData', res);
      },

      addTag(item) {
        quill2.getModule('mention').insertItem(
          {
            denotationChar: item.label, //'',
            id: item.id,
            uuid: uuid(),
            value: '', //item.label,
          },
          true
        );
        this.$nextTick(this.getData);
      },

      getTag(uuid) {
        const findTag = this.tagList.find((f) => f.id == uuid);
        if (findTag) {
          return findTag['label'];
        }
      },
      displayMention() {
        this.$nextTick(() => {
          const dom = document.querySelector('#editorRef .ql-editor p');
          // console.warn(dom.style, 'displayMention', dom.style.counterReset, this.prompt);
          const { prompt } = this;
          try {
            // 解决只有一个换行的问题, 不展示placeholderd
            if (
              prompt.length == 1 &&
              prompt[0].type === 'text' &&
              prompt[0].properties.value === '\n'
            )
              return false;
            // 解决每次展开 多个换行问题
            const lastItem = prompt[prompt.length - 1];
            if (lastItem.type === 'text' && lastItem.properties.value.endsWith('\n\n')) {
              lastItem.properties.value = lastItem.properties.value.slice(0, -1);
            }
          } catch (error) {}
          const html = prompt.reduce((p, c) => {
            const s =
              c.type === 'tag'
                ? `<span
        class='mention'
        data-denotation-char='${this.getTag(c.properties.character)}'
        data-id='${c.properties.character}'
        data-uuid='${c.id}'
        data-value=''
      >
        <span class='ql-mention-denotation-char'>${this.getTag(c.properties.character)}</span>
      </span>`
                : c.properties.value;
            p += s;
            return p;
          }, '');
          if (dom) dom.innerHTML = html || '';
          else {
            setTimeout(() => {
              const dom = document.querySelector('#editorRef .ql-editor p');
              dom.innerHTML = html || '';
            }, 800);
          }
        });
      },
    },
  };
</script>

<style lang="scss">
  .expression-box {
    color: #5b5d62;
    background: #f3f3f7;
    border-radius: 16px;
    &.firstBlur {
      border: 1px solid #dc504c;

      .ql-editor.ql-blank::before {
        color: #dc504c;
      }
    }
    .ql-editor {
      min-height: 94px;
      // border: 1px solid #a3a3a3;
      // border-radius: 6px;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #202226;
    }
    .ql-editor.ql-blank::before {
      color: #abacae;
      content: attr(data-placeholder);
      font-style: normal;
      left: 15px;
      pointer-events: none;
      position: absolute;
      right: 15px;
    }

    .ql-editor-disabled {
      border-radius: 6px;
      background-color: rgba(124, 0, 0, 0.2);
      transition-duration: 0.5s;
    }

    .expression {
      overflow-y: auto;
      max-height: 380px;
    }

    .line {
      background: #ffffff;
      height: 2px;
    }

    .mention {
      // margin-right: 2px;
      margin: 0 1px 0 4px;

      background-color: transparent;
      color: #202226;
      height: 24px;
      cursor: default;
      // padding-left: 10px;
      > span {
        user-select: none;
        height: 22px;
        line-height: 22px;
        display: inline-flex;
        width: fit-content;
        align-items: center;
        box-sizing: border-box;
        border-radius: 15px;
        font-size: 12px;
        border: 1px solid #abacae;
        padding: 2px 4px;
        color: #5652ff;
        border: 1px solid #5652ff;
        margin: 0;
      }
      // padding: 2px 4px 2px 8px;
    }
    .expression span.mention > span {
    }

    .tag {
      font-size: 12px;
      color: #202226;
      padding-left: 10px;
      height: 24px;
      line-height: 24px;
      border: 1px solid #abacae;
      box-sizing: border-box;
      border-radius: 15px;
      display: inline-flex;
      width: fit-content;
      align-items: center;
      padding: 2px 4px 2px 8px;

      .tag-close {
        // width: 22px;
        // height: 20px;
        margin-left: 4px;
        cursor: pointer;
        // background: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.578 5l2.93-3.493a.089.089 0 0 0-.068-.146h-.891a.182.182 0 0 0-.137.064l-2.417 2.88-2.416-2.88a.178.178 0 0 0-.137-.064h-.89a.089.089 0 0 0-.069.146L4.413 5l-2.93 3.493a.089.089 0 0 0 .068.146h.89a.182.182 0 0 0 .138-.064l2.416-2.88 2.417 2.88c.033.04.083.064.137.064h.89a.089.089 0 0 0 .069-.146l-2.93-3.493z' fill='%23000' fill-opacity='.45'/%3E%3C/svg%3E") center no-repeat;
      }

      .remove-icon {
        width: 18px;
        height: 18px;
      }
    }

    .tags {
      padding: 9px 16px 1px 16px;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      width: 100%;
      box-sizing: border-box;

      .tag {
        margin-bottom: 8px;
        margin-right: 10px;
        i {
          color: #5652ff;
        }
      }
    }

    .tags-input {
      flex: auto;
      border: 0;
      outline: 0;
      padding: 0;
      font-size: 14px;
      line-height: 23px;
      display: inline-block;
      min-width: 20%;
      background: transparent;
      word-break: break-all;
      -webkit-user-modify: read-write-plaintext-only;

      &.hasVal {
        display: inline;
        min-width: 8px;
      }
    }

    .tags-input:focus-within,
    .tags-input:active {
      &::before {
        content: '';
      }

      // outline: auto #4F46E5;
    }

    .expression:focus-within,
    .expression:active {
      // outline: auto #4F46E5;
    }

    .tags-input:empty::before {
      content: ' ';
      color: #828282;
    }

    .tags-input:last-child:empty::before,
    .tags-input:only-child:empty::before {
      content: attr(placeholder);
      color: #828282;
    }
  }
</style>
