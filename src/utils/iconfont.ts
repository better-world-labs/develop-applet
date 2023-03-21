 
// 定义iconfont库
const iconfontUrlCss = `//at.alicdn.com/t/c/font_3675919_067uzpuqygnq.css`;

// 定义动态插入方法
const loadIconFont = (url: string = iconfontUrlCss) => {
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
};

// 动态插入
export { loadIconFont };

// main.ts中 导入加载
