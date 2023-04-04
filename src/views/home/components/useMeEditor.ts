/*
 * @Author: Lemon
 * @Date: 2022-11-09 16:51:42
 * @Description:
 */
import { ref } from 'vue';
import { useApplicationStore } from '@/store/modules/application';
import { useBrowser } from './useBrowser';

export function useMeEditor() {
  const applicationStore = useApplicationStore();
  const { isSafari, isFirefox } = useBrowser();

  const EditorRef = ref();
  const lockInput = ref(false); // 中文输入法锁输入框输入
  const fullContent = ref(''); // 缓存输入的内容

  const focusInput = (elem: HTMLElement) => {
    if (elem) {
      elem.focus();
      const range = document.createRange();
      range.selectNodeContents(elem);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  const getByteLength = (str: string) => {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
      str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94 ? (len += 2) : len++;
    }
    return len;
  };

  const checkCharacterLength = (e: Event): boolean => {
    // 超长1024个字符，多余的不展示
    const ele: string = (e.target as HTMLDivElement).innerHTML;
    if (getByteLength(ele) > 2048) {
      const elem = EditorRef.value;
      elem.innerHTML = fullContent.value;
      focusInput(elem);
      return false;
    }
    return true;
  };
  const compositionstart = () => {
    lockInput.value = true;
  };
  const compositionend = (e: Event) => {
    if (checkCharacterLength(e)) lockInput.value = false;
  };

  const handleTextChange = (e: Event) => {
    // 解锁后才更新输入内容
    let ele: string = (e.target as HTMLDivElement).innerHTML;

    // 兼容： 你是使用Firefox/Safari
    if ((isFirefox() || isSafari()) && ele == '<br>') {
      (e.target as HTMLDivElement).innerHTML = '';
      ele = '';
    }
    if (!lockInput.value && checkCharacterLength(e)) {
      fullContent.value = ele;
      const text = ele.replace(/<div>|<\/div>|<br>/g, function (at: string) {
        if (at === '<br>' || at === '<div>') {
          return '\n';
        } else if (at === '</div>') {
          return '';
        } else {
          return at;
        }
      });
      applicationStore.updateEditorText(text);
    }
  };

  // 监听文本输入
  watch(
    () => applicationStore.editorText,
    (editorText: string) => {
      nextTick(() => {
        const elem = EditorRef.value;
        elem.contenteditable = 'true'; // contenteditable为true时div才可以编辑
        elem.innerHTML = editorText; // 赋值
        focusInput(elem);
      });
    },
    {
      immediate: true,
    }
  );

  const updateEditorText = (str: string) => {
    applicationStore.addEditorText(str);
  };

  return {
    EditorRef,
    focusInput,
    handleTextChange,
    compositionstart,
    compositionend,
    updateEditorText,
  };
}
