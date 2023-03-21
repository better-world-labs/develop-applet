 <template>
  <div class="dialog-content">
    <img object-fit="contain" style="max-width: 260px; max-height: 168px" :src="url" />
    <div class="size"> 
    </div>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'UploadImage',
    props: ['url', 'size'],
    setup() { 
      return { 
      };
    },
  });
</script>

<style lang="scss" scoped>
  .dialog-content {
    width: 408px;
    margin-top: 16px;
  }
  :deep(.add-form) {
    .n-form-item-label__text {
      color: #1e1e1e;
    }
  }
  .size {
    font-size: 14px;
    line-height: 20px; 
    color: #bec3c5;
  }
</style>
