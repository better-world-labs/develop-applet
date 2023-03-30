<!--
 * @Author: Sandy
 * @Date: 2023-03-30 17:00:47
 * @Description: 
-->
<template>
  <div class="mention-input" :style="d_mentionInputStyles">
    <div :class="d_containerClass" :style="d_containerStyles">
      <div :class="d_mainContainerClass" :style="d_mainContainerStyles">
        <div class="mention-input__input-container" @focus="handleFocus">
          <vue-editor
            ref="editor"
            class="mention-input__input-item-container relative"
            :editorOptions="d_editorOptions"
            @focus="handleFocus"
            @input="handleInput"
            @blur="handleBlur"
            v-model="value"
            :placeholder="placeholder"
          >
          </vue-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash-es';
  import Quill from 'quill';

  import { quillEditor } from 'vue-quill-editor'; // 引入富文本

  import mention from 'quill-mention'; // 引入mention 组件

  import 'quill-mention/dist/quill.mention.min.css';

  // 为quill 注册mention 组件

  Quill.register({
    'modules/mention': mention,
  });

  // const hashValues = [
  //   { id: 3, value: "Speaker: Michael Shill" },
  //   { id: 4, value: "Speaker: Bill Clinton" },
  //   { id: 3, value: "Speaker: Herman Melville" },
  //   { id: 4, value: "Sponsor: Nike" },
  // ];
  function isNode(v, title = 'GLOBALS.NODE.ISNODE') {
    if (v instanceof Element) return true;
    return !!console.error(new Error(`ERR::${title}! ${v} is not a node`));
  }

  function componentBlurred(container) {
    if (!isNode(container, 'GLOBALS.EVENT.COMPONENTBLURRED')) return false;
    if (!container.contains(document.activeElement)) return true;
    return false;
  }

  function checkItemClickedForBlur() {
    if (componentBlurred(this.$el)) {
      this.d_focus = false;
      this.$emit('input', { value: this.value, mentions: this.d_mentions });
      this.$emit('blur');
    }
  }

  export default {
    name: 'mentionInput',
    components: { VueEditor },
    data() {
      return {
        d_focus: false,
        d_setvalue: !!this.value,
        d_mentions: [],
        value: '',
        placeholder: 'Add a comment...',
        inline: true,
        slim: false,
      };
    },
    computed: {
      d_editorOptions() {
        const { d_atValues } = this;
        return {
          theme: null,
          modules: {
            toolbar: false,
            mention: {
              allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
              mentionDenotationChars: ['@'],
              source: function (searchTerm, renderList) {
                const values = d_atValues;

                if (searchTerm.length === 0) {
                  renderList(values, searchTerm);
                } else {
                  const matches = [];
                  for (let i = 0; i < values.length; i++)
                    if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
                      matches.push(values[i]);
                  renderList(matches, searchTerm);
                }
              },
            },
          },
        };
      },
      d_atValues() {
        return [
          { id: 1, value: 'Chris Sjoblom' },
          { id: 2, value: 'Fred Poust' },
          { id: 3, value: 'Employee TBD' },
          { id: 4, value: 'Employee TBD2' },
        ];
      },
      d_textAreaPadding() {
        const setValue = this.d_setvalue ? '1px' : null;
        return this.d_focus ? '2px' : setValue;
      },
      d_mainContainerClass() {
        const { inline, slim } = this;
        const out = [`mention-input__main-container`];
        if (inline) {
          out.push(`mention-input--inline`);
        }
        if (slim) {
          out.push(`mention-input__main-container--slim`);
        }
        return out;
      },
      d_mentionInputStyles() {
        return {
          zIndex: this.d_focus ? 1 : 0,
          paddingBottom: this.d_textAreaPadding,
        };
      },
      d_containerClass() {
        const container = [`mention-input__container`];
        if (this.d_focus) {
          const focusClass = this.slim
            ? `mention-input__container--focused-slim`
            : `mention-input__container--focused`;
          container.push(focusClass);
        }
        return container;
      },
      d_containerStyles() {
        return { marginBottom: this.d_focus || this.d_setvalue ? '-1px' : null };
      },
      d_mainContainerStyles() {
        return {
          paddingBottom: this.padded ? `${this.padded}px` : null,
          fontWeight: this.bolded ? '600' : null,
        };
      },
    },
    methods: {
      setFocus() {
        this.d_focus = true;
        this.$nextTick(() => {
          if (this.$refs && this.$refs.editor && this.$refs.editor.quill) {
            this.$refs.editor.quill.focus();
          }
        });
      },
      handleFocus(e) {
        if (this.$el && !this.$el.contains(document.activeElement)) this.$emit('focus');
        const { target } = e;
        this.d_focus = true;
        // if(!this.d_setvalue) this.d_computedheight = getNearestSpacing(this.height);
        this.$nextTick(() => {
          if (
            target !== this.$refs.textarea &&
            this.$refs &&
            this.$refs.editor &&
            this.$refs.editor.quill
          ) {
            this.$refs.editor.quill.focus();
          }
        });
      },
      getMentions: function () {
        // Dummy example to get all the mentions.
        var marvelDelta = this.$refs.editor.quill.editor.delta;
        var mentionDelta = _.filter(marvelDelta.ops, 'insert.mention'); // lodash
        var mentions = _.map(mentionDelta, function (value) {
          return _.toInteger(_.get(value, 'insert.mention.id'));
        });
        return mentions;
      },
      handleBlur() {
        setTimeout(checkItemClickedForBlur.bind(this), 0);
      },
      handleInput(v) {
        if (!v) return;
        this.$nextTick(() => {
          this.$emit('input', { value: this.value, mentions: this.d_mentions });
        });
      },
    },
    watch: {
      value: {
        handler(v) {
          if (!v) return;
          this.$nextTick(() => {
            const { editor } = this.$refs;
            if (editor) {
              this.d_mentions = this.getMentions();
            }
          });
        },
      },
    },
  };
