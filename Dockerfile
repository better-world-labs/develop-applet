FROM node:16.5.0 as builder

WORKDIR /app
COPY package.json package.json

# 依赖准备
RUN npm install --registry=https://registry.npm.taobao.org

COPY public public
COPY src src
COPY build build
ARG ENVIRONMENT
COPY environments/.env.${ENVIRONMENT} .env.production 
COPY tsconfig.json tsconfig.json
COPY tsconfig.node.json tsconfig.node.json
COPY vite.config.ts vite.config.ts
COPY index.html index.html

# 编译
RUN npm run build

FROM nginx:1.21.6-alpine
WORKDIR /opt/www
COPY --from=builder /app/dist ./
RUN mkdir -p /etc/nginx/conf.d; rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/site.conf
