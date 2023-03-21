 import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { resolve } from 'path';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';
import { OUTPUT_DIR } from './build/constant';
import pkg from './package.json';
import dayjs from 'dayjs';

const { dependencies, devDependencies, name, version } = pkg;

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY/MM/DD HH:mm:ss'),
};

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const {
    VITE_PUBLIC_PATH,
    VITE_ENV_MODE,
    VITE_DROP_CONSOLE,
    VITE_SOURCEMAP,
    VITE_PORT,
    VITE_GLOB_PROD_MOCK,
    VITE_PROXY,
  } = viteEnv;
  const isBuild = command === 'build';
  return {
    base: VITE_PUBLIC_PATH,
    esbuild: {},
    resolve: {
      alias: [
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
        {
          find: '@',
          replacement: pathResolve('src'),
        },
      ],
      dedupe: ['vue'],
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
      'process.env': process.env,
    },
    server: {
      host: true,
      port: VITE_PORT,
      open: true,
      hmr: true,
      proxy: {
        '/api': {
          target: 'https://xxxx',
          changeOrigin: true,
        }, 
      },
    },
    optimizeDeps: {
      include: [],
      exclude: ['vue-demi'],
    },
    build: {
      target: ['es2015', 'chrome58'],
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      // 压缩配置
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: VITE_DROP_CONSOLE,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      // 启用/禁用 gzip 压缩大小报告
      // reportCompressedSize: false, // 如果压缩大文件很慢，可以禁用此项提高构建性能
      chunkSizeWarningLimit: 1000,
      sourcemap: VITE_SOURCEMAP,
    },
  };
};
