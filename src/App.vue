 <template>
   <AppProvider>
      <RouterView />
    </AppProvider>
</template>

<script lang="ts" setup>
  import { AppProvider } from '@/components/app-provider';    
</script>

<style lang="scss">
  body {
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      display: none;
    }
  }
</style>
