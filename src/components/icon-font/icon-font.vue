 <template>
  <i
    :class="`iconfont ${props.hoverLight ? 'hoverLight' : ''} ${props.name || ''} ${
      props.iconClass || ''
    }`"
    :style="{ 'font-size': size + 'px', color, ...props.iconStyle }"
    @click="$emit('click')"
  >
  </i>
</template>

<script lang="ts" setup>
  import '@/assets/iconfonts/iconfont.css';

  const props = defineProps({
    iconStyle: {
      type: Object,
      default: () => ({}),
    },
    name: String,
    iconClass: String,
    hoverLight: Boolean,
    size: Number,
    color: String,
  });
  defineEmits(['click']);
</script>
<style lang="scss" scoped>
  .hoverLight {
    color: var(--icon-color-regular);
    font-size: 24px;
    cursor: pointer;
    &:hover {
      color: var(--icon-color-regular--hover);
    }
  }
</style>
