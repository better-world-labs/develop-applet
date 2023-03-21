 # web 模板仓库 说明文档

# 运行
npm i 
npm run dev 
npm run build


## 技术栈选型
> 基于vue Cli方式搭建, 使用到以下技术栈:
- Vue3 v3.2.37
- Vite v3.1.0
- pinia v2.0.22
- sass v1.26.5
- typescript v4.8.3
- prettier 格式约束
- eslint 语法约束  

## 基础内容
- 基本文件结构
- 环境配置
- 路由配置
- axios封装
- vite 打包配置，/dist 输出 
- 支持 mock 数据 
- /types 定义了一些全局类型
- 

## 项目结构
```sh
      
│  index.html   
│  package.json    
│  prettier.config.js   
│  tsconfig.json    
│  tsconfig.node.json    
│  vite.config.ts   
│  .gitignore   
│  Dockerfile 
│  nginx.conf
│  README.md       
│
├─build
│      script
│      vite
│      constant.ts
│      utils.ts
│ 
├─environments
│     .env.dev
│     .env.prod
│     .env.test
│ 
├─k8s
│     k8s.yaml
│ 
├─mock
│    ...
│ 
├─public
│     favicon.ico
│
├─src
│  │  App.vue
│  │  main.ts 
│  │  shims-vue.d.ts
│  │  vite-env.d.ts
│  │
│  ├─api
│  │  types
│  │      http.ts
│  │  index.ts 
│  │
│  ├─view
│  │  ├─index.vue
│  │
│  ├─assets
│  │    iconfonts 
│  │
│  ├─enums
│  ├─hooks
│  ├─bizComponents
│  ├─components
│  ├─directives
│  ├─styles
│  ├─store
│  │      modules 
│  │      index.ts
│  │
│  └─utils  
│
└─types
        global.d.ts
        index.d.ts
``` 