</script>

<style lang="scss">
  .relative {
    position: relative;
  }
  .hide-toolbar > .ql-toolbar {
    display: none !important;
  }
  .mention-input__input-item-container {
    .ql-container {
      border: none !important;
      /* border-radius: 5px; */
      margin-bottom: 16px;
      .ql-editor {
        padding: 0 !important;
        margin-top: calc(#{8px} / 2);
        min-height: unset !important;
      }
      .ql-editor.ql-blank::before {
        font-style: normal !important;
        left: 0;
        color: darkgrey !important;
      }
    }
    .ql-toolbar {
      border-width: 0 0 1px 0 !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      margin-top: -8px;
    }
  }
  .mention-input__main-container--slim {
    .mention-input__input-item-container {
      .ql-toolbar {
        margin-top: 0;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .mention-input {
    margin-left: 16px;
    margin-right: 16px;
    position: relative;
    min-width: 208px;
    width: 375px;
    margin-bottom: 24px;

    &__container {
      width: 100%;
      background: transparent;
    }

    &--inline {
      border-bottom: solid 1px darkgrey;
      /* padding-top: (16px - 1px);
      padding-bottom: 16px; */
    }

    &__main-container {
      display: flex;
      align-items: flex-start;
      justify-content: left;
      height: 100%;
      cursor: pointer;
      margin: 0px 8px;
      -webkit-transition: height 0.1s; /* Safari */
      transition: height 0.1s;

      &--readonly {
        margin: 0 !important;
      }

      &--slim {
        border-bottom: none;
        padding-top: 0;
        padding-bottom: 0;
      }
    }

    &__icon {
      color: grey;
      width: 18px;
      height: 18px;
      font-size: 18px;
      margin-right: 8px;
    }

    &__icon.busy {
      color: blue;
    }

    &__placeholder {
      width: 100%;
      height: 100%;
      border: none;
      cursor: pointer;
      color: grey;
      line-height: 18px;
    }

    &__placeholder:focus {
      outline: none;
    }

    &__icon:focus {
      outline: none;
    }

    &__label:focus {
      outline: none;
    }

    &__chevron:focus {
      outline: none;
    }

    &__input {
      border: none;
      font-size: 16px;
      text-align: left;
      margin-right: -1px;
      width: 100%;
      height: 100%;
      resize: none;
      color: grey;
      background: transparent;
      padding: 0;
      margin: 0;

      &-container {
        width: 100%;
        height: 100%;
      }

      &-item-container {
        height: 100%;
      }
    }

    &__input:focus {
      outline: none;
    }

    &--disabled {
      opacity: 0.8 !important;

      & .mention-input__icon {
        color: darkgrey !important;
      }

      & .mention-input__label {
        color: darkgrey !important;
      }

      & .mention-input__input {
        color: darkgrey !important;
        opacity: 1 !important;
      }

      & .mention-input__placeholder {
        color: darkgrey !important;
      }
    }
  }

  .mention-input__container--focused {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
    background-color: '#fafcff';
    .mention-input__input {
      cursor: text;
    }

    .mention-input--inline {
      border-bottom: none;
    }
  }

  .mention-input__container--focused--slim {
    background-color: '#fafcff';
    .mention-input__input {
      cursor: text;
    }

    .mention-input--inline {
      border-bottom: none;
    }
  }
</style>
