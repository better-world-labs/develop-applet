module.exports = {
  endOfLine: 'lf',
  // 行宽 default:80
  printWidth: 100,
  // tab 宽度 default:2
  tabWidth: 2,
  // 使用 tab 键 default:false
  useTabs: false,
  // 语句行末是否添加分号 default:true
  semi: true,
  // 是否使用单引号 default:false
  singleQuote: true,
  // 对象需要引号在加 default:"as-needed"
  quoteProps: 'as-needed',
  // jsx单引号 default:false
  jsxSingleQuote: true,
  // 最后一个对象元素加逗号 default:"es5"
  trailingComma: 'es5',
  // 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格 default:true
  bracketSpacing: true,
  // 在 *.vue 文件中 Script 和 Style 标签内的代码是否缩进 default:false
  vueIndentScriptAndStyle: true,
  overrides: [
    {
      files: '*.md',
      options: {
        tabWidth: 2,
      },
    },
  ],
};
