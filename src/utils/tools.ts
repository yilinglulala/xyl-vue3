import { useClipboard } from "@vueuse/core";
const { copy, isSupported, copied } = useClipboard();

// 添加到剪切板
export const addClipboard = (text: string, cb: Function) => {
  if (navigator.clipboard) {
    // clipboard api 复制
    navigator.clipboard.writeText(text);
    cb && cb();
  } else {
    // 下面这个方法火狐会有问题
    // var textarea = document.createElement('textarea')
    // document.body.appendChild(textarea)
    // // 隐藏此输入框
    // textarea.style.position = 'fixed'
    // textarea.style.clip = 'rect(0 0 0 0)'
    // textarea.style.top = '10px'
    // // 赋值
    // textarea.value = text
    // // 选中
    // textarea.select()
    // // 复制
    // document.execCommand('copy', true)
    // // 移除输入框
    // document.body.removeChild(textarea)
    if (isSupported) {
      copy(text);
    }
  }
};
