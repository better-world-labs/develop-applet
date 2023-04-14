import type { Plugin } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { pathResolve } from '../../utils';

export function configAutoImportPlugin(): Plugin | Plugin[] {
  const plugins: Plugin[] = [];

  plugins.push(
    AutoImport({
      dts: pathResolve('types/auto-imports.d.ts'),
      imports: [
        'vue',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
    })
  );

  plugins.push(
    Components({
      dirs: ['src/components', 'src/bizComponents'],
      dts: pathResolve('types/components.d.ts'),
      resolvers: [NaiveUiResolver()],
    })
  );

  return plugins;
}
