<template>
  <n-popover
    :show="showPopover"
    :x="popperX"
    :y="popperY"
    trigger="manual"
    :show-arrow="false"
    class="pointer-popover"
    placement="bottom-start"
    @clickoutside="closeAll"
  >
    <template #trigger><span></span></template>
    <div class="pointer-popover__content">
      <div class="popover-item" :key="menu.value" v-for="menu in menus" @click="onSelectMenu(menu)">
        {{ menu.label }}
      </div>
    </div>
  </n-popover>
</template>
<script lang="ts">
  export interface PopoverMenuItem {
    value: string;
    label: string;
  }
</script>
<script setup lang="ts">
  import { usePopover } from './usePopover';
  const props = defineProps({
    menus: Array as PropType<PopoverMenuItem[]>,
    data: Object,
    show: Boolean,
  });
  const emits = defineEmits(['select', 'update:show']);
  const showPopover = computed(() => !!popoverData.value);
  watch([() => props.show, () => props.data], ([show, data]) => {
    if (show) {
      onShowMenu(data?.target, data?.value);
    }
  });

  const { popperX, popperY, popoverData, onShowMenu, closeAll } = usePopover(emits);

  function onSelectMenu(menu: PopoverMenuItem) {
    closeAll();
    emits('select', menu, props.data?.value as any);
  }
</script>

<style lang="scss">
  .pointer-popover {
    background: var(--popover-bg-color-deep) !important;
    border-radius: 4px;
    width: 220px;
    padding: 8px !important;
    .pointer-popover__content {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: var(--text-title);
      .popover-item {
        cursor: pointer;
        padding: 8px;
        border-radius: 4px;
        &:hover {
          background-color: var(--bg-color-active);
        }
      }
    }
  }
</style>
